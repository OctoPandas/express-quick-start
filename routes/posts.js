const express = require('express')
const { nanoid } = require('nanoid')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({ id: nanoid(), title: new Date().toString() })
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.status(201).send({ id: nanoid(), title: new Date().toString() })
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
