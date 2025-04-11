const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({
    port: 8080,
});

wss.on('connection', (socket) => {
    console.log('Client connected');

    const sendOdds = () => {
        const message = [
            {
                "id": 100010,
                // Odds fall in the 1.00–5.00 range
                "odds": parseFloat((1 + Math.random() * 4).toFixed(2)),
            },
            {
                "id": 100020,
                "odds": parseFloat((1 + Math.random() * 4).toFixed(2)),
            },
        ];

        socket.send(JSON.stringify(message));
    };

    // Send immediately
    sendOdds();

    const interval = setInterval(sendOdds, 10000);

    socket.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    })
});
