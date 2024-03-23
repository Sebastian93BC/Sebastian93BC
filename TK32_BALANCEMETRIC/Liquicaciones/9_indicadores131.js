[
  {
    "$match": {
      "$expr": {
        "$eq": [
          "$fecha_valor", {
            "$subtract": [
              {
                "$toDate": {
                  "$dateFromString": {
                    "dateString": {
                      "$dateToString": {
                        "format": "%Y-%m-%dT00:00:00%z", 
                        "date": {
                          "$toDate": "$$NOW"
                        }
                      }
                    }
                  }
                }
              }, {
                "$multiply": [
                  {
                    "$toInt": "{{$json.offSet}}"
                  }, 86400000
                ]
              }
            ]
          }
        ]
      }
    }
  }, {
    "$project": {
      "settlmntAmount": 1, 
      "settlmntCount": 1, 
      "yesterdayDate": 1, 
      "previusMonthDate": 1, 
      "previusYearDate": 1, 
      "fecha_valor": 1
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "yesterdayDate", 
      "foreignField": "fecha_valor", 
      "as": "BalancemetricyesterdayDate"
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "previusMonthDate", 
      "foreignField": "fecha_valor", 
      "as": "BalancemetricpreviusMonthDate"
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "previusYearDate", 
      "foreignField": "fecha_valor", 
      "as": "BalancemetricpreviuspreviusYearDate"
    }
  }, {
    "$project": {
      "montoLiq_current": "$settlmntAmount", 
      "numLiq_current": "$settlmntCount", 
      "montoLiqTotal_monthAcc": {
        "$first": "$BalancemetricyesterdayDate.liquidacionesBs.montoLiqTotal.monthAcc"
      }, 
      "numLiq_monthAcc": {
        "$first": "$BalancemetricyesterdayDate.liquidacionesBs.numLiqTotal.monthAcc"
      }, 
      "montoLiqTotal_monthAccPrev": {
        "$first": "$BalancemetricpreviusMonthDate.liquidacionesBs.montoLiqTotal.monthAccPrev"
      }, 
      "numLiq_monthAccPrev": {
        "$first": "$BalancemetricpreviusMonthDate.liquidacionesBs.numLiqTotal.monthAccPrev"
      }, 
      "montoLiqTotal_annualAcc": {
        "$first": "$BalancemetricyesterdayDate.liquidacionesBs.montoLiqTotal.annualAcc"
      }, 
      "numLiq_annualAcc": {
        "$first": "$BalancemetricyesterdayDate.liquidacionesBs.numLiqTotal.annualAcc"
      }, 
      "montoLiqTotal_annualAccPrev": {
        "$first": "$BalancemetricpreviuspreviusYearDate.liquidacionesBs.montoLiqTotal.annualAccPrev"
      }, 
      "numLiq_annualAccPrev": {
        "$first": "$BalancemetricpreviuspreviusYearDate.liquidacionesBs.numLiqTotal.annualAccPrev"
      }, 
      "fecha_valor": 1
    }
  }, {
    "$set": {
      "montoLiqTotal_monthAcc": {
        "$sum": [
          "$montoLiq_current", "$montoLiqTotal_monthAcc"
        ]
      }, 
      "numLiq_monthAcc": {
        "$sum": [
          "$numLiq_current", "$numLiq_monthAcc"
        ]
      }, 
      "montoLiqTotal_monthAccPrev": {
        "$sum": [
          "$montoLiqTotal_monthAccPrev"
        ]
      }, 
      "numLiq_monthAccPrev": {
        "$sum": [
          "$numLiq_monthAccPrev"
        ]
      }, 
      "montoLiqTotal_annualAcc": {
        "$sum": [
          "$montoLiq_current", "$montoLiqTotal_annualAcc"
        ]
      }, 
      "numLiq_annualAcc": {
        "$sum": [
          "$numLiq_current", "$numLiq_annualAcc"
        ]
      }, 
      "montoLiqTotal_annualAccPrev": {
        "$sum": [
          "$montoLiqTotal_annualAccPrev"
        ]
      }, 
      "numLiq_annualAccPrev": {
        "$sum": [
          "$numLiq_annualAccPrev"
        ]
      }
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "fecha_valor", 
      "foreignField": "Fecha", 
      "as": "result"
    }
  }, {
    "$addFields": {
      "montoLiq_currentUSD": {
        "$round": [
          {
            "$divide": [
              "$montoLiq_current", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "montoLiqTotal_monthAccUSD": {
        "$round": [
          {
            "$divide": [
              "$montoLiqTotal_monthAcc", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "montoLiqTotal_monthAccPrevUSD": {
        "$round": [
          {
            "$divide": [
              "$montoLiqTotal_monthAccPrev", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "montoLiqTotal_annualAccUSD": {
        "$round": [
          {
            "$divide": [
              "$montoLiqTotal_annualAcc", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "montoLiqTotal_annualAccPrevUSD": {
        "$round": [
          {
            "$divide": [
              "$montoLiqTotal_annualAccPrev", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "annualGrowthPrc": {
        "$cond": [
          {
            "$ne": [
              "$montoLiqTotal_annualAccPrev", 0
            ]
          }, {
            "$multiply": [
              {
                "$divide": [
                  {
                    "$subtract": [
                      "$montoLiqTotal_annualAcc", "$montoLiqTotal_annualAccPrev"
                    ]
                  }, "$montoLiqTotal_annualAccPrev"
                ]
              }, 100
            ]
          }, 0
        ]
      }, 
      "result": "$$REMOVE", 
      "_id": "$$REMOVE"
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "fecha_valor", 
      "foreignField": "fecha_valor", 
      "as": "Balancemetric"
    }
  }, {
    "$set": {
      "Balancemetric": {
        "$first": "$Balancemetric"
      }
    }
  }, {
    "$set": {
      "Balancemetric.liquidacionesBs.montoLiqTotal.current": "$montoLiq_current", 
      "Balancemetric.liquidacionesBs.montoLiqTotal.monthAcc": "$montoLiqTotal_monthAcc", 
      "Balancemetric.liquidacionesBs.montoLiqTotal.monthAccPrev": "$montoLiqTotal_monthAccPrev", 
      "Balancemetric.liquidacionesBs.montoLiqTotal.annualAcc": "$montoLiqTotal_annualAcc", 
      "Balancemetric.liquidacionesBs.montoLiqTotal.annualAccPrev": "$montoLiqTotal_annualAccPrev", 
      "Balancemetric.liquidacionesBs.montoLiqTotal.annualGrowthPrc": "$annualGrowthPrc", 
      "Balancemetric.liquidacionesBs.numLiqTotal.current": "$numLiq_current", 
      "Balancemetric.liquidacionesBs.numLiqTotal.monthAcc": "$numLiq_monthAcc", 
      "Balancemetric.liquidacionesBs.numLiqTotal.monthAccPrev": "$numLiq_monthAccPrev", 
      "Balancemetric.liquidacionesBs.numLiqTotal.annualAcc": "$numLiq_annualAcc", 
      "Balancemetric.liquidacionesBs.numLiqTotal.annualAccPrev": "$numLiq_annualAccPrev", 
      "Balancemetric.liquidacionesBs.numLiqTotal.annualGrowthPrc": "$annualGrowthPrc", 
      "Balancemetric.liquidaciones.montoLiqTotal.current": "$montoLiq_currentUSD", 
      "Balancemetric.liquidaciones.montoLiqTotal.monthAcc": "$montoLiqTotal_monthAccUSD", 
      "Balancemetric.liquidaciones.montoLiqTotal.monthAccPrev": "$montoLiqTotal_monthAccPrevUSD", 
      "Balancemetric.liquidaciones.montoLiqTotal.annualAcc": "$montoLiqTotal_annualAccUSD", 
      "Balancemetric.liquidaciones.montoLiqTotal.annualAccPrev": "$montoLiqTotal_annualAccPrevUSD", 
      "Balancemetric.liquidaciones.montoLiqTotal.annualGrowthPrc": "$annualGrowthPrc", 
      "Balancemetric.liquidaciones.numLiqTotal.current": "$numLiq_current", 
      "Balancemetric.liquidaciones.numLiqTotal.monthAcc": "$numLiq_monthAcc", 
      "Balancemetric.liquidaciones.numLiqTotal.monthAccPrev": "$numLiq_monthAccPrev", 
      "Balancemetric.liquidaciones.numLiqTotal.annualAcc": "$numLiq_annualAcc", 
      "Balancemetric.liquidaciones.numLiqTotal.annualAccPrev": "$numLiq_annualAccPrev", 
      "Balancemetric.liquidaciones.numLiqTotal.annualGrowthPrc": "$annualGrowthPrc"
    }
  }, {
    "$project": {
      "Balancemetric": 1
    }
  }, {
    "$merge": {
      "into": "Balancemetric", 
      "on": "fecha_valor", 
      "whenMatched": "merge", 
      "whenNotMatched": "insert"
    }
  }
]