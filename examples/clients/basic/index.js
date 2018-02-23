const Client = require('nova-faas').Client
const client = new Client()
const config = require('../../../server/config')

client
  .subscribe('BasicNopeQuery.Success', (result) => {
    console.log('success', result)
  })
  .subscribe('BasicNopeQuery.Error', (result) => {
    console.log('error', result)
  })
  .start(config.rabbitmq)

client.on('error', error => {
  console.log('client error')
  console.log(error)
})

client.on('ready', () => {
  console.log('client connected')
  client.send('BasicNopeQuery', {message: 'This is a query from 01'})
})
