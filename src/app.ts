import express from 'express';
import { variable } from './config';
import { connectToMongoDb } from './conn';
import { authRouter } from './routes/auth';
import { fileRouter } from './routes/image_upload';
import { verifyToken } from './routes/verify';

//"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('upload'))

connectToMongoDb()

app.get('/', (req, res) => {
    res.send('we done');
});

//for authentication
app.use('/auth', authRouter);

//for authorization
app.use(verifyToken);

//for handling file uploads
app.use('/', fileRouter);

app.get('/user', (req, res) => {
    res.send({ message: 'authorized' });
});

app.listen(variable.port, () => {
    console.log('Router listening on port 3000');
});