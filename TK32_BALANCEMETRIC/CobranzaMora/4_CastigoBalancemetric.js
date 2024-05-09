[
  {
    "$addFields": {
      "today": {
        "$subtract": [
          {
            "$dateTrunc": {
              "date": "$$NOW", 
              "unit": "day"
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
    }
  }, {
    "$addFields": {
      "prevusMonthFirstDateYear": {
        "$dateTrunc": {
          "date": {
            "$dateSubtract": {
              "startDate": {
                "$dateTrunc": {
                  "date": "$today", 
                  "unit": "month"
                }
              }, 
              "unit": "month", 
              "amount": 1
            }
          }, 
          "unit": "year"
        }
      }, 
      "previusMonthFirstDate": {
        "$dateSubtract": {
          "startDate": {
            "$dateTrunc": {
              "date": "$today", 
              "unit": "month"
            }
          }, 
          "unit": "month", 
          "amount": 1
        }
      }, 
      "previusMonthLastDate": {
        "$dateSubtract": {
          "startDate": {
            "$dateTrunc": {
              "date": "$today", 
              "unit": "month"
            }
          }, 
          "unit": "day", 
          "amount": 1
        }
      }
    }
  }, {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$gte": [
              "$fecha", "$prevusMonthFirstDateYear"
            ]
          }
        }, {
          "$expr": {
            "$lte": [
              "$fecha", "$previusMonthLastDate"
            ]
          }
        }
      ]
    }
  }, {
    "$group": {
      "_id": "A", 
      "acAnualMonto": {
        "$sum": "$castigo"
      }, 
      "acMensualMonto": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$previusMonthLastDate", "$fecha"
              ]
            }, "$castigo", 0
          ]
        }
      }, 
      "monto": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$previusMonthLastDate", "$fecha"
              ]
            }, "$castigo", 0
          ]
        }
      }, 
      "acAnualMontoBs": {
        "$sum": "$castigoBs"
      }, 
      "acMensualMontoBs": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$previusMonthLastDate", "$fecha"
              ]
            }, "$castigoBs", 0
          ]
        }
      }, 
      "montoBs": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$previusMonthLastDate", "$fecha"
              ]
            }, "$castigoBs", 0
          ]
        }
      }, 
      "prevusMonthFirstDateYear": {
        "$first": "$prevusMonthFirstDateYear"
      }, 
      "previusMonthFirstDate": {
        "$first": "$previusMonthFirstDate"
      }, 
      "previusMonthLastDate": {
        "$first": "$previusMonthLastDate"
      }
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "previusMonthLastDate", 
      "foreignField": "Fecha", 
      "as": "sidis_tasaconversion"
    }
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "sidis_tasaconversion": "$$REMOVE", 
      "prevusMonthFirstDateYear": "$$REMOVE", 
      "acAnualMonto": {
        "$round": [
          {
            "$multiply": [
              "$acAnualMonto", 1000000
            ]
          }, 4
        ]
      }, 
      "acMensualMonto": {
        "$round": [
          {
            "$multiply": [
              "$acMensualMonto", 1000000
            ]
          }, 4
        ]
      }, 
      "monto": {
        "$round": [
          {
            "$multiply": [
              "$monto", 1000000
            ]
          }, 4
        ]
      }, 
      "acAnualMontoUVC": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$acAnualMontoBs", {
                    "$first": "$sidis_tasaconversion.Tasa_UVC"
                  }
                ]
              }, 1000000
            ]
          }, 4
        ]
      }, 
      "acMensualMontoUVC": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$acMensualMontoBs", {
                    "$first": "$sidis_tasaconversion.Tasa_UVC"
                  }
                ]
              }, 1000000
            ]
          }, 4
        ]
      }, 
      "montoUVC": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$montoBs", {
                    "$first": "$sidis_tasaconversion.Tasa_UVC"
                  }
                ]
              }, 1000000
            ]
          }, 4
        ]
      }
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "let": {
        "firstDate": "$previusMonthFirstDate", 
        "lastDate": "$previusMonthLastDate"
      }, 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$gte": [
                    "$fecha_valor", "$$firstDate"
                  ]
                }
              }, {
                "$expr": {
                  "$lte": [
                    "$fecha_valor", "$$lastDate"
                  ]
                }
              }
            ]
          }
        }, {
          "$project": {
            "fecha_valor": 1, 
            "cobranzaMora": 1, 
            "cobranzaMoraUVC": 1
          }
        }
      ], 
      "as": "Balancemetric"
    }
  }, {
    "$unwind": {
      "path": "$Balancemetric"
    }
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          "$$ROOT", "$Balancemetric"
        ]
      }
    }
  }, {
    "$addFields": {
      "acAnualMonto": "$$REMOVE", 
      "acMensualMonto": "$$REMOVE", 
      "monto": "$$REMOVE", 
      "acAnualMontoBs": "$$REMOVE", 
      "acMensualMontoBs": "$$REMOVE", 
      "montoBs": "$$REMOVE", 
      "previusMonthFirstDate": "$$REMOVE", 
      "previusMonthLastDate": "$$REMOVE", 
      "acAnualMontoUVC": "$$REMOVE", 
      "acMensualMontoUVC": "$$REMOVE", 
      "montoUVC": "$$REMOVE", 
      "Balancemetric": "$$REMOVE", 
      "cobranzaMora.castigo.monto": "$monto", 
      "cobranzaMora.castigo.acMensualMonto": "$acMensualMonto", 
      "cobranzaMora.castigo.acAnualMonto": "$acAnualMonto", 
      "cobranzaMoraUVC.castigo.monto": "$montoUVC", 
      "cobranzaMoraUVC.castigo.acMensualMonto": "$acMensualMontoUVC", 
      "cobranzaMoraUVC.castigo.acAnualMonto": "$acAnualMontoUVC"
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