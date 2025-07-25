import express, { Request, Response } from "express";
import { PipelineStage } from "mongoose";
import Book from "../models/book.model";

const bookRouter = express.Router();

const requiredFields = ["title", "author", "genre", "isbn", "copies"];

// Get all books
bookRouter.get("/", async (req: Request, res: Response) => {
  const { filter, sort, sortby, page = "1", limit = "10" } = req.query;

  const _page = parseInt(page as string);
  const _limit = parseInt(limit as string);

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
    $skip: (_page >= 1 ? _page - 1 : 0) * _limit,
  });

  try {
    const books = await Book.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
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

// Get a book by _id
bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);

    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred while fetching book",
      },
    });
  }
});

// Update a book by _id
bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    console.error("Error updating book:", JSON.stringify(error, null, 2));

    // Handle validation errors
    if (error?._message === "Validation failed") {
      return res.status(400).json({
        message: error?.message,
        success: false,
        error: {
          name: error.name,
          errors: error.errors,
        },
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred while updating book",
      },
    });
  }
});

// Delete a book by _id
bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;

  try {
    await Book.deleteOne({ _id: bookId });

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting book:", JSON.stringify(error, null, 2));
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred while deleting book",
      },
    });
  }
});

// Create a new book
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

export default bookRouter;
