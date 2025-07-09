const swaggerAutogen = require('swagger-autogen');
require('dotenv').config();

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];
const PORT = process.env.PORT || 4000;
const HOST = process.env.DB_HOST || '127.0.0.1';

const doc = {
    swagger: "2.0",
    info: {
        title: 'Graphic API',
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
    paths: {
        "/": {
            "get": {
                "tags": ["charts"],
                "description": "Endpoint principal que sirve la página de inicio de la aplicación",
                "responses": {
                    "200": {
                        "description": "OK - Página HTML de inicio cargada correctamente"
                    }
                }
            }
        },
        "/v1/charts/pie/": {
            "post": {
                "tags": ["charts"],
                "description": "Genera un gráfico circular (pie chart) basado en los datos proporcionados. Este endpoint crea una visualización circular donde cada segmento representa una porción de los datos totales.\n\n**Casos de uso:**\n- Distribución de porcentajes\n- Análisis de proporciones\n- Visualización de datos categóricos",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar el gráfico circular",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "description": "Array de valores numéricos que representan las porciones del gráfico",
                                    "example": "[30, 25, 20, 15, 10]"
                                },
                                "labels": {
                                    "description": "Array de etiquetas que corresponden a cada porción del gráfico",
                                    "example": "[\"Categoría A\", \"Categoría B\", \"Categoría C\", \"Categoría D\", \"Categoría E\"]"
                                },
                                "width": {
                                    "description": "Ancho del gráfico en píxeles (opcional, valor por defecto: 800)",
                                    "example": "800"
                                },
                                "height": {
                                    "description": "Alto del gráfico en píxeles (opcional, valor por defecto: 800)",
                                    "example": "800"
                                },
                                "backgroundColor": {
                                    "description": "Array de colores para cada porción del gráfico (opcional)",
                                    "example": "[\"#FF6384\", \"#36A2EB\", \"#FFCE56\", \"#4BC0C0\", \"#9966FF\"]"
                                },
                                "title": {
                                    "description": "Título principal del gráfico (opcional)",
                                    "example": "Distribución de Ventas por Región"
                                },
                                "legendPosition": {
                                    "description": "Posición de la leyenda: 'top', 'bottom', 'left', 'right' (opcional, valor por defecto: 'top')",
                                    "example": "top"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Gráfico generado exitosamente - Retorna la imagen del gráfico circular"
                    },
                    "400": {
                        "description": "Bad Request - Datos de entrada inválidos o incompletos"
                    },
                    "500": {
                        "description": "Internal Server Error - Error interno del servidor al generar el gráfico"
                    }
                }
            }
        },
        "/v1/charts/linear/": {
            "post": {
                "tags": ["charts"],
                "description": "Genera un gráfico lineal basado en los datos proporcionados. Este endpoint crea una visualización de líneas que muestra tendencias y patrones a lo largo del tiempo o categorías.\n\n**Casos de uso:**\n- Análisis de tendencias temporales\n- Comparación de múltiples series de datos\n- Visualización de patrones y cambios",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar el gráfico lineal",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "datasets": {
                                    "description": "Array de objetos que contienen los datos de cada línea del gráfico",
                                    "example": "[{\"label\": \"Serie 1\", \"data\": [10, 20, 30, 40, 50], \"borderColor\": \"#FF6384\"}, {\"label\": \"Serie 2\", \"data\": [15, 25, 35, 45, 55], \"borderColor\": \"#36A2EB\"}]"
                                },
                                "labels": {
                                    "description": "Array de etiquetas para el eje X (categorías o fechas)",
                                    "example": "[\"Enero\", \"Febrero\", \"Marzo\", \"Abril\", \"Mayo\"]"
                                },
                                "width": {
                                    "description": "Ancho del gráfico en píxeles (opcional, valor por defecto: 800)",
                                    "example": "800"
                                },
                                "height": {
                                    "description": "Alto del gráfico en píxeles (opcional, valor por defecto: 600)",
                                    "example": "600"
                                },
                                "title": {
                                    "description": "Título principal del gráfico (opcional)",
                                    "example": "Evolución de Ventas Mensuales"
                                },
                                "xAxisTitle": {
                                    "description": "Título del eje X (opcional)",
                                    "example": "Meses"
                                },
                                "yAxisTitle": {
                                    "description": "Título del eje Y (opcional)",
                                    "example": "Ventas (miles)"
                                },
                                "legendPosition": {
                                    "description": "Posición de la leyenda: 'top', 'bottom', 'left', 'right' (opcional, valor por defecto: 'top')",
                                    "example": "top"
                                },
                                "showGrid": {
                                    "description": "Mostrar líneas de cuadrícula en el gráfico (opcional, valor por defecto: true)",
                                    "example": true
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Gráfico generado exitosamente - Retorna la imagen del gráfico lineal"
                    },
                    "400": {
                        "description": "Bad Request - Datos de entrada inválidos o incompletos"
                    },
                    "500": {
                        "description": "Internal Server Error - Error interno del servidor al generar el gráfico"
                    }
                }
            }
        },
        "/v1/charts/bar/": {
            "post": {
                "tags": ["charts"],
                "description": "Genera un gráfico de barras basado en los datos proporcionados. Este endpoint crea una visualización de barras que permite comparar valores entre diferentes categorías.\n\n**Casos de uso:**\n- Comparación de valores entre categorías\n- Análisis de rendimiento por grupos\n- Visualización de rankings y clasificaciones",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar el gráfico de barras",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "stackedX": {
                                    "description": "Apilar barras horizontalmente (opcional, valor por defecto: false)",
                                    "example": false
                                },
                                "beginAtZero": {
                                    "description": "Comenzar el eje Y desde cero (opcional, valor por defecto: true)",
                                    "example": true
                                },
                                "stackedY": {
                                    "description": "Apilar barras verticalmente (opcional, valor por defecto: false)",
                                    "example": false
                                },
                                "datasets": {
                                    "description": "Array de objetos que contienen los datos de cada grupo de barras",
                                    "example": "[{\"label\": \"Grupo A\", \"data\": [10, 20, 30, 40], \"backgroundColor\": \"#FF6384\"}, {\"label\": \"Grupo B\", \"data\": [15, 25, 35, 45], \"backgroundColor\": \"#36A2EB\"}]"
                                },
                                "labels": {
                                    "description": "Array de etiquetas para el eje X (categorías)",
                                    "example": "[\"Q1\", \"Q2\", \"Q3\", \"Q4\"]"
                                },
                                "width": {
                                    "description": "Ancho del gráfico en píxeles (opcional, valor por defecto: 800)",
                                    "example": "800"
                                },
                                "height": {
                                    "description": "Alto del gráfico en píxeles (opcional, valor por defecto: 600)",
                                    "example": "600"
                                },
                                "title": {
                                    "description": "Título principal del gráfico (opcional)",
                                    "example": "Ventas por Trimestre"
                                },
                                "xAxisTitle": {
                                    "description": "Título del eje X (opcional)",
                                    "example": "Trimestres"
                                },
                                "yAxisTitle": {
                                    "description": "Título del eje Y (opcional)",
                                    "example": "Ventas (miles)"
                                },
                                "legendPosition": {
                                    "description": "Posición de la leyenda: 'top', 'bottom', 'left', 'right' (opcional, valor por defecto: 'top')",
                                    "example": "top"
                                },
                                "showGrid": {
                                    "description": "Mostrar líneas de cuadrícula en el gráfico (opcional, valor por defecto: true)",
                                    "example": true
                                },
                                "barPercentage": {
                                    "description": "Porcentaje de ancho de las barras (opcional, valor por defecto: 0.8)",
                                    "example": 0.8
                                },
                                "categoryPercentage": {
                                    "description": "Porcentaje de espacio entre grupos de barras (opcional, valor por defecto: 0.8)",
                                    "example": 0.8
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Gráfico generado exitosamente - Retorna la imagen del gráfico de barras"
                    },
                    "400": {
                        "description": "Bad Request - Datos de entrada inválidos o incompletos"
                    },
                    "500": {
                        "description": "Internal Server Error - Error interno del servidor al generar el gráfico"
                    }
                }
            }
        },
        "/v1/charts/table/": {
            "post": {
                "tags": ["charts"],
                "description": "Genera una tabla personalizada basada en los datos proporcionados. Este endpoint crea una visualización tabular con encabezados y filas de datos personalizables.\n\n**Casos de uso:**\n- Reportes de datos tabulares\n- Comparación de información estructurada\n- Visualización de datos en formato tabla",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar la tabla",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "headers": {
                                    "description": "Array de encabezados de la tabla",
                                    "example": "[\"Nombre\", \"Edad\", \"Ciudad\", \"Salario\"]"
                                },
                                "rows": {
                                    "description": "Array de objetos que representan las filas de datos",
                                    "example": "[{\"Nombre\": \"Juan\", \"Edad\": 25, \"Ciudad\": \"Madrid\", \"Salario\": 30000}, {\"Nombre\": \"Ana\", \"Edad\": 30, \"Ciudad\": \"Barcelona\", \"Salario\": 35000}]"
                                },
                                "width": {
                                    "description": "Ancho de la tabla en píxeles (opcional, valor por defecto: 800)",
                                    "example": "800"
                                },
                                "height": {
                                    "description": "Alto de la tabla en píxeles (opcional, valor por defecto: 600)",
                                    "example": "600"
                                },
                                "title": {
                                    "description": "Título principal de la tabla (opcional)",
                                    "example": "Reporte de Empleados"
                                },
                                "cellPadding": {
                                    "description": "Padding interno de las celdas en píxeles (opcional, valor por defecto: 10)",
                                    "example": 10
                                },
                                "headerBackground": {
                                    "description": "Color de fondo de los encabezados (opcional, valor por defecto: '#f5f5f5')",
                                    "example": "#f5f5f5"
                                },
                                "rowBackground": {
                                    "description": "Color de fondo de las filas pares (opcional, valor por defecto: '#ffffff')",
                                    "example": "#ffffff"
                                },
                                "alternateRowBackground": {
                                    "description": "Color de fondo de las filas impares (opcional, valor por defecto: '#f9f9f9')",
                                    "example": "#f9f9f9"
                                },
                                "borderColor": {
                                    "description": "Color de los bordes de la tabla (opcional, valor por defecto: '#dddddd')",
                                    "example": "#dddddd"
                                },
                                "textColor": {
                                    "description": "Color del texto de las celdas (opcional, valor por defecto: '#333333')",
                                    "example": "#333333"
                                },
                                "headerTextColor": {
                                    "description": "Color del texto de los encabezados (opcional, valor por defecto: '#333333')",
                                    "example": "#333333"
                                },
                                "fontSize": {
                                    "description": "Tamaño de fuente en píxeles (opcional, valor por defecto: 12)",
                                    "example": 12
                                },
                                "marginLeft": {
                                    "description": "Margen izquierdo de la tabla en píxeles (opcional, valor por defecto: 20)",
                                    "example": 20
                                },
                                "marginRight": {
                                    "description": "Margen derecho de la tabla en píxeles (opcional, valor por defecto: 20)",
                                    "example": 20
                                },
                                "marginBottom": {
                                    "description": "Margen inferior de la tabla en píxeles (opcional, valor por defecto: 20)",
                                    "example": 20
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Tabla generada exitosamente - Retorna la imagen de la tabla"
                    },
                    "400": {
                        "description": "Bad Request - Datos de entrada inválidos o incompletos"
                    },
                    "500": {
                        "description": "Internal Server Error - Error interno del servidor al generar la tabla"
                    }
                }
            }
        },
        "/v1/documents/pdf-charts": {
            "post": {
                "tags": ["documents"],
                "description": "Genera un documento PDF que incluye tablas y gráficos combinados. Este endpoint permite crear reportes completos con múltiples elementos visuales en un solo documento.\n\n**Casos de uso:**\n- Reportes ejecutivos con gráficos y tablas\n- Documentos de análisis de datos\n- Informes técnicos con visualizaciones\n- Reportes de ventas o métricas",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar el documento PDF",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "description": "Título principal del documento (opcional, valor por defecto: 'Reporte')",
                                    "example": "Reporte de Ventas Q4 2024"
                                },
                                "tables": {
                                    "description": "Array de objetos que definen las tablas a incluir en el documento",
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "title": {
                                                "description": "Título de la tabla (opcional)",
                                                "example": "Resumen de Ventas por Región"
                                            },
                                            "headers": {
                                                "description": "Array de encabezados de la tabla",
                                                "example": "[\"Región\", \"Ventas\", \"Meta\", \"% Cumplimiento\"]"
                                            },
                                            "rows": {
                                                "description": "Array de objetos que representan las filas de datos",
                                                "example": "[{\"Región\": \"Norte\", \"Ventas\": 150000, \"Meta\": 140000, \"% Cumplimiento\": \"107%\"}, {\"Región\": \"Sur\", \"Ventas\": 120000, \"Meta\": 130000, \"% Cumplimiento\": \"92%\"}]"
                                            },
                                            "columnWidths": {
                                                "description": "Array de anchos de columna en puntos (opcional)",
                                                "example": "[100, 80, 80, 100]"
                                            },
                                            "headerColor": {
                                                "description": "Color de fondo de los encabezados (opcional, valor por defecto: '#eeeeee')",
                                                "example": "#eeeeee"
                                            },
                                            "rowColor": {
                                                "description": "Color de fondo de las filas pares (opcional, valor por defecto: '#ffffff')",
                                                "example": "#ffffff"
                                            },
                                            "alternateRowColor": {
                                                "description": "Color de fondo de las filas impares (opcional, valor por defecto: '#f9f9f9')",
                                                "example": "#f9f9f9"
                                            }
                                        }
                                    }
                                },
                                "charts": {
                                    "description": "Array de objetos que definen los gráficos a incluir en el documento",
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "title": {
                                                "description": "Título del gráfico (opcional)",
                                                "example": "Evolución de Ventas Mensuales"
                                            },
                                            "type": {
                                                "description": "Tipo de gráfico: 'line', 'bar', 'pie' (opcional, valor por defecto: 'line')",
                                                "example": "line"
                                            },
                                            "data": {
                                                "description": "Configuración de datos del gráfico según el tipo",
                                                "example": "{\"labels\": [\"Ene\", \"Feb\", \"Mar\"], \"datasets\": [{\"label\": \"Ventas 2024\", \"data\": [100, 150, 200]}]}"
                                            },
                                            "width": {
                                                "description": "Ancho del gráfico en píxeles (opcional, valor por defecto: 500)",
                                                "example": 500
                                            },
                                            "height": {
                                                "description": "Alto del gráfico en píxeles (opcional, valor por defecto: 300)",
                                                "example": 300
                                            }
                                        }
                                    }
                                },
                                "filename": {
                                    "description": "Nombre del archivo PDF a generar (opcional, se genera automáticamente si no se especifica)",
                                    "example": "reporte-ventas-q4.pdf"
                                }
                            },
                            "required": ["tables", "charts"]
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Documento PDF generado exitosamente",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean",
                                    "example": true
                                },
                                "pdfUrl": {
                                    "type": "string",
                                    "description": "URL para acceder al PDF generado",
                                    "example": "http://127.0.0.1:4000/assets/documents/report-1703123456789-123.pdf"
                                },
                                "filePath": {
                                    "type": "string",
                                    "description": "Ruta del archivo en el servidor",
                                    "example": "/path/to/assets/documents/report-1703123456789-123.pdf"
                                },
                                "filename": {
                                    "type": "string",
                                    "description": "Nombre del archivo generado",
                                    "example": "report-1703123456789-123.pdf"
                                },
                                "timestamp": {
                                    "type": "string",
                                    "description": "Timestamp de generación",
                                    "example": "2024-01-15T10:30:45.123Z"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request - Debe proporcionar al menos una tabla o gráfico"
                    },
                    "500": {
                        "description": "Internal Server Error - Error interno del servidor al generar el PDF"
                    }
                }
            }
        },
        "/v1/documents/flexible-report": {
            "post": {
                "tags": ["documents"],
                "description": "Genera un reporte flexible con múltiples tipos de visualizaciones combinadas.",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "description": "Datos necesarios para generar el reporte flexible",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": { "description": "Título del reporte", "example": "Reporte Completo de Análisis de Ventas 2024" },
                                "description": { "description": "Descripción del reporte", "example": "Este reporte incluye múltiples visualizaciones para análisis completo de ventas, incluyendo gráficos de pie, barras, líneas y tablas de resumen" },
                                "filename": { "description": "Nombre del archivo PDF a generar (opcional)", "example": "presupuesto 2026" },
                                "charts": {
                                    "description": "Array de objetos que definen las visualizaciones a incluir",
                                    "type": "array",
                                    "example": [
                                        { "type": "pie", "title": "Distribución de Ventas por Región pie", "data": [35, 25, 20, 15, 5], "labels": ["Norte", "Sur", "Este", "Oeste", "Centro"] },
                                        { "type": "bar", "title": "Ventas Mensuales por Trimestre", "datasets": [{ "label": "Q1 2024", "data": [120, 150, 180] }, { "label": "Q2 2024", "data": [200, 220, 250] }, { "label": "Q3 2024", "data": [280, 300, 320] }], "labels": ["Enero", "Febrero", "Marzo"] },
                                        { "type": "line", "title": "Evolución de Ventas Anual line", "datasets": [{ "label": "Ventas 2023", "data": [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320] }, { "label": "Ventas 2024", "data": [150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480] }], "labels": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] },
                                        { "type": "table", "title": "Resumen Ejecutivo de Métricas table", "headers": ["Métrica", "Valor Actual", "Meta", "Cumplimiento", "Estado"], "rows": [{ "Métrica": "Ventas Totales", "Valor Actual": "$2,450,000", "Meta": "$2,200,000", "Cumplimiento": "111%", "Estado": "✅ Superado" }, { "Métrica": "Clientes Nuevos", "Valor Actual": "185", "Meta": "150", "Cumplimiento": "123%", "Estado": "✅ Superado" }, { "Métrica": "Satisfacción Cliente", "Valor Actual": "4.7/5", "Meta": "4.5/5", "Cumplimiento": "104%", "Estado": "✅ Superado" }, { "Métrica": "Retención Cliente", "Valor Actual": "92%", "Meta": "90%", "Cumplimiento": "102%", "Estado": "✅ Superado" }, { "Métrica": "Margen de Utilidad", "Valor Actual": "28%", "Meta": "25%", "Cumplimiento": "112%", "Estado": "✅ Superado" }] },
                                        { "type": "pie", "title": "Distribución de Productos por Categoría - pie", "data": [40, 30, 20, 10], "labels": ["Tecnología", "Servicios", "Consultoría", "Otros"] },
                                        { "type": "bar", "title": "Rendimiento por Equipo de Ventas", "datasets": [{ "label": "Equipo A", "data": [450, 480, 520] }, { "label": "Equipo B", "data": [380, 420, 460] }, { "label": "Equipo C", "data": [320, 350, 380] }], "labels": ["Q1", "Q2", "Q3"] }
                                    ]
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Reporte flexible generado exitosamente",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": { "type": "boolean", "example": true },
                                "pdfUrl": { "type": "string", "description": "URL para acceder al PDF generado", "example": "http://127.0.0.1:4000/assets/documents/report-1703123456789-123.pdf" },
                                "filePath": { "type": "string", "description": "Ruta del archivo en el servidor", "example": "/path/to/assets/documents/report-1703123456789-123.pdf" },
                                "filename": { "type": "string", "description": "Nombre del archivo generado", "example": "report-1703123456789-123.pdf" },
                                "timestamp": { "type": "string", "description": "Timestamp de generación", "example": "2024-01-15T10:30:45.123Z" }
                            }
                        }
                    },
                    "400": { "description": "Bad Request - Datos de entrada inválidos o incompletos" },
                    "500": { "description": "Internal Server Error - Error interno del servidor al generar el reporte" }
                }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);