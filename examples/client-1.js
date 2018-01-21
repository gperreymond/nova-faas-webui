const Client = require('nova-faas').Client
const config = require('../server/config')
const client = new Client()

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
  client.request('BasicNopeQuery', {message: 'This is a query'}, (data) => {
    console.log('result', data)
  })
})
