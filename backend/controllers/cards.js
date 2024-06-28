import { Card } from "../models/cardModel.js";

export const createCard = async (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;
    const tid = req.params.topicId;
    const userId = req.body.userId;

    try{
        if(!question || !answer || !userId){
            return res.status(400).send({message : "Enter question and answer"})
        }

        const cardObj = {question : question, answer: answer, topicId: tid, userId: userId};
        const crd =  await Card.create(cardObj);

        return res.status(201).send(crd);
    }
    catch(err){
        res.status(500).send({message : "mongoose createCard post error"});
        console.log(err.message);
    }
}

export const getCardsofTopic = async (req, res) => {
    const reqtid = req.params.topicId;
    try{
        const cards = await Card.find({topicId : reqtid});

        return res.status(200).json(cards);
    }
    catch(err){
        res.status(500).send({message : "mongoose get Card error"});
        console.log(err.message);
    }
}

export const updateCard = async (req, res) => {
    const newQuestion = req.body.question;
    const newAnswer = req.body.answer ;

    try{
        if(!newQuestion || !newAnswer){
            return res.status(400).send({message : "Enter new Card question and answer"});
        }
        const id = req.params.cardId;
        const updateResult = await Card.findByIdAndUpdate(id, req.body);

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

export const deleteCard = async (req, res) => {
    const id = req.params.cardId;
    try {
        const usr = await Card.findByIdAndDelete(id);

        if(!usr){
            return res.status(400).send({'message' : 'card not found'});
        }
        
        return res.status(200).send({'message' : 'card Deleted'});
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({'message' : 'Delete card Error'});
    }
}

export const deleteCardByTopicId = async (id) => {
    try {
        const crd = await Card.deleteMany({topicId : id});

        if(!crd){
            console.log({'message' : 'cards not found'});
        }
        
    }
    catch (error) {
        console.log(error.message);
        console.log({'message' : 'Delete card by topic id Error'});
    }
}

export const deleteCardByUserId = async (id) => {
    try {
        const crd = await Card.deleteMany({userId : id});

        if(!crd){
            console.log({'message' : 'cards not found'});
        }
        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({'message' : 'Delete card by uid Error'});
    }
}

export const getCardsofUser = async (req, res) => {
    const userId = req.params.userId;
    // console.log(userId);

    try{
        const cards = await Card.find({userId});
        return res.status(200).json(cards);
    }
    catch(err){
        res.status(500).send({message : "mongoose get Card error"});
        console.log(err.message);
    }
}