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
exports.addNewGarage = exports.getGarages = exports.fetchAndStoreGarages = void 0;
const axios_1 = __importDefault(require("axios"));
const garage_model_1 = __importDefault(require("../models/garage.model"));
const fetchAndStoreGarages = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5';
    try {
        const response = yield axios_1.default.get(apiUrl);
        const records = response.data.result.records;
        console.log('-----> Check records:', records);
        const parsedGarages = records.map((record) => ({
            mispar_mosah: record['mispar_mosah'],
            full_name: record['shem_mosah'],
            cod_sug_mosah: record['cod_sug_mosah'],
            sug_mosah: record['sug_mosah'],
            address: record['ktovet'],
            city: record['yishuv'],
            phone: record['telephone'],
            mikud: record['mikud'],
            cod_miktzoa: record['cod_miktzoa'],
            miktzoa: record['miktzoa'],
            menahel_miktzoa: record['menahel_miktzoa'],
            rasham_havarot: record['rasham_havarot'],
        }));
        console.log('-----> Parsed Garages:', parsedGarages);
        yield garage_model_1.default.insertMany(parsedGarages, { ordered: false }).catch(() => []);
        return yield garage_model_1.default.find({});
    }
    catch (error) {
        console.error('❌ Error fetching garages:', error);
        throw new Error('Failed to fetch and store garages');
    }
});
exports.fetchAndStoreGarages = fetchAndStoreGarages;
const getGarages = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield garage_model_1.default.find({});
});
exports.getGarages = getGarages;
const addNewGarage = (garageData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGarage = new garage_model_1.default(garageData);
        return yield newGarage.save();
    }
    catch (error) {
        console.error('❌ Error adding new garage:', error.message);
        throw new Error(error.message);
    }
});
exports.addNewGarage = addNewGarage;
