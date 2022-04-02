import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 3501;

//connect mongo database
mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))

// cors- for browser
app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
   res.json({message:'test'});
});


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
