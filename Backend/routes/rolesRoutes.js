import express from 'express'
import { getRoles, createRoles, getRolesById, updateRoles, deleteRoles, getRolesForManager, getRolesForAgent } from '../controllers/rolesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js'


const router = new express.Router()

router.route('/get').get(getRoles);
router.route('/get/manager').get(getRolesForManager);
router.route('/get/agent').get(getRolesForAgent);
router.route('/').post(protect, authorize('create', 'roles'), createRoles);
router.route('/:id').get(protect, authorize('read', 'roles'),  getRolesById);
router.route('/:id').put(protect, authorize('update', 'roles'),  updateRoles);
router.route('/:id').delete(protect, authorize('delete', 'roles'),  deleteRoles);


export default router