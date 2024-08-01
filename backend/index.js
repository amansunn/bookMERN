import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for parsing request body
// option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Example GET route
app.get('/home', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome');
});

app.use('/books', booksRoute);


// Express server to run only if database connection is successful
mongoose.connect(mongoDBURL, {
})
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });