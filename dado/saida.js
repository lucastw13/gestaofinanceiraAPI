const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaSaida = new Schema({
    descricao: {
        type: String
    },
    recorrente: {
        type: Boolean
    },
    mozao: {
        type: Boolean
    },
    valor: {
        type: Number
    },
    competencia: {
        type: [{
            mes: {
                type: Number
            },
            ano: {
                type: Number
            },
            valor: {
                type: Number
            },
            paguei: {
                type: Boolean
            },
            confirmei: {
                type: Boolean
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


const saida = mongoose.model('saida', SchemaSaida);
module.exports = saida