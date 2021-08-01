const express = require("express");
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { create,person } = require('./mongo');
// App setup
const app = express();
app.set('port', process.env.PORT || 8080);
app.use( bodyParser.json() );
app.use( cors() );

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
// Socket setup


let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    person.find()
        .exec()
        .then( x =>  socket.emit("Vacunados",x) );
  }, 2000);
  
});


server.listen( app.get('port') , () => console.log(`Listening on port ${ app.get('port') }`));
