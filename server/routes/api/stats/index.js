const servers = async function (request, h) {
  const data = await request.server.inject('/api/servers')
  return data.result
}

const clients = async function (request, h) {
  const data = await request.server.inject('/api/clients')
  return data.result
}

const services = async function (request, h) {
  const data = await request.server.inject('/api/services')
  return data.result
}

const handler = async (request) => {
  try {
    return request.pre
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

module.exports.route = {
  method: 'GET',
  path: '/api/stats',
  config: {
    pre: [[{ method: servers, assign: 'servers' }, { method: clients, assign: 'clients' }, { method: services, assign: 'services' }]]
  },
  handler
}
