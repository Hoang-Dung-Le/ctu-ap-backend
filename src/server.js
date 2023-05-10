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
// import connection from "./configs/connectDB";
// console.log('chay sau ne')
const port = process.env.PORT;

import initWebRoute from './route/web';

configViewEngine(app);
initWebRoute(app);

// initAPI route
initAPIRoute(app);

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
import pool from "./configs/connectDB";

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for incoming messages
    socket.on('message', (message) => {
        // Save message to database
        const sql = `
        INSERT INTO message (send, receive, detail)
        VALUES (?, ?, ?)
      `;
        const values = [message.senderId, message.recipientId, message.text];
        pool.execute(sql, values, (error, results, fields) => {
            if (error) throw error;
            console.log('Message saved to database');
        });

        // Send message to recipient
        socket.to(message.recipientId).emit('message', message);
    });

    // Listen for incoming requests for chat history
    socket.on('chat history', (request) => {
        const sql = `
        SELECT *
        FROM message
        WHERE (send = ? AND recevie = ?)
          OR (send = ? AND receive = ?)
        ORDER BY time
      `;
        const values = [request.senderId, request.recipientId, request.recipientId, request.senderId];
        pool.execute(sql, values, (error, results, fields) => {
            if (error) throw error;
            const messages = results.map((row) => ({
                senderId: row.sender_id,
                recipientId: row.recipient_id,
                text: row.message,
                createdAt: row.created_at
            }));
            socket.emit('chat history', messages);
        });
    });

    // Join a room with the given ID
    socket.on('join', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room ${roomId}`);
    });

    // Leave a room with the given ID
    socket.on('leave', (roomId) => {
        socket.leave(roomId);
        console.log(`User left room ${roomId}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})