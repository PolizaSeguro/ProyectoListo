// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");
const connectDB = require("../database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.database = connectDB();
    // Http server
    this.server = http.createServer(this.app);
    
    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // Catch-all route to serve index.html for React Router
    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
    });
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
