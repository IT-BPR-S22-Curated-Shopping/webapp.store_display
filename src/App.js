import './App.css';
import * as React from "react";
import {useEffect, useState} from "react";
import ShowcaseComponent from "./ShowcaseComponent";
//const mqtt = require('mqtt/dist/mqtt');

function App() {
    const [beacon, setBeacon] = useState({})
    // const [beaconTime, setBeaconTime] = useState(new Date())
    // const [tick, setTick] = useState(1)
    //
    // useEffect(() => {
    //     let secondsBetween = (new Date().getTime() - beaconTime.getTime()) / 1000;
    //
    //     if (secondsBetween > 5) {
    //         setBeacon(null)
    //     }
    // },[beaconTime, tick]) // Beacon time add for CI - JN
    //
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

    return (
        <div className="App">
            <ShowcaseComponent beacon={beacon} orientation={"horizontal"}/>
        </div>
    );
}

export default App;
