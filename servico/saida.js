const Dado = require('../dado/saida');
class saida {
  static async get(_id, pResidencia) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      if (_id == "" || _id == undefined) {
        var listaRecorrente = await Dado.find({ residencia: pResidencia, recorrente: true })
        var lista = JSON.parse(JSON.stringify(await Dado.find({ residencia: pResidencia, recorrente: false })))
        var listaTemp = []
        var data = new Date()
        var mesAtual = data.getMonth() + 1
        var anoAtual = data.getFullYear()
        for (var item of lista) {
          var valorRestante = 0
          for (var itemCompetencia of item.competencia) {
            if ((itemCompetencia.mes > mesAtual) || (itemCompetencia.ano > anoAtual)) {
              valorRestante = valorRestante + itemCompetencia.valor
            }
          }
          item.valor = valorRestante.toFixed(2);
          listaTemp.push(item)
        }
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", lista: lista, listaRecorrente: listaRecorrente }
      } else {
        var item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
        if (item == "" || item == undefined) {
          jsonRetorno.status = 200
          jsonRetorno.json = { status: false, descricao: "saida não encontrado!" }
        } else {
          var data = new Date()
          var mesAtual = data.getMonth() + 1
          var diaAtual = data.getDate()
          if (diaAtual >= 10) {
            mesAtual++;
          }

          var anoAtual = data.getFullYear()
          var listaCompetenciaTemp = []
          for (var itemCompetenciaTemp of item.competencia) {
            if ((itemCompetenciaTemp.mes >= mesAtual) || (itemCompetenciaTemp.ano > anoAtual)) {
              listaCompetenciaTemp.push(itemCompetenciaTemp)
            }
          }
          item.competencia = listaCompetenciaTemp
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
  static async paguei(_id, pMes, pAno) {
    var jsonRetorno = { status: 500, json: {} };
    try {
      var item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
      if (item == "" || item == undefined) {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "saida não encontrado!" }
      } else {
        var listaCompetenciaTemp = []
        var achei = false
        for (var itemCompetenciaTemp of item.competencia) {
          if ((itemCompetenciaTemp.mes == pMes) && (itemCompetenciaTemp.ano == pAno)) {
            achei = true
            itemCompetenciaTemp.paguei = !itemCompetenciaTemp.paguei
          }

          listaCompetenciaTemp.push(itemCompetenciaTemp)
        }
        if (!achei) {
          listaCompetenciaTemp.push({ mes: pMes, ano: pAno, paguei: true })
          listaCompetenciaTemp.sort((item1, item2) => item1.mes - item2.mes)
          listaCompetenciaTemp.sort((item1, item2) => item1.ano - item2.ano)
        }
        item.competencia = listaCompetenciaTemp
        var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: itemAtualizado }

      }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }
  static async confirmei(_id, pMes, pAno) {
    var jsonRetorno = { status: 500, json: {} };
    try {

      var item = JSON.parse(JSON.stringify(await Dado.findById(_id)))
      if (item == "" || item == undefined) {
        jsonRetorno.status = 200
        jsonRetorno.json = { status: false, descricao: "saida não encontrado!" }
      } else {
        var listaCompetenciaTemp = []
        var achei = false
        for (var itemCompetenciaTemp of item.competencia) {
          if ((itemCompetenciaTemp.mes == pMes) && (itemCompetenciaTemp.ano == pAno)) {
            achei = true
            itemCompetenciaTemp.confirmei = !itemCompetenciaTemp.confirmei
          }

          listaCompetenciaTemp.push(itemCompetenciaTemp)
        }
        if (!achei) {
          listaCompetenciaTemp.push({ mes: pMes, ano: pAno, confirmei: true })
          listaCompetenciaTemp.sort((item1, item2) => item1.mes - item2.mes)
          listaCompetenciaTemp.sort((item1, item2) => item1.ano - item2.ano)
        }
        item.competencia = listaCompetenciaTemp
        var itemAtualizado = await Dado.findByIdAndUpdate(item._id, item);
        jsonRetorno.status = 200
        jsonRetorno.json = { status: true, descricao: "busca realizada com sucesso!", item: itemAtualizado }

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
      jsonRetorno.json = { status: true, descricao: "saida deletado com sucesso!", item: item }
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
      if(!item.recorrente){
        item.mes = ""
        item.ano = ""
      }
      var itemCriado = await Dado.create(item);
      jsonRetorno.status = 201
      jsonRetorno.json = { status: true, descricao: "saida criado com sucesso!", item: itemCriado }
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
      jsonRetorno.json = { status: true, descricao: "saida atualizado com sucesso!", item: itemAtualizado }
    } catch (error) {
      jsonRetorno.status = 200
      jsonRetorno.json = { status: false, descricao: error.toString() }
    }
    return jsonRetorno
  }

}

module.exports = saida;