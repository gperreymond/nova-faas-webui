import Debug from 'debug'
import getStats from './methods/getStats'

export default {
  name: 'ui-homepage',
  data: function () {
    return {
      stats: {
        servers: [],
        clients: [],
        services: []
      }
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
  },
  mounted: function () {
    this.debug('mounted')
    this.getStats()
  },
  updated: function () {
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: Debug('nova-fass:ui-homepage'),
    getStats
  }
}
