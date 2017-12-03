import Debug from 'debug'
import authGoogle from './methods/authGoogle'

export default {
  name: 'ui-login',
  data: function () {
    return {
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
  },
  mounted: function () {
    this.debug('mounted')
  },
  updated: function () {
    this.debug('updated')
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: Debug('nova-fass:ui-login'),
    authGoogle
  }
}
