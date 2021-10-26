
import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';

const app = express();
const PORT = 3501;

//connect mongo database
mongoose.connect('mongodb://localhost:27017/test')
.then(() => {
    console.log('Connected to DB Successfully');
})
.catch(err => console.log('Failed to Connect to DB', err))

// Salt and Hash for password encryption
var saltRounds = 10;
//var password = "Fkdj^45ad"



// cors- for browser
app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
   res.json({message:'test'});
});

app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});
app.post('/create-user', function(req,res){
    const {name, email, username, password} = req.body;
    // salt and hash orignial password to encrypted password
    bcrypt.genSalt(saltRounds, function(err,salt) {
        console.log("salt = ",salt);
        bcrypt.hash(password,salt,function(err,hash) {
            console.log("Hash = " + hash);
            // store hash in database here
            const user = new UserModel({
                name,
                username,
                email,
                password: hash // pass password as type hash, it will assign hashed password generated to password property
            });
            user
            .save()
            .then((data) => {
                res.json({data});
            })
            .catch(err => {
                res.status(501);
                res.json({errors: err});
            })
        })
    
    });
    
});

app.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})

app.put('/update-user/:id', function(req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { name: req.body.name, email: req.body.email },
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                res.json(updateUser);
            }
        }
    )
})


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
