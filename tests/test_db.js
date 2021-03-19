const { getCol, closeDB } = require('../config/mongodb')

getCol('text').then(col => {
  col.insertOne({
    name: 'test', age: 18, date: Date.now()
  }).then(res => {
    console.log(res.result)
  }).catch(err => {
    console.error(err)
  }).finally(closeDB)
})
