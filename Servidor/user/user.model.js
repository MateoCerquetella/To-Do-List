const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true
});

module.exports = userSchema;