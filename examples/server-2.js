const path = require('path')
const Server = require('nova-faas').Server
const server = new Server()

const config = require('../server/config')

server
  .use(path.resolve(__dirname, './queries/*.js'))
  .use(path.resolve(__dirname, './commands/*.js'))
  .start(config.rabbitmq)

server.on('error', error => {
  console.log('server error')
  console.log(error)
})

server.on('ready', () => {
  console.log('server connected')
})
