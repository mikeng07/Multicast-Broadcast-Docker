# Project 1: A Bite of Distributed Communication

# Description
Use NodeJs and Docker to build a distributed system comprising one server and four clients. Connect them via different ports. The Server and Clients will communicate via Broadcast and Multicast Protocol. 

# Intall node
Install nodeJs from Homebrew:

``` brew install node ```

Initialize node on the project directory:

```npm install -y```

# Implementing Broadcasting
Build the server.js:

```
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
```

Build client.js:
```
const net = require("node:net");

// client connects to server using Docker server container and port 3001
const client = net.connect(
  {
    port: 3001,
    host: "server",
  },
  () => {
    console.log("Connected to server");
    client.write("hello from client");
    client.end();
  }
);

// event from server to client
client.on("data", (data) => {
  console.log(`Message from master server: ${data.toString()}`);
});

// event from client to server
client.on("end", () => {
  console.log("Disconnected from server");
});
```
# Building Docker
Build Dockerfile for client:
```
FROM node:18

WORKDIR /app/client

COPY ./client.js ./

CMD ["node", "client.js"]
```

Build Dockerfile for server:
```
FROM node:18

WORKDIR /app

COPY package.json ./

COPY ./server.js ./

EXPOSE 3001

CMD [ "npm", "start" ]
```


Building Docker Server:
```
docker build -t server . 
docker build -t client ./client 
docker network create project 
docker run --name server --network project server
docker run --name client --network project client
```
Stopping server:
```
docker stop server
docker rm server
```

