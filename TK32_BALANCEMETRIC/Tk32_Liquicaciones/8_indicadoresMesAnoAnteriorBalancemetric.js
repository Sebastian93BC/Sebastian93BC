[
  {
    $addFields: {
      today: {
        $subtract: [
          {
            $toDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT00:00:00%z",
                    date: {
                      $toDate: "$$NOW",
                    },
                  },
                },
              },
            },
          },
          {
            $multiply: [
              {
                $toInt: "2",
                //"{{$json.offSet}}"
              },
              86400000,
            ],
          },
        ],
      },
    },
  },
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $expr: {
          $eq: ["$fecha_valor", "$today"],
        },
      },
  },
  {
    $addFields: {
      todayLastMonth: {
        $dateAdd: {
          startDate: "$today",
          unit: "month",
          amount: -1,
        },
      },
      todayLastYear: {
        $dateAdd: {
          startDate: "$today",
          unit: "year",
          amount: -1,
        },
      },
    },
  },
  {
    $lookup: {
      from: "Balancemetric",
      localField: "todayLastMonth",
      foreignField: "fecha_valor",
      as: "mensualAnt",
    },
  },
  {
    $lookup: {
      from: "Balancemetric",
      localField: "todayLastYear",
      foreignField: "fecha_valor",
      as: "anualAnt",
    },
  },
  {
    $addFields: {
      mensualAnt: {
        $first: "$mensualAnt",
      },
      anualAnt: {
        $first: "$anualAnt",
      },
      today: "$$REMOVE",
      todayLastMonth: "$$REMOVE",
      todayLastYear: "$$REMOVE",
    },
  },
  {
    $addFields: {
      mensualAnt: "$$REMOVE",
      anualAnt: "$$REMOVE",
      "liquidaciones.montoLiqProd.comercial.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.comercial.acMensual",
      "liquidaciones.montoLiqProd.comercial.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.comercial.acAnual",
      "liquidaciones.montoLiqProd.emprendeBdv.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.emprendeBdv.acMensual",
      "liquidaciones.montoLiqProd.emprendeBdv.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.emprendeBdv.acAnual",
      "liquidaciones.montoLiqProd.hipotecario.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.hipotecario.acMensual",
      "liquidaciones.montoLiqProd.hipotecario.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.hipotecario.acAnual",
      "liquidaciones.montoLiqProd.productivo.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.productivo.acMensual",
      "liquidaciones.montoLiqProd.productivo.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.productivo.acAnual",
      "liquidaciones.montoLiqProd.totalBdv.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.totalBdv.acMensual",
      "liquidaciones.montoLiqProd.totalBdv.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.totalBdv.acAnual",
      "liquidaciones.montoLiqProd.microCred.acMensualAnt":
        "$mensualAnt.liquidaciones.montoLiqProd.microCred.acMensual",
      "liquidaciones.montoLiqProd.microCred.acAnualAnt":
        "$anualAnt.liquidaciones.montoLiqProd.microCred.acAnual",
      "liquidaciones.numLiqProd.comercial.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.comercial.acMensual",
      "liquidaciones.numLiqProd.comercial.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.comercial.acAnual",
      "liquidaciones.numLiqProd.emprendeBdv.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.emprendeBdv.acMensual",
      "liquidaciones.numLiqProd.emprendeBdv.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.emprendeBdv.acAnual",
      "liquidaciones.numLiqProd.hipotecario.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.hipotecario.acMensual",
      "liquidaciones.numLiqProd.hipotecario.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.hipotecario.acAnual",
      "liquidaciones.numLiqProd.productivo.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.productivo.acMensual",
      "liquidaciones.numLiqProd.productivo.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.productivo.acAnual",
      "liquidaciones.numLiqProd.totalBdv.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.totalBdv.acMensual",
      "liquidaciones.numLiqProd.totalBdv.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.totalBdv.acAnual",
      "liquidaciones.numLiqProd.microCred.acMensualAnt":
        "$mensualAnt.liquidaciones.numLiqProd.microCred.acMensual",
      "liquidaciones.numLiqProd.microCred.acAnualAnt":
        "$anualAnt.liquidaciones.numLiqProd.microCred.acAnual",
      "liquidacionesBs.montoLiqProd.comercial.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.comercial.acMensual",
      "liquidacionesBs.montoLiqProd.comercial.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.comercial.acAnual",
      "liquidacionesBs.montoLiqProd.emprendeBdv.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.emprendeBdv.acMensual",
      "liquidacionesBs.montoLiqProd.emprendeBdv.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.emprendeBdv.acAnual",
      "liquidacionesBs.montoLiqProd.hipotecario.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.hipotecario.acMensual",
      "liquidacionesBs.montoLiqProd.hipotecario.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.hipotecario.acAnual",
      "liquidacionesBs.montoLiqProd.productivo.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.productivo.acMensual",
      "liquidacionesBs.montoLiqProd.productivo.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.productivo.acAnual",
      "liquidacionesBs.montoLiqProd.totalBdv.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.totalBdv.acMensual",
      "liquidacionesBs.montoLiqProd.totalBdv.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.totalBdv.acAnual",
      "liquidacionesBs.montoLiqProd.microCred.acMensualAnt":
        "$mensualAnt.liquidacionesBs.montoLiqProd.microCred.acMensual",
      "liquidacionesBs.montoLiqProd.microCred.acAnualAnt":
        "$anualAnt.liquidacionesBs.montoLiqProd.microCred.acAnual",
      "liquidacionesBs.numLiqProd.comercial.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.comercial.acMensual",
      "liquidacionesBs.numLiqProd.comercial.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.comercial.acAnual",
      "liquidacionesBs.numLiqProd.emprendeBdv.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.emprendeBdv.acMensual",
      "liquidacionesBs.numLiqProd.emprendeBdv.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.emprendeBdv.acAnual",
      "liquidacionesBs.numLiqProd.hipotecario.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.hipotecario.acMensual",
      "liquidacionesBs.numLiqProd.hipotecario.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.hipotecario.acAnual",
      "liquidacionesBs.numLiqProd.productivo.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.productivo.acMensual",
      "liquidacionesBs.numLiqProd.productivo.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.productivo.acAnual",
      "liquidacionesBs.numLiqProd.totalBdv.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.totalBdv.acMensual",
      "liquidacionesBs.numLiqProd.totalBdv.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.totalBdv.acAnual",
      "liquidacionesBs.numLiqProd.microCred.acMensualAnt":
        "$mensualAnt.liquidacionesBs.numLiqProd.microCred.acMensual",
      "liquidacionesBs.numLiqProd.microCred.acAnualAnt":
        "$anualAnt.liquidacionesBs.numLiqProd.microCred.acAnual",
    },
  },
  {
    $merge: {
      into: "Balancemetric",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "discard",
    },
  },
]

//n8n

[
  {
    "$addFields": {
      "today": {
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
    }
  }, {
    "$match": {
      "$expr": {
        "$eq": [
          "$fecha_valor", "$today"
        ]
      }
    }
  }, {
    "$addFields": {
      "todayLastMonth": {
        "$dateAdd": {
          "startDate": "$today", 
          "unit": "month", 
          "amount": -1
        }
      }, 
      "todayLastYear": {
        "$dateAdd": {
          "startDate": "$today", 
          "unit": "year", 
          "amount": -1
        }
      }
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "todayLastMonth", 
      "foreignField": "fecha_valor", 
      "as": "mensualAnt"
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "todayLastYear", 
      "foreignField": "fecha_valor", 
      "as": "anualAnt"
    }
  }, {
    "$addFields": {
      "mensualAnt": {
        "$first": "$mensualAnt"
      }, 
      "anualAnt": {
        "$first": "$anualAnt"
      }, 
      "today": "$$REMOVE", 
      "todayLastMonth": "$$REMOVE", 
      "todayLastYear": "$$REMOVE"
    }
  }, {
    "$addFields": {
      "mensualAnt": "$$REMOVE", 
      "anualAnt": "$$REMOVE", 
      "liquidaciones.montoLiqProd.comercial.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.comercial.acMensual", 
      "liquidaciones.montoLiqProd.comercial.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.comercial.acAnual", 
      "liquidaciones.montoLiqProd.emprendeBdv.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.emprendeBdv.acMensual", 
      "liquidaciones.montoLiqProd.emprendeBdv.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.emprendeBdv.acAnual", 
      "liquidaciones.montoLiqProd.hipotecario.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.hipotecario.acMensual", 
      "liquidaciones.montoLiqProd.hipotecario.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.hipotecario.acAnual", 
      "liquidaciones.montoLiqProd.productivo.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.productivo.acMensual", 
      "liquidaciones.montoLiqProd.productivo.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.productivo.acAnual", 
      "liquidaciones.montoLiqProd.totalBdv.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.totalBdv.acMensual", 
      "liquidaciones.montoLiqProd.totalBdv.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.totalBdv.acAnual", 
      "liquidaciones.montoLiqProd.microCred.acMensualAnt": "$mensualAnt.liquidaciones.montoLiqProd.microCred.acMensual", 
      "liquidaciones.montoLiqProd.microCred.acAnualAnt": "$anualAnt.liquidaciones.montoLiqProd.microCred.acAnual", 
      "liquidaciones.numLiqProd.comercial.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.comercial.acMensual", 
      "liquidaciones.numLiqProd.comercial.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.comercial.acAnual", 
      "liquidaciones.numLiqProd.emprendeBdv.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.emprendeBdv.acMensual", 
      "liquidaciones.numLiqProd.emprendeBdv.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.emprendeBdv.acAnual", 
      "liquidaciones.numLiqProd.hipotecario.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.hipotecario.acMensual", 
      "liquidaciones.numLiqProd.hipotecario.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.hipotecario.acAnual", 
      "liquidaciones.numLiqProd.productivo.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.productivo.acMensual", 
      "liquidaciones.numLiqProd.productivo.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.productivo.acAnual", 
      "liquidaciones.numLiqProd.totalBdv.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.totalBdv.acMensual", 
      "liquidaciones.numLiqProd.totalBdv.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.totalBdv.acAnual", 
      "liquidaciones.numLiqProd.microCred.acMensualAnt": "$mensualAnt.liquidaciones.numLiqProd.microCred.acMensual", 
      "liquidaciones.numLiqProd.microCred.acAnualAnt": "$anualAnt.liquidaciones.numLiqProd.microCred.acAnual", 
      "liquidacionesBs.montoLiqProd.comercial.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.comercial.acMensual", 
      "liquidacionesBs.montoLiqProd.comercial.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.comercial.acAnual", 
      "liquidacionesBs.montoLiqProd.emprendeBdv.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.emprendeBdv.acMensual", 
      "liquidacionesBs.montoLiqProd.emprendeBdv.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.emprendeBdv.acAnual", 
      "liquidacionesBs.montoLiqProd.hipotecario.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.hipotecario.acMensual", 
      "liquidacionesBs.montoLiqProd.hipotecario.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.hipotecario.acAnual", 
      "liquidacionesBs.montoLiqProd.productivo.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.productivo.acMensual", 
      "liquidacionesBs.montoLiqProd.productivo.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.productivo.acAnual", 
      "liquidacionesBs.montoLiqProd.totalBdv.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.totalBdv.acMensual", 
      "liquidacionesBs.montoLiqProd.totalBdv.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.totalBdv.acAnual", 
      "liquidacionesBs.montoLiqProd.microCred.acMensualAnt": "$mensualAnt.liquidacionesBs.montoLiqProd.microCred.acMensual", 
      "liquidacionesBs.montoLiqProd.microCred.acAnualAnt": "$anualAnt.liquidacionesBs.montoLiqProd.microCred.acAnual", 
      "liquidacionesBs.numLiqProd.comercial.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.comercial.acMensual", 
      "liquidacionesBs.numLiqProd.comercial.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.comercial.acAnual", 
      "liquidacionesBs.numLiqProd.emprendeBdv.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.emprendeBdv.acMensual", 
      "liquidacionesBs.numLiqProd.emprendeBdv.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.emprendeBdv.acAnual", 
      "liquidacionesBs.numLiqProd.hipotecario.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.hipotecario.acMensual", 
      "liquidacionesBs.numLiqProd.hipotecario.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.hipotecario.acAnual", 
      "liquidacionesBs.numLiqProd.productivo.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.productivo.acMensual", 
      "liquidacionesBs.numLiqProd.productivo.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.productivo.acAnual", 
      "liquidacionesBs.numLiqProd.totalBdv.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.totalBdv.acMensual", 
      "liquidacionesBs.numLiqProd.totalBdv.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.totalBdv.acAnual", 
      "liquidacionesBs.numLiqProd.microCred.acMensualAnt": "$mensualAnt.liquidacionesBs.numLiqProd.microCred.acMensual", 
      "liquidacionesBs.numLiqProd.microCred.acAnualAnt": "$anualAnt.liquidacionesBs.numLiqProd.microCred.acAnual"
    }
  }, {
    "$merge": {
      "into": "Balancemetric", 
      "on": "_id", 
      "whenMatched": "merge", 
      "whenNotMatched": "discard"
    }
  }
]