import './App.css';
import * as React from "react";
import {useEffect} from "react";
import WebSocketHandler from "./services/websocket/WebSocketHandler";
import {Route, Routes, useNavigate} from 'react-router-dom';
import PresentationPage from "./pages/PresentationPage";

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
        <Routes>
            <Route path="/presentation" element={
                <PresentationPage

                />
            } />
            <Route path="/presentation/:companyId/:productId" element={
                <PresentationPage

                />
            } />
        </Routes>
    );
}

export default App;
