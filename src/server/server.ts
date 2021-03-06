import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import {Server, Socket} from "socket.io";
import { apiRouter } from './routers/api.routes.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = 3000;
const server = http.createServer(app);

export let io = new Server(server, {
    cors: {origin: '*'},
});

//connect mongo database
mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))

app.use(cookieParser());
// cors- for browser
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/', function(req, res) {
   res.json({message:'test'});
});




io.on('connection',(socket) => {
    console.log(" user connected with socketId = ", socket.id);
    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);
    })
    // send msg to front end
    socket.emit("message","hello to sockets");
});


server.listen(PORT, () => {
    console.log("listening to port "+ PORT);
});



