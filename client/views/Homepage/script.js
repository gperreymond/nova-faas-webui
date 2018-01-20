import Debug from 'debug'
import getConnections from './methods/connections'

export default {
  name: 'ui-homepage',
  data: function () {
    return {
      stats: {
        connections: []
      }
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
  },
  mounted: function () {
    this.debug('mounted')
    this.getConnections()
  },
  updated: function () {
    this.debug('updated')
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: Debug('nova-fass:ui-homepage'),
    getConnections
  }
}
