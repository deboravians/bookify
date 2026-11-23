import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config";
import { errorHandler } from "./middlewares/error.middleware";
import { requireAdmin } from "./middlewares/auth.middleware";
import { authRoutes } from "./routes/auth.routes";
import { studentRoutes } from "./routes/student.routes";
import { teacherRoutes } from "./routes/teacher.routes";
import { classificationRoutes } from "./routes/classification.routes";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api", requireAdmin);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classifications", classificationRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use(errorHandler);
