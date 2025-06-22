const DadoEntrada = require('../dado/entrada');
const DadoSaida = require('../dado/saida');

class competencia {
  static async get(residencia) {
    const diaCorte = 8
    var jsonRetorno = { status: 500, json: {} };
    try {
      var lista = []
      var data = new Date()
      var dia = data.getDate()
      var mes = data.getMonth() + 1
      if (dia >= diaCorte) {
        mes++;
      }
      var ano = data.getFullYear()
      var listaEntradaRecorrente = JSON.parse(JSON.stringify(await DadoEntrada.find({ residencia: residencia, recorrente: true })))
      var listaSaidaRecorrente = JSON.parse(JSON.stringify(await DadoSaida.find({ residencia: residencia, recorrente: true })))
      var listaSaida = JSON.parse(JSON.stringify(await DadoSaida.find({ residencia: residencia, recorrente: false })))
      var totalMozaoRecorrente = 0
      var listaMozaoRecorrente = []
      var totalSaidaRecorrente = 0
      var listaSaidaRecorrenteTemp = []
      var totalSomenteRecorrente = 0
      for (var itemSaidaRecorrente of listaSaidaRecorrente) {
        if (itemSaidaRecorrente.valor != 0) {
          totalSaidaRecorrente += itemSaidaRecorrente.valor
          if (itemSaidaRecorrente.mozao) {
            totalMozaoRecorrente += itemSaidaRecorrente.valor
            listaMozaoRecorrente.push(itemSaidaRecorrente)
          } else {
            totalSomenteRecorrente += itemSaidaRecorrente.valor
            listaSaidaRecorrenteTemp.push(itemSaidaRecorrente)
          }
        }
      }
      listaSaidaRecorrente = listaSaidaRecorrenteTemp
      for (var contador = 0; contador <= 12; contador++) {
        if (mes > 12) {
          ano++
          mes = 1
        }

        var listaSaidaRecorrenteTemp = []
        for (var itemSaidaRecorrenteTemp of listaSaidaRecorrente) {
          var itemNovoSaidaRecorrente = {
            _id: itemSaidaRecorrenteTemp._id,
            descricao: itemSaidaRecorrenteTemp.descricao,
            valor: itemSaidaRecorrenteTemp.valor,
            competencia: itemSaidaRecorrenteTemp.competencia
          }

          var achou = false
          if (!achou) {
            for (var itemCompetenciaTemp of itemSaidaRecorrenteTemp.competencia) {
              if (!achou) {
                if ((itemCompetenciaTemp.mes == mes) && (itemCompetenciaTemp.ano == ano)) {
                  itemNovoSaidaRecorrente.paguei = itemCompetenciaTemp.paguei
                  itemNovoSaidaRecorrente.confirmei = itemCompetenciaTemp.confirmei
                  achou = true
                  break
                }
              }
            }
          }
          listaSaidaRecorrenteTemp.push(itemNovoSaidaRecorrente)
        }

        var item = {}
        item.totalEntrada = 0
        item.totalSaida = totalSaidaRecorrente
        item.totalSomenteRecorrente = totalSomenteRecorrente
        item.totalSomenteNaoRecorrente = 0
        item.entrada = []
        item.saida = []
        item.saidaRecorrente = listaSaidaRecorrenteTemp
        item.ano = ano
        item.mes = mes
        var listaEntrada = JSON.parse(JSON.stringify(await DadoEntrada.find({ residencia: residencia, mes: mes, ano: ano, recorrente: false })))
        listaEntrada = listaEntrada.concat(listaEntradaRecorrente)
        for (var itemEntrada of listaEntrada) {
          if (itemEntrada.valor > 0) {
            item.totalEntrada += itemEntrada.valor
            item.entrada.push(itemEntrada)
          }
        }
        item.saida = []
        item.mozao = []
        item.totalMozao = totalMozaoRecorrente
        item.mozao = item.mozao.concat(listaMozaoRecorrente)
        for (var itemSaida of listaSaida) {
          if ((itemSaida.competencia != "") && (itemSaida.competencia != undefined)) {
            for (var itemCompetencia of itemSaida.competencia) {
              if (itemCompetencia.valor != 0) {
                if ((itemCompetencia.mes == mes) && (itemCompetencia.ano == ano)) {
                  item.totalSaida += itemCompetencia.valor
                  if (itemSaida.mozao) {
                    item.totalMozao += itemCompetencia.valor
                    item.mozao.push({ _id: itemSaida._id, descricao: itemSaida.descricao, valor: itemCompetencia.valor, paguei: itemCompetencia.paguei, confirmei: itemCompetencia.confirmei })
                  } else {
                    item.totalSomenteNaoRecorrente += itemCompetencia.valor
                    item.saida.push({ _id: itemSaida._id, descricao: itemSaida.descricao, valor: itemCompetencia.valor, paguei: itemCompetencia.paguei, confirmei: itemCompetencia.confirmei })
                  }
                }
              }
            }
          }
        }
        item.saldo = item.totalEntrada - item.totalSaida
        item.totalEntrada = "R$" + item.totalEntrada;
        item.totalSaida = "R$" + item.totalSaida.toFixed(2);
        item.saldo = "R$" + item.saldo.toFixed(2);
        item.totalMozao = "R$" + item.totalMozao.toFixed(2);
        item.totalSomenteNaoRecorrente = "R$" + item.totalSomenteNaoRecorrente.toFixed(2);
        item.totalSomenteRecorrente = "R$" + item.totalSomenteRecorrente.toFixed(2);

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