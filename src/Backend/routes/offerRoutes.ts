import express, { Router } from 'express';
const router: Router = express.Router({ mergeParams: true });

import offerController from "../controllers/offerController";


router.post("/", offerController);

export = router;