# node-expressjs
Curso de API Rest con Express en NodeJS

## Plugins y configuraciones
ESLinter, Nodemon, Express y EditorConfig.

## Routing con Express
Se crean las rutas /nueva-ruta y /productos ademas de poner en uso la response app.json() para que el valor devuelto por el servidor sea en formato json.
--------------------------------------------------------------------------

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

## Status Code HTTP
- Respuestas Informativas (100 a 199)
- Respuestas exitosas (200 a 299)
- Redireccionamiento (300 a 399)
- Errores de Cliente (400 a 499)
- Errores de Servidor (500 a 599)

Para agregarlos se usa el metodo status(<status code>)
-------------------------------------------------------------------------

# Servicios
La capa de logica de negocios es la que nuclea los servicios. Estos están separados del ruteo. En la carpeta routes estan las rutas para llamar a los servicios y son los servicios los que ejecutan la logica de negocio propiamente dicha. Estos contienen la logica que ejecuta los procedimientos definidos y necesarios segun cada necesidad.

# Middlewares
Los middlewares son los procesos intermedios desde el request hasta el response

req --> middleware --> middleware --> middleware --> response

Un ejemplo sería un middleware de autenticacion en secuencia con un middleware de validacion de información y un middleware de procesamiento de formulario.

Vemos un ejemplo de middleware generico para errores.

## Manejo de errores con Boom
Boom incluye varios metodos para el manejo de los errores http como:

- boom.notfound()
- boom.conflict()

Esto simplifica el manejo de los errores usando el status()

## Validaciones de datos con JOI
