const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SchemaAcao = new Schema({
    descricao: {
        type: String
    },
    compra: {
        type: [{
            dia: {
                type: Number
            },
            mes: {
                type: Number
            },
            ano: {
                type: Number
            },
            valor: {
                type: Number
            },
            quantidade: {
                type: Number
            }
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


const acao = mongoose.model('acao', SchemaAcao);
module.exports = acao