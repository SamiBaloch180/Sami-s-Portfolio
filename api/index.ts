import express from "express";
import cors from "cors";
import healthRouter from "../artifacts/api-server/src/routes/health.js";
import contactRouter from "../artifacts/api-server/src/routes/contact.js";

const app = (express as any)();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Directly mount routes
app.use("/healthz", healthRouter);
app.use("/contact", contactRouter);

export default app;
