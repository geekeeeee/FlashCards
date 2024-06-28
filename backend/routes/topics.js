import express from "express";
import { createTopic, getTopicsofUser, updateTopic, deleteTopic, findTopicNamebyId } from "../controllers/topics.js";

const router = express.Router();

router.post('/', createTopic)
router.get('/:userId', getTopicsofUser)
router.get('/name/:topicId', findTopicNamebyId)
router.put('/:topicId', updateTopic)
router.delete('/:topicId', deleteTopic)
export default router