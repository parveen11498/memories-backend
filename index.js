import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res)=>{
  res.send('APP IS RUNNING')
});

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
  

  
  const port = process.env.PORT ||5000;
  const server = app.listen(port, () =>
    console.log(`Your server is running on port ${port}`)
  );
  

