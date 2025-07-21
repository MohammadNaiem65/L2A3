import express, { Request, Response } from "express";
import { PipelineStage } from "mongoose";
import Book from "../models/book.model";

const bookRouter = express.Router();

const requiredFields = ["title", "author", "genre", "isbn", "copies"];

bookRouter.get("/", async (req: Request, res: Response) => {
  const { filter, sort, sortby, limit = 10 } = req.query;

  let pipeline: PipelineStage[] = [];

  if (filter) {
    pipeline.push({
      $match: {
        genre: filter,
      },
    });
  }
  if (sortby) {
    pipeline.push({
      $sort: {
        [sortby as string]: sort === "desc" ? -1 : 1,
      },
    });
  }
  pipeline.push({
    $limit: parseInt(limit as string),
  });

  try {
    const books = await Book.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred while fetching books",
      },
    });
  }
});

bookRouter.post("/", async (req: Request, res: Response) => {
  // Check for required fields
  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({
          message: `Field ${field} is required`,
          success: false,
          error: {
            name: "ValidationError",
            errors: {
              [field]: {
                message: `Field ${field} is required`,
                name: "ValidatorError",
                properties: {
                  message: `Field ${field} is required`,
                  type: "Validation failed",
                },
                kind: "string",
                path: field,
                value: req.body[field],
              },
            },
          },
        })
        .end();
    }
  });

  try {
    const response = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: response,
    });
  } catch (error: any) {
    console.error("Error creating book:", JSON.stringify(error, null, 2));
    return res.status(400).json({
      message: error?.message,
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
});

export { bookRouter };
