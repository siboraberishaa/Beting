import express from 'express'
import { protect, authorize } from '../middleware/authMiddleware.js'
import { createTransfer, getTransfers } from '../controllers/transferController.js';


const router = new express.Router()

router.route('/').post(protect, createTransfer);
router.route('/:id').get(protect, getTransfers);


export default router