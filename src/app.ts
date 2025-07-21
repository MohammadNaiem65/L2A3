import express, { Application, NextFunction, Request, Response } from "express";
import { bookRouter } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Assignment 3, Library Management System API!",
  });
});

// API handling middlewares
app.use("/api/books", bookRouter);

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
