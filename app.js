const express = require('express')
const withRouters = require('./routes')

const app = express()

app.use(express.json())
withRouters(app)

app.use((req, res) => {
  res.send({ ping: 'pong' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.info(`Server is listening at port ${PORT}.`)
})
