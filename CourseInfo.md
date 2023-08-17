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
- Vercel: Desplegada la app de forma completa hasta la fecha con integracion continua a la rama master del repo de Github. Las referencias de la API segun sus deploy:

https://node-expressjs-hxm5ef0yu-jpepe90.vercel.app/api/v1/

El dashboard de esta API en Vercel esta en la ruta:

https://vercel.com/jpepe90/node-expressjs

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
###### 17/4/2023

Instalacion de Docker para crear un contenedor de PostgreSQL. En el archivo docker-compose.yaml se definio el servicio postgres y los datos necesarios para el inicio, como tambien el puerto y el volumen donde persistir la informacion. Para iniciar el contenedor, desde la consola se ejecutó el comando:

- docker-compose up -d postgres

Para verificar que el servicio esté corriendo:

- docker-compose ps

Para remover el contenedor:

- docker-compose down <service name>

Se agrego el contenedor PgAdmin como insterfaz grafica de PostgreSQL, que funciona en un entorno web, al archivo docker-compose.

Para saber la ip en la que está corriendo un contenedor, debo obtener su ID con el comando:

- docker ps

Con ese ID lo inspecciono, con el comando:

- docker inpect <ID>

Y puedo extraer la ipv4 utilizada del campo "IPAddress".

### Conexion con node-postgres
En la carpeta libs se armó la conexión al client. En el archivo postgres.pool.js está el metodo mas optimo para el manejo de un pool de conexiones. Es el que se utilizará para hacer uso de la base de datos.

### Configuracion de variables de Entorno
Creamos la carpeta config con el archivo config.js. Alli se crea un objeto con las variables de entorno necesarias y se vincula con el archivo postgres.pool para generar la URI de conexion (tambien se codifican los datos para dar mas seguridad). Luego creamos el archivo ".env" en la raiz donde cargamos los parametros necesarios e instalamos el paquete dotenv para poder vincularlos con nuestro proceso de node.

lo importamos al archivo config.js con la siguiente linea para que lea el archivo .env y agregue cada parametro a las instrucciones de run:

- require('dotenv').config();

### ORM
Object Relational Model: Mapea toda nuestra base de datos con metodos de programacion orientada a objetos.
Agrega una capa de abstraccion mas a nuestra interaccion con la base de datos para que podamos usar los metodos de objetos (como find, map, filter) en vez de los clasicos de sql (select, insert, alter). Esto la hace AGNOSTICA, lo que quiere decir que nos permite rapida y facilmente cambiar de una base de datos SQL a otra sin tener que alterar todo el codigo. Los dos mas comunes son Sequelize ORM y TypeORM.

- npm install --save sequelize
- npm install --save pg pg-hstore

Se crea el archivo sequelize.js en libs de forma similar al de pool. Su uso en los servicios es tambien similar a pool.

#### Creacion de modelos o entidades ORM
En la carpeta models se crean todos los esquemas del modelo de tablas con el que se van a trabajar en las bases de datos y sus correspondientes tipos de datos y propiedades. Una vez definido el esquema y la tabla, se crea la clase y se le agregan los medotos extendidos del Objeto Model importado al principio del archivo. Esto nos permito utilizar todas las herramientas del modelado de sequelize. se crea un metodo estatico llamado associate que por el momento dejamos vacio (mas adelante se trabajará) y luego creamos otro metodo estático llamado config, donde enviamos todos los parámetros requeridos por el iniciados del setupModels que esta definido el archivo index.js de la misma carpeta. la funcion setupModels es la encargada de recopilar todos los esquemas que hayamos definido en models, importarlos al principio e inicializarlos uno a uno. De esta forma, todos los metodos de Objetos quedan inicializados para poder interactuar con la base de datos que hayamos modelados previamente.

Luego se incluye el setupModels en las importaciones del archivo sequelize.js y se corre dicha funcion luego de inicializar la conexion con el servidor, para que estas sean modelizadas.

Una vez realizado esto, en cada servicio importamos el { model } resultante del archivo sequelize.js y lo podemos utilizar por medio de las intrucciones heredadas:

- model.<ModelName>.<metodo()>

-------------------------------------------------------------------------
###### 20/04/23
### Migraciones con Sequelize cli
Instalamos el paquete sequelize-cli --save-dev. Generamos el archivo .sequelizerc en la raiz del directorio y creamos las carpetas migratios y seeders en el directorio ./db. Tambien agregamos al directorio el archivo config correspondiente.

Luego agregamos una nueva instruccion de scrips den el package de npm:

- "migrations:generate": "sequelize-cli migrations:generate --name"

una vez agregado este comando de script en el package.json se elimina el sequelize.sync() del archivo sequelize.json para que ahora las modificaciones se hagan por los scripts de migracion. Al correr el comando en la terminal:

- npm run migrations:generate create-user

Se genera en la carpeta migrations un nuevo archivo demigracion con las instrucciones up para migrar y down para el rollback per vacios (void plate). Alli importamos los esquemas y tablas definidos en la carpeta models (use los de products y user) y los incluí en los metodos up y down para que se inicialicen y se borren segun corresponda.

Tambien se agregaron otros scrips al pakage.json:

- "migrations:run": "sequelize-cli db:migrate" // migra
- "migrations:revert": "sequelize-cli db:migrate:undo" // rollback
- "migrations:delete": "sequelize-cli db:migrate:undo:all" // borra todo

Luego borramos las tablas con PgAdmin para dejar la base de datos limpia y corrimos desde la consola el script:

- npm run migrations:run

Esto nos creo las tablas 'products', 'users' y tambien una llamada SequelizeMeta que contiene el historico de migraciones.

Vemos un ejemplo de segunda migracion donde alteramos una tabla ya creada agregandole un nuevo campo llamado role a la tabla usuarios mediante una migracion, sin alterar el contenido anterior de las tablas.

-------------------------------------------------------------------------
###### 21/04/23
Se creó toda la seccion de customers (routes, schemas, models, db, etc). La tabla se creó desde la base de datos, no por medio de una migracion.

-------------------------------------------------------------------------
###### 24/04/23
### Asociaciones 1 a 1
Para asociar los Customers a los Usuarios, vamos a usar el metodo belongsTo() en el archivo customers.model.js, en el metodo associate().
Luego de crear las asociaciones y crear las tablas con una migracion, agregamos el metodo unique al uid y generamos una nueva migracion para agregar este campo (ver migracion correspondiente).

#### Asociaciones 1 a Muchos
Se utilizan los metodos hasMany() o belongstoMany(). Ver casos de customers.model.js y orders.model.js.

### Asociaciones muchos a muchos
Es el caso de las ordenes de compra y los productos ya que pueden estar entrelazados y muchas ordenes tener el mismo productos, como asi la misma orden tener muchos productos. Para resolver estas relaciones se crea una tabla ternaria en el archivo order.product.model.js donde se especifica el modelo de la base de datos que luego relacionará la informacion de las ordenes y los productos. En este caso, desde orders.model.js agregamos la asociacion belongstoMany(), indicando que el destino es la tabla products pero atravez de la tabla ternaria order_products utilizando los campos oid y pid, y llamando a este nuevo array con el nombre 'items'.

#### Calculando en forma anidada desde Sequelize
podemos crear nuevos campos en el modelo que no se crearan en las tablas con el DataTypes.VIRTUAL. con el get() especificamos como obtener la información a calcular.

Ver ejemplo hecho en orders.model.js.

### Tipos de consulta customizadas con Sequelize
#### Paginacion
- limit = Numero de elementos que me trae
- offset = Apuntador de pagina

Ver ejemplo en productos.service.js. En general estos parametros vienen en los query params. Antes creamos un schema de validacion llamado queryProductSchema y lo usamos para validar su tipo.

#### Filtrando de forma compleja
Probaremos enviar un precio minimo y maximo y filtrarlo por medio de sequelize y query params. Estos se hacen por medio de la libreria sequelize y los metodos de Op.

Ver ejemplo en el metodo search del archivo productos.service.js.

### Deployment a Heroku con inclusion de bases de datos
-- Pendiente

-------------------------------------------------------------------------
###### 01/05/2023
### Autenticacion vs Autorizacion
- Autenticacion: Se encarga de verificar quien eres y si puedes ingresar o no de acuerdo a tus credenciales.

En general lo haremos utilizando credenciales de usuario y verificandolas contra la base de datos.

- Autorizacion: Relacionado a la gestion de permisos.

Como protegemos endpoints de acuerdo a roles o permisos.

Agregamos un middleware llamado checkApiKey y lo incluimos para validar el header.

### Hashing de contraseñas
Usando la libreria bcrypt. Creamos el archivo pass-hash.js como modelo en la raiz del directorio que se encargará de comparar las pw ingresadas con la hasheada.

Luego agregamos el metodo de encriptacion a los servicios de creacion de usuarios en los archivos customer.service.js y usuarios.service.js

### Pasport JS
Nos permite muchas estrategias de autentificacion (como google, facebook, twitter, etc).
Instalamos las siguientes dependencias:

- npm i passport passport-local

Agregamos la carpeta utils/auth y ahi agregamos el archivo index donde pondremosl as estrategias de autorizacion y tambien crearemos un directorio llamado strategies/ donde crearemos la logica de cada uno. En local.strategy.js esta la estrategia local.

### JSON Web Tokens (JWT)
Adema de comprobar, nos va a dar llaves de acceso.
Son stateless, no lo tienes que guardar en memoria ni en base de datos la informacion de acceso, se trata de un token que viene encriptado y tiene toda la informacion para identificar al usuario y sus permisos lo que permite tener un backend distribuido. Tambien permite el uso fuera de browser, como aplicaciones mobile. 

- Documentacion: https://jwt.io/

El token tiene 3 partes separadas por un punto (.):

- HEADER: algoritmo y tipo

{
  "alg": "HS256", 
  "typ": "JWT"
}

- PAYLOAD: DATA

{
  "sub": "126378916",
  "name": "John Doe",
  "lat": 1234414
}

- VERIFY SIGNATURE: combinacion encriptada del HEADER y el PAYLOAD mas una palabra clave que yo elijo

{
  HMACSHA256(
    base64UrldEncode(header) + '.' +
    base64UrldEncode(payload) + '.' +
    clave-secreta
  )
}

Instalacion:

- npm i jsonwebtoken

En el archivo jwt.estrategy.js esta la logica para validar con jwt. Luego se incluye el passport al index de la carpeta superior la posibilidad de loggearse con jwt y despues se utiliza como un middleware por cada endpoint que se desea segurizar.

### Control de roles / AUTORIZACIONES
Dentro del archivo auth.handler.js creamos el middleware checkRoles(...roles) que se encargarà de verificar que el rol de mi usuario està incluido dentro de los roles habilitados para la accion solicitada. Para poder usar este handler, antes es necesario, si o si, autenticarse ya que necesitamos saber de que usuario estamos hablando y sus privilegios.

otro metodo mas avanzado es con la libreria <accesscontrol> de npm.

-------------------------------------------------------------------------
###### 03/05/2023
Creamos la seccion profile para ver las ordenes de compra a partir del token gestionado para el usuario.

1. Ruta profile.router.js y generacion del endpoint
2. Agregamos al listado de rutas del index
3. Creacion del servicio que gestiona esta busqueda

### Consultas anidadas con JOIN
Ver ejemplo de busquedas de ordenes de compra por uuserId en el servicio orders.service.js --> findByUser y el endpoint creado en profile.router.js llamado /my-orders.

#### Manejo de autenticacion desde el cliente
Client Session Browser
1. Estado de Login
2. Cookies / LocalStorage de la sesion
3. Enviar en el header la informacion del token
4. Refresh token para gestionar la generacion de nuevo token automatico despues de la expiracion
5. Validacion de permisos (seguridad)

### Envio de mails con NodeJS
Uutilizaremos la libreria nodemailer

- npm i nodemailer

Se agregaron a la ruta de auth posts para el cambio de contraseña y login. Utilizando el nodemailes se agrego el archivo auth.service.js que incluye servicios para enviar mails, el login y la carga de informacion de entorno del servidor smtp. Las funciones utilizadas estan en dicho archivo.



