let express = require('express');
let mysql = require('mysql');
let app = express(); 

app.use(express.json());

    app.get('', function(req,res){
        res.send('');
    })

//crear 
//objeto de la conexion--  se establecen los parámetros
let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulos'
});