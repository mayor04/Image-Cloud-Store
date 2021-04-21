import { Schema, Document } from "mongoose";
import mongoose from 'mongoose';

var schema = new Schema({
    name:    String,
    binary:  Buffer,
    living:  Boolean,
    updated: { type: Date, default: Date.now },
    age:     { type: Number, min: 18, max: 65 },
    mixed:   Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
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
  })

  interface user extends Document{
    name: string,
    binary:  Buffer,
    living:  boolean,
    updated: Date,
    age:  number,
    mixed:   any,
    _someId: any,
    decimal: number,
    array: any[],
    ofString: string[],
    ofNumber: number[],
    ofDates: Date[],
    ofBuffer: Buffer[],
    ofBoolean: boolean[],
    ofMixed: any[],
    ofObjectId: any[],
    ofArrays: [][],
    ofArrayOfNumbers: number[][],
    nested: {
      stuff: string
    },
    map: Map<String, any>,
    mapOfString: Map<String, any>,
  }
  
  // example use
  
  var Thing = mongoose.model<user>('Thing', schema);
  
  var m = new Thing;
  m.name = 'Statue of Liberty';
  m.age = 125;
  m.updated = new Date;
  m.binary = Buffer.alloc(0);
  m.living = false;
  m.mixed = { any: { thing: 'i want' } };
  m.markModified('mixed');
  m._someId = new mongoose.Types.ObjectId;
  m.array.push(1);
  m.ofString.push("strings!");
  m.ofNumber.unshift(1,2,3,4);
//   m.ofDates.addToSet(new Date);
  m.ofBuffer.pop();
  m.ofMixed = [1, [], 'three', { four: 5 }];
  m.nested.stuff = 'good';
  m.map = new Map([['key', 'value']]);
//   m.save(callback);