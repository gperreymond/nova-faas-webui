import Nes from 'nes/client'

function install (Vue, options) {
  Vue.mixin({
    beforeCreate () {
      if (this.$root.$nes) { return false }
      this.$root.$nes = new Nes.Client(options.url)
      this.$root.$nes.connect().catch(e => {
        console.log(e)
      })
    }
  })
}

export default install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
  if (install.installed) {
    install.installed = false
  }
}
