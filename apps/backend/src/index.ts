import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import generationRoutes from "./routes/generationRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(helmet());
app.use(morgan("dev"));

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/aibydm";
const ALLOW_START_WITHOUT_DB = process.env.ALLOW_START_WITHOUT_DB === "true";

let isDbConnected = false;

async function start() {
	try {
		await mongoose.connect(MONGO_URI);
		isDbConnected = true;
		console.log("MongoDB connected");
	} catch (err) {
		console.error("Failed to connect to MongoDB", err);
		if (!ALLOW_START_WITHOUT_DB) {
			console.error("Set ALLOW_START_WITHOUT_DB=true to start without DB");
			process.exit(1);
		}
		console.warn("Starting API without DB connection (limited functionality).");
	}

	app.get("/health", (_req, res) => res.json({ ok: true, db: isDbConnected }));
	app.use("/api/generate", generationRoutes);
	app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

start();

