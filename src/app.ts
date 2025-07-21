import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Assignment 3, Library Management System API!",
  });
});

// Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: error?.message || "An unexpected error occurred.",
    success: false,
    error: {
      name: error.name || "Unknown Error",
    },
  });
});

export default app;
