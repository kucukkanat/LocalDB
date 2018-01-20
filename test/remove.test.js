import LocalDB from './../src/'
import table from 'console.table'
import _ from 'lodash'
import usersCollection from './usersCollection'
const users = new LocalDB('users')

test('Populate',()=>{
    _.each(usersCollection,user => {
        users.insert(user)
    })
})
test('Deletes people under the age of 18', () => {
    users.delete({age:{$lt:18}})
})

test('Checks if users are deleted', () => {
    const table = users.getTable()
    const expectedUsers = ['kucukkanat','havva']
    expect(_.map(table,'username')).toEqual(expect.arrayContaining(expectedUsers))
})