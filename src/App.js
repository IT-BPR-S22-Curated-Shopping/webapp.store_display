import './App.css';
import ShowcaseComponent from "./components/ShowcaseComponent";

const mqtt = require( 'mqtt/dist/mqtt');

function App() {
    const mqttOptions = {
        clientId: 'SD' + Math.random().toString(16),
        protocolId: 'MQTT',
        protocolVersion: 4,
        username: 'anchor',
        password: 'BLEtracker',
        reconnect: true,
        reconnectPeriod: 1000,
        keepAlive: 30,
        clean: true,
        rejectUnauthorized: false
    }
    const host = 'ws://10.0.4.10:8080'
    const topic = ['RPI/3']

    const mqttClient = mqtt.connect(host, mqttOptions)

    let beacon;

    mqttClient.on('connect', () => {
        console.log('Mqtt connected.')
        mqttClient.subscribe(topic, () => {
            console.log(`Subscribed to topic '${topic}'`)
        })
    })

    mqttClient.on("error", (error) => {
        console.log("Can't connect" + error);
        process.exit(1)
    });

    mqttClient.on('message', (topic, payload) => {
        const msg = JSON.parse(payload.toString())
        switch (msg.beaconType) {
            case 'iBeacon':
                checkBeacon(msg)
                beacon = msg;
                break
            default:
                break
        }
       // console.log('Received Message:= ' + payload.toString() + '\nOn topic:= ' + topic)
    })

    mqttClient.on('close', () => {
        console.log('MQTT disconnected')
    })

    const checkBeacon = (beacon) => {
        if (beacon.rssi > -60) {

            document.getElementById('beacon').innerText = `Closest beacon: ${beacon.iBeacon.uuid}`
        }
        else
        {
            document.getElementById('beacon').innerText = `Closest beacon: None`
        }
        console.log(beacon)
    }

    return (
        <div className="App">
            <header className="App-header">
            <ShowcaseComponent beacon={{rssi: -45,iBeacon: {uuid: "010d2108-0462-4f97-bab8-000000000003"}}}/>
            </header>
        </div>
    );
}

export default App;
