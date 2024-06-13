import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { getFinances } from '../controllers/financeController.js';


const router = new express.Router()

router.route('/:id').get(protect,authorize('read', 'finances'), getFinances);


export default router