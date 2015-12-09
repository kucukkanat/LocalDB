### A local database implementation using localStorage API
This is a simple wrapper for javascript's localStorage API for a more convenient use.

LocalDB.js requires [sift](http://github.com/kucukkanat/sift.js)

First create a database :
```
  var UserDB = LocalDB.create('users')
```
Get the whole table :
```
  var AllUsers = LocalDB.table('users')
```
You can query your table using MongoDB queries
```
LocalDB.query( 'users', {age:{$gt:18}} )
```
To insert the object to a table simply send the object itself
```
LocalDB.insert('users',{username:'kucukkanat',password:123})
```
To delete rows from table use queries
```
LocalDB.delete('users',{id:182736})
```

###TO-DO
* Make update function
* ~~Make npm package~~
* Pack sift with `webpack`
