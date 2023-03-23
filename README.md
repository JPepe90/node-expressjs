# node-expressjs
Curso de API Rest con Express en NodeJS

## Plugins y configuraciones
ESLinter, Nodemon, Express y EditorConfig.

## Routing con Express
Se crean las rutas /nueva-ruta y /productos ademas de poner en uso la response app.json() para que el valor devuelto por el servidor sea en formato json.

## API RESTFul
Se trata de una convención de Metodos para comunicarse y manejar informacion con el servidor via HTTP:
- GET: Obtener informacion del servidor 
- PUT/PATCH: (Update) Modificaciones desde el cliente al servidor
- POST: (Create) Creacion de nuevos elementos
- DELETE: Eliminacion de elementos

## Query Params
www.index.com/products?queryparams=parametro&queryparam2=param2

## REQ Params
ver ejemplos definidos en index.js

## Single Responsibility Principle
Se genera un archivo por cada ruta de cada endpoint, y se debe definir una regla con el equipo de trabajo. Por ejemplo generar una carpeta route y alli crear un archivo con cada una de las rutas principales. Por ejemplo:

productos.js
categorias.js
users.js

## POST y JSON notation
app.json('url', (req, res) => {}) y app.use(express.json()).
