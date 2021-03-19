const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router()

const postModel = require('../models/post')

router.get('/', (req, res) => {
  res.send({ id: nanoid(), title: new Date().toString() })
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

router.patch('/:id', (req, res) => {
  console.log(req.params.id, req.body)
  res.send()
})

router.delete('/:id', (req, res) => {
  console.log(req.params.id, req.body)
  res.status(204).send()
})

module.exports = router
