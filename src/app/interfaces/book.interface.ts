import { Model, Types } from "mongoose";

enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

interface Book {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface BookModelType extends Model<Book, {}, BookMethods> {
  isAvailable(_id: Types.ObjectId, quantity?: number): Promise<boolean>;
}

interface BookMethods {
  markAsUnavailable(): Promise<void>;
}

export default Book;
export { BookMethods, BookModelType, Genre };
