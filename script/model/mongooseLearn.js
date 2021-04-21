"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var schema = new mongoose_1.Schema({
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    mixed: mongoose_1.Schema.Types.Mixed,
    _someId: mongoose_1.Schema.Types.ObjectId,
    decimal: mongoose_1.Schema.Types.Decimal128,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [mongoose_1.Schema.Types.Mixed],
    ofObjectId: [mongoose_1.Schema.Types.ObjectId],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
        stuff: { type: String, lowercase: true, trim: true }
    },
    map: Map,
    mapOfString: {
        type: Map,
        of: String
    }
});
// example use
var Thing = mongoose_2.default.model('Thing', schema);
var m = new Thing;
m.name = 'Statue of Liberty';
m.age = 125;
m.updated = new Date;
m.binary = Buffer.alloc(0);
m.living = false;
m.mixed = { any: { thing: 'i want' } };
m.markModified('mixed');
m._someId = new mongoose_2.default.Types.ObjectId;
m.array.push(1);
m.ofString.push("strings!");
m.ofNumber.unshift(1, 2, 3, 4);
//   m.ofDates.addToSet(new Date);
m.ofBuffer.pop();
m.ofMixed = [1, [], 'three', { four: 5 }];
m.nested.stuff = 'good';
m.map = new Map([['key', 'value']]);
//   m.save(callback);
