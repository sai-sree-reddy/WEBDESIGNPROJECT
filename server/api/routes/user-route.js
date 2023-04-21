import express from "express";
import * as userController from '../controllers/user-controller.js';


const router = express.Router();

router.route('/users')
    .post(userController.post)
    .get(userController.getUsers);


router.route('/users/login/:uuid')
.post(userController.login);

router.route('/users/:uuid')
.put(userController.updateUser)
.get(userController.getUserById);

router.route('/users/verify-security/:uuid')
.get(userController.verifySecurityAnswer);

export default router;