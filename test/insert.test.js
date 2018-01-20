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
test('Checks if users are inserted', () => {
    expect(users.getTable().length).toBe(usersCollection.length)
})