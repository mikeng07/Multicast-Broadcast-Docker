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