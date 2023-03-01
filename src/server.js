import express from "express";

import configViewEngine from "./configs/viewEngine";
import initAPIRoute from "./route/api";
const app = express();

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
// app.use('/uploads', express.static('images'));

require('dotenv').config();
// console.log('chay trc ne');
import connection from "./configs/connectDB";
// console.log('chay sau ne')
const port = process.env.PORT;

import initWebRoute from './route/web';

configViewEngine(app);
initWebRoute(app);

// initAPI route
initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})