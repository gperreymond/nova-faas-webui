const nconf = require('nconf')

nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  accounts: {
    admin: {
      email: nconf.get('NOVA_ADMIN_EMAIL') || 'gperreymond@gmail.com'
    }
  },
  cache: {
    type: nconf.get('NOVA_CACHE_TYPE') || 'memory'
  },
  auth: {
    redirect: nconf.get('NOVA_AUTH_REDIRECT') || 'http://platform.nova.local.net/login',
    cookie: {
      domain: nconf.get('NOVA_COOKIE_DOMAIN') || 'nova.local.net',
      name: 'rememberMe',
      password: nconf.get('NOVA_COOKIE_PASSWORD') || 'yjZt6aLnMt4cRSGXT6HAQ5FDbSkAMVsVNrC6w4mfSjMcKPxgJS'
    },
    google: {
      clientId: nconf.get('NOVA_GOOGLE_CLIENT_ID') || false,
      clientSecret: nconf.get('NOVA_GOOGLE_CLIENT_SECRET') || false,
      location: nconf.get('NOVA_GOOGLE_LOCATION') || 'http://api.nova.local.net'
    },
    jwt2: {
      secret: nconf.get('NOVA_JWT2_SECRET') || 'Xc45GvnvB4NSvTQ5BaAz5DHKM9DzEDknxufBTa3wNZnEVJaeRV'
    }
  },
  memcached: {
    host: nconf.get('NOVA_MEMCACHED_HOST') || 'localhost',
    port: nconf.get('NOVA_MEMCACHED_PORT') || 11211
  }
}
