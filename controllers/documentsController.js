/* IMPORTACIONES */
const { DocumentsModel } = require('../models/documentsModel');
const { chartUtils } = require('../utils/chartUtils');

const documentsController = {
    generarDocument: async (req, res) => {
        try {
            const { body } = req;
            const { title, tables, charts, filename } = body;
    
            if (!title || !tables || !charts || !filename) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
    
            const result = await DocumentsModel.generarDocument(body, req);
            res.json(result);
        } catch (error) {
            console.error('PDF generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar el PDF',
                message: error.message
            });
        }
    },
    generarReporteFlexible: async (req, res) => {
        try {
            const { body } = req;
            const { title, charts } = body;
    
            if (!title || !charts) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
            const result = await DocumentsModel.generarReporteFlexible(body, req);
            res.json(result);
        } catch (error) {
            console.error('Flexible report generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar el reporte flexible',
                message: error.message
            });
        }
    }
}   

module.exports = { 
    documentsController
};