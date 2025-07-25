import express, { Request, Response } from "express";
import { PipelineStage } from "mongoose";
import Book from "../models/book.model";
import Borrow from "../models/borrow.model";

const borrowRouter = express.Router();

// Borrowed book summary
borrowRouter.get("/", async (req: Request, res: Response) => {
  const { page = "1", limit = "10" } = req.query;

  const _page = parseInt(page as string);
  const _limit = parseInt(limit as string);

  const pipeline: PipelineStage[] = [
    {
      $group: {
        _id: "$book",
        totalQuantity: {
          $sum: "$quantity",
        },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $unwind: {
        path: "$book",
      },
    },
    {
      $project: {
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
        _id: 0,
        totalQuantity: 1,
      },
    },
    {
      $skip: (_page >= 1 ? _page - 1 : 0) * _limit,
    },
  ];

  try {
    const response = await Borrow.aggregate(pipeline);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: response,
    });
  } catch (error: any) {
    console.error(
      "Error fetching borrowed book summary:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching borrowed book summary.",
      error: error.message,
    });
  }
});

// Borrow a book
borrowRouter.post("/", async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;

  // Check for required fields
  if (!book || !quantity || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  try {
    const isQuantityAvailable = await Book.isAvailable(book, quantity);

    if (!isQuantityAvailable) {
      return res.status(400).json({
        success: false,
        message: "Book is not available.",
      });
    }

    // Decrease quantity of copies
    const docAfterBorrow = await Book.findByIdAndUpdate(
      book,
      {
        $inc: { copies: -parseInt(quantity) },
      },
      { runValidators: true, new: true }
    );

    // If no copies are left, mark the book as unavailable
    if (docAfterBorrow?.copies === 0) {
      await docAfterBorrow.markAsUnavailable();
    }

    const borrowResponse = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully.",
      data: borrowResponse,
    });
  } catch (error: any) {
    console.error("Error borrowing book:", JSON.stringify(error, null, 2));

    res.status(500).json({
      success: false,
      message: "An error occurred while borrowing the book.",
      error: error.message,
    });
  }
});

export default borrowRouter;
