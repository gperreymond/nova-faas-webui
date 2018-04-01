const handler = async (request) => {
  try {
    return request.server.app.data
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

module.exports.route = {
  method: 'GET',
  path: '/api/stats',
  handler
}
