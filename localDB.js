var sift = require('sift')

var LocalDB = function(tableName){
  var getTable = function(name){
    var data;
    if(!localStorage[name]) localStorage[name] = '[]'
    try{
      data = JSON.parse(localStorage[name])
    }
    catch(e){
      console.info('Table ',name,' is broken creating new. All data is lost')
      localStorage[name] = '[]'
      data = []
    }
    return data
  }
  getTable(tableName)
  var self = this
  this.update = function(query,item){
    var Table = getTable(tableName)
    sift(query,Table).forEach(function(el){
      var ElementIndex = Table.indexOf(el)
      item.id = el.id
      Table[ElementIndex] = item
    })
    localStorage[tableName] = JSON.stringify(Table)
  }
  this.insert = function(object){
    if(object.id) self.update({id:object.id},object)
    else{
      var Table = getTable(tableName)
      object.id = guid()
      Table.push(object)
      localStorage[tableName] = JSON.stringify(Table)
    }
  }
  this.remove = function(query){
    var Table = getTable(tableName)
    sift(query,Table).forEach(function(el){
      var ElementIndex = Table.indexOf(el)
      Table.splice(ElementIndex,1)
    })
    localStorage[tableName] = JSON.stringify(Table)
  }
  this.query = function(q){
    if(typeof q !== 'object') {
      q = {};
    }
    return sift(q,JSON.parse(localStorage[tableName]))
  }

}

module.exports = LocalDB
if(window) window.DB = LocalDB

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
