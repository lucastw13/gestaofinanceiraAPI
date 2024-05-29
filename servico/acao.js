const Dado = require('../dado/acao');
class acao {
  static async get(_id, pResidencia) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var lista = JSON.parse(JSON.stringify(await Dado.find({ residencia: pResidencia})))
        var listaTemp = []
        var data = new Date()
        var mesAtual = data.getMonth() + 1
        var anoAtual = data.getFullYear()
        for (var item of lista) {
          var valorRestante = 0
          for (var itemCompra of item.compra) {
            if ((itemCompra.mes > mesAtual) || (itemCompra.ano > anoAtual)) {
              valorRestante = valorRestante + itemCompra.valor
            }
          }
          item.valor = valorRestante.toFixed(2);
          listaTemp.push(item)
        }
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista}
      } else {
        var item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "ação não encontrado!" }
        } else {
          var listaCompraTemp = []
          for (var itemCompraTemp of item.compra) {
            var dia = itemCompraTemp.dia
            if (dia<10) {
              dia = "0"+dia
            }
            var mes = itemCompraTemp.mes
            if (mes<10) {
              mes = "0"+mes
            }
            itemCompraTemp.data = dia+"/"+mes+"/"+itemCompraTemp.ano

            itemCompraTemp.total = itemCompraTemp.valor*itemCompraTemp.quantidade
            listaCompraTemp.push(itemCompraTemp)
          }
          item.compra = listaCompraTemp
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
      jsonRetorno.json = { status: true, descricao: "ação deletado com sucesso!", item: item }
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
      jsonRetorno.json = { status: true, descricao: "ação criado com sucesso!", item: itemCriado }
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
      jsonRetorno.json = { status: true, descricao: "ação atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = acao;