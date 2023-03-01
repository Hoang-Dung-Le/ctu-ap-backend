import express from "express";

import APIController from '../controller/APIController'
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers); // method get
    router.post('/create-user', APIController.createNewUser)
    router.post('/login', APIController.getUser)
    router.get('/getRecommendedProducts', APIController.getRecommendedProducts);
    router.post('/getImageFromId', APIController.getImageFromId)
    return app.use("/api/v1/", router)
}

// export default initAPIRoute;
module.exports = {
    initAPIRoute
}

// module.export = initWebRouter;