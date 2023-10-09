# Project 1: A Bite of Distributed Communication

# Description
Use NodeJs and Docker to build a distributed system comprising one server and four clients. Connect them via different ports. The Server and Clients will communicate via Broadcast and Multicast Protocol. 

# Intall node
Install nodeJs from Homebrew:

``` brew install node ```

Initialize node on the project directory:

```npm install -y```

# Implementing Broadcasting
1. Build the server.js for broadcasting
2. Build the client.js for broadcasting

# Implementing Multicasting
1. Build the server.js for multicasting
2. Build the client.js for multicasting
   
# Building Docker Server
1. Build server:
```
docker build -t server
```
2. Build Client:
```
docker build -t client1 ./client && docker build -t client2 ./client && docker build -t client3 ./client && docker build -t client4 ./client
```
3. Build Network:
```
docker network create project 
```
4. Run Server:
```
docker run --name server --network project server
```
5. Run Client:
```
docker run --network project client1 && run --network project client2 && docker run --network project client3 && docker run --network project client4
```
6. Stop Server:
```
docker stop server
docker rm server
```
