const code = require("./code");
const Code = require("./code");
const usuario = require("./usuario");
const Mensaje = require("./mensajes");
const MessageBuy = require("./mesaggeBuy");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {

    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      // Escuchar evento: mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
      });

      code.find().then((codes) => {
        this.io.emit("initialData", codes);
      });
      socket.on("inicio-sesion", (data) => {

        usuario
          .findOne({ subname: data.subname, password: data.password })
          .then((user) => {
            if (user) {
              console.log(user);
              this.io.emit("inicio-sesion", {
                user: user,
                ok: true,
              });
            } else {
              this.io.emit("inicio-sesion", false);
            }
          });
      });

      socket.on("addCode", (newCode) => {
        const code = new Code(newCode);
        code.save().then(() => {
          socket.emit("codeAdded", code);
        });
      });

      socket.on("updateCode", (updatedCode) => {
        Code.findByIdAndUpdate(updatedCode._id, updatedCode, {
          new: true,
        }).then((code) => {
          socket.emit("codeUpdated", code);
        });
      });

      socket.on("register-data", (data) => {
        console.log(data);
        const mensaje = new Mensaje(data);
        console.log(mensaje);
        mensaje.save().then(() => {
          this.io.emit("register-data", mensaje);
        });
      });

      socket.on("actualiza-datos", (updateData) => {
        Mensaje.findByIdAndUpdate(updateData._id, updateData, {
          new: true,
        }).then((mensaje) => {
          socket.emit("actualiza-datos", mensaje);
        });
      });

      socket.on('borra-mensajes',async (data) => {
        try {
          await Mensaje.deleteMany({});
          socket.emit('coleccionBorrada', 'Todos los datos han sido borrados');
        } catch (error) {
          socket.emit('error', 'Error al borrar la colección');
        }
      })

      socket.on('borrar-respuestas', async (data) => {
        try {
          await MessageBuy.deleteMany({});
          socket.emit('buyDeleted', 'Todos los datos han sido borrados');
        } catch (error) {
          socket.emit('error', 'Error al borrar la colección');
        }
      })

      socket.emit("initial-datos", () => {
        Mensaje.find().then((mensajes) => {
          socket.emit("initial-datos", mensajes);
        });
      });

      socket.on("addMessageBuy", (newMessageBuy) => {
        console.log(newMessageBuy);
        const messageBuy = new MessageBuy(newMessageBuy);
        messageBuy.save().then(() => {
          socket.emit("messageBuyAdded", messageBuy);
        });
      });

      socket.on("fetch-message-by-plate", (placa) => {
        MessageBuy.findOne({ placa }).then((messageBuy) => {
          socket.emit("initial-message", messageBuy);
        });
      });
      socket.on('state-response', (id) => {
        Mensaje.findOneAndUpdate({ id: id }, { state: '🟢' }, { new: true }).then((mensaje) => {
          if (mensaje) {
        console.log(mensaje);
        socket.emit('actualiza-datos', mensaje);
        socket.emit('state-changed', mensaje);
          } else {
        console.log('No se encontró el mensaje para actualizar');
        socket.emit('error', 'No se encontró el mensaje para actualizar');
          }
        }).catch((error) => {
          console.error('Error al actualizar el mensaje:', error);
          socket.emit('error', 'Error al actualizar el mensaje');
        });
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        const ide = socket.id;
        console.log(ide);
        Mensaje.findOneAndUpdate({ id: ide }, { state: '🔴' }, { new: true }).then((mensaje) => {
          if (mensaje) {
            console.log(mensaje);
            this.io.emit('actualiza-datos', mensaje);
          } else {
            console.log('No se encontró el mensaje para actualizar');
          }
        });
      });
    });
  }
}

module.exports = Sockets;
