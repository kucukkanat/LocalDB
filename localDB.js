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
  var self = this;
  this.debug = false;
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
    if(object.id) {
      var dbObject = self.query({
        id: object.id
      });
      if(dbObject.length) {
        self.update({id:object.id},object)
        // ok we did what we came for, go home
        return;
      }
    }

    // we either don't have object with object.id or object doesn't have id
    var Table = getTable(tableName)
    object.id = object.id || guid() // respect user's id
    Table.push(object)
    localStorage[tableName] = JSON.stringify(Table)

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
    var result = sift(q,JSON.parse(localStorage[tableName]));
    this.debug && console.table(result);
    return result;
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
