require('dotenv').config();
const { GraficosModel } = require('../models/graficosModel');


const GraficosController = {
    graficoTorta: async (req, res) => {
        try {
            const result = await GraficosModel.generarGraficoTorta(req.body);
            
            res.json(result);
    
        } catch (error) {
            console.error('Chart generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar el gráfico de torta',
                message: error.message
            });
        }
    },
    graficoLinea: async (req, res) => {
        try {
            const result = await GraficosModel.generarGraficoLinea(req.body);
            
            res.json(result);
    
        } catch (error) {
            console.error('Line chart generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar el gráfico de linea',
                message: error.message
            });
        }
    },  
    graficoBarras: async (req, res) => {
        try {
            const result = await GraficosModel.generarGraficoBarras(req.body);
            
            res.json(result);
    
        } catch (error) {
            console.error('Bar chart generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar el gráfico de barra',
                message: error.message
            });
        }
    },
    generarTabla: async (req, res) => {
        try {
            const result = await GraficosModel.generarTabla(req.body);
            
            res.json(result);
        } catch (error) {
            console.error('Table generation error:', error);
            res.status(500).json({
                success: false,
                error: 'Error al generar la tabla de datos',
                message: error.message
            });
        }
    }
}

module.exports = {
    GraficosController
}   