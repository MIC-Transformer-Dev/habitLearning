import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome To HabitLearning API');
})

const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb+srv://mictransformerdev:silahkanlanjut2022@cluster0.r1wyj.mongodb.net/habitLearning?retryWrites=true&w=majority';
// 'mongodb+srv://Rahul:cCFqwiM5sNK6xfN1@cluster0.5ggno.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// 'mongodb+srv://mictransformerdev:silahkanlanjut2022@cluster0.r1wyj.mongodb.net/habitLearning?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running at port: ${PORT}`)))
    .catch((error) => console.log(error.message));