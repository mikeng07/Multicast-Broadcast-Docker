const net = require("node:net");

const clients = [];

// create the server and listen for client events
const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // push client to array
  clients.push(socket);

  // event for client disconnect
  socket.on("end", () => {
    console.log(
      `Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`
    );

    // delete client from array
    clients.splice(clients.indexOf(socket), 1);
  });

  // event received from client data
  socket.on("data", (data) => {
    console.log(data.toString());

    // broadcast to all clients
    broadcast(data.toString());
  });
});

// write data to all clients
function broadcast(data) {
  clients.forEach((client) => {
    client.write(data);
  });
}

// ip for listening to any address
const HOST = "0.0.0.0";
const PORT = 3001;

// listen for client connections
server.listen(PORT, HOST, () => {
  console.log(` TCP server running on ${HOST}:${PORT}`);
});