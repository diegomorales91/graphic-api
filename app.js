/* IMPORTACIONES */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');  
const swaggerDocumentation = require('./swagger.json');
const rateLimit = require('express-rate-limit');

/* VARIABLES */
const app      = express();
const port     = process.env.PORT || 4000;
const hostname = process.env.HOST || '127.0.0.1';

/* MIDDLEWARES */
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

/* RATE LIMIT : Límite de peticiones por IP */
// predeterminado: Límite de 100 peticiones por IP cada 15 minutos
const RATELIMITTIME = process.env.RATELIMITTIME || 15; // 15 minutos

const limiter = rateLimit({
    windowMs: RATELIMITTIME * 60 * 1000, 
    max: process.env.RATELIMITIP || 100, // cantidad de peticiones por IP
    message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
    standardHeaders: true, // devuelve info en headers estándar (RateLimit-*)
    legacyHeaders: false,  // desactiva headers obsoletos (X-RateLimit-*)
  });   

// Aplicar el límite a todas las rutas
app.use(limiter);

/* RUTAS */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/assets', express.static('assets'));
app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation)); 

/* RUTAS PARA LA VERSIÓN 1 DE LA API */
const v1 = express.Router();
v1.use('/charts', require('./routes/v1/graficosRoutes'));
app.use('/v1', v1);

/* INICIAR EL SERVIDOR */
app.listen(port, hostname, () => {
    console.log(`Servidor iniciado en el puerto: ${port}`);
});