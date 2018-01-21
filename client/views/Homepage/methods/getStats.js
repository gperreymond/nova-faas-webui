import axios from 'axios'

export default async function () {
  try {
    const response = await axios('/api/stats').catch(err => {
      throw err
    })
    this.stats = response.data
    setTimeout(() => { this.getStats() }, 1000)
  } catch (err) {
    console.error(err)
  }
}
