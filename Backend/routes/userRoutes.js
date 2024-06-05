import express from 'express'
import { authorize, protect } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, getUsers, registerUser } from '../controllers/userController.js'

const router = new express.Router()

router.post('/login', authUser)
router.get("/profile/:id", protect, getUserProfile);
router.get("/all", protect, authorize('read', 'users'), getUsers);
router.post("/register",protect, authorize('create', 'users'),registerUser);

export default router
