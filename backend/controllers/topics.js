import { Topic } from "../models/topicModel.js";
import { deleteCardByTopicId } from "./cards.js";

export const createTopic = async (req, res) => {
    const tName = req.body.topicName;
    const uid = req.body.userId;

    try{
        if(!(tName)){
            return response.status(400).send({message : "Enter topic name"})
        }
        const topicObj = {topicName: tName, userId : uid};
        
        const tpc = await Topic.create(topicObj);

        return res.status(201).send(tpc);
    }
    catch(err){
        res.status(500).send({message : "mongoose topic post error"});
        console.log(err.message);
    }
}

export const getTopicsofUser = async (req, res) => {
    const requid = req.params.userId;
    // console.log(requid)

    try{
        const topics = await Topic.find({userId : requid});

        return res.status(200).json(topics);
    }
    catch(err){
        res.status(500).send({message : "mongoose get topic error"});
        console.log(err.message);
    }
}

export const updateTopic = async (req, res) => {
    try{
        const newTopicName = req.body.topicName;
        if(!newTopicName){
            console.log("no topicName")
            return res.status(400).send({message : "Enter new topic name"});
        }
        const topicId = req.params.topicId;
        console.log(topicId);
        console.log(newTopicName);
        const updateResult = await Topic.findByIdAndUpdate(topicId, req.body);

        if(!updateResult){
            return res.status(400).json({message : 'Topic not in Db'});
        }

        return res.status(200).send({message : 'topicName updated'});
    }
    catch(err){
        res.status(500).send({message : "mongoose update topic error"});
        console.log(err.message);
    }
}

export const deleteTopic = async (req, res) => {
    try {
        const id = req.params.topicId;
        console.log(id)
        const tpc = await Topic.findByIdAndDelete(id);

        if(!tpc){
            return res.status(400).send({'message' : 'topic not found'});
        }
        
        //todo ---delete all cards with topicId equal to tid; 
        
        deleteCardByTopicId(id);
        
        return res.status(200).send({'message' : 'topic Deleted'});
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({'message' : 'Delete topic Error'});
    }
}

export const deleteTopicByUserId = async (req, res, id) => {
    try {
        const tpc = await Topic.deleteMany({userId : id});
        
        if(!tpc){
            console.log({'message' : 'topics not found'});
        }
        console.log({'message' : 'topics Deleted'});
    }
    catch (error) {
        console.log(error.message);
        console.log({'message' : 'Delete topic Error'});
    }
}

export const findTopicNamebyId = async(req,res) => {
    try{
        const reqtid = req.params.topicId;
        const topics = await Topic.find({_id : reqtid});
    
        return res.status(200).json(topics[0].topicName);
    }
    catch(err){
        res.status(500).send({message : "mongoose get topicName error"});
        console.log(err.message);
    }
}