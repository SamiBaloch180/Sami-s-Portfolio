import { Router } from "express";
import healthRouter from "./health.js";
import contactRouter from "./contact.js";

const router = Router();

router.use(healthRouter);
router.use(contactRouter);

export default router;
