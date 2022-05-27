import './App.css';
import * as React from 'react';
import WebSocketHandler from './services/websocket/WebSocketHandler';
import {Route, Routes} from 'react-router-dom';
import PresentationPage from './pages/PresentationPage';
import PresentationPage2 from './pages/PresentationPage2';
import {useEffect, useState} from 'react';


function App() {

    const websocketHandler = WebSocketHandler();
    return (
        <Routes>
            <Route path="/" element={<PresentationPage webSocketHandler={websocketHandler}/>}/>
            <Route path="/presentation/:locationId" element={<PresentationPage webSocketHandler={websocketHandler}/>}/>
            <Route path="/presentation/:locationId/layout/2" element={<PresentationPage2 webSocketHandler={websocketHandler}/>}/>
        </Routes>
    );
}

export default App;
