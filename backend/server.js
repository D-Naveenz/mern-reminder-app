import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import mongoose from "mongoose";

// import routers
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import reminderRouter from './routes/event.js';

// import .env file
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// definitions
const app = express();
const port = process.env.PORT || 5000;

// app configs
// app.use(cors);
app.use(json());
app.use(urlencoded({ extended: false }));

// configuring mongodb server
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established');
})

// configuring routers
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/event', reminderRouter);

// catch 404
app.use(function(req, res, next) {
    res.status(404).send('The address is not available');
});
  

// app is listening to the port
app.listen(port, () => {
    console.log(`server listening on ${port}`);
})
