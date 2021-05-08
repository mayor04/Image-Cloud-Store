import mongoose, { model, Model } from 'mongoose';
import { Schema, Document } from "mongoose";
import validator from 'validator';


export interface IUsers extends Document {
    username: string,
    email: string,
    password: string
    images: { url: string, date: number }[]
}

export interface ICreateUsers {
    username: IUsers["username"],
    email: IUsers["email"],
    password: IUsers["password"]
    images?: IUsers["images"]
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
            images: {
                type: [{ url: String, date: Number }]
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

    /**This registers the user while validating the info */
    async registerUser(details: ICreateUsers): Promise<boolean> {
        var instance = new this.model(details);
        return this.save(instance);
    }

    /**Call this method to upload url and timestamp of the image */
    async addImageUrl(data: { email: string, url: string }) {
        var instance = await this.model.findOne({ email: data.email });

        if (instance == null) {
            throw new Error('User not found');
        }
        instance.images.push({ url: data.url, date: Date.now() })
        return this.save(instance);
    }

    //TODO create a function that returns a range from a particular time
    /**Return an list containing url and timestamp of all the images*/
    async getAllImages(email: string):Promise<IUsers["images"]>{
        var instance = await this.model.findOne({email:email});

        if (instance == null) {
            throw new Error('User not found');
        }
        
        return instance.images;
    }

    async save(instance: IUsers): Promise<boolean> {
        return new Promise((resolve, reject) => {
            instance.save(function (err) {
                if (err) return reject(err);
                resolve(true);
            })
        });
    }

}
const UserModel = new User();
export { UserModel }