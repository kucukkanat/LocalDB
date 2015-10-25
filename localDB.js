try{
  var e = sift
}catch(e){
  console.log('SIFT must be imported to use this library! : https://github.com/crcn/sift.js?utm_source=nodeweekly&utm_medium=email ')
}
var LocalDB = {
  tables : [],
  create : function(name){
    if(localStorage[name]){
        FixIfBroken(name)
        console.warn('Table ',name,' already exists!')
    }
    else{
      localStorage[name] = '[]'
      LocalDB.tables.push(name)
      console.log('Table ',name,' created!')
    }
  },
  table : function(name,showTableInConsole){
    try{
      if(showTableInConsole) console.table(JSON.parse(localStorage[name]))
      return JSON.parse(localStorage[name])
    }catch(e){
      console.warn('Table ',name,' does not exist!')
      console.warn('Create a table with : LocalDB.create("'+name+'")')
    }

  },
  query : function(name,Q){
    var Table = LocalDB.table(name)
    try{return sift(Q,Table)}catch(e){}
  },
  insert  :function(TableName,Obj){
    var Table = LocalDB.table(TableName)
    if(Table){
      if(!Obj.id){
        Obj.id = guid()
        Table.push(Obj)
      }
      else{
        for(var i=0;i<Table.length;i++) if(Table[i].id == Obj.id) Table[i] = Obj
      }
      localStorage[TableName] = JSON.stringify(Table)
    }
  },
  delete : function(TableName,Q){
    var Table = LocalDB.table(TableName)
    var e = sift(Q,Table)
    e.forEach(function(row){
      var index = Table.indexOf(row)
      console.log('Deleting index : ',index)
      Table.splice(index,1)
    })
    localStorage[TableName] = JSON.stringify(Table)
  }
}


var FixIfBroken = function(name){
  try{
    JSON.parse(localStorage[name])
  }
  catch(e){
    console.warn('The table is broken, fixing and truncating now')
    localStorage[name] = '[]'
  }
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
