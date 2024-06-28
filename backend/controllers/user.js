import { User } from "../models/userModel.js";
import { deleteCardByUserId } from "./cards.js";
import { deleteTopicByUserId } from "./topics.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res) => {
    const uName = req.body.userName;
    const password = req.body.password;
    try{
        const usrAlreadyPresent = await User.findOne({userName : uName});

        if(usrAlreadyPresent){
            return res.json({message : "User Already Exists"});
        }

        if(!(uName && password)){
            console.log("Enter Credentials")
            return res.status(400).send({message : "Enter all credentials"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userObj = {userName: uName, password: String(hashedPassword)};
        
        const usr = await User.create(userObj);

        return res.status(201).json("Successful User Registration!");
    }
    catch(err){
        res.status(500).send({message : "mongoose user register error"});
        console.log(err.message);
    }
}

export const readUser = async(req, res) => {
    const uId = req.body.userId;

    try{
        if(!uId){
            return res.status(400).send({message : "Enter uId"})
        }
        
        const usr = await User.findById(uId);

        return res.status(201).send(usr);
    }
    catch(err){
        res.status(500).send({message : "mongoose user read error"});
        console.log(err.message);
    }
}

export const updateUser = async (req, res) => {
    const newUName = req.body.userName;
    const newPassword = req.body.password;
    const userId = req.params.userId;

    try{
        if(!newUName || !newPassword){
            return res.status(400).send({message : "Enter new Card question and answer"});
        }
        const updateResult = await Card.findByIdAndUpdate(userId, req.body);

        if(!updateResult){
            return res.status(400).json({message : 'Card not in Db'});
        }

        return res.status(200).send({message : 'card updated'});
    }
    catch(err){
        res.status(500).send({message : "mongoose update Card error"});
        console.log(err.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;

        const usr = await User.findByIdAndDelete(id);

        if(!usr){
            return res.status(400).send({'message' : 'User not found'});
        }
        
        //todo --------delete all topics where userId is id
        deleteTopicByUserId(id);
        deleteCardByUserId(id);
        return res.status(200).send({'message' : 'User Deleted'});
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({'message' : 'Delete User Error'});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {userName, password} = req.body;
        const usrPresent = await User.findOne({userName});

        if(!usrPresent){
            console.log("error");
            return res.json({message : 'User Doesnt Exist'});
        }

        const isValid = await bcrypt.compare(password, usrPresent.password);

        if(!isValid){
            return res.json({message : 'Invalid Credentials'});
        }
        
        const token = jwt.sign({id : usrPresent._id}, "secret");

        return res.json({token, userId : usrPresent._id});

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({'message' : 'login User Error'});
    }
}