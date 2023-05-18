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
    router.post('/getRecommendedProducts', APIController.getRecommendedProducts);
    router.post('/getImageFromId', APIController.getImageFromId)
    router.get('/getQuestions', APIController.getQuestion)
    router.post('/uploadQuestion_1', APIController.uploadQuestion_1)
    router.post('/uploadQuestion_2', APIController.uploadQuestion_2)
    router.post('/getQuestionDetail', APIController.getQuestionFromId)
    router.post('/sendMessage', APIController.sendMessage)
    router.post('/searchProducts', APIController.searchProducts)
    router.post('/getInfoUser', APIController.getInfoUser)
    router.post('/getMyProducts', APIController.getMyProducts)
    router.post('/hiddenProduct', APIController.hiddenProduct)
    router.post('/unHiddenProduct', APIController.unHiddenProduct)
    router.post('/historyOfChat', APIController.historyOfChat)
    router.post('/comment', APIController.comment)
    router.post('/getCmt', APIController.getCmt)
    router.post('/insertPrinttingShop', APIController.insertPrinttingShop)
    router.post('/checkUserName', APIController.checkUserName)
    router.post('/getInfoShop', APIController.getInfoShop)
    router.post('/getListMessage', APIController.getListMessage)
    router.post('/getListShop', APIController.getListShop)
    router.post('/getListMessageUser', APIController.getListMessageUser)
    router.post('/getListMessageShop', APIController.getListMessageShop)
    router.post('/doiMK', APIController.doiMK)
    router.post('/getProductFromAuthor', APIController.getProductFromAuthor)
    router.post('/getMaXacNhan', APIController.getMaXacNhan)
    router.post('/updateMk', APIController.updateMk)
    router.post('/updateNameProduct', APIController.updateNameProduct)
    router.post('/updateDetailProduct', APIController.updateDetailProduct)
    router.post('/updatePriceProduct', APIController.updatePriceProduct)
    router.post('/themIuThich', APIController.themIuThich)
    router.post('/ktYeuThich', APIController.ktYeuThich)
    router.post('/layDSYT', APIController.layDSYT)
    router.post('/searchQuestion', APIController.searchQuestion)
    router.post('/updateTenCuaHang', APIController.updateTenCuaHang)
    router.post('/updateDiaChi', APIController.updateDiaChi)
    router.post('/updateSDT', APIController.updateSDT)
    router.post('/updateTimeMo', APIController.updateTimeMo)
    router.post('/updateTimeDong', APIController.updateTimeDong)
    let img_id;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./src/public/images");
        },
        filename: async function (req, file, cb) {
            var [rows, fiels] = await pool.execute('select img_id from images order by img_id desc')
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            let originalName = file.originalname;
            let extension = originalName.split(".")[1];
            cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
            try {
                pool.execute('insert into images(type, url) values(1, ?)', [file.fieldname + "-" + uniqueSuffix + "." + extension])
                // const [rows, fiels] = await pool.execute('SELECT * FROM `images` where url=?', [file.fieldname + "-" + uniqueSuffix + "." + extension]);
                img_id = rows[0].img_id + 1
            } catch (err) {
                img_id = -1
            }


        },
    });

    const upload = multer({ storage: storage });
    router.post("/upload", upload.single("picture"), function (req, res) {
        // const [rows, fiels] = pool.execute('SELECT * FROM `images` where url=?', [file.fieldname + "-" + uniqueSuffix + "." + extension]);
        res.status(200).json({
            "img_id": img_id
        })
    });
    router.post('/uploadProducts', APIController.uploadProduct)
    router.post('/message', (req, res) => {
        console.log(req.body)
        // const message = {
        //     send: req.body.senderId,
        //     receive: req.body.receiverId,
        //     detail: req.body.message,

        // };
        let { senderId, recipientId, message } = req.body
        // console.log(send)
        // console.log()

        // Thêm tin nhắn vào cơ sở dữ liệu
        pool.execute('INSERT INTO message(send, receive, detail, time) values (?, ?, ?, NOW())', [senderId, recipientId, message], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ success: true });
            }
        });
        // return res.status(200).json{message}
    });


    // io.on('connection', socket => {
    //     //Get the chatID of the user and join in a room of the same chatID
    //     chatID = socket.handshake.query.chatID
    //     socket.join(chatID)
    //     //Leave the room if the user closes the socket
    //     socket.on('disconnect', () => {
    //         socket.leave(chatID)
    //     })
    //     //Send message to only a particular user
    //     socket.on('send_message', message => {
    //         receiverChatID = message.receiverChatID
    //         senderChatID = message.senderChatID
    //         content = message.content
    //         //Send message to only that particular room
    //         socket.in(receiverChatID).emit('receive_message', {
    //             'content': content,
    //             'senderChatID': senderChatID,
    //             'receiverChatID': receiverChatID,
    //         })
    //     })
    // });

    return app.use("/api/v1/", router)
}

export default initAPIRoute;
// module.exports = {
//     initAPIRoute
// }

// module.export = initWebRouter;