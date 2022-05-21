import './App.css';
import * as React from "react";
import {useEffect} from "react";
import WebSocketHandler from "./services/websocket/WebSocketHandler";

function App() {

    const websocketHandler = WebSocketHandler();

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
        websocketHandler.connect();
    }, []);

    return (
        <div className="App">
            {/*<PresentationPage beacon={beacon} orientation={"horizontal"}/>*/}
        </div>
    );
}

export default App;
