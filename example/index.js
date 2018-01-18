window.users = new LocalDB('users',true)

var kucukkanat = users.insert({username:'kucukkanat',age:28})
kucukkanat.deneme = 777
users.insert(kucukkanat)
users.insert({username:'boomer',age:18})
users.insert({username:'foo',age:8})
users.insert({username:'bar',age:44})

users.query({age:{$gt:18}})