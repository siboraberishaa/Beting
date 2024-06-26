import express from 'express'
import { authorize, protect } from '../middleware/authMiddleware.js'
import { authUser, getUserById, getUserProfile, getUsers, getUsersList, logoutUser, registerUser, updateUser, updateUserStatus, updateUsersCommissions, updateUsersDescription, updateUsersPassword, updateUsersUsername } from '../controllers/userController.js'

const router = new express.Router()

router.post('/login', authUser)
router.get("/profile/:id", protect, getUserProfile);
router.put("/update/:id", protect, updateUser);
router.get("/get/:id", protect, authorize('read', 'users'), getUsers);
router.get("/list/:id", protect, authorize('read', 'users'), getUsersList);
router.post("/register",protect, authorize('create', 'users'),registerUser);
router.get("/:id", protect, authorize('read', 'users'), getUserById);
router.put("/userName/:id", protect, updateUsersUsername);
router.put("/description/:id", protect, updateUsersDescription);
router.put("/commission/:id", protect, updateUsersCommissions);
router.route("/status/:id").put( protect, updateUserStatus);
router.post("/logout", logoutUser);
router.put("/password", protect, updateUsersPassword);

export default router
