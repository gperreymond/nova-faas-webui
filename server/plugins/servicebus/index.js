const Hoek = require('hoek')
const config = require('../../config')
const servicebus = require('servicebus')

const plugin = {
  name: 'servicebus',
  version: '1.0.0',
  $hc: function (server) {
    // Client timeout ?
    Object.keys(server.app.data.Client).map(key => {
      const datetime = Date.now()
      const delta = datetime - server.app.data.Client[key].datetime
      if (delta > 1000) { delete server.app.data.Client[key] }
    })
    // Server timeout ?
    Object.keys(server.app.data.Server).map(key => {
      const datetime = Date.now()
      const delta = datetime - server.app.data.Server[key].datetime
      if (delta > 1000) { delete server.app.data.Server[key] }
    })
    setTimeout(() => {
      this.$hc(server)
    }, 1000)
  },
  register: async function (server, options = {}) {
    Hoek.assert(server, '[servicebus] Server is mandatory')
    server.app.data = { Client: {}, Server: {} }
    server.app.servicebus = servicebus.bus({
      user: config.rabbitmq.user,
      password: config.rabbitmq.pass,
      host: config.rabbitmq.host,
      port: config.rabbitmq.port
    })
    server.app.servicebus.on('error', (err) => {
      server.app.debug('servicebus on error: %o', err)
    })
    server.app.servicebus.on('ready', () => {
      server.app.debug('servicebus connected')
      server.app.servicebus.subscribe('__System.Nova.HealthCheck', (data) => {
        data.datetime = Date.now()
        server.app.data[data.type][data.uuid] = data
      })
    })
    this.$hc(server)
  }
}

module.exports = plugin
