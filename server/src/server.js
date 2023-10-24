import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from 'dotenv';
import serverless from 'serverless-http'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.listen(5000, async () => {
    mongoose.set("strictQuery",false);
    mongoose.connect(
        process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => console.log(err))
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', router);

module.exports.handler = serverless(app);