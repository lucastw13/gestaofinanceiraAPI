const Dado = require('../dado/competencia');
const DadoEntrada = require('../dado/entrada');
const DadoSaida = require('../dado/saida');

class competencia {
  static async get() {
    var jsonRetorno = { status: 500, json: {} };
    try {
      var lista = []
      var data = new Date()
      var mes = data.getMonth() + 1
      var ano = data.getFullYear()
      var listaEntradaRecorrente = JSON.parse(JSON.stringify(await DadoEntrada.find({ recorrente: true })))
      var listaSaidaRecorrente = JSON.parse(JSON.stringify(await DadoSaida.find({ recorrente: true })))
      var totalMozaoRecorrente = 0
      var listaMozaoRecorrente = []
      console.log(listaSaidaRecorrente)
      var totalSaidaRecorrente = 0
      for (var itemSaidaRecorrente of listaSaidaRecorrente) {
        totalSaidaRecorrente += itemSaidaRecorrente.valor
        if (itemSaidaRecorrente.mozao){
          totalMozaoRecorrente+=itemSaidaRecorrente.valor
          listaMozaoRecorrente.push(itemSaidaRecorrente)
        }
      }

      for (var contador = 0; contador <= 12; contador++) {
        if (mes > 12) {
          ano++
          mes = 1
        }
        var item = {}
        item.totalEntrada = 0
        item.totalSaida = totalSaidaRecorrente
        
        item.entrada = []
        item.saida = []
        item.saidaRecorrente = listaSaidaRecorrente
        item.ano = ano
        item.mes = mes
        var listaEntrada = JSON.parse(JSON.stringify(await DadoEntrada.find({ mes: mes, ano: ano, recorrente: false })))
        listaEntrada = listaEntrada.concat(listaEntradaRecorrente)
        for (var itemEntrada of listaEntrada) {
          item.totalEntrada += itemEntrada.valor
          item.entrada.push(itemEntrada)
        }
        var listaSaida = JSON.parse(JSON.stringify(await DadoSaida.find({ recorrente: false })))
        item.saida = []
        item.mozao = []
        item.totalMozao = totalMozaoRecorrente
        item.mozao = item.mozao.concat(listaMozaoRecorrente)
        for (var itemSaida of listaSaida) {
          if ((itemSaida.competencia != "") && (itemSaida.competencia != undefined)) {
            for (var itemCompetencia of itemSaida.competencia) {
              if ((itemCompetencia.mes == mes) && (itemCompetencia.ano == ano)) {
                item.totalSaida += itemCompetencia.valor
                item.saida.push({ descricao: itemSaida.descricao, valor: itemCompetencia.valor })
                if (itemSaida.mozao){
                  item.totalMozao+=itemCompetencia.valor
                  item.mozao.push({ descricao: itemSaida.descricao, valor: itemCompetencia.valor })
                }
              }
            }
          }
        }
        item.saldo = item.totalEntrada - item.totalSaida
        item.totalEntrada = "R$" + item.totalEntrada.toFixed(2);
        item.totalSaida = "R$" + item.totalSaida.toFixed(2);
        item.saldo = "R$" + item.saldo.toFixed(2);
        item.totalMozao = "R$" + item.totalMozao.toFixed(2);
        lista.push(item)
        mes++
      }
      jsonRetorno.status = 200
      jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
}

module.exports = competencia;