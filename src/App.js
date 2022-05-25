import './App.css';
import * as React from "react";
import WebSocketHandler from "./services/websocket/WebSocketHandler";
import {Route, Routes} from 'react-router-dom';
import PresentationPage from "./pages/PresentationPage";

function App() {

    const websocketHandler = WebSocketHandler();

    return (
        <Routes>
            <Route path="/presentation" element={<PresentationPage webSocketHandler={websocketHandler}/>}/>
            <Route path="/presentation/:locationId" element={<PresentationPage webSocketHandler={websocketHandler} />}/>
        </Routes>
    );
}

export default App;
