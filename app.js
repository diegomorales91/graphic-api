require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');  
const swaggerDocumentation = require('./swagger.json');

const app      = express();
const port     = process.env.PORT || 4000;
const hostname = process.env.HOST || '127.0.0.1';
app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/assets', express.static('assets'));
app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation)); 

// Rutas para la versión 1 de la API
const v1 = express.Router();
v1.use('/charts', require('./routes/v1/graficosRoutes'));
app.use('/v1', v1);

app.listen(port, hostname, () => {
    console.log(`Servidor iniciado en el puerto: ${port}`);
});