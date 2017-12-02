const standard = require('mocha-standard')

describe('code style', function () {
  it('should be conforms to standard', standard.files([
    'test/**/*.js',
    'server/**/*.js'
  ]))
})
