
import * as XLSX from "xlsx"
import dataFile from '../assets/data.xlsx'
import { generateBarcode } from "../services/rfid.service.js"

export const dataService = {
    loadData,
    getShoe,
}

async function loadData() {
    try {
      const response = await fetch(dataFile)
      const blob = await response.blob()
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          const binaryStr = event.target.result
          const workbook = XLSX.read(binaryStr, { type: "binary" })
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
          resolve(rows)
        }
        reader.onerror = (error) => {
          reject(error)
        }
        reader.readAsBinaryString(blob)
      })
    } catch (error) {
      console.log("Error while fetching data: ", error)
      throw error
    }
  }

  function getShoe(data, RFID) {
    if (RFID.length !== 24) return null
    const columnIndex = data[0].indexOf('barcode')
    const filteredRow = data.find(row => row[columnIndex] === +generateBarcode(RFID))
    // console.log(+generateBarcode(RFID))
    const shoe = [data[0], filteredRow]
    return shoe
}
  




