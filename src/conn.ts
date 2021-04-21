import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Users } from './model/users';

// connect();
export async function connectToMongoDb(){
    var db = 'mongodb://localhost:27017/authTest';
    console.log(db);

    await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})

    var conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'Error connecting'));
    console.log('connected to mongodb');
}

async function userOptions(){
    var myUsers = new Users();
    // var exi = await myUsers.registerUser({email: 'col@gmail.com',username: 'yam', password: 'dffvrgrg'});

    var exi = await myUsers.exist('col@gmail.com');
    console.log(exi);
}

async function runModel(){
    var dataSchema = new Schema({
        name: String,
    })
    var mode = mongoose.model('data', dataSchema, 'content');

    var all = await mode.findOne({name:'sa'});
    console.log(all);

    // var instance = new mode({name:'sam'});
    // instance.save(function(err){
    //     console.log(err);
    // })
}