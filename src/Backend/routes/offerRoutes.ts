import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import offerController from "../controllers/offerController";

router.post("/offer", offerController.postOffer);
// router.get("/offer", offerController.offer);

export = router;