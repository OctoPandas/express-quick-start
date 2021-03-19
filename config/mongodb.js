const { MongoClient } = require('mongodb')

const { MONGODB_URI } = process.env
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let connection = null

exports.getCol = async collection => {
  // const connection ??= await client.connect()
  // 如上写法 Node.js 15+ 才受支持
  try {
    connection = connection ?? await client.connect()
    return client.db('land').collection(collection)
  } catch (err) {
    console.error('failed to connect to mongodb', err)
  }
}

exports.closeDB = client.close.bind(client)
