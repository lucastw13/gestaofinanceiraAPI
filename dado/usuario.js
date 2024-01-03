const mongoose = require('mongoose')

const usuario = mongoose.model('usuario',{
    nome:String,
    senha:String,
    empresa:String,
    nivel:Number,
});

module.exports = usuario