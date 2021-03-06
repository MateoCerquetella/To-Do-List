const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const toDoSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  fecha: {
    type: Date
  },
  descripcion: {
    type: String
  },
  completado: {
    type: Boolean,
    required: true
  },
}, 
{
  timestamps: true
});

module.exports = toDoSchema;