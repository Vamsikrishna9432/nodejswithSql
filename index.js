const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "React@#9432",
    database: "reactblog"
})

db.connect((err) => {
    if (err) {
        console.log("db disconnected", err)
    }

    console.log("MySQl database is successfully connected")
})

app.get("/", (req, res) => {
    return res.json("MySQL Database")
})

app.get("/users", (req, res) => {
    db.query("select * from users", (err, result) => {
        if (err) {
            console.log("failed Query" , err);
            res.status(500).send("Retrieving data from Database was Failed");
            return;
        }

        res.json(result);
    })
})


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})