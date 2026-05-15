import { Router } from "express";
import { HealthCheckResponse } from "../../../../lib/api-zod/src/index";

const router = Router();

router.get("/healthz", (_req: any, res: any) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
