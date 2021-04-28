import mongoose, { model, Model } from 'mongoose';
import { Schema, Document } from "mongoose";
import validator from 'validator';


export interface IUsers extends Document {
    username: string,
    email: string,
    password: string
}

export interface ICreateUsers {
    username: IUsers["username"],
    email: IUsers["email"],
    password: IUsers["password"]
}

class User {
    model: Model<IUsers, {}>;

    constructor() {
        var schema = new Schema({
            username: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                validate: {
                    validator: (name: string) => validator.isEmail(name),
                    message: 'Invalid Email'
                }
            },
            password: {
                type: String,
                required: true,
            },
            tokens: {
                type: [String]
            }
        });
        this.model = mongoose.model<IUsers>('Users', schema, 'users');
    }

    /**Return a type interface IUsers if user is registered 
     * and null if no user is found */
    async exist(email: string): Promise<IUsers | null> {
        var user = await this.model.findOne({ email: email });
        return user;
    }

    async registerUser(details: ICreateUsers): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var instance = new this.model(details);
            instance.save(function (err) {
                if (err) return reject(err);
                resolve(true);
            })
        });
    }
}
const Users = new User();
export { Users }