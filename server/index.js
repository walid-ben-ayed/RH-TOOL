const express = require ('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
    {
        user: "root",
        host: "localhost",
        password: "walid",
        database: "employeesystem",
    });

app.post("/create",(req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const year = req.body.year;

    db.query(
        "INSERT INTO employees (name, age, country, position, year) VALUES (?,?,?,?,?)",
        [name, age, country, position, year], 
        (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("values inserted")
        }
    });

});


app.get("/employees",(req,res) => {
db.query("SELECT * FROM employees",  (err, result) => {
    if (err) {
        console.log(err)
    } else{
        res.send(result)
    }
});

});


app.put("/update",(req,res) =>{
    const id = req.body.id;
    const year = req.body.year;
    db.query("UPDATE employees SET year = ? WHERE id =?",[year,id],(err, result) =>{
        if (err) {
            console.log(err)
        } else{
            res.send(result)
        }
    } );
});


app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?",id,(err, result) =>{
        if (err) {
            console.log(err)
        } else{
            res.send(result)
        }
    });
});


app.listen(3002,()=> {
    console.log("yey,your server is running on port 3002");
});