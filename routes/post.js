const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router()

const postModel = require('../models/post')

router.get('/', async (req, res) => {
  try {
    const posts = await postModel.findAll()
    res.json(posts)
  } catch (err) {
    console.error(err)
    // 这里其实不应该使用 404 状态码的
    // 如果是为了缓解客户情绪勉强说得过去吧
    res.status(404).send()
  }
})

router.post('/', async (req, res) => {
  try {
    const post = await postModel.save(req.body)
    res.status(201).json(post)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const post = await postModel.update(req.params.id, req.body)
    res.json(post)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await postModel.delete(req.params.id)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

// 删除某 post 下特定 user 的评论
router.delete('/:id/comment', async (req, res) => {
  try {
    await postModel.deleteCommnetByUser(req.params.id, req.body.user)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

module.exports = router
