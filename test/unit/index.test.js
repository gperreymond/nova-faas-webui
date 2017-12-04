const expect = require('chai').expect
const rewire = require('rewire')

const AuthJWT2 = require('hapi-auth-jwt2')
const Bell = require('bell')

const Server = rewire('../../server/Server')
const Services = rewire('../../server/plugins/ServicesPlugin')

let server = false

describe('[unit] the server', () => {
  beforeEach(done => {
    server = new Server()
    server
      .initialize()
      .then(() => {
        return server.register([AuthJWT2, Bell])
      })
      .then(() => {
        return server.strategies()
      })
      .then(() => {
        return server.register([Services])
      })
      .then(() => {
        done()
      })
      .catch(done)
  })
  it('should response 200 on GET /hc', (done) => {
    const requestDefaults = {
      method: 'GET',
      url: '/hc',
      payload: {}
    }
    server.getInstance().inject(requestDefaults).then(response => {
      expect(response.statusCode).to.equal(200)
      expect(response.result.hc).to.equal('ALIVE')
      done()
    }).catch(done)
  })
  it('should response 302 on POST /auth/google', (done) => {
    const requestDefaults = {
      method: 'POST',
      url: '/auth/google',
      payload: {}
    }
    server.getInstance().inject(requestDefaults).then(response => {
      expect(response.statusCode).to.equal(302)
      done()
    }).catch(done)
  })
  it('should response 302 on GET /auth/google', (done) => {
    const requestDefaults = {
      method: 'GET',
      url: '/auth/google',
      payload: {}
    }
    server.getInstance().inject(requestDefaults).then(response => {
      expect(response.statusCode).to.equal(302)
      done()
    }).catch(done)
  })
})
