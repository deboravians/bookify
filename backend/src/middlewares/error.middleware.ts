import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app.error";

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  const status = typeof error === "object" && error !== null && "status" in error
    ? error.status
    : undefined;

  if (status === 400) {
    res.status(400).json({ message: "Invalid request body." });
    return;
  }

  if (status === 413) {
    res.status(413).json({ message: "Request body too large." });
    return;
  }

  console.error(error);
  res.status(500).json({ message: "Internal server error." });
};
