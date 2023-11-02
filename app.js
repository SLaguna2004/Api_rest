let express = require('express');
let mysql = require('mysql');
let app = express(); 

app.use(express.json());

    app.get('/', function(req,res){
        res.send('Ruta inicio');
    })

//crear 
//objeto de la conexion--  se establecen los parámetros
let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'articulos'
});
// Probar la conexión
conexion.connect(function(error){
    if(error){
        throw error;
    } else{
        console.log('Conexión exitosa');
    }
    });

    app.listen('3000', function(){
        console.log("Servidor OK en puerto: 3000");
    })

    app.get('/apirest/productos', (req,res)=>{
        conexion.query('SELECT * FROM productos', (error,filas)=>{
            if(error){
                throw error;
            }else{
                res.send(filas);
            }
        });
    });

    app.get('/apirest/productos/:id', (req,res)=>{
        conexion.query('SELECT * FROM productos WHERE id=?', [req.params.id] , (error,fila)=>{
            if(error){
                throw error;
            }else{
                res.send(fila);
            res.send(fila[0].descripción);  // para traer un solo resgistro “ descripción”
            }
        });
    });

    app.post('/apirest/productos',(req,res)=>{
        let data = {id:req.body.id, descripcion: req.body.descripcion, precio: req.body.precio, stock: req.body.stock};
        let sql = "INSERT INTO productos SET ?";
        conexion.query(sql, data, function(error,results){
            if(error){
                throw error;
            }else{
                res.send(results);     
            }
        });
    });

    app.put('/apirest/productos/:id',(req,res)=>{
        const id = req.params.id;
        const data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
        const sql = `UPDATE productos SET? WHERE id = ${id}`;
        conexion.query(sql, (error,results) => {
            if(error){
                throw error;
            }else{
                res.send({message: 'Producto actualizado con exito'});
            }
        });
    });

    app.delete('/apirest/productos/:id',(req,res)=>{
        const id = req.params.id;
        const sql = `DELETE FROM productos WHERE id = ${id}`;
        conexion.query(sql, (error,results) => {
            if(error){
                throw error;
            }else{
                res.send({message: 'Producto eliminado con exito'});
            }
        });
    });