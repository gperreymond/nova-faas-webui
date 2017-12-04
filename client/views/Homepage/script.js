import Debug from 'debug'

export default {
  name: 'ui-homepage',
  data: function () {
    return {
      credentials: false
    }
  },
  beforeMount: function () {
    this.debug('beforeMount')
  },
  mounted: function () {
    this.debug('mounted')
    this.credentials = this.$route.meta.credentials
  },
  updated: function () {
    this.debug('updated')
  },
  destroyed: function () {
    this.debug('destroyed')
  },
  methods: {
    debug: Debug('nova-fass:ui-homepage')
  }
}
