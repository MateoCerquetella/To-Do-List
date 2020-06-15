'use strict'
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const DB = require('./config/db');
const userRoutes = require('./user/user.routes');
const todoRoutes = require('./todo/todo.routes');

// Configuracion del servidor
app.use(bodyParser.json()); //Parseo requests de content-type - application/json);
app.use(bodyParser.urlencoded({ extended: true }));  //Parseo requests de content-type - application/x-www-form-urlencoded);
app.use(cors());

// Inicio DB
DB();

// Creo rutas y puertos
userRoutes(app);
todoRoutes(app);

// Configuro el puerto. Tomo el puerto del sistema operativo o el 3000
app.set('port', process.env.PORT || 3000);

// Static files (ej: PUBLIC donde contiene HTML, CSS, JS). Son archivos estaticos ya que se carga solamente una vez
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public'))); //Le enviamos la carpeta PUBLIC al navegador. Especifico de donde lo saco el PUBLIC. El path.join une mi directorio donde tengo mi proyecto + PUBLIC
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // Path relativo
  });
}

// Inicio el servidor
app.listen(app.get('port'), () => {
  console.log('server on port:', app.get('port'));
});

// Error handler
app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});