import { model, Schema } from "mongoose";
import Borrow from "../interfaces/borrow.interface";

const borrowSchema = new Schema<Borrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Borrow = model<Borrow>("Borrow", borrowSchema);

export default Borrow;
