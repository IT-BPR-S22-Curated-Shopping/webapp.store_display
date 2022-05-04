import './App.css';
import * as React from "react";
import {useEffect} from "react";

function App() {
    // const [tick, setTick] = useState(1)

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
    // }, [])

    useEffect(() => {
        let webSocket = new WebSocket('ws://localhost:9000/presentation');
        webSocket.onmessage = function (payload) {
            console.log(payload.data)
        }

        webSocket.addEventListener('open', function (event) {
            webSocket.send("Callback from presentation device");
        });

    }, []);

    return (
        <div className="App">
            {/*<ShowcaseComponent beacon={beacon} orientation={"horizontal"}/>*/}
        </div>
    );
}

export default App;
