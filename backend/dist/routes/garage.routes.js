"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const garage_service_1 = require("../services/garage.service");
const validateGarage_1 = require("../middleware/validateGarage");
const router = express_1.default.Router();
router.get('/fetch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allGarages = yield (0, garage_service_1.fetchAndStoreGarages)();
        console.log('Fetch endpoint returning garages:', allGarages.length);
        res.json(allGarages);
    }
    catch (error) {
        console.error('Error in fetch endpoint:', error);
        res.status(500).json({ message: 'Error fetching garages', error });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const garages = yield (0, garage_service_1.getGarages)();
        res.json(garages);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving garages', error });
    }
}));
router.post('/add', validateGarage_1.validateGarage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGarage = yield (0, garage_service_1.addNewGarage)(req.body);
        res.status(201).json(newGarage);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding garage', error });
    }
}));
exports.default = router;
