const mongoose = require('mongoose')

const residencia = mongoose.model('residencia',{
    descricao:String,
});

module.exports = residencia