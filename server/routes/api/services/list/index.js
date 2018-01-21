const axios = require('axios')
const config = require('../../../../config')

const handler = async (request) => {
  try {
    const response = await axios(`http://${config.rabbitmq.host}:15672/api/queues`, {
      auth: {
        username: config.rabbitmq.user,
        password: config.rabbitmq.pass
      }
    }).catch(err => {
      throw err
    })
    let queues = []
    response.data.map(queue => {
      switch (true) {
        case queue.name.split('.').length === 3:
        case queue.name.match(/__System.Client/) !== null:
        case queue.name.match(/__System.Server/) !== null:
          break
        default:
          queues.push({
            name: queue.name,
            consumers: queue.consumers
          })
      }
    })
    return queues
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

module.exports.route = {
  method: 'GET',
  path: '/api/services',
  handler
}
