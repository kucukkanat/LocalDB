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
test('Drops the table and checks for length', () => {
    users.drop()
    expect(users.getTable().length).toBe(0)
})