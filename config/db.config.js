import express from "express"
import mysql from "mysql2"

const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "neel",
    password: "Neel@123",
    database: "task_manager"
});


db.connect((err) => {
    if (err) {
        console.log("DataBase connection failed !!");
        return;
    }
    console.log("Connected to mysql !!");

});

export default db;