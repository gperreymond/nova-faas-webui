const Hapi = require('hapi')
const config = require('./config')

class Server {
  constructor () {
    this.instance = false
  }
  initialize () {
    return new Promise(resolve => {
      this.instance = new Hapi.Server()
      this.instance.connection({
        host: '0.0.0.0',
        port: 3000,
        routes: {
          cors: {origin: ['*']}
        }
      })
      resolve()
    })
  }
  cache (value) {
    return new Promise((resolve) => {
      this.instance.nova = {
        cache: value
      }
      resolve()
    })
  }
  register (plugins) {
    return new Promise((resolve, reject) => {
      this.instance.register(plugins, error => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
  strategies () {
    return new Promise(resolve => {
      // auth google
      this.instance.auth.strategy('google', 'bell', {
        provider: 'google',
        password: config.auth.cookie.password,
        isSecure: false,
        clientId: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        location: config.auth.google.location
      })
      // auth jwt2
      this.instance.auth.strategy('jwt', 'jwt', {
        key: config.auth.jwt2.secret,
        verifyOptions: { algorithms: [ 'HS256' ] },
        validateFunc: function (decoded, request, callback) {
          callback(null, true)
        },
        errorFunc: function (errorContext) {
          return errorContext
        }
      })
      resolve()
    })
  }
  start () {
    return new Promise((resolve, reject) => {
      this.instance.start(error => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
  getInstance () {
    return this.instance
  }
}

module.exports = Server
