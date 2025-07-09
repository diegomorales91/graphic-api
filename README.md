# API de Generación de Gráficos

Una API RESTful desarrollada en Node.js para generar gráficos dinámicos como imágenes. Esta API permite crear diferentes tipos de gráficos (pie, lineal, barras) y tablas personalizadas con configuraciones flexibles.

## 🚀 Características

- **Gráficos Circulares (Pie Charts)**: Visualización de proporciones y distribuciones
- **Gráficos Lineales**: Análisis de tendencias y patrones temporales
- **Gráficos de Barras**: Comparación de valores entre categorías
- **Tablas Personalizadas**: Visualización de datos en formato tabular
- **Personalización Completa**: Colores, tamaños, títulos y configuraciones avanzadas
- **Respuesta en Imagen**: Los gráficos se generan como imágenes listas para usar

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Canvas (dependencia nativa de Chart.js)

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd node-api-graficos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env (opcional)
   # ó puedes modificar el .env.example con tus variables
   ```

4. **Ejecutar el servidor**
   ```bash
   npm start ó npm run dev (para desarrollo)
   ```

El servidor estará disponible en `http://127.0.0.1:4000`

## 📚 Documentación de la API

---

## Documentación Swagger

Puedes generar la documentación Swagger de la API ejecutando el siguiente comando en la raíz del proyecto:

```bash
node swagger.js
```

Esto generará el archivo `swagger.json` con toda la documentación de la API.

Luego, puedes visualizar la documentación interactiva accediendo a:

```
http://localhost:4000/api/documentation
```

Asegúrate de tener el servidor corriendo (`node app.js` o el comando que uses para iniciar tu API, para Desarollo es `npm run dev`).

--- 

### Endpoints Disponibles

#### 1. Generar Gráfico Circular (Pie Chart)

**POST** `/v1/charts/pie/`

Genera un gráfico circular basado en los datos proporcionados.

**Parámetros:**
```json
{
  "data": [30, 25, 20, 15, 10],
  "labels": ["Categoría A", "Categoría B", "Categoría C", "Categoría D", "Categoría E"],
  "width": 800,
  "height": 800,
  "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
  "title": "Distribución de Ventas por Región",
  "legendPosition": "top"
}
```

**Respuesta:** Imagen del gráfico circular

#### 2. Generar Gráfico Lineal

**POST** `/v1/charts/linear/`

Genera un gráfico lineal para mostrar tendencias y patrones.

**Parámetros:**
```json
{
  "datasets": [
    {
      "label": "Serie 1",
      "data": [10, 20, 30, 40, 50],
      "borderColor": "#FF6384"
    },
    {
      "label": "Serie 2", 
      "data": [15, 25, 35, 45, 55],
      "borderColor": "#36A2EB"
    }
  ],
  "labels": ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  "width": 800,
  "height": 600,
  "title": "Evolución de Ventas Mensuales",
  "xAxisTitle": "Meses",
  "yAxisTitle": "Ventas (miles)",
  "legendPosition": "top",
  "showGrid": true
}
```

**Respuesta:** Imagen del gráfico lineal

#### 3. Generar Gráfico de Barras

**POST** `/v1/charts/bar/`

Genera un gráfico de barras para comparar valores entre categorías.

**Parámetros:**
```json
{
  "datasets": [
    {
      "label": "Grupo A",
      "data": [10, 20, 30, 40],
      "backgroundColor": "#FF6384"
    },
    {
      "label": "Grupo B",
      "data": [15, 25, 35, 45],
      "backgroundColor": "#36A2EB"
    }
  ],
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "width": 800,
  "height": 600,
  "title": "Ventas por Trimestre",
  "xAxisTitle": "Trimestres",
  "yAxisTitle": "Ventas (miles)",
  "legendPosition": "top",
  "showGrid": true,
  "barPercentage": 0.8,
  "categoryPercentage": 0.8,
  "stackedX": false,
  "stackedY": false,
  "beginAtZero": true
}
```

**Respuesta:** Imagen del gráfico de barras

#### 4. Generar Tabla

**POST** `/v1/charts/table/`

Genera una tabla personalizada con datos estructurados.

**Parámetros:**
```json
{
  "headers": ["Nombre", "Edad", "Ciudad", "Salario"],
  "rows": [
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
  "width": 800,
  "height": 600,
  "title": "Reporte de Empleados",
  "cellPadding": 10,
  "headerBackground": "#f5f5f5",
  "rowBackground": "#ffffff",
  "alternateRowBackground": "#f9f9f9",
  "borderColor": "#dddddd",
  "textColor": "#333333",
  "headerTextColor": "#333333",
  "fontSize": 12,
  "marginLeft": 20,
  "marginRight": 20,
  "marginBottom": 20
}
```

**Respuesta:** Imagen de la tabla

## 🎨 Opciones de Personalización

### Colores
- **backgroundColor**: Array de colores para gráficos
- **borderColor**: Color de bordes para gráficos lineales
- **headerBackground**: Color de fondo de encabezados en tablas
- **rowBackground**: Color de fondo de filas en tablas
- **textColor**: Color del texto

### Dimensiones
- **width**: Ancho en píxeles (por defecto: 800)
- **height**: Alto en píxeles (por defecto: 600/800 según el tipo)

### Configuración de Gráficos
- **title**: Título principal
- **legendPosition**: Posición de la leyenda ('top', 'bottom', 'left', 'right')
- **showGrid**: Mostrar líneas de cuadrícula
- **xAxisTitle**: Título del eje X
- **yAxisTitle**: Título del eje Y

### Configuración de Tablas
- **cellPadding**: Espaciado interno de celdas
- **fontSize**: Tamaño de fuente
- **marginLeft/Right/Bottom**: Márgenes de la tabla

## 🔧 Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **Chart.js**: Biblioteca para generación de gráficos
- **Canvas**: Renderizado de gráficos como imágenes
- **Swagger**: Documentación de la API

## 📁 Estructura del Proyecto

```
node-api-graficos/
├── app.js                 # Archivo principal de la aplicación
├── swagger.js            # Configuración de Swagger
├── config/
│   ├── connection.js     # Configuración de base de datos
│   └── configJwt.js      # Configuración JWT
├── controllers/
│   └── graficosController.js  # Controlador de gráficos
├── middlewares/
│   └── authMiddleware.js      # Middleware de autenticación
├── models/
│   └── graficosModel.js       # Modelo de datos
├── routes/
│   └── v1/
│       └── graficosRoutes.js  # Rutas de gráficos
├── utils/
│   └── chartUtils.js          # Utilidades para gráficos
└── public/
    └── index.html             # Página de inicio
```

## 🚀 Casos de Uso

### Análisis de Ventas
- Gráficos circulares para distribución por región
- Gráficos lineales para tendencias temporales
- Gráficos de barras para comparación por producto

### Reportes de Marketing
- Tablas con métricas de campañas
- Gráficos de conversión por canal
- Análisis de ROI por período

### Dashboards Ejecutivos
- Combinación de múltiples tipos de gráficos
- Visualizaciones personalizadas con colores corporativos
- Reportes automatizados

## 🔍 Ejemplos de Uso

### Ejemplo con cURL

```bash
# Generar gráfico circular
curl -X POST http://127.0.0.1:4000/v1/charts/pie/ \
  -H "Content-Type: application/json" \
  -d '{
    "data": [30, 25, 20, 15, 10],
    "labels": ["Ventas", "Marketing", "Desarrollo", "Soporte", "Otros"],
    "title": "Distribución del Presupuesto"
  }'
```

### Ejemplo con JavaScript

```javascript
// Generar gráfico de barras
const response = await fetch('http://127.0.0.1:4000/v1/charts/bar/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    datasets: [{
      label: "Ventas 2023",
      data: [100, 150, 200, 180],
      backgroundColor: "#FF6384"
    }],
    labels: ["Q1", "Q2", "Q3", "Q4"],
    title: "Ventas Anuales"
  })
});

const imageBlob = await response.blob();
const imageUrl = URL.createObjectURL(imageBlob);
```

## Endpoints de Documentos

### 1. Generar PDF con tablas y gráficos

**POST** `/v1/documents/pdf-charts`

Genera un documento PDF que incluye tablas y gráficos combinados.

#### Ejemplo de request:
```json
{
  "title": "Reporte de Ventas Q4 2024",
  "tables": [
    {
      "title": "Resumen de Ventas por Región",
      "headers": ["Región", "Ventas", "Meta", "% Cumplimiento"],
      "rows": [
        {"Región": "Norte", "Ventas": 150000, "Meta": 140000, "% Cumplimiento": "107%"},
        {"Región": "Sur", "Ventas": 120000, "Meta": 130000, "% Cumplimiento": "92%"}
      ],
      "columnWidths": [100, 80, 80, 100],
      "headerColor": "#eeeeee",
      "rowColor": "#ffffff",
      "alternateRowColor": "#f9f9f9"
    }
  ],
  "charts": [
    {
      "title": "Evolución de Ventas Mensuales",
      "type": "line",
      "data": {
        "labels": ["Ene", "Feb", "Mar"],
        "datasets": [
          {"label": "Ventas 2024", "data": [100, 150, 200]}
        ]
      },
      "width": 500,
      "height": 300
    }
  ],
  "filename": "reporte-ventas-q4.pdf"
}
```

#### Ejemplo de respuesta:
```json
{
  "success": true,
  "pdfUrl": "http://127.0.0.1:4000/assets/documents/report-1703123456789-123.pdf",
  "filePath": "/path/to/assets/documents/report-1703123456789-123.pdf",
  "filename": "report-1703123456789-123.pdf",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

### 2. Generar reporte flexible con múltiples visualizaciones

**POST** `/v1/documents/flexible-report`

Genera un reporte flexible que puede incluir gráficos de pie, barras, líneas y tablas.

#### Ejemplo de request:
```json
{
  "title": "Reporte Completo de Análisis de Ventas 2024",
  "description": "Este reporte incluye múltiples visualizaciones para análisis completo de ventas, incluyendo gráficos de pie, barras, líneas y tablas de resumen",
  "filename": "presupuesto 2026",
  "charts": [
    { "type": "pie", "title": "Distribución de Ventas por Región pie", "data": [35, 25, 20, 15, 5], "labels": ["Norte", "Sur", "Este", "Oeste", "Centro"] },
    { "type": "bar", "title": "Ventas Mensuales por Trimestre", "datasets": [{ "label": "Q1 2024", "data": [120, 150, 180] }, { "label": "Q2 2024", "data": [200, 220, 250] }, { "label": "Q3 2024", "data": [280, 300, 320] }], "labels": ["Enero", "Febrero", "Marzo"] },
    { "type": "line", "title": "Evolución de Ventas Anual line", "datasets": [{ "label": "Ventas 2023", "data": [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320] }, { "label": "Ventas 2024", "data": [150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480] }], "labels": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"] },
    { "type": "table", "title": "Resumen Ejecutivo de Métricas table", "headers": ["Métrica", "Valor Actual", "Meta", "Cumplimiento", "Estado"], "rows": [{ "Métrica": "Ventas Totales", "Valor Actual": "$2,450,000", "Meta": "$2,200,000", "Cumplimiento": "111%", "Estado": "✅ Superado" }, { "Métrica": "Clientes Nuevos", "Valor Actual": "185", "Meta": "150", "Cumplimiento": "123%", "Estado": "✅ Superado" }, { "Métrica": "Satisfacción Cliente", "Valor Actual": "4.7/5", "Meta": "4.5/5", "Cumplimiento": "104%", "Estado": "✅ Superado" }, { "Métrica": "Retención Cliente", "Valor Actual": "92%", "Meta": "90%", "Cumplimiento": "102%", "Estado": "✅ Superado" }, { "Métrica": "Margen de Utilidad", "Valor Actual": "28%", "Meta": "25%", "Cumplimiento": "112%", "Estado": "✅ Superado" }] },
    { "type": "pie", "title": "Distribución de Productos por Categoría - pie", "data": [40, 30, 20, 10], "labels": ["Tecnología", "Servicios", "Consultoría", "Otros"] },
    { "type": "bar", "title": "Rendimiento por Equipo de Ventas", "datasets": [{ "label": "Equipo A", "data": [450, 480, 520] }, { "label": "Equipo B", "data": [380, 420, 460] }, { "label": "Equipo C", "data": [320, 350, 380] }], "labels": ["Q1", "Q2", "Q3"] }
  ]
}
```

#### Ejemplo de respuesta:
```json
{
  "success": true,
  "pdfUrl": "http://127.0.0.1:4000/assets/documents/report-1703123456789-123.pdf",
  "filePath": "/path/to/assets/documents/report-1703123456789-123.pdf",
  "filename": "report-1703123456789-123.pdf",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

## 📖 Documentación Interactiva

Accede a la documentación interactiva de la API en:
```
http://127.0.0.1:4000/api-docs
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Desarrollado con ❤️ para simplificar la generación de gráficos dinámicos** 