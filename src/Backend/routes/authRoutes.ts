import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import authController from "../controllers/authController";

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/register", authController.register);

export = router;