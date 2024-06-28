import express from "express";
import { createCard, deleteCard, getCardsofTopic, getCardsofUser, updateCard } from "../controllers/cards.js";

const router = express.Router();

router.post('/:topicId', createCard)
router.get('/all/:userId', getCardsofUser);
router.get('/:topicId', getCardsofTopic)
router.put('/:cardId', updateCard)
router.delete('/:cardId', deleteCard)
export default router