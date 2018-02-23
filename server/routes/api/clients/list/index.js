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
    let servers = []
    response.data.map(queue => {
      if (queue.name.match(/__System.Nova.Client/)) {
        servers.push({
          uuid: queue.name.split('.')[3],
          queue: queue.name
        })
      }
    })
    return servers
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

module.exports.route = {
  method: 'GET',
  path: '/api/clients',
  handler
}
