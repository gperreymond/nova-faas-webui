const Hapi = require('hapi')
const Inert = require('inert')
const Nes = require('nes')

const path = require('path')
const debug = require('debug')
const glob = require('glob-promise')
const config = require('./config')

const ServiceBus = require('./plugins/servicebus')

const server = Hapi.server({
  host: config.host,
  port: config.port
})

const start = async () => {
  try {
    server.app.debug = debug('nova-faas:server')
    // declare plugins
    await server.register([Inert, Nes, ServiceBus])
    // declare routes
    const dirpath = path.resolve(__dirname)
    const routes = await glob.sync(`${dirpath}/routes/**/index.js`)
    routes.map(async filepath => {
      let route = require(filepath).route
      server.app.debug(`${route.method}-${route.path} route added`)
      await server.route(route)
    })
    // server initialize
    await server.initialize()
    // server start, but not for tests
    if (require.main === module) {
      await server.start()
      server.app.debug('ready')
    }
  } catch (err) {
    server.app.debug('exit on error: %o', err)
    process.exit(1)
  }
}

start()

module.exports = server
