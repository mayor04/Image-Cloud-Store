"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var conn_1 = require("./conn");
var auth_1 = require("./routes/auth");
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
conn_1.connectToMongoDb();
app.get('/', function (req, res) {
    res.send('we done');
});
app.use('/auth', auth_1.authRouter);
app.listen(config_1.variable.port, function () {
    console.log('Router listening on port 3000');
});
