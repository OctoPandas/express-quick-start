const posts = require('./posts')

module.exports = app => {
  app.use('/post', posts)
}
