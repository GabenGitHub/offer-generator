import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import userController from "../controllers/userController";
import loginRequire from '../middleware/authHandler';

router.get("/users", loginRequire, userController.getUsers);

router.get("/user/:id", loginRequire, userController.getUser);
router.put("/user/:id", loginRequire, userController.modifyUser);
router.delete("/user/:id", loginRequire, userController.deleteUser);

export = router;