function WebSocketHandler() {

    const connect = () => {
        let webSocket = new WebSocket('ws://localhost:9000/presentation');
        webSocket.onmessage = function (payload) {
            console.log(payload.data)
        }

        webSocket.addEventListener('open', function (event) {
            console.log("Connection established")
            webSocket.send("Callback from presentation device");
        });

        setInterval(() => {
            webSocket.send("Heartbeat")
        }, 4000);
    }

    return {connect}
}


export default WebSocketHandler;