const dataService = require('./data.service.js')
const logger = require('../../services/logger.service')
const { downloadData } = require('./data.service.js')

module.exports = {
  getData
}

// When the system is rebooting - download updated data file
// downloadData()
//   .then((filePath) => {
//       console.log('File downloaded successfully:', filePath)
//   })
//   .catch((err) => {
//     console.error('Error downloading the file from controller:', err)
//   })

async function getData(req, res) {
  try {
    logger.debug('Getting Data')
    const data = await dataService.query()
    res.json(data)
  } catch (err) {
    logger.error('Failed to get data', err)
    res.status(500).send({ err: 'Failed to get data' })
  }
}
