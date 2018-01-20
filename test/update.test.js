import LocalDB from './../src/'
import table from 'console.table'
import _ from 'lodash'
import usersCollection from './usersCollection'
const users = new LocalDB('users')

test('Populate', () => {
    _.each(usersCollection,user => {
        users.insert(user)
    })
})
test('Update a user and check if updated', () => {
    users.update({age:28,username:'kucukkanat'},{age:100})
    const foundUser = users.query({username:'kucukkanat'})[0]
    expect(foundUser.age).toBe(100)
})