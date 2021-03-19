const express = require('express')
const app = express()

// 全局中间件
app.use((req, res) => {
  res.send({ ping: 'pong' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.info(`Server is listening at port ${PORT}.`)
})
