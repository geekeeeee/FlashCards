import mongoose from "mongoose"

const cardSchema = mongoose.Schema({
    question : {
        type : String,
        required: true
    },
    answer : {
        type : String,
        required: true
    },
    //todo foreign topic id integration
    topicId : {
        type : String,
        required: true
    }, 
    userId : {
        type : String, 
        required: true
    }
})

export const Card = mongoose.model('card', cardSchema)