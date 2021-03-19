const { ObjectId } = require('mongodb')

// 为了简化调用这里直接持有一个 `Promise` 对象
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

exports.findAll = async () => {
  try {
    const collection = await postCollection
    // `find()` 方法返回一个游标，可以在此基础上进行排序过滤等操作
    // 这里不必进行 `await` 因为上层一定会 `await findAll()`
    return collection.find({}).toArray()
  } catch (err) {
    throw { msg: 'failed to fetch all posts', err }
  }
}

exports.update = async (id, post) => {
  try {
    const collection = await postCollection
    // `findOneAndUpdate` 会返回更新后的问题，而 `updateOne` 则不会
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: post },
      { returnOriginal: false }
    )
    return result.value
  } catch (err) {
    throw { msg: 'failed to update post', err }
  }
}

exports.delete = async id => {
  try {
    const collection = await postCollection
    await collection.deleteOne({ _id: ObjectId(id) })
    // 不需要返回值，没有异常则认为删除成功
  } catch (err) {
    throw { msg: 'failed to delete post', err }
  }
}

exports.deleteCommnetByUser = async (id, user) => {
  // { _id, comments: [{ user: '??', comment: '??' }, {}, {}] }
  // 为了删除里面的嵌套文档
  try {
    const collection = await postCollection
    await collection.updateOne(
      { _id: ObjectId(id) },
      { $pull: { comments: { user } } }
    )
  } catch (err) {
    throw { msg: 'failed to delete comments of user', err }
  }
}
