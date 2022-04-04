import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { apiRouter } from './routers/api.routes.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = 3501;

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


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
