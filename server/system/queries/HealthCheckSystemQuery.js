const Promise = require('bluebird')

const handler = function () {
  return new Promise((resolve, reject) => {
    console.log(this)
    resolve({hc: 'ALIVE'})
  })
}

module.exports = handler
