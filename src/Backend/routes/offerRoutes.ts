import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import offerController from "../controllers/offerController";
import loginRequire from '../middleware/authHandler';

router.get("/offers", loginRequire, offerController.getOffers);

router.post("/offer", offerController.postOffer);
router.get("/offer/:id", loginRequire, offerController.getOffer);
router.put("/offer/:id", loginRequire, offerController.modifyOffer);
router.delete("/offer/:id", loginRequire, offerController.deleteOffer);

export = router;