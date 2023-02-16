const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

// Keep track of connected clients
const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);
    console.log('Client connected');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Echo the message back to the client
        socket.send(`You said: ${message}`);

        // Broadcast the new message to all connected clients
        clients.forEach((client) => {
        });
        
        clients.forEach((id, client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
          });

    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on port 8080');
