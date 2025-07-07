const swaggerAutogen = require( 'swagger-autogen');
require('dotenv').config();

const outpitFile = './swagger.json';
const endPointsFiles = ['./app.js'];
const PORT = process.env.PORT || 4000;
const HOST = process.env.DB_HOST || 'localhost';

const doc = {
    info : {
        title : 'Graphic API',
        description: 'API para generación de gráficos dinámicos y documentos PDF. Esta API permite crear diferentes tipos de gráficos (pie, lineal, barras), tablas con datos personalizados, y documentos PDF que combinan múltiples elementos visuales. Los gráficos se generan como imágenes que pueden ser utilizadas en reportes o aplicaciones web, y los documentos PDF permiten crear reportes completos.\n\n## Características principales:\n- Generación de gráficos de tipo pie chart\n- Creación de gráficos lineales\n- Generación de gráficos de barras\n- Creación de tablas personalizadas\n- Generación de documentos PDF con gráficos y tablas\n- Personalización de colores, tamaños y títulos\n- Soporte para múltiples datasets\n- Configuración de leyendas y ejes\n- Combinación de elementos en documentos PDF',
        version: '1.0.0'
    },
    host: `${HOST}:${PORT}`,
    basePath: '/',
    schemes: ['http'],
    tags: [
        {
            name: 'charts',
            description: 'Endpoints para generación de gráficos'
        },
        {
            name: 'documents',
            description: 'Endpoints para generación de documentos PDF'
        }
    ],
    definitions: {
        // Definiciones para gráfico de pie
        PieChartRequest: {
            data: [30, 25, 20, 15, 10],
            labels: ["Categoría A", "Categoría B", "Categoría C", "Categoría D", "Categoría E"],
            width: 800,
            height: 800,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            title: "Distribución de Ventas por Región",
            legendPosition: "top"
        },
        PieChartResponse: {
            success: true,
            imageUrl: "http://127.0.0.1:4000/assets/reports/chart-1703123456789-123.png",
            filePath: "/path/to/assets/reports/chart-1703123456789-123.png",
            filename: "chart-1703123456789-123.png",
            timestamp: "2024-01-15T10:30:45.123Z"
        },
        // Definiciones para gráfico de líneas
        LineChartRequest: {
            datasets: [
                {
                    label: "Serie 1",
                    data: [10, 20, 30, 40, 50],
                    borderColor: "#FF6384"
                },
                {
                    label: "Serie 2",
                    data: [15, 25, 35, 45, 55],
                    borderColor: "#36A2EB"
                }
            ],
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            width: 800,
            height: 600,
            title: "Evolución de Ventas Mensuales",
            xAxisTitle: "Meses",
            yAxisTitle: "Ventas (miles)",
            legendPosition: "top",
            showGrid: true
        },
        LineChartResponse: {
            success: true,
            imageUrl: "http://127.0.0.1:4000/assets/reports/line-chart-1703123456789-123.png",
            filePath: "/path/to/assets/reports/line-chart-1703123456789-123.png",
            filename: "line-chart-1703123456789-123.png",
            timestamp: "2024-01-15T10:30:45.123Z"
        },
        // Definiciones para gráfico de barras
        BarChartRequest: {
            datasets: [
                {
                    label: "Grupo A",
                    data: [10, 20, 30, 40],
                    backgroundColor: "#FF6384"
                },
                {
                    label: "Grupo B",
                    data: [15, 25, 35, 45],
                    backgroundColor: "#36A2EB"
                }
            ],
            labels: ["Q1", "Q2", "Q3", "Q4"],
            width: 800,
            height: 600,
            title: "Ventas por Trimestre",
            xAxisTitle: "Trimestres",
            yAxisTitle: "Ventas (miles)",
            legendPosition: "top",
            showGrid: true,
            barPercentage: 0.8,
            categoryPercentage: 0.8,
            stackedX: false,
            stackedY: false,
            beginAtZero: true
        },
        BarChartResponse: {
            success: true,
            imageUrl: "http://127.0.0.1:4000/assets/reports/bar-chart-1703123456789-123.png",
            filePath: "/path/to/assets/reports/bar-chart-1703123456789-123.png",
            filename: "bar-chart-1703123456789-123.png",
            timestamp: "2024-01-15T10:30:45.123Z"
        },
        // Definiciones para tabla
        TableRequest: {
            headers: ["Nombre", "Edad", "Ciudad", "Salario"],
            rows: [
                {
                    "Nombre": "Juan",
                    "Edad": 25,
                    "Ciudad": "Madrid",
                    "Salario": 30000
                },
                {
                    "Nombre": "Ana",
                    "Edad": 30,
                    "Ciudad": "Barcelona",
                    "Salario": 35000
                }
            ],
            width: 800,
            height: 600,
            title: "Reporte de Empleados",
            cellPadding: 10,
            headerBackground: "#f5f5f5",
            rowBackground: "#ffffff",
            alternateRowBackground: "#f9f9f9",
            borderColor: "#dddddd",
            textColor: "#333333",
            headerTextColor: "#333333",
            fontSize: 12,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20
        },
        TableResponse: {
            success: true,
            imageUrl: "http://127.0.0.1:4000/assets/reports/table-1703123456789-123.png",
            filePath: "/path/to/assets/reports/table-1703123456789-123.png",
            filename: "table-1703123456789-123.png",
            timestamp: "2024-01-15T10:30:45.123Z"
        },
        // Definiciones para documento PDF
        PDFDocumentRequest: {
            title: "Reporte de Ventas Q4 2024",
            tables: [
                {
                    title: "Resumen de Ventas por Región",
                    headers: ["Región", "Ventas", "Meta", "% Cumplimiento"],
                    rows: [
                        {
                            "Región": "Norte",
                            "Ventas": 150000,
                            "Meta": 140000,
                            "% Cumplimiento": "107%"
                        },
                        {
                            "Región": "Sur",
                            "Ventas": 120000,
                            "Meta": 130000,
                            "% Cumplimiento": "92%"
                        }
                    ],
                    columnWidths: [100, 80, 80, 100],
                    headerColor: "#eeeeee",
                    rowColor: "#ffffff",
                    alternateRowColor: "#f9f9f9"
                }
            ],
            charts: [
                {
                    title: "Evolución de Ventas Mensuales",
                    type: "line",
                    data: {
                        labels: ["Ene", "Feb", "Mar"],
                        datasets: [
                            {
                                label: "Ventas 2024",
                                data: [100, 150, 200]
                            }
                        ]
                    },
                    width: 500,
                    height: 300
                }
            ],
            filename: "reporte-ventas-q4.pdf"
        },
        PDFDocumentResponse: {
            success: true,
            pdfUrl: "http://127.0.0.1:4000/assets/documents/report-1703123456789-123.pdf",
            filePath: "/path/to/assets/documents/report-1703123456789-123.pdf",
            filename: "report-1703123456789-123.pdf",
            timestamp: "2024-01-15T10:30:45.123Z"
        },
        // Definiciones para reporte flexible
        FlexibleReportRequest: {
            title: "Reporte Completo de Análisis",
            description: "Este reporte incluye múltiples visualizaciones para análisis completo",
            charts: [
                {
                    type: "pie",
                    title: "Distribución de Ventas",
                    data: [30, 25, 20, 15, 10],
                    labels: ["Norte", "Sur", "Este", "Oeste", "Centro"]
                },
                {
                    type: "bar",
                    title: "Ventas por Mes",
                    datasets: [
                        {
                            label: "2024",
                            data: [100, 150, 200, 180, 220, 250]
                        }
                    ],
                    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
                },
                {
                    type: "table",
                    title: "Resumen Ejecutivo",
                    headers: ["Métrica", "Valor", "Meta", "Estado"],
                    rows: [
                        {"Métrica": "Ventas Totales", "Valor": "1,250,000", "Meta": "1,200,000", "Estado": "✅"},
                        {"Métrica": "Clientes Nuevos", "Valor": "150", "Meta": "120", "Estado": "✅"},
                        {"Métrica": "Satisfacción", "Valor": "4.5/5", "Meta": "4.0/5", "Estado": "✅"}
                    ]
                }
            ]
        }
    }
}

swaggerAutogen()(outpitFile, endPointsFiles, doc);