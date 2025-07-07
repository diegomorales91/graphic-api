require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LineController, BarController, PieController, ArcElement } = require('chart.js');
const ChartDataLabels = require('chartjs-plugin-datalabels');

// Registrar componentes de Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LineController, BarController, PieController, ArcElement, ChartDataLabels);

const MAX_FILE_AGE = process.env.MAX_FILE_AGE || 24 * 60 * 60 * 1000; // 24 horas por defecto

const chartUtils = {
    // Generador de colores por defecto
    getDefaultColors: async (count) => {
        const defaultColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC249', '#EA5F89', '#0D98BA', 
            '#FFA07A', '#AF7AC5', '#FAD7A0', '#5D6D7E', '#DC7633', '#16A085', '#9FE2BF', '#F8C471', '#CB4335',
            '#85C1E9', '#F5B7B1', '#616A6B', '#AFBBDD', '#28B463', '#EB984E', '#7FB3D5'
        ];
        return defaultColors.slice(0, count);
    },
    // Función para guardar imagen en disco
    saveImageToDisk: async (canvas, filePath) => {
        return new Promise((resolve, reject) => {
            const out = fs.createWriteStream(filePath);
            const stream = canvas.createPNGStream();

            stream.pipe(out);
            out.on('finish', resolve);
            out.on('error', reject);
        });
    },
    // Función para limpiar archivos antiguos
    cleanOldFiles: async (assetsDir) => {
        const now = Date.now();

        fs.readdir(assetsDir, (err, files) => {
            if (err) {
                console.error('Error cleaning old files:', err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(assetsDir, file);
                const stats = fs.statSync(filePath);
                const fileAge = now - stats.mtimeMs;
                
                if (fileAge > MAX_FILE_AGE) {
                    fs.unlink(filePath, err => {
                        if (err) console.error(`Error deleting file ${file}:`, err);
                        else console.log(`Deleted old file: ${file}`);
                    });
                }
            });
        });
    },
    // Función para crear directorio si no existe
    ensureDirectoryExists: async (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }       
    },
    // Función para generar nombre de archivo único
    generateUniqueFilename: async (prefix, extension) => {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${extension}`;
    }
}

module.exports = {
    chartUtils,
    createCanvas,
    Chart
}



 