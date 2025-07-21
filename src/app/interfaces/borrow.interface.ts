import { Schema } from "mongoose";

interface Borrow {
  book: Schema.Types.ObjectId;
  quantity: number;
  dueDate: Schema.Types.Date;
}

export default Borrow;
