"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const generationRoutes_1 = __importDefault(require("./routes/generationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "2mb" }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/aibydm";
const ALLOW_START_WITHOUT_DB = process.env.ALLOW_START_WITHOUT_DB === "true";
let isDbConnected = false;
async function start() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        isDbConnected = true;
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("Failed to connect to MongoDB", err);
        if (!ALLOW_START_WITHOUT_DB) {
            console.error("Set ALLOW_START_WITHOUT_DB=true to start without DB");
            process.exit(1);
        }
        console.warn("Starting API without DB connection (limited functionality).");
    }
    app.get("/health", (_req, res) => res.json({ ok: true, db: isDbConnected }));
    app.use("/api/generate", generationRoutes_1.default);
    app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}
start();
//# sourceMappingURL=index.js.map