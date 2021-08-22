import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import offerController from "../controllers/offerController";
import loginRequire from '../middleware/authHandler';

router.post("/offer", offerController.postOffer);
router.get("/offers", loginRequire, offerController.getOffers);
router.get("/offer/:id", offerController.getOffer);

export = router;