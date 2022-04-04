import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../schemas/user.schema.js";

export const userRouter = express.Router();
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

dotenv.config();

// Salt and Hash for password encryption
var saltRounds = 10;
//var password = "Fkdj^45ad"

userRouter.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

userRouter.post('/create-user', function(req,res){
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

// login user(sign in)
userRouter.post('/login', function(req,res) {
    const {username,password} = req.body;

    UserModel
    .findOne({username})
    .then((user:any) => {
        if(user == null)
        {
            console.log("Username not found");
            res.json({message: "Username not found!"});
            return;
        }
        console.log("username found : ",user);
        bcrypt.compare(password, `${user?.password}`, function(err, result) {
            if(result) {
                console.log("It matches!");
                res.json({message: "Successfully logged in!"});
            }
            else {
                console.log("Invalid Password");
                res.sendStatus(403)
            }
        })
    })
    .catch(err => res.json({err}))
})

userRouter.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})

userRouter.put('/update-user/:id', function(req, res) {
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
