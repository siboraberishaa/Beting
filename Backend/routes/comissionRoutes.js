import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getCommissions, getUserCommissions } from '../controllers/comissionController.js';


const router = new express.Router()

router.route('/').get(protect, getCommissions);
router.route('/:userId').get(protect, getUserCommissions);


export default router