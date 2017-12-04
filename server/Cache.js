const Catbox = require('catbox')
const CatboxMemory = require('catbox-memory')
const CatboxMemcached = require('catbox-memcached')

const config = require('./config')

class Cache {
  constructor () {
    this.instance = false
  }
  async initialize () {
    switch (config.cache.type) {
      case 'memcached':
        this.instance = new Catbox.Client(CatboxMemcached, config.memcached)
        break
      default:
        this.instance = new Catbox.Client(CatboxMemory)
    }
    await this.instance.start().catch(error => {
      if (error) return Promise.reject(error)
      Promise.resolve()
    })
  }
  getInstance () {
    return this.instance
  }
}

module.exports = Cache
