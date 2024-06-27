import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { createTicket, getTickets, updateGameHasWon } from '../controllers/ticketController.js';


const router = new express.Router()

router.route('/').post(protect, createTicket);
router.route('/:id').get(protect,authorize('read', 'transactions'), getTickets);
router.post('/:ticketId/games/:gameId', updateGameHasWon);


export default router