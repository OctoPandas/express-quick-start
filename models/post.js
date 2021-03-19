const postCollection = require('../config/mongodb').getCol('posts')

exports.save = async post => {
  try {
    const collection = await postCollection
    const result = await collection.insertOne(post)
    // ops 里面存放着服务器端添加的数据，由于只插入了 1 条，这样即可
    return result.ops?.[0]
  } catch (err) {
    throw { msg: 'failed to add a post', err }
  }
}
