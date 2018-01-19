# A local database implementation using localStorage API
This is a simple wrapper for javascript's localStorage API for a more convenient use.

## Installation

```
yarn add local-db --dev
```
or
```
npm install local-db --save-dev
```
or 
```
<!-- local-db will assign itself to window.LocalDB -->
<script src='https://unpkg.com/local-db'></script>
```
## Usage

```
import LocalDB from 'local-db'
```
or
```
var LocalDB = require('local-db)
```

then

```
var usersTable = new LocalDB('users')
```

## Methods

### .create(object)
If object has an `.id` property, LocalDB will try to update the object in the table with 
regarding id.

```
usersTable.insert({username:'kucukkanat',city:'Izmir'})
```
**returns :** the user object created in table with generated ID

### .read(query)
Returns an array of the elements matching the query

```
// Guys you are not allowed to buy cigarettes!
usersTable.query({age:{$lt:{18}}})
```
**returns :** the user object created in table with generated ID

### .update(query,object)
Updates all objects in table matching the query. The update method does a deep merge 
using `lodash` 's  `_.merge` method. [_.merge](https://lodash.com/docs/4.17.4#merge)

```
// Moves kucukkanat from Izmir to Amsterdam
usersTable.update({username:'kucukkanat'},{city:'Amsterdam'})
```
**returns :** LocalDB instance itself

### .delete(query)
Deletes all objects in table matching the query

```
// Are you not a bit old for skating grandpa ?
usersTable.delete({age:{$gt:70}})
```
**returns :** LocalDB instance itself

### .drop()
Empties the table

```
usersTable.drop()
```
**returns :** LocalDB instance itself



## Supported Operators:

See MongoDB's [advanced queries](http://www.mongodb.org/display/DOCS/Advanced+Queries) for more info.

### $in

array value must be *$in* the given query:

Intersecting two arrays:

```javascript
//filtered: ['Brazil']
table.query({ $in: ['Costa Rica','Brazil'] }, ['Brazil','Haiti','Peru','Chile']);
```

Here's another example. This acts more like the $or operator:

```javascript
table.query({ location: { $in: ['Costa Rica','Brazil'] } }, [ { name: 'Craig', location: 'Brazil' } ]);
```

### $nin

Opposite of $in:

```javascript
//filtered: ['Haiti','Peru','Chile']
table.query({ $nin: ['Costa Rica','Brazil'] }, ['Brazil','Haiti','Peru','Chile']);
```

### $exists

Checks if whether a value exists:

```javascript
//filtered: ['Craig','Tim']
table.query({ $exists: true }, ['Craig',null,'Tim']);
```

You can also filter out values that don't exist

```javascript
//filtered: [{ name: 'Craig', city: 'Minneapolis' }]
table.query({ city: { $exists: false } }, [ { name: 'Craig', city: 'Minneapolis' }, { name: 'Tim' }]);
```

### $gte

Checks if a number is >= value:

```javascript
//filtered: [2, 3]
table.query({ $gte: 2 }, [0, 1, 2, 3]);
```

### $gt

Checks if a number is > value:

```javascript
//filtered: [3]
table.query({ $gt: 2 }, [0, 1, 2, 3]);
```

### $lte

Checks if a number is <= value.

```javascript
//filtered: [0, 1, 2]
table.query({ $lte: 2 }, [0, 1, 2, 3]);
```

### $lt

Checks if number is < value.

```javascript
//filtered: [0, 1]
table.query({ $lt: 2 }, [0, 1, 2, 3]);
```

### $eq

Checks if query == value. Note that **$eq can be omitted**. For **$eq**, and **$ne**

```javascript
//filtered: [{ state: 'MN' }]
table.query({ state: {$eq: 'MN' }}, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);
```

Or:

```javascript
//filtered: [{ state: 'MN' }]
table.query({ state: 'MN' }, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);
```

### $ne

Checks if query != value.

```javascript
//filtered: [{ state: 'CA' }, { state: 'WI'}]
table.query({ state: {$ne: 'MN' }}, [{ state: 'MN' }, { state: 'CA' }, { state: 'WI' }]);
```

### $mod

Modulus:

```javascript
//filtered: [300, 600]
table.query({ $mod: [3, 0] }, [100, 200, 300, 400, 500, 600]);
```

### $all

values must match **everything** in array:

```javascript
//filtered: [ { tags: ['books','programming','travel' ]} ]
table.query({ tags: {$all: ['books','programming'] }}, [
{ tags: ['books','programming','travel' ] },
{ tags: ['travel','cooking'] } ]);
```

### $and

ability to use an array of expressions. All expressions must test true.

```javascript
//filtered: [ { name: 'Craig', state: 'MN' }]

table.query({ $and: [ { name: 'Craig' }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);
```

### $or

OR array of expressions.

```javascript
//filtered: [ { name: 'Craig', state: 'MN' }, { name: 'Tim', state: 'MN' }]
table.query({ $or: [ { name: 'Craig' }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);
```

### $nor

opposite of or:

```javascript
//filtered: [ { name: 'Tim', state: 'MN' }, { name: 'Joe', state: 'CA' }]
table.query({ $nor: [ { name: 'Craig' }, { state: 'MN' } ] }, [
{ name: 'Craig', state: 'MN' },
{ name: 'Tim', state: 'MN' },
{ name: 'Joe', state: 'CA' } ]);
```


### $size

Matches an array - must match given size:

```javascript
//filtered: ['food','cooking']
table.query({ tags: { $size: 2 } }, [ { tags: ['food','cooking'] }, { tags: ['traveling'] }]);
```

### $type

Matches a values based on the type

```javascript
table.query({ $type: Date }, [new Date(), 4342, 'hello world']); //returns single date
table.query({ $type: String }, [new Date(), 4342, 'hello world']); //returns ['hello world']
```

### $regex

Matches values based on the given regular expression

```javascript
table.query({ $regex: /^f/i, $nin: ["frank"] }, ["frank", "fred", "sam", "frost"]); // ["fred", "frost"]
table.query({ $regex: "^f", $options: "i", $nin: ["frank"] }, ["frank", "fred", "sam", "frost"]); // ["fred", "frost"]
```

### $where

Matches based on some javascript comparison

```javascript
table.query({ $where: "this.name === 'frank'" }, [{name:'frank'},{name:'joe'}]); // ["frank"]
table.query({
	$where: function() {
		return this.name === "frank"
	}
}, [{name:'frank'},{name:'joe'}]); // ["frank"]
```

### $elemMatch

Matches elements of array

```javascript
var bills = [{
    month: 'july',
    casts: [{
        id: 1,
        value: 200
    },{
        id: 2,
        value: 1000
    }]
},
{
    month: 'august',
    casts: [{
        id: 3,
        value: 1000,
    }, {
        id: 4,
        value: 4000
    }]
}];

var result = table.query({
    casts: {$elemMatch:{
        value: {$gt: 1000}
    }}
}, bills); // {month:'august', casts:[{id:2, value: 1000},{id: 4, value: 4000}]}
```

### $not

Not expression:

```javascript
table.query({$not:{$in:['craig','tim']}}, ['craig','tim','jake']); //['jake']
table.query({$not:{$size:5}}, ['craig','tim','jake']); //['tim','jake']
```

## sub object Searching


```javascript
var people = [{
	name: 'craig',
	address: {
		city: 'Minneapolis'
	}
},
{
	name: 'tim',
	address: {
		city: 'St. Paul'
	}
}];

var queried = table.query({ address: { city: 'Minneapolis' }}, people); // count = 1

//or
var queried = table.query({'address.city': 'minneapolis'}, people);//count = 1
```

