import express from "express";

import APIController from '../controller/APIController'
let router = express.Router();
import multer from "multer";
import path from 'path'
import pool from "../configs/connectDB";
const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); // method get
    router.post('/create-user', APIController.createNewUser)
    router.post('/login', APIController.getUser)
    router.get('/getRecommendedProducts', APIController.getRecommendedProducts);
    router.post('/getImageFromId', APIController.getImageFromId)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/public/images");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            let originalName = file.originalname;
            let extension = originalName.split(".")[1];
            cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
            pool.execute('insert into images(type, url) values(1, ?)', [file.fieldname + "-" + uniqueSuffix + "." + extension])
        },
    });

    const upload = multer({ storage: storage });
    router.post("/upload", upload.single("picture"), function (req, res) {
        res.status(200).json({
            message: 'ok'
        })
    });
    return app.use("/api/v1/", router)
}

export default initAPIRoute;
// module.exports = {
//     initAPIRoute
// }

// module.export = initWebRouter;