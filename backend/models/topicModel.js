import mongoose from "mongoose"

const topicSchema = mongoose.Schema({
    topicName : {
        type : String,
        required: true
    },
    //todo foreign user id integration
    userId : {
        type : String,
        required: true
    }
})

export const Topic = mongoose.model('topic', topicSchema)