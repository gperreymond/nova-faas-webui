const Client = require('nova-faas').Client
const config = require('../server/config')
const client = new Client()

client
  .subscribe('*.Error', (result) => {
    console.log('error', result)
  })
  .subscribe('*.Success', (result) => {
    console.log('success', result)
  })
  .start(config.rabbitmq)

client.on('error', error => {
  console.log('client error')
  console.log(error)
})

client.on('ready', () => {
  console.log('client connected')
})
