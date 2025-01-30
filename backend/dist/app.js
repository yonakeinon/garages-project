"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const garage_routes_1 = __importDefault(require("./routes/garage.routes"));
const database_1 = __importDefault(require("./config/database"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database Connection
(0, database_1.default)();
// Routes
app.use('/api/garages', garage_routes_1.default);
exports.default = app;
