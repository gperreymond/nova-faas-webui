const path = require('path')
const Server = require('nova-faas').Server
const server = new Server()
const config = require('../../../server/config')

server
  .use(path.resolve(__dirname, './*Command.js'))
  .use(path.resolve(__dirname, './*Query.js'))
  .start(config.rabbitmq)

server.on('error', error => {
  console.log('server error')
  console.log(error)
})

server.on('ready', () => {
  console.log('server connected')
})
