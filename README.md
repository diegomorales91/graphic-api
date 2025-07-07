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
   PORT=4000
   ```

4. **Ejecutar el servidor**
   ```bash
   npm start
   ```

El servidor estará disponible en `http://127.0.0.1:4000`

## 📚 Documentación de la API

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