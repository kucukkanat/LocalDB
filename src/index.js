import sift from 'sift'
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
      console.log(e)
      this.debug ? console.info(`Table ${this.name} is broken creating new. All data is lost`) : null
      localStorage[this.name] = '[]'
    }

    this.getTable = this.getTable.bind(this)
    this.query = this.query.bind(this)
    this.remove = this.remove.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
  }
  getTable() {
    try {
      const table = JSON.parse(localStorage[this.name])
      return table
    } catch (e) {
      this.debug ? console.error(`The table ${this.name} is broken! : `, localStorage[this.name]) : null
      return null
    }
  }
  query(queryObj = {}) {
    return sift(queryObj, JSON.parse(localStorage[this.name]))
  }
  remove() {

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
    console.table(table)
    return object
  }
  update(queryObj,objectToMerge) {
    let table = this.getTable()
    const updatedTable = sift(queryObj,table)
    .map((row)=>{
      return _.merge(row,objectToMerge)
    })
    console.log(table,updatedTable)
    localStorage[this.name] = JSON.stringify(updatedTable)
  }
  drop() {
    localStorage[this.name] = '[]'
  }
}

if (window) window.LocalDB = LocalDB

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}