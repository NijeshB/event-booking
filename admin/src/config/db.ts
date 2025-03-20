import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Logger from "../utils/logger";
import path from "path";

//dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: (msg) => Logger.debug(msg), // Disable logging for cleaner output
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    Logger.info("✅ MySQL Connected Successfully!");
  } catch (error) {
    Logger.error("❌ MySQL Connection Failed:", error);
    process.exit(1);
  }
};

export default sequelize;
