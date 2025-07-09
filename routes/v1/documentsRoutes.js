const express = require('express');
const router = express.Router()
const { documentsController } = require('../../controllers/documentsController');

router.post('/pdf-charts', documentsController.generarDocument);
router.post('/flexible-report', documentsController.generarReporteFlexible);

module.exports = router