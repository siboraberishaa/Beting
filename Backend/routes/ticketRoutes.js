import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { createTicket, getTickets } from '../controllers/ticketController.js';


const router = new express.Router()

router.route('/').post(protect, createTicket);
router.route('/').get(protect,authorize('read', 'transactions'), getTickets);


export default router