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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDb = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var users_1 = require("./model/users");
// connect();
function connectToMongoDb() {
    return __awaiter(this, void 0, void 0, function () {
        var db, conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = 'mongodb://localhost:27017/authTest';
                    console.log(db);
                    return [4 /*yield*/, mongoose_1.default.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })];
                case 1:
                    _a.sent();
                    conn = mongoose_1.default.connection;
                    conn.on('error', console.error.bind(console, 'Error connecting'));
                    console.log('connected to mongodb');
                    return [2 /*return*/];
            }
        });
    });
}
exports.connectToMongoDb = connectToMongoDb;
function userOptions() {
    return __awaiter(this, void 0, void 0, function () {
        var myUsers, exi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myUsers = new users_1.Users();
                    return [4 /*yield*/, myUsers.exist('col@gmail.com')];
                case 1:
                    exi = _a.sent();
                    console.log(exi);
                    return [2 /*return*/];
            }
        });
    });
}
function runModel() {
    return __awaiter(this, void 0, void 0, function () {
        var dataSchema, mode, all;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataSchema = new mongoose_2.Schema({
                        name: String,
                    });
                    mode = mongoose_1.default.model('data', dataSchema, 'content');
                    return [4 /*yield*/, mode.findOne({ name: 'sa' })];
                case 1:
                    all = _a.sent();
                    console.log(all);
                    return [2 /*return*/];
            }
        });
    });
}
