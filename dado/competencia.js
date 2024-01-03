const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaCompetencia = new Schema({
    mes: {
        type: Number
    },
    ano: {
        type: Number
    },
    entrada: {
        type: [{
            _id: {
                type: String
            },
            valor: {
                type: Number
            },
        }]
    },
    saida: {
        type: [{
            _id: {
                type: String
            },
            valor: {
                type: Number
            },
        }]
    },
    data: {
        type: String
    },
    hora: {
        type: String
    },
    usuario: {
        type: String
    },
    dataAlteracao: {
        type: String
    },
    horaAlteracao: {
        type: String
    },
    usuarioAlteracao: {
        type: String
    },
    residencia: {
        type: String
    },
});


const competencia = mongoose.model('competencia', SchemaCompetencia);
module.exports = competencia