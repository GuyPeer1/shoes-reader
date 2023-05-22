

import { httpService } from './http.service.js'
import { generateBarcode } from "../services/rfid.service.js"

export const dataService = {
    query,
    getShoe,
    getShoeStats
}

async function query() {
    try {
        const data = await httpService.get('data')
        return data
    } catch (err) {
        console.log(err)
    }
}

function getShoe(data, RFID) {
    if (RFID.length !== 24) return null
    const columnIndex = data[0].indexOf('barcode')
    const filteredRow = data.find(row => row[columnIndex] === +generateBarcode(RFID))
    // console.log(+generateBarcode(RFID))
    const shoe = { info: [data[0], filteredRow], stats: '' }
    shoe.stats = getShoeStats(shoe.info)
    return shoe
}

function getShoeStats(shoeInfo) {
    //the last stat ['תבנית'] is irrelevant
    const headers = shoeInfo[0].slice(12, 31)
    const values = shoeInfo[1].slice(12, 31)

    const allStats = headers.reduce((result, header, index) => {
        if (values[index] !== null) {
            result.push({ header, value: values[index] })
        }
        return result
    }, [])

    //Determine if it's a sport shoe (length 14) or a leisure shoe (length 8) and create accordingly the final stats array

    if (allStats.length === 14) {
        const stats = [
            {
                id: 1,
                name: 'סוג פעילות',
                data: allStats.slice(0, 3)
            },
            {
                id: 2,
                name: 'משטח',
                data: allStats.slice(3, 6)
            },
            {
                id: 3,
                name: 'מרחק ריצה',
                data: allStats.slice(6, 9)
            },
            {
                id: 4,
                name: 'שיכוך',
                data: allStats.slice(9, 12)
            },
            {
                id: 5,
                name: 'תחרות',
                data: allStats.slice(12, 14)
            }
        ]
        return stats
    }
    else if (allStats.length === 8) {
        const stats = [
            {
                id: 1,
                name: 'סוג פעילות',
                data: allStats.slice(0, 3)
            },
            {
                id: 2,
                name: 'שיפוע עקב',
                data: allStats.slice(3, 6)
            },
            {
                id: 3,
                name: 'שרוכים',
                data: allStats.slice(6, 8)
            }
        ]
        return stats
    } 
}










