import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './router/viewsRouter.js'

//con estas 3 lineas levantamos un servidos en express y websocket al mismo tiempo
const app = express();
const httpServer = app.listen(8080, () => console.log("TUKI"));
const socketServer = new Server(httpServer);



app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));

app.use('/', viewsRouter);

const mensajes = [];

//avisa que se conectó un usuario
socketServer.on('connection', (socket) => {
    console.log('Se conectó el usuario', socket.id);

    socket.on('mensaje', (data) => {
    mensajes.push(data);

    socketServer.emit('nuevo_mensaje', mensajes);
});
});