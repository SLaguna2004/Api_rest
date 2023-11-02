let express = require('express');
let mysql = require('mysql');
let app = express(); 

app.use(express.json());

    app.get('', function(req,res){
        res.send('');
    })
