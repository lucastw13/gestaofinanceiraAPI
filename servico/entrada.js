const Dado = require('../dado/entrada');
class entrada {
  static async get(_id, pResidencia) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var lista = []

        lista = JSON.parse(JSON.stringify(await Dado.find({ residencia: pResidencia })))
        lista = lista.sort((item1, item2) => item1.mes - item2.mes)
        lista = lista.sort((item1, item2) => item1.ano - item2.ano)

        var listaTemp = []
        for (var item of lista) {
          if (item.recorrente) {
            item.periodo = "Recorrente"
          } else {
            item.periodo = item.mes+"/"+item.ano
          }
          listaTemp.push(item)
        }
        lista = listaTemp
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "entrada não encontrado!" }
        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
        }
      }

    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async delete(_id) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      const item = await Dado.findByIdAndDelete(_id)
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "entrada deletado com sucesso!", item: item }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async post(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "entrada criado com sucesso!", item: itemCriado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async put(body) {
    var jsonRetorno = { status: 500, json: {} };
    var item = body
    try {
      var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "entrada atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = entrada;