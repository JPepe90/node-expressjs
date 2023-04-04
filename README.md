# node-expressjs
Curso de API Rest con Express en NodeJS

### Plugins y configuraciones
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

### Single Responsibility Principle
Se genera un archivo por cada ruta de cada endpoint, y se debe definir una regla con el equipo de trabajo. Por ejemplo generar una carpeta route y alli crear un archivo con cada una de las rutas principales. Por ejemplo:

productos.js
categorias.js
users.js

### POST y JSON notation
app.json('url', (req, res) => {}) y app.use(express.json()).

### Status Code HTTP
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

Middlewares populares:

- CORS: Middleware para habilitar CORS (Cross-origin resource sharing) en nuestras rutas o aplicación. http://expressjs.com/en/resources/middleware/cors.html
- Morgan: Un logger de solicitudes HTTP para Node.js. http://expressjs.com/en/resources/middleware/morgan.html
- Helmet: Helmet nos ayuda a proteger nuestras aplicaciones Express configurando varios encabezados HTTP. ¡No es a prueba de balas de plata, pero puede ayudar! https://github.com/helmetjs/helmet
- Express Debug: Nos permite hacer debugging de nuestras aplicaciones en Express mediante el uso de un toolbar en la pagina cuando las estamos desarrollando. https://github.com/devoidfury/express-debug
- Express Slash: Este middleware nos permite evitar preocuparnos por escribir las rutas con o sin slash al final de ellas. https://github.com/ericf/express-slash
- Passport: Passport es un middleware que nos permite establecer diferentes estrategias de autenticación a nuestras aplicaciones. https://github.com/jaredhanson/passport

Mas middlewares populares en el siguiente enlace: http://expressjs.com/en/resources/middleware.html

Vemos un ejemplo de middleware generico para errores.

## Manejo de errores con Boom
Boom incluye varios metodos para el manejo de los errores http como:

- boom.notfound()
- boom.conflict()

Esto simplifica el manejo de los errores usando el status()

## Validaciones de datos con JOI
Se crean los schemas de cada validacion en la carpeta schemas y luego se llama al handler validador en el middleware armado en la funcion validator.handler.js

En el caso del update, llamamos primero al middleware validador de que exista el elementos y despues verifica con otro middleware que los parametros esten validados.

# Consideraciones para Produccion

- CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- HTTP
- Procesos de Build
- Remover Logs
- Seguridad (Helmet)
- Testing

## Solucion de CORS

Instalacion de la librerioa cors

npm i cors

una vez instalada, la debo importar. para agregara la lista de dominios genero un array con la lista blanca de dominios que deseo que puedan acceder. 

const whiteList = ['http://localhost:8080', 'http://mydomain.com']

y luego debo generar un objeto que contenga un parametro llamado origin que contenga una funcion que determine si el dominio especificado es parte de la whiteList y devuelva true en el callback. Caso contrario debe informar con un error u otra accion.

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido!'));
    }
  }
}

y por ultimo se debe incluir la constante importada con su option definida:

app.use(cors(options));

# Desplegar app en ambiente productivo Heroku / Vercel

- Heroku: No se realizo por no tener cuenta
- Vercel: 

-------------------------------------------------------------------------
###### 3/4/2023
Creacion de endpoints y servicios para usuarios. Tambien se generaron servicios vacios para categorias ya que no se tiene clara la estructura de estas.


-------------------------------------------------------------------------
###### 4/4/2023
Schemas de la seccion usuarios terminados. Se agregó la imagen a los parametros del metodo generate() de la clase UsersService. 
Dentro de los schema se crearon 3 metodos con Joi: uno de creacion, uno de actualizacion y un get, similar a los de productos.

Tambien se agregaron las validaciones con los schemas a cada endpoint en el routing con su correspondiente try catch.

Issue: Sigue pendiente el problema de CORS ya que no funcionan las corsOption con la validacion de dominios.

-------------------------------------------------------------------------
