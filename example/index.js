import LocalDB from './../dist/release'
console.log(LocalDB)
const users = new LocalDB('users')
console.log(users)
users.insert({username:'kucukkanat',age:28})
users.insert({username:'boomer',age:18})
users.insert({username:'foo',age:8})
users.insert({username:'bar',age:44})

users.query({age:{$gt:18}})