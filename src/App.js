import './App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ShowcaseComponent from "./ShowcaseComponent";
const mqtt = require('mqtt/dist/mqtt');

function App() {
    const [beacon, setBeacon] = useState({})
    const [beaconTime, setBeaconTime] = useState(new Date())
    const [tick, setTick] = useState(1)

    // useEffect(() => {
    //     let secondsBetween = (new Date().getTime() - beaconTime.getTime()) / 1000;
    //
    //     if (secondsBetween > 5) {
    //         setBeacon(null)
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[tick])

    // useEffect(() => {
    //     setInterval(() => {
    //         setTick(Math.random);
    //     }, 1000)
    //
    //     const host = 'ws://10.0.4.10:8080'
    //     const topic = ['0462/rpi3/beacon']
    //
    //     const mqttOptions = {
    //         clientId: 'SD' + Math.random().toString(16),
    //         protocolId: 'MQTT',
    //         protocolVersion: 4,
    //         username: 'anchor',
    //         password: 'BLEtracker',
    //         reconnect: true,
    //         reconnectPeriod: 1000,
    //         keepAlive: 30,
    //         clean: true,
    //         rejectUnauthorized: false
    //     }
    //     const mqttClient = mqtt.connect(host, mqttOptions)
    //
    //     mqttClient.on('connect', () => {
    //         console.log('Mqtt connected.')
    //         mqttClient.subscribe(topic, () => {
    //             console.log(`Subscribed to topic '${topic}'`)
    //         })
    //     })
    //
    //     mqttClient.on("error", (error) => {
    //         console.log("Can't connect" + error);
    //         process.exit(1)
    //     });
    //
    //     mqttClient.on('message', (topic, payload) => {
    //         const msg = JSON.parse(payload.toString())
    //         console.log(msg)
    //         setBeaconTime(new Date())
    //         setBeacon(msg);
    //     })
    //
    //     mqttClient.on('close', () => {
    //         console.log('MQTT disconnected')
    //     })
    // }, [])

    useEffect(() => {
        let socket = SockJS("http://localhost:9000/curated-shopping");
        let stompClient = Stomp.over(socket);

        stompClient.connect({}, (sock) => {
            console.log("Connected to STOMP socket: " + sock)

            stompClient.subscribe('presentation/uuid', (uuid) => {
                console.log("UUID: " + uuid + " received")
            })
            console.log("Subscribed to topic")
        })

    }, []);

    return (
        <div className="App">
            {/*<ShowcaseComponent beacon={beacon} orientation={"horizontal"}/>*/}
        </div>
    );
}

export default App;
