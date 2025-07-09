require('dotenv').config();
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { chartUtils, createCanvas, Chart } = require('../utils/chartUtils');
const { GraficosModel } = require('./graficosModel');

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'documents');
const host = process.env.URL;

// Crear directorio si no existe
chartUtils.ensureDirectoryExists(ASSETS_DIR);

// Limpieza de archivos antiguos al iniciar
chartUtils.cleanOldFiles(ASSETS_DIR);

const DocumentsModel = {
    generarDocument: async (body, req) => {
        const {
            title = 'Reporte',
            tables = [],
            charts = [],
            filename = await chartUtils.generateUniqueFilename('report', 'pdf')
        } = body;

        if (tables.length === 0 && charts.length === 0) {
            throw new Error('Debe proporcionar al menos una tabla o gráfico');
        }

        // Crear el documento PDF
        const doc = new PDFDocument({ margin: 50 });
        const filePath = path.join(ASSETS_DIR, filename);
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // Agregar el título del documento
        doc.font('Helvetica-Bold')
           .fontSize(20)
           .text(title, { align: 'center' })
           .moveDown(1);

        // Procesar tablas
        for (const table of tables) {
            await DocumentsModel.addTableToPDF(doc, table);
            doc.moveDown(2);
        }

        // Procesar gráficos
        for (const chart of charts) {
            if (chart.useGraficosModel && chart.type) {
                // Seleccionar el método adecuado según el tipo
                let result;
                switch (chart.type) {
                    case 'table':
                        result = await DocumentsModel.addTableToPDF(doc, chart);
                        break;
                    case 'pie':
                        result = await GraficosModel.generarGraficoTorta(chart);
                        break;
                    case 'line':
                        result = await GraficosModel.generarGraficoLinea(chart);
                        break;
                    case 'bar':
                        result = await GraficosModel.generarGraficoBarras(chart);
                        break;
                    default:
                        throw new Error(`Tipo de gráfico no soportado por GraficosModel: ${chart.type}`);
                }
                
                // Agregar título si existe
                if (chart.title) {
                    doc.font('Helvetica-Bold').fontSize(14).text(chart.title).moveDown(0.5);
                }
                // Agregar la imagen generada al PDF
                doc.image(result.filePath, {
                    width: chart.width || 400,
                    align: 'center'
                });
                doc.moveDown(2);
            } else {
                await DocumentsModel.addChartToPDF(doc, chart);
                doc.moveDown(2);
            }
        }

        // Finalizar el documento
        doc.end();

        // Esperar a que el documento se escriba en el archivo
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Generar la URL del PDF
        const pdfUrl = `${host}/assets/documents/${filename}`;

        // Retornar el resultado
        return {
            success: true,
            pdfUrl,
            filePath,
            filename,
            timestamp: new Date().toISOString()
        };
    },
    generarReporteFlexible: async (body, req) => {
        const {
            title = 'Reporte Completo',
            description = '',
            charts = [],
            filename = await chartUtils.generateUniqueFilename('flexible-report', 'pdf')
        } = body;

        if (!charts || charts.length === 0) {
            throw new Error('Debe proporcionar al menos un elemento en el array "charts"');
        }

        const doc = new PDFDocument({ margin: 50 });
        const filePath = path.join(ASSETS_DIR, filename);
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        doc.font('Helvetica-Bold')
           .fontSize(24)
           .text(title, { align: 'center' })
           .moveDown(1);

        if (description) {
            doc.font('Helvetica')
               .fontSize(12)
               .text(description, { align: 'center' })
               .moveDown(2);
        }

        for (const chart of charts) {
            console.log(chart);
            try {
                if (chart.type) {
                    let result;
                    switch (chart.type) {
                        case 'pie':
                            result = await GraficosModel.generarGraficoTorta(chart);
                            break;
                        case 'line':
                            result = await GraficosModel.generarGraficoLinea(chart);
                            break;
                        case 'bar':
                            result = await GraficosModel.generarGraficoBarras(chart);
                            break;
                        default:
                            throw new Error(`Tipo de gráfico no soportado por GraficosModel: ${chart.type}`);
                    }
                    if (chart.title) {
                        doc.font('Helvetica-Bold').fontSize(14).text(chart.title, { align: 'center' }).moveDown(0.5);
                    }

                    console.log(result.filePath);
                    doc.image(result.filePath, {
                        width: chart.width || 400,
                        align: 'center'
                    });
                    doc.moveDown(2);
                } else {
                    await DocumentsModel.addFlexibleElementToPDF(doc, chart);
                    doc.moveDown(2);
                }
            } catch (error) {
                doc.font('Helvetica-Bold')
                   .fontSize(12)
                   .text(`Error al generar: ${chart.title || 'Elemento sin título'}`, { color: 'red' })
                   .moveDown(0.5);
            }
        }

        doc.end();
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        const pdfUrl = `${host}/assets/documents/${filename}`;
        return {
            success: true,
            pdfUrl,
            filePath,
            filename,
            timestamp: new Date().toISOString()
        };
    },
    addTableToPDF: (doc, table) => {
        const {
            title = '',
            headers = [],
            rows = [],
            columnWidths = [],
            headerColor = '#eeeeee',
            rowColor = '#ffffff',
            alternateRowColor = '#f9f9f9'
        } = table;

        if (!headers || headers.length === 0) return;

        if (title) {
            doc.font('Helvetica-Bold').fontSize(14).text(title).moveDown(0.5);
        }

        const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const colWidths = columnWidths.length === headers.length ? columnWidths : Array(headers.length).fill(pageWidth / headers.length);
        let startX = doc.x;
        let y = doc.y;
        const rowHeight = 20;
        doc.font('Helvetica-Bold');
        let x = startX;

        headers.forEach((header, i) => {
            doc.rect(x, y, colWidths[i], rowHeight)
               .fillAndStroke(headerColor, '#000000')
               .fillColor('#000000')
               .text(header, x + 5, y + 5, {
                   width: colWidths[i] - 10,
                   align: 'left'
               });
            x += colWidths[i];
        });

        y += rowHeight;

        doc.font('Helvetica');

        rows.forEach((row, rowIndex) => {
            const bgColor = rowIndex % 2 === 0 ? rowColor : alternateRowColor;
            x = startX;
            headers.forEach((header, colIndex) => {
                const cellValue = row[header] !== undefined ? row[header] : '';
                doc.rect(x, y, colWidths[colIndex], rowHeight)
                   .fillAndStroke(bgColor, '#000000')
                   .fillColor('#000000')
                   .text(cellValue.toString(), x + 5, y + 5, {
                       width: colWidths[colIndex] - 10,
                       align: 'left'
                   });
                x += colWidths[colIndex];
            });
            y += rowHeight;
        });

        doc.y = y + 10;
    },
    addChartToPDF: async (doc, chartConfig) => {
        const {
            title = '',
            type = 'line',
            data,
            width = 500,
            height = 300
        } = chartConfig;

        if (!data) return;

        try {
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            Chart.defaults.font.family = 'Arial';
            Chart.defaults.font.size = 12;
            const chart = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: !!title,
                            text: title,
                            font: { size: 16 }
                        },
                        legend: { display: true, position: 'top' }
                    },
                    scales: { x: { display: true }, y: { display: true } }
                }
            });

            // Esperar 100ms para que el gráfico se renderice
            await new Promise(resolve => setTimeout(resolve, 100));

            const imageBuffer = canvas.toBuffer('image/png');

            if (title) {
                doc.font('Helvetica-Bold').fontSize(14).text(title).moveDown(0.5);
            }

            const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            const imgWidth = Math.min(width, pageWidth);
            const x = doc.page.margins.left + (pageWidth - imgWidth) / 2;
            doc.image(imageBuffer, x, doc.y, { width: imgWidth, align: 'center' });

        } catch (error) {
            doc.font('Helvetica-Bold').fontSize(12).text(`Error al generar gráfico: ${title || 'Sin título'}`, { color: 'red' }).moveDown(0.5);
        }
    },
    addFlexibleElementToPDF: async (doc, element) => {
        // Copiar la lógica de addFlexibleElementToPDF del controlador aquí
        const { type, title = '', ...config } = element;

        if (title) {
            doc.font('Helvetica-Bold').fontSize(16).text(title, { align: 'center' }).moveDown(0.5);
        }

        let imageBuffer;

        switch (type) {
            case 'table':
                imageBuffer = chartUtils.generateTableBuffer(config);
                break;
            case 'pie':
                imageBuffer = await chartUtils.generatePieChartBuffer(config);
                break;
            case 'line':
                imageBuffer = await chartUtils.generateLineChartBuffer(config);
                break;
            case 'bar':
                imageBuffer = await chartUtils.generateBarChartBuffer(config);
                break;
            default:
                throw new Error(`Tipo de gráfico no soportado: ${type}`);
        }
        // Obtener el ancho de la página y ajustar el ancho de la imagen
        const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

        // Ajustar el ancho de la imagen
        const imgWidth = Math.min(config.width || 500, pageWidth);

        // Calcular la posición horizontal de la imagen (centrar la imagen)
        const x = doc.page.margins.left + (pageWidth - imgWidth) / 2;

        // Agregar la imagen al documento
        doc.image(imageBuffer, x, doc.y, { width: imgWidth, align: 'center' });
    },
}

module.exports = {
    DocumentsModel
 };
