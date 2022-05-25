function WebSocketHandler() {

    let webSocket;

    const connect = () => {
        webSocket = new WebSocket('ws://localhost:9000/presentation')

        webSocket.addEventListener('open', function (event) {
            console.log("Connection established")
            webSocket.send("Presentation device connected");
        });
    }

    const announceLocation = (id, callback) => {
        if (id !== 0) {
            webSocket.addEventListener('open', function (event) {
                setInterval(() => {
                    webSocket.send("Location ID " + id);
                }, 40000);
            })

            webSocket.onmessage = function (payload) {
                callback(payload.data)
            }
        }
    }

    return {connect, announceLocation}
}


export default WebSocketHandler;