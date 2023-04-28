import React, { useState, useEffect } from "react"
import { ShoeInfo } from '../cmps/shoe-info.jsx'

import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service'
import video from '../assets/video.mp4'

export function HomePage() {
    //The app first render will be with the next RFID:
    const [data, setData] = useState()
    const [rfid, setRfid] = useState('')
    const [shoe, setShoe] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await dataService.loadData()
                setData(data)
            } catch (error) {
                console.error("Error occurred while fetching data:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (rfid) {
            const shoe = dataService.getShoe(data, rfid)
            if (shoe !== shoe) setShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)
        }
    }, [rfid])

    useEffect(() => {
        let rfidTimer = null

        function resetRfid() {
            setRfid('')
            setShoe(null)
            clearTimeout(rfidTimer)
        }

        function handleRFIDChange(value, rfidType) {
            if (value.length === 24 && rfidType === 'first') {
                setRfid(value)
                clearTimeout(rfidTimer)
                rfidTimer = setTimeout(resetRfid, 3000) // Reset after 3 seconds of no events
            }
        }

        socketService.on('rfid', (rfidTag) => {
            handleRFIDChange(rfidTag, 'first')
        })

        return () => {
            clearTimeout(rfidTimer)
        }
    }, [])

    return (

        <section className='home-page'>
            <video autoPlay loop muted>
                <source src={video} type="video/mp4" />
            </video>
            <ShoeInfo/>
        </section>

    )

}
