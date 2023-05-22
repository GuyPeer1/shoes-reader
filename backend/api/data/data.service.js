const path = require('path')
const XLSX = require("xlsx")
const fs = require('fs')
const axios = require('axios')
const logger = require('../../services/logger.service')

module.exports = {
  query,
  // downloadData
}

// Download the updated excel file
// async function downloadData() {
//   const fileUrl = 'https://docs.google.com/spreadsheets/d/15vS3cZnJKfSOs5b3FWZZ-ZRwdWn5dbNm/export?format=xlsx'
//   const filePath = path.join(__dirname, 'data.xlsx')

//   try {
//     const response = await axios({
//       url: fileUrl,
//       method: 'GET',
//       responseType: 'stream',
//     })

//     const fileStream = fs.createWriteStream(filePath)

//     response.data.pipe(fileStream)

//     return new Promise((resolve, reject) => {
//       fileStream.on('finish', () => {
//         console.log('File downloaded successfully:', filePath)
//         resolve(filePath)
//       })

//       fileStream.on('error', (err) => {
//         reject(err)
//       })
//     })
//   } catch (err) {
//     throw new Error('Error downloading the file from service:', err)
//   }
// }

const dataFile = path.join(__dirname, 'data.xlsx')

async function query() {
  try {
    const workbook = XLSX.readFile(dataFile)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    logger.info(`Successfully read ${rows.length} rows from data file.`)
    return rows
  } catch (err) {
    logger.error(`Error while reading data: ${err.message}`)
    throw err
  }
}



