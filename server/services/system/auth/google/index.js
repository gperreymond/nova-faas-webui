const jwt = require('jsonwebtoken')
const Boom = require('boom')

const config = require('../../../../config')

const handler = async function (request, reply) {
  try {
    const ttl = 24 * 60 * 60 * 1000
    if (!request.auth.isAuthenticated) return reply(Boom.unauthorized('Authentication failed due to: ' + request.auth.error.message))
    const data = jwt.decode(request.auth.artifacts.id_token)
    if (data.email !== config.accounts.admin.email) return reply(Boom.unauthorized('Authentication failed due to: email is not authorize'))
    const email = request.auth.credentials.profile.email
    const payload = {
      urn: 'urn:plugin:admin:user:' + email,
      scope: 'admin',
      iss: data.iss,
      email: data.email,
      name: data.name,
      picture: data.picture
    }
    const key = { id: payload.urn, segment: 'account' }
    await request.server.nova.cache.set(key, payload, ttl).catch(error => { throw error })
    const token = jwt.sign(payload, config.auth.jwt2.secret)
    reply({token}).state(config.auth.cookie.name, token, { path: '/', domain: config.auth.cookie.domain, ttl, isSecure: false, isHttpOnly: false, isSameSite: false }).redirect(config.auth.redirect)
  } catch (e) {
    return reply(Boom.boomify(e))
  }
}

module.exports = handler
