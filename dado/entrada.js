const mongoose = require('mongoose')

const entrada = mongoose.model('entrada',{
    descricao:String,
    valor:Number,
    recorrente:Boolean,
    mes:Number,
    ano:Number,
    usuario:String,
    data:String,
    hora:String,
    usuarioAlteracao:String,
    dataAlteracao:String,
    horaAlteracao:String,
    residencia:String,
});

module.exports = entrada