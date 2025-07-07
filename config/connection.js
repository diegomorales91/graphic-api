require('dotenv').config();
const mysql  = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

const connect = () => connection.connect(function(err) {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }

    console.log('Conexion correcta con tu base de datos MySQL')
});

module.exports = {connect, connection}