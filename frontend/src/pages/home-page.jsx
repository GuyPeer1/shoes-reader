import React, { useState, useEffect } from "react"
import { ShoeInfo } from '../cmps/shoe-info.jsx'

import { dataService } from '../services/data.service.js'
import { socketService } from '../services/socket.service'
import video from '../assets/video.mp4'

export default function HomePage() {
    //RFID sample:
    //7630040511865
    const [data, setData] = useState()
    const [rfid, setRfid] = useState('')
    const [shoe, setShoe] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await dataService.query()
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
            setShoe(prevShoe => ({ ...prevShoe, ...shoe }) || null)
        }
    }, [rfid])

    useEffect(() => {
        let rfidTimer = null

        function resetRfid() {
            setRfid('')
            setShoe(null)
            clearTimeout(rfidTimer)
        }

        function handleRFIDChange(value) {
            if (value.length === 24) {
                setRfid(value)
                clearTimeout(rfidTimer)
                rfidTimer = setTimeout(resetRfid, 2000) // Reset after 2 seconds of no events
            }
        }

        socketService.on('rfid', (rfidTag) => {
            handleRFIDChange(rfidTag)
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
            {shoe !== null && <ShoeInfo shoe={shoe} />}
        </section>
    )

}
