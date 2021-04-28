import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICreateUsers, IUsers, Users } from '../model/users';
import { variable } from '../config';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        var body = req.body;

        //get name, email, password
        var name = body.username;
        var email = body.email;
        var password = body.password;

        //TODO: validate the data 

        //check if email is registered*
        var isRegisterd: null | IUsers = await Users.exist(email)
        if (isRegisterd) {
            res.send({ message: 'registered', user: isRegisterd });
            return;
        }

        //hash password with bcrypt
        //use async instead of synchronous
        var hash = bcrypt.hashSync(password, 8);

        //save to database*
        var userData: ICreateUsers = {
            username: name,
            email: email,
            password: hash
        };
        await Users.registerUser(userData)

        //generate jwt* 
        var token = getToken(email)

        //TODO :add jwt to cookies*


        //TODO : send user verification email*

        //send response
        res.status(200).send({
            message: 'success',
            token: token,
            data: { username: name, email: email },
        });

    } catch (err) {
        console.log('An error occured' + err);
        res.status(404).send({
            message: 'error occured',
            error: '' + err
        });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        var body = req.body;

        //get email and password
        var email = body.email;
        var password = body.password;

        //get info based on the email
        var userInfo: null | IUsers = await Users.exist(email);
        if (!userInfo) {
            res.send({ message: 'not registered' });
            return;
        }

        //compare password
        //use async instead
        var match = bcrypt.compareSync(password, userInfo.password);
        if (!match) {
            res.send({ message: 'Invalid password' });
        }

        //generate jwt
        var token = getToken(email);

        //TODO :add jwt to cookies*

        //send response
        res.status(200).send({
            message: 'success',
            token: token,
            data: { username: userInfo.username, email: email },
        });
    }
    catch (err) {
        console.log('An error occured' + err);
        res.status(404).send({
            message: 'error occured',
            error: '' + err
        });
    }

})

function getToken(email: string): string {
    return jwt.sign(
        { email: email },
        variable.secret || 'secret',
        { expiresIn: 60 }
    )
}

export { authRouter };