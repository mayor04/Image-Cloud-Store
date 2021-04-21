import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICreateUsers, IUsers, Users } from '../model/users';
import { variable } from '../config';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    var myUser = new Users();
    var body = req.body;

    //get name, email, password
    var name = body.username;
    var email = body.email;
    var password = body.password;

    //generate id for the user*
    //

    //check if email is registered*
    var isRegisterd: null | IUsers = await myUser.exist(email)
    if (isRegisterd) {
        res.send({ message: 'registered', });
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
    myUser.registerUser(userData)

    //generate jwt* 
    var token = jwt.sign(
        { username: name, email: email },
        variable.secret || 'secret',
        { expiresIn: 60 }
    )

    //add jwt to cookies*
    //
    res.send({
        message: 'success',
        token: token,
        data: { username: name, email: email },
    });
})

export { authRouter };