import express from 'express'
import { authorize, protect } from '../middleware/authMiddleware.js'
import { authUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUserStatus, updateUsersDescription, updateUsersPassword, updateUsersUsername } from '../controllers/userController.js'

const router = new express.Router()

router.post('/login', authUser)
router.get("/profile/:id", protect, getUserProfile);
router.get("/get/:id", protect, authorize('read', 'users'), getUsers);
router.post("/register",protect, authorize('create', 'users'),registerUser);
router.get("/:id", protect, authorize('read', 'users'), getUserById);
router.put("/userName/:id", protect, authorize('update', 'users'), updateUsersUsername);
router.put("/description/:id", protect, authorize('update', 'users'), updateUsersDescription);
router.route("/status/:id").put( protect, authorize('update', 'users'), updateUserStatus);
router.post("/logout", logoutUser);
router.put("/password", protect, updateUsersPassword);

export default router
