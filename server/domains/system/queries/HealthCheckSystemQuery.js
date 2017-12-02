const Promise = require('bluebird')

const handler = function () {
  return new Promise((resolve, reject) => {
    resolve({hc: 'ALIVE'})
  })
}

module.exports = handler
