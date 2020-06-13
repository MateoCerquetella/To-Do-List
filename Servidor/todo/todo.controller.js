const mongoose = require('mongoose');
const toDoSchema = require('./todo.model');
const ToDo = mongoose.model('ToDo', toDoSchema);

//Crear ToDo
exports.create = (req, res) => {
  if (!req.body.nombre || req.body.completado === undefined) {
    return res.status(400).send({
      message: 'Falta contenido en el cuerpo.'
    });
  }

  const newToDo = {
    userId: req.user,
    nombre: req.body.nombre,
    fecha: req.body.fecha,
    descripcion: req.body.descripcion,
    completado: req.body.completado
  }

  ToDo.create(newToDo)
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Se ha producido un error al querer cargar una nueva tarea'
      });
    });
}

//Obtener todos los ToDo
exports.read = (req, res) => {
  ToDo.find({ userId: req.user })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Se ha producido un error al querer traer una nueva tarea'
      });
    });
}

//Actualizar un ToDo
exports.update = (req, res) => {
  if (!req.body.nombre || !req.body.completado) {
    return res.status(400).send({
      message: 'Falta contenido en el cuerpo.'
    });
  }

  ToDo.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: 'Se ha producido un error al querer editar la tarea'
      });
    });
}

//Borrar un ToDo
exports.delete = (req, res) => {
  ToDo.findOneAndDelete({$and:[{ _id: req.params.id },{ userId: req.user }]})
    .then((data) => {
       if (data === null) {
        return res.status(409).send({
          message: 'La tarea no pertenece a el usuario logeado'
        });
       }
       return res.status(200).send({ message: 'Se ha eliminado la tarea con éxito'});
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Se ha producido un error al querer eliminar la tarea'
      });
    });


}








