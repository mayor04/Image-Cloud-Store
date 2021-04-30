import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ICreateUsers, IUsers, UserModel } from '../model/users';
import { variable } from '../config';


export interface userData{
    user: IUsers,
    token: string,
    uploadUrl?: string,
}

export async function verifyToken(req: express.Request, res: express.Response, next: any) {
    try {
        //get the token from the header
        var header = req.header('authorization');
        var token = header?.replace('Bearer ', '');

        //call verify on the token
        var decode = jwt.verify(token || '', variable.secret) as { email: string };

        //get user and add user to the request object
        var theUser = await UserModel.exist(decode.email);
        var userData: userData = {
            user: theUser as IUsers,
            token: token as string,
        };

        (req as any).userData = userData;

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