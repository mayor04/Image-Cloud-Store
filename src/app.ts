import express from 'express';
import { variable } from './config';
import { connectToMongoDb } from './conn';
import { authRouter } from './routes/auth';
import { verifyToken } from './routes/verify';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

connectToMongoDb()

app.get('/', (req, res) => {
    res.send('we done');
});

app.use('/auth', authRouter);
app.use(verifyToken)

app.get('/user', (req, res) => {
    res.send({ message: 'authorized' });
});

app.listen(variable.port, () => {
    console.log('Router listening on port 3000');
});