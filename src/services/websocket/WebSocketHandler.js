function WebSocketHandler() {

    const connect = () => {
        let webSocket = new WebSocket('wss://curatedbackend.herokuapp.com/presentation');
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