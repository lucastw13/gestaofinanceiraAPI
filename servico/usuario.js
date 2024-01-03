const Dado = require('../dado/usuario');
class usuario {
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findOne({ nome: body.nome, residencia:body.residencia})
      if (item != "" && item != undefined) {
        if (item.senha == body.senha) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "usuário autenticado com sucesso!", item }

        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "usuário ou senha inválida" }

        }
      } else {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "usuário ou senha inválida" }

      }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

  static async get(_id) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findById(_id)
      if (item == "" || item == undefined) {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "usuario não encontrado!" }
      } else {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
      }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }


}

module.exports = usuario;