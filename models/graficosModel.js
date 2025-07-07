require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { chartUtils, createCanvas, Chart } = require('../utils/chartUtils');

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'reports');
const host = process.env.URL;

// Crear directorio si no existe
chartUtils.ensureDirectoryExists(ASSETS_DIR);

// Limpieza de archivos antiguos al iniciar
chartUtils.cleanOldFiles(ASSETS_DIR);

const GraficosModel = {
    generarGraficoTorta: async (config) => {
        const {
            data,
            labels,
            width = 800,
            height = 800,
            backgroundColor = [],
            title = '',
            legendPosition = 'top'
        } = config;
    
        // Validaciones
        if (!data || !labels || data.length !== labels.length) {
            throw new Error('Invalid data: data and labels arrays must have the same length');
        }
    
        if (width > 2000 || height > 2000) {
            throw new Error('Maximum allowed dimensions are 2000x2000 pixels');
        }
    
        // Configuración del gráfico
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
    
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor.length ? backgroundColor : chartUtils.getDefaultColors(data.length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    title: {
                        display: !!title,
                        text: title,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: legendPosition
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const dataArr = context.chart.data.datasets[0].data;
                            const total = dataArr.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1) + '%';
                            const label = context.chart.data.labels[context.dataIndex];
                            return `${label}\n${percentage}`;
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 16
                        }
                    }
                },
                animation: {
                    animateScale: true
                }
            }
        });
    
        await new Promise(resolve => setTimeout(resolve, 100));

        const filename = await chartUtils.generateUniqueFilename('chart', 'png');
        await chartUtils.saveImageToDisk(canvas, path.join(ASSETS_DIR, filename));
        return {
            success: true,
            imageUrl: `${host}/assets/reports/${filename}`,
            filePath: path.join(ASSETS_DIR, filename),
            filename: filename
        };
    },
    generarGraficoLinea: async (config) => {
        const {
            datasets,
            labels,
            width = 800,
            height = 400,
            title = '',
            xAxisTitle = '',
            yAxisTitle = '',
            legendPosition = 'top',
            showGrid = true
        } = config;
    
        // Validaciones básicas
        if (!datasets || !labels) {
            throw new Error('Se requieren "datasets" y "labels"');
        }
    
        // Configuración del gráfico
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
    
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets.map((dataset, i) => ({
                    label: dataset.label || '',
                    data: dataset.data,
                    borderColor: dataset.borderColor || chartUtils.getDefaultColors(datasets.length)[i],
                    backgroundColor: dataset.backgroundColor || chartUtils.getDefaultColors(datasets.length)[i] + '33',
                    borderWidth: dataset.borderWidth || 2,
                    fill: dataset.fill !== undefined ? dataset.fill : false,
                    tension: dataset.tension || 0.1
                }))
            },
            options: {
                responsive: false,
                plugins: {
                    title: {
                        display: !!title,
                        text: title,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: legendPosition
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: !!xAxisTitle,
                            text: xAxisTitle
                        },
                        grid: {
                            display: showGrid
                        }
                    },
                    y: {
                        type: 'linear',
                        title: {
                            display: !!yAxisTitle,
                            text: yAxisTitle
                        },
                        grid: {
                            display: showGrid
                        },
                        beginAtZero: true
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    
        await new Promise(resolve => setTimeout(resolve, 100));
        const filename = await chartUtils.generateUniqueFilename('chart', 'png');
        await chartUtils.saveImageToDisk(canvas, path.join(ASSETS_DIR, filename));
        return {
            success: true,
            imageUrl: `${host}/assets/reports/${filename}`,
            filePath: path.join(ASSETS_DIR, filename),
            filename: filename
        };
    },
    generarGraficoBarras: async (config) => {
        const {
            datasets,
            labels,
            width = 800,
            height = 500,
            title = '',
            xAxisTitle = '',
            yAxisTitle = '',
            legendPosition = 'top',
            showGrid = true,
            barPercentage = 0.8,
            categoryPercentage = 0.9,
            stackedX = false,
            stackedY = false,
            beginAtZero = true
        } = config;
    
        // Validaciones básicas
        if (!datasets || !labels) {
            throw new Error('Se requieren "datasets" y "labels"');
        }
    
        // Configuración del gráfico
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets.map((dataset, i) => ({
                    label: dataset.label || '',
                    data: dataset.data,
                    backgroundColor: dataset.backgroundColor || chartUtils.getDefaultColors(datasets.length)[i],
                    borderColor: dataset.borderColor || chartUtils.getDefaultColors(datasets.length)[i],
                    borderWidth: dataset.borderWidth || 1,
                    borderRadius: dataset.borderRadius || 0,
                    barThickness: dataset.barThickness || 'flex'
                }))
            },
            options: {
                responsive: false,
                plugins: {
                    title: {
                        display: !!title,
                        text: title,
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        position: legendPosition
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: !!xAxisTitle,
                            text: xAxisTitle
                        },
                        grid: {
                            display: showGrid
                        },
                        stacked: stackedX
                    },
                    y: {
                        title: {
                            display: !!yAxisTitle,
                            text: yAxisTitle
                        },
                        grid: {
                            display: showGrid
                        },
                        beginAtZero: beginAtZero,
                        stacked: stackedY
                    }
                },
                barPercentage: barPercentage,
                categoryPercentage: categoryPercentage
            }
        });
    
        await new Promise(resolve => setTimeout(resolve, 100));
        const filename = await chartUtils.generateUniqueFilename('chart', 'png');
        await chartUtils.saveImageToDisk(canvas, path.join(ASSETS_DIR, filename));
        return {
            success: true,
            imageUrl: `${host}/assets/reports/${filename}`,
            filePath: path.join(ASSETS_DIR, filename),
            filename: filename
        };
    },
    generarTabla: async (config) => {
        const { 
            headers = [], 
            rows = [], 
            width = 800, 
            height = 600,
            title = '',
            cellPadding = 10,
            headerBackground = '#f5f5f5',
            rowBackground = '#ffffff',
            alternateRowBackground = '#f9f9f9',
            borderColor = '#dddddd',
            textColor = '#333333',
            headerTextColor = '#333333',
            fontSize = 12,
            marginLeft = 20,
            marginRight = 20,
            marginBottom = 20
        } = config;
    
        // Validaciones
        if (!headers.length || !rows.length) {
            throw new Error('Se requieren "headers" y "rows" con datos');
        }
    
        // Calcular dimensiones dinámicas si no se especifican
        const finalWidth = width === 800 ? Math.min(1200, Math.max(600, headers.length * 150)) : width;
        const finalHeight = height === 600 ? Math.min(2000, Math.max(400, rows.length * 40 + 100)) : height;
    
        const canvas = createCanvas(finalWidth, finalHeight);
        const ctx = canvas.getContext('2d');
    
        // Estilo de fondo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, finalWidth, finalHeight);
    
        // Configuración de texto
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    
        // Calcular área de la tabla con márgenes
        const tableAreaWidth = finalWidth - marginLeft - marginRight;
        const tableAreaHeight = finalHeight - marginBottom;
        
        // Calcular ancho de columnas
        const colWidth = tableAreaWidth / headers.length;
        const rowHeight = 40;
    
        // Dibujar título si existe
        if (title) {
            ctx.font = `bold ${fontSize + 4}px Arial`;
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.fillText(title, finalWidth / 2, 30);
            ctx.font = `bold ${fontSize}px Arial`;
        }
    
        // Dibujar encabezados
        headers.forEach((header, i) => {
            const xPos = marginLeft + i * colWidth;
            const yPos = title ? 50 : 10;
            
            ctx.fillStyle = headerBackground;
            ctx.fillRect(xPos, yPos, colWidth, rowHeight);
            ctx.strokeStyle = borderColor;
            ctx.strokeRect(xPos, yPos, colWidth, rowHeight);
            ctx.fillStyle = headerTextColor;
            ctx.fillText(header, xPos + colWidth / 2, yPos + rowHeight / 2);
        });
    
        // Dibujar filas
        rows.forEach((row, rowIndex) => {
            const yPos = (title ? 50 : 10) + rowHeight * (rowIndex + 1);
            
            headers.forEach((header, colIndex) => {
                const xPos = marginLeft + colIndex * colWidth;
                const bgColor = rowIndex % 2 === 0 ? rowBackground : alternateRowBackground;
                
                ctx.fillStyle = bgColor;
                ctx.fillRect(xPos, yPos, colWidth, rowHeight);
                ctx.strokeStyle = borderColor;
                ctx.strokeRect(xPos, yPos, colWidth, rowHeight);
                
                ctx.fillStyle = textColor;
                const cellValue = row[header] || row[colIndex] || '';
                ctx.fillText(cellValue.toString(), xPos + colWidth / 2, yPos + rowHeight / 2);
            });
        });
    
        const filename = await chartUtils.generateUniqueFilename('chart', 'png');
        await chartUtils.saveImageToDisk(canvas, path.join(ASSETS_DIR, filename));
        return {
            success: true,
            imageUrl: `${host}/assets/reports/${filename}`,
            filePath: path.join(ASSETS_DIR, filename),
            filename: filename
        };
    },
}


module.exports = {
    GraficosModel
 };
