import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { authUser } from '../controllers/userController.js'

const router = new express.Router()

router.post('/login', authUser)

export default router