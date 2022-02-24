import logo from './logo.svg';
import './App.css';

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
            <img src={logo} className="App-logo" alt="logo" />
            <p id='beacon' >
                Closest beacon: None
            </p>
            </header>
        </div>
    );
}

export default App;
