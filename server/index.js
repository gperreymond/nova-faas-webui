const Hapi = require('hapi')

const Catbox = require('catbox')
const CatboxMemory = require('catbox-memory')
const CatboxMemcached = require('catbox-memcached')

const AuthJWT2 = require('hapi-auth-jwt2')
const Bell = require('bell')
const NovaFaas = require('./plugins/NovaFaasPlugin')
const Services = require('./plugins/ServicesPlugin')

const config = require('./config')

const server = new Hapi.Server()
server.connection({
  port: 3000,
  routes: {
    cors: {origin: ['*']}
  }
})

const startCache = async function () {
  switch (config.cache.type) {
    case 'memcached':
      server.cache = new Catbox.Client(CatboxMemcached, config.memcached)
      break
    default:
      server.cache = new Catbox.Client(CatboxMemory)
  }
  await server.cache.start().catch(error => {
    console.log(error)
    return process.exit(1)
  })
  startServer()
}

const startServer = function () {
  // plugins before
  server.register([AuthJWT2, Bell], (error) => {
    if (error) {
      console.log(error)
      return process.exit(1)
    }
    // auth google
    server.auth.strategy('google', 'bell', {
      provider: 'google',
      password: config.auth.cookie.password,
      isSecure: false,
      clientId: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret,
      location: config.auth.google.location
    })
    // auth jwt2
    server.auth.strategy('jwt', 'jwt', {
      key: config.auth.jwt2.secret,
      verifyOptions: { algorithms: [ 'HS256' ] },
      validateFunc: function (decoded, request, callback) {
        callback(null, true)
      },
      errorFunc: function (errorContext) {
        return errorContext
      }
    })
    // plugins after
    server.register([Services, NovaFaas], (error) => {
      if (error) {
        console.log(error)
        return process.exit(1)
      }
      // start
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
  })
}

startCache()

module.exports = server
