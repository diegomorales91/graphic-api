const express = require('express');
const router = express.Router()
const { GraficosController } = require('../../controllers/graficosController');

// Grafico torta
router.post('/pie/', GraficosController.graficoTorta);

// Grafico linea
router.post('/linear/', GraficosController.graficoLinea);

// Grafico barras
router.post('/bar/', GraficosController.graficoBarras);

// Grafico tabla
router.post('/table/', GraficosController.generarTabla);

module.exports = router