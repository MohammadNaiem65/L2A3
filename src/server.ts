import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

async function bootstrap() {
  await mongoose.connect(
    "mongodb+srv://mohammadnaiem:iiSRcjbjixKHYdzs@cluster0.2imr5av.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0"
  );
  server = app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

bootstrap();
