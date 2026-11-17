import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(error);
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
