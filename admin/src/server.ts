import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("🎬 Event Booking API is running!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port: ${PORT}`));
