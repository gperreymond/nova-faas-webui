const expect = require('chai').expect
const server = require('../../../server')

describe('[unit] the server', () => {
  it('should response health check', (done) => {
    const requestDefaults = {
      method: 'GET',
      url: '/hc',
      payload: {}
    }
    server.inject(requestDefaults).then(response => {
      expect(response.statusCode).to.equal(200)
      expect(response.result.hc).to.equal('ALIVE')
      done()
    }).catch(done)
  })
})
