import { model, Schema } from "mongoose";
import Book, {
  BookMethods,
  BookModelType,
  Genre,
} from "../interfaces/book.interface";

const bookSchema = new Schema<Book, BookModelType, BookMethods>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static(
  "isAvailable",
  async function (
    _id: Schema.Types.ObjectId,
    quantity: number = 1
  ): Promise<boolean> {
    const book = await this.findById(_id);

    return book?.available && book?.copies >= quantity ? true : false;
  }
);

bookSchema.method(
  "markAsUnavailable",
  async function markAsUnavailable(): Promise<void> {
    this.available = false;
    await this.save();
  }
);

const Book = model<Book, BookModelType>("Book", bookSchema);

export default Book;
