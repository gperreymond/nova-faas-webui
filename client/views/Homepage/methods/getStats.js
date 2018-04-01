export default async function () {
  try {
    if (!this.$root.$nes.id) { return setTimeout(() => { this.getStats() }, 1000) }
    const response = await this.$root.$nes.request('/api/stats').catch(err => {
      throw err
    })
    this.stats.clients = Object.keys(response.payload.Client).map(key => {
      return response.payload.Client[key]
    })
    this.stats.servers = Object.keys(response.payload.Server).map(key => {
      // console.log(response.payload.Server[key].services)
      return response.payload.Server[key]
    })
    setTimeout(() => { this.getStats() }, 1000)
  } catch (err) {
    console.error(err)
  }
}
