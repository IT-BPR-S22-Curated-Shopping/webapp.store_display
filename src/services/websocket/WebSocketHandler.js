import RecommendationParser from '../../util/RecommendationParser';

function WebSocketHandler() {
    let locationId = null;
    let webSocket = null;
    const reconnectTime = 5000;
    let recommendationParser = new RecommendationParser();
    let onRecommendationCallback = () => {};
    let onInitialProductCallback = () => {};

    const connect = (id) => {
        if (webSocket == null) {
            console.log('Connecting to location ' + id + '...');
            webSocket = new WebSocket(process.env['REACT_APP_BASE_URL']);
            locationId = id;

            webSocket.onopen = onOpen;
            webSocket.onclose = onClose;
            webSocket.onmessage = onMessage;
        }
    };

    const onMessage = (payload) => {
        if (recommendationParser.parseData(payload).sessionId) {
            console.log('initial product received.');
            console.log(recommendationParser.parseData(payload));
            onInitialProductCallback(recommendationParser.parseData(payload));
        } else {
            onRecommendationCallback(recommendationParser.parseRecommendation(payload.data));
        }
    };

    const onOpen = () => {
        console.log('Connection established. Querying for product to display.');
        webSocket.send('Location ID: ' + locationId);
        setInterval(() => {
            webSocket.send('Location ID ' + locationId);
        }, 40000);
    };

    const onClose = () => {
        webSocket = null;
        setTimeout(() => reconnect(), reconnectTime);
        console.log('Connection closed.');
    };

    const reconnect = () => {
        console.log('Trying to reconnect...');
        connect(locationId);
    };

    const setCallbacks = (recommendationCallback, initialProductCallback) => {
        onRecommendationCallback = recommendationCallback;
        onInitialProductCallback = initialProductCallback;
    }

    return {connect, setCallbacks};
}

export default WebSocketHandler;