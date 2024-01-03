const Dado = require('../dado/competencia');
const DadoEntrada = require('../dado/entrada');
const DadoSaida = require('../dado/saida');

class competencia {
  static async get(_id, pResidencia, pEntidade2) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        const lista = JSON.parse(JSON.stringify(await Dado.find({ residencia: pResidencia })))
        for (var itemCompetencia of lista) {
          itemCompetencia.totalEntrada = 0
          for (var itemEntrada of itemTemp.entrada) {
            itemTemp.totalEntrada = itemTemp.totalEntrada + itemEntrada.valor
          }
          itemCompetencia.totalSaida = 0
          for (var itemSaida of itemTemp.saida) {
            itemTemp.totalSaida = itemTemp.totalSaida + itemSaida.valor
          }
          itemCompetencia.saldo = itemTemp.totalEntrada - itemTemp.totalSaida
        }

        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
      } else {
        const item = await Dado.findById(_id)
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "competencia não encontrado!" }
        } else {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: item }
          if (pEntidade2 != "" && pEntidade2 != undefined) {
            if (pEntidade2 == "entrada") {
              var lista = []
              for (var itemEntradaTemp of item.entrada) {
                var itemEntrada = JSON.parse(JSON.stringify(await DadoEntrada.findById(itemEntradaTemp._id)))
                lista.push(itemEntrada)
                jsonRetorno.status = 200
              }
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            }
            if (pEntidade2 == "saida") {
              var lista = []
              for (var itemSaidaTemp of item.saida) {
                var itemSaida = JSON.parse(JSON.stringify(await DadoSaida.findById(itemSaidaTemp._id)))
                lista.push(itemSaida)
                jsonRetorno.status = 200
              }
              jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }

            }
          }
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
      jsonRetorno.json = { status: true, descricao: "competencia deletado com sucesso!", item: item }
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
      //var itemCriado = Dado.findOne({mes:body.mes,ano:body.ano})
      //if ((itemCriado==undefined)||(itemCriado=="")){
      //  console.log(itemCriado._id)
      var itemCriado = await Dado.create(item);
      //}
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "competencia criado com sucesso!", item: itemCriado }
      const funcao = new Funcao()
      funcao.atualizarEntradaSaida(itemCriado)
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
      jsonRetorno.json = { status: true, descricao: "competencia atualizado com sucesso!", item: itemAtualizado }
      const funcao = new Funcao()
      funcao.atualizarEntradaSaida(itemAtualizado)
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
}

class Funcao {
  async atualizarEntradaSaida(pItem) {
    for (var item of pItem.entrada) {
      console.log(item)
      var itemEntrada = JSON.parse(JSON.stringify(await DadoEntrada.findById(item._id)))
      if (itemEntrada == "" || itemEntrada == undefined) {
        itemEntrada.valor = item.valor
        await DadoEntrada.findByIdAndUpdate(itemEntrada._id, itemEntrada);
      }
    }
    for (var item of pItem.saida) {
      var itemSaida = JSON.parse(JSON.stringify(await DadoSaida.findById(item._id)))
      if (itemSaida == "" || itemSaida == undefined) {
        itemSaida.valor = item.valor
        await DadoSaida.findByIdAndUpdate(itemSaida._id, itemSaida);
      }
    }
  }
}

module.exports = competencia;