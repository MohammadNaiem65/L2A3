import { model, Schema } from "mongoose";
import Book, { Genre } from "../interfaces/book.interface";

const bookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    enum: Object.values(Genre),
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  copies: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Book = model<Book>("Book", bookSchema);

export default Book;
