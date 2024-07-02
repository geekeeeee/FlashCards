import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {PORT, mongoDBurl} from "./config.js"
import topicRoutes from "./routes/topics.js"
import userRoutes from "./routes/users.js"
import cardRoutes from "./routes/cards.js"
import cors from 'cors';

const app  = express();
app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors(
    {
        origin: ["https://deploy-mern-1whq.vercel.app"],
        methods: ["GET", "POST"],
        credentials : true
    }
));


app.get('/', (req, res) => {
    console.log(req);
    console.log(res);
    return res.status(234).send("Hello World");
})

app.use('/user', userRoutes);
app.use('/topics', topicRoutes);
app.use('/cards', cardRoutes);

mongoose.connect(mongoDBurl)
.then( () => {
    app.listen ( PORT, ()=>{
        console.log(`App is listening ${PORT}`)
    } )
})
.catch((err) => {
    console.log(err);
})
