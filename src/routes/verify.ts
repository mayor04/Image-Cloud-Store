import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICreateUsers, IUsers, Users } from '../model/users';
import { variable } from '../config';

export function verifyToken(req: express.Request, res: express.Response, next: any) {
    try {
        //get the token from the header
        var header = req.header('authorization');
        var token = header?.replace('Bearer ', '');

        //call verify on the token
        var decode = jwt.verify(token || '', variable.secret) as { email: string };

        //get user and add user to the request object
        var theUser = Users.exist(decode.email);
        (req as any).userData = theUser;
        (req as any).userToken = theUser;

        next()
    } catch (err) {
        console.log('Verify Token Error ' + err)
        res.status(401).send({
            message: 'unauthorized'
        })
    }
}

function getRes(message:string, data: any, error?:string){
    return {
        status: status,
        message: message,
        data: data
    }
}