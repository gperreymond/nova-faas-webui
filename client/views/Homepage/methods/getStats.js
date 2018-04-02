export default async function () {
  try {
    if (!this.$root.$nes.id) { return setTimeout(() => { this.getStats() }, 1000) }
    const response = await this.$root.$nes.request('/api/stats').catch(err => {
      throw err
    })
    this.stats.services = []
    this.stats.clients = Object.keys(response.payload.Client).map(key => {
      return response.payload.Client[key]
    })
    this.stats.servers = Object.keys(response.payload.Server).map(key => {
      response.payload.Server[key].services.map(service => {
        const found = this.stats.services.findIndex(element => {
          return element.name === service
        })
        if (found === -1) {
          this.stats.services.push({name: service, consumers: 1})
        } else {
          this.stats.services[found].consumers += 1
        }
      })
      return response.payload.Server[key]
    })
    setTimeout(() => { this.getStats() }, 1000)
  } catch (err) {
    console.error(err)
  }
}
