import axios from 'axios'

export default async function () {
  try {
    const response = await axios('/api/rabbitmq/connections').catch(err => {
      throw err
    })
    this.stats.connections = response.data
    // setTimeout(() => { this.getConnections() }, 1000)
  } catch (err) {
    console.error(err)
  }
}
