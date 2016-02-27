### A local database implementation using localStorage API
This is a simple wrapper for javascript's localStorage API for a more convenient use.

LocalDB.js requires [sift](http://github.com/kucukkanat/sift.js)

First create a database engine:
```js
  var DB = require('local-db')
```
Create a table :
```js
  var users = new DB('users')
```
You can query your table using MongoDB queries
```js
var majors = users.query({age:{$gt:18}})
```
To insert the object to a table simply send the object itself
```js
users.insert({username:'kucukkanat',password:123})
```
To delete rows from table use queries
```js
users.remove({id:182736})
```

## For those who don't use webpack

You can  :

    <script src="index.js"></script>

Then :

	var users = new DB('users')
    
`index.js` does window.DB = LocalDB to use in browsers


###TO-DO
* ~~Make update function~~
* ~~Make npm package~~
* ~~Pack sift with `webpack`~~
