
# Sample Market Place

Este proyecto fue desarrollado en NodeJs durante practicas de diferentes cursos y consiste en una API que utiliza Express para publicar determinados endpoints para la simulacion de una eCommerce. Si bien no se profundizó sobre todos los aspectos que podria tener una eCommerce real, se podrian separar algunas identidades basicas como ser:

- Productos
- Usuarios
- Categorias
- Ordenes
- Clientes
- Perfiles

La estructura de directorios esta segmentada de la siguiente manera:

- api: api files
- libs: ORM files y db connection files
- example-methods: algunos codigos utilizados a modo de ejemplo
- db: db config and migration files, ORM models
- config: archivo js para estructurar las variables de entorno
- utils: auth and mailer files

El directorio api, cuenta con un archivo `index.js` encargado de iniciar el servidor de express, con todas sus options, rutas y middlewares.

Dentro de este directorio encontraremos otros 4 directorios correspondientes a los middlewares, las rutas, los servicios (o logica de negocio) y los schemas.


## Run Locally

Before running the application it is necessary to define the port of the express server. To do that, you must create an .env file in the root directory of the application. You can find the required parameters in the .env.example file.

Clone the project
```bash
  git clone https://github.com/JPepe90/node-expressjs.git
```

Go to the project directory
```bash
  cd node-expressjs
```

Install dependencies
```bash
  npm install
```

Start the server
```bash
  npm run start
```


## API Reference

All the endpoints use http://localhost:<port>/api/v1. Where <port>'s value is the one defined in your local .env file.

#### Check Express Server is working

```http
  GET /
```

Returns a message saying: "Hola, bienvenido a esta nueva eCommerce".

### Products

#### Get products

```http
  GET /productos
```

Return a json format Array containing all the products stored in the db.

#### Get one product

```http
  GET /productos/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `number` | **Required**. Id of product to fetch |

Return a json format Object containing information of the product stored in the db.

#### Create product

```http
  POST /productos
```

Body must be in json format and containt the following parameters:

| Parameter    | Type      | Description                          |
| :----------- | :-------- | :----------------------------------- |
| `name`       | `string`  | **Required**. Product's name         |
| `price`      | `number`  | **Required**. Product's price        |
| `image`      | `string`  | Product's image link                 |
| `categoryId` | `number`  | **Required**. Product's categoryId   |
| `description`| `string`  | **Required**. Product's description  |
| `isBlock`    | `boolean` | **Required**. option to make modifications to product |

Return a json format Object containing information of the product created in the db.


