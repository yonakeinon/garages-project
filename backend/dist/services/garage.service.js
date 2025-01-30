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
exports.getAllGarages = exports.fetchAndStoreGarages = void 0;
const axios_1 = __importDefault(require("axios"));
const garage_model_1 = __importDefault(require("../models/garage.model"));
const fetchAndStoreGarages = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5';
    try {
        const response = yield axios_1.default.get(apiUrl);
        const records = response.data.result.records;
        const parsedGarages = records.map((record) => ({
            full_name: record['שם מוסך'],
            address: record['כתובת'],
            city: record['ישוב'],
            phone: record['טלפון'],
        }));
        yield garage_model_1.default.insertMany(parsedGarages, { ordered: false }).catch(() => []);
        return yield garage_model_1.default.find({});
    }
    catch (error) {
        console.error('Error fetching garages:', error);
        throw new Error('Failed to fetch and store garages');
    }
});
exports.fetchAndStoreGarages = fetchAndStoreGarages;
/**
 * Get all garages from the database
 */
const getAllGarages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield garage_model_1.default.find({});
});
exports.getAllGarages = getAllGarages;
