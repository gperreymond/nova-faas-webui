const AuthJWT2 = require('hapi-auth-jwt2')
const Bell = require('bell')
const NovaFaas = require('./plugins/NovaFaasPlugin')
const Services = require('./plugins/ServicesPlugin')

const Cache = require('./Cache')
const Server = require('./Server')

const cache = new Cache()
const server = new Server()

server
  .initialize()
  .then(() => {
    return cache.initialize()
  })
  .then(() => {
    return server.cache(cache.getInstance())
  })
  .then(() => {
    return server.register([AuthJWT2, Bell])
  })
  .then(() => {
    return server.strategies()
  })
  .then(() => {
    return server.register([Services, NovaFaas])
  })
  .then(() => {
    return server.start()
  })
  .then(() => {
    console.log('server has just start')
  })
  .catch(error => {
    console.log('***************************')
    console.log(error)
    console.log('***************************')
    process.exit(1)
  })
