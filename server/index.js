const Hapi = require('hapi')
const NovaFaas = require('./NovaFaasPlugin')

const server = new Hapi.Server()
server.connection({
  port: 3000,
  routes: {
    cors: {origin: ['*']}
  }
})
server.register([NovaFaas], (error) => {
  if (error) {
    console.log(error)
    return process.exit(1)
  }
  server.start((error) => {
    if (error) {
      console.log(error)
      return process.exit(1)
    }
    console.log('server started')
  })
})
