import express from 'express';
import multer from 'multer';
import path from 'path';

import { UserModel } from '../model/users';
import { userData } from './verify';
import { getUserFromRequest } from './verify';

const fileRouter = express.Router();
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        var userData = getUserFromRequest(req);
        var name = userData.user.id +'-'+file.originalname
        userData.uploadUrl = name;

        cb(null, name);
    },
});

const upload = multer({ dest: 'upload/' , storage: storage});
fileRouter.post('/upload', upload.single('image'),async (req, res) => {

    try {
        var userData = getUserFromRequest(req);

        await UserModel.addImageUrl({
            email: userData.user.email,
            url: userData.uploadUrl as string
        });

        res.status(200).send({
            message: 'success',
            data: { 
                username: userData.user.username, 
                email: userData.user.email,
                url: userData.uploadUrl 
            },
        });

    } catch (err) {
        console.log('An error occured' + err);
        res.status(404).send({
            message: 'error',
            error: '' + err
        });
    }
})

fileRouter.get('/get-all-images', (req, res) =>{
    try {
        var userData = getUserFromRequest(req);
        
        res.status(200).send({
            message: 'success',
            imagesData: userData.user.images,
        });

    } catch (err) {
        console.log('An error occured' + err);
        res.status(404).send({
            message: 'error',
            error: '' + err
        });
    }
})

export { fileRouter }


//  file response from multer
// "file": {
//     "fieldname": "image",
//     "originalname": "black_jersey.png",
//     "encoding": "7bit",
//     "mimetype": "image/png",
//     "destination": "upload/",
//     "filename": "black_jersey.png",
//     "path": "upload\\black_jersey.png",
//     "size": 120909
// }