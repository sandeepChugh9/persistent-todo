
const config = require('./config');
const server = require('./app')(config)

server.start();
server.setUpDB(server.setUpRoutes);

