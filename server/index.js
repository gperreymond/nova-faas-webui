const Hapi = require('hapi')
const NovaFaas = require('./plugins/NovaFaasPlugin')
const Services = require('./plugins/ServicesPlugin')

const server = new Hapi.Server()
server.connection({
  port: 3000,
  routes: {
    cors: {origin: ['*']}
  }
})

let plugins = [Services]
if (!module.parent) {
  plugins.push(NovaFaas)
}

server.register(plugins, (error) => {
  if (error) {
    console.log(error)
    return process.exit(1)
  }
  if (!module.parent) {
    server.start((error) => {
      if (error) {
        console.log(error)
        return process.exit(1)
      }
      console.log('server started')
    })
  }
})

module.exports = server
