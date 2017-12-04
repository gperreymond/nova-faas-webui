const Boom = require('boom')

const handler = function (request, reply) {
  if (!request.auth.isAuthenticated) return reply(Boom.unauthorized('Authentication failed due to: ' + request.auth.error.message))
  reply({credentials: request.auth.credentials})
}

module.exports = handler
