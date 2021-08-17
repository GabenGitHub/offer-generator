import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import offerController from "../controllers/offerController";


router.post("/", offerController);
router.get("/", offerController);

export = router;