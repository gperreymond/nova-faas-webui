const handler = async () => {
  return {
    version: require('../../../package.json').version,
    alive: true,
    environment: process.env.NODE_ENV,
    commit: 'https://github.com/gperreymond/nova-faas-webui/commit/' + (process.env.CIRCLE_SHA1 || 'localhost')
  }
}

module.exports.route = {
  method: 'GET',
  path: '/hc',
  handler
}
