const modbus = require('jsmodbus');
const net = require('net');
const netServer = new net.Server();
const holding = Buffer.alloc(10000);
const server = new modbus.server.TCP(netServer, {
  holding: holding
});

/*
Configure simulated data.
Each Modbus value is 16 bits (2 bytes).
The temperature and humidity are multiplied by 10 to provide one decimal place.
The addresses and values are designed to mimic this sensor:
  https://www.amazon.com/dp/B078NRYBVZ

Address 2 represents whether or not the equipment is running.
All three addresses can be written to change their values.
*/
server.holding.writeUInt16BE(237, 0); // Address 0: temperature * 10
server.holding.writeUInt16BE(441, 2); // Address 1: humidity * 10
server.holding.writeUInt16BE(1, 4); // Address 2: running (0 or 1)

/*
Occurs when a client connects.
Prints the IP address of the remote client.
*/
server.on('connection', (client) => {
  console.log(`Client connected: ${client._socket.remoteAddress}`);
});

server.on('error', (err) => {
  console.log('Error');
  console.log(err);
});

/*
Occurs when holding registers are read.
Prints the address and length of the read request.
*/
server.on('preReadHoldingRegisters', (request) => {
  console.log(`Read Holding Registers | Address: ${request._body._start} Length: ${request._body._count}`);
});

/*
Occurs when a hold register is written.
Prints the address and the value.
*/
server.on('preWriteSingleRegister', (request) => {
  console.log(`Write Holding Register | Address: ${request._body._address} Value: ${request._body._value}`);
});

//
// Start the server.
//
netServer.listen(502);
console.log('Modbus TCP simulator running on port 502.');