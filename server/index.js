const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')
const debug = require('debug')
const glob = require('glob-promise')
const Client = require('nova-faas').Client

const config = require('./config')

const server = Hapi.server({
  host: config.host,
  port: config.port
})

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
  debug('nova-faas:client')('ready')
})

const start = async () => {
  try {
    // declare plugins
    await server.register([Inert])
    // declare routes
    const dirpath = path.resolve(__dirname)
    const routes = await glob.sync(`${dirpath}/routes/**/index.js`)
    routes.map(async filepath => {
      let route = require(filepath).route
      debug(`nova-faas:server:routes:${route.method}`)(`${route.path} route added`)
      await server.route(route)
    })
    // server initialize
    await server.initialize()
    // server start, but not for tests
    if (require.main === module) {
      await server.start()
      debug('nova-faas:server')('ready')
    }
  } catch (err) {
    debug('nova-faas:server')('exit on error: %o', err)
    process.exit(1)
  }
}

start()

module.exports = server
