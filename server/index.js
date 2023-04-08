const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "shop01"
})

app.get('/bill' , (req, res) => {
    db.query("SELECT MAX(bill_id) AS value FROM bill ", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

app.post("/createmenu", (req, res) => {
    const id = req.body.menu_id;
    const name = req.body.munu_name;
    const price = req.body.menu_price;
    const bill_id = req.body.bill_id;

    db.query(
        "INSERT INTO menu (menu_id, menu_name, menu_price, bill_id) VALUES(?,?,?,?)",
        [id,name,price,bill_id],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("result");
            }
        }
    )
})

app.post("/createbill", (req, res) => {
    const result = req.body.bill_result;

    db.query(
        "INSERT INTO bill (bill_result) VALUES(?)",
        [result],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("result");
            }
        }
    )
})

app.get('/product' , (req, res) => {
    db.query("SELECT * FROM product", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})