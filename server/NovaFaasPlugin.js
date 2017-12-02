const path = require('path')
const NovaFassServer = require('nova-faas').Server

const NovaFaasPlugin = {
  register: function (server, options, next) {
    server.nova = {
      server: new NovaFassServer()
    }
    server.nova.server
      .use(path.resolve(__dirname, 'system/**/*.js'))
      .start()
    server.nova.server.on('error', error => {
      next(error)
    })
    server.nova.server.on('ready', () => {
      next()
    })
  }
}

NovaFaasPlugin.register.attributes = {
  name: 'NovaFaas'
}

module.exports = NovaFaasPlugin
