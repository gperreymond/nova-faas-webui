const axios = require('axios')
const config = require('../../../../config')

const handler = async (request) => {
  try {
    const response = await axios(`http://${config.rabbitmq.host}:15672/api/connections`, {
      auth: {
        username: config.rabbitmq.user,
        password: config.rabbitmq.pass
      }
    }).catch(err => {
      throw err
    })
    return response.data
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

module.exports.route = {
  method: 'GET',
  path: '/api/rabbitmq/connections',
  handler
}
