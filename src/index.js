import sift from './sift'
import _ from 'lodash'
export default class LocalDB {
  constructor(tableName,debug) {
    this.name = tableName
    this.debug = debug
    // Create table in localstorage if doesnt exist
    if (!localStorage[tableName]) localStorage[tableName] = '[]'
    try {
      const data = JSON.parse(localStorage[this.name])
    } catch (e) {
      localStorage[this.name] = '[]'
    }
    
    this.getTable = this.getTable.bind(this)
    this.query = this.query.bind(this)
    this.remove = this.remove.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)

    this.on = this.on.bind(this)
    this.emit = this.emit.bind(this)
    this.eventListeners = []
    // Aliases
    this.create = this.insert
    this.read = this.query
    this.delete = this.remove
  }
  
  getTable() {
    try {
      const table = JSON.parse(localStorage[this.name])
      return table
    } catch (e) {
      return null
    }
  }  
  
  insert(object) {
    if(object.id) {
      this.update({
        id: object.id
      }, object)
      // ok we did what we came for, go home
      return object;
    } else{
      object.id = guid()
    }
    

    let table = JSON.parse(localStorage[this.name])
    table.push(object)
    localStorage[this.name] = JSON.stringify(table)
    this.emit('$insert',object)
    this.emit('$create',object)
    return object
  }
  query(queryObj = {}) {
    return sift(queryObj, JSON.parse(localStorage[this.name]))
  }
  update(queryObj,objectToMerge) {
    let table = this.getTable()
    const updatedTable = sift(queryObj,table)
    .forEach((row)=>{
      const index = table.indexOf(row)
      const nextObject = _.merge({},row,objectToMerge)
      this.emit('$update',row,nextObject)
      table[index] = nextObject
    })
    
    localStorage[this.name] = JSON.stringify(table)
    return this
  }
  remove(queryObj) {
    let table = this.getTable()
    sift(queryObj,table)
    .forEach((row)=>{
      const index = table.indexOf(row)
      table.splice(index,1)
      localStorage[this.name] = JSON.stringify(table)
      this.emit('$remove',row)
      this.emit('$delete',row)
    })
    return this
  }
  
  drop() {
    localStorage[this.name] = '[]'
    this.emit('$drop')
    return this
  }

  on(name, fn) {
    this.eventListeners.push({
      name,
      fn
    })
    return this
  }
  emit(name, ...payload) {
    sift({name:name},this.eventListeners)
    .forEach((eventListener) => {
      eventListener.fn.apply(this.getTable(),payload)
    })
    return this
  }
}

/* istanbul ignore next */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  module.exports = LocalDB;
  exports['default'] = module.exports.default = LocalDB;
}

/* istanbul ignore next */
if (typeof window !== 'undefined') {
  window.LocalDB = LocalDB;
}


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}