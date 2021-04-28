import dotenv from 'dotenv';
dotenv.config()

const variable = {
    port: process.env.PORT,
    secret: process.env.JWTSECRET || 'sammy'
};

export {variable} 