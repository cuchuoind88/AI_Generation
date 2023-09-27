import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import lxcRoutes from "./routes/lxcRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/lxc", lxcRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from LXC.E!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () =>
      console.log("Server started on port 8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
