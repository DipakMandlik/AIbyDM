import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/aibydm";

async function start() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected");
		app.get("/health", (_req, res) => res.json({ ok: true }));
		app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
	} catch (err) {
		console.error("Failed to start server", err);
		process.exit(1);
	}
}

start();

