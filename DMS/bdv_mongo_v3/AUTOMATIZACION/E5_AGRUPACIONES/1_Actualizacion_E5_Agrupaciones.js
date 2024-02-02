[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $and: [
          {
            $expr: {
              $eq: [
                "$proceso",
                "1_Planificacion_E5_Agrupaciones",
              ],
            },
          },
          {
            $expr: {
              $eq: [
                "$fechaProceso",
                {
                  $toDate: "2023-08-31",
                  //"$toDate": "{{$json.fechaProceso}}"
                },
              ],
            },
          },
        ],
      },
  },
  {
    $addFields: {
      procesos: {
        $map: {
          input: "$procesos",
          as: "proceso",
          in: {
            $cond: [
              {
                $eq: [
                  "$$proceso.codigo",
                  "banca",
                ],
              },
              {
                $mergeObjects: [
                  "$$proceso",
                  {
                    status: "Finalizado",
                    fechaFin: "$$NOW",
                    tiempoEjecucion: {
                      $round: [
                        {
                          $divide: [
                            {
                              $subtract: [
                                "$$NOW",
                                "$fechaInicio",
                              ],
                            },
                            60000,
                          ],
                        },
                        2,
                      ],
                    },
                  },
                ],
              },
              "$$proceso",
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      status: "Finalizado",
      fechaFin: "$$NOW",
      tiempoEjecucion: {
        $round: [
          {
            $divide: [
              {
                $subtract: [
                  "$$NOW",
                  "$fechaInicio",
                ],
              },
              60000,
            ],
          },
          2,
        ],
      },
    },
  },
  {
    $merge: {
      into: "sidis_statusProcesos",
      on: ["proceso", "fechaProceso"],
      whenMatched: "merge",
    },
  },
]


//N8N

[
  {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$eq": [
              "$proceso", "1_Planificacion_E5_Agrupaciones"
            ]
          }
        }, {
          "$expr": {
            "$eq": [
              "$fechaProceso", {
                "$toDate": "{{$json.fechaProceso}}"
              }
            ]
          }
        }
      ]
    }
  }, {
    "$addFields": {
      "procesos": {
        "$map": {
          "input": "$procesos", 
          "as": "proceso", 
          "in": {
            "$cond": [
              {
                "$eq": [
                  "$$proceso.codigo", "NSE"
                ]
              }, {
                "$mergeObjects": [
                  "$$proceso", {
                    "status": "Finalizado", 
                    "fechaFin": "$$NOW", 
                    "tiempoEjecucion": {
                      "$round": [
                        {
                          "$divide": [
                            {
                              "$subtract": [
                                "$$NOW", "$fechaInicio"
                              ]
                            }, 60000
                          ]
                        }, 2
                      ]
                    }
                  }
                ]
              }, "$$proceso"
            ]
          }
        }
      }
    }
  }, {
    "$addFields": {
      "status": "Finalizado", 
      "fechaFin": "$$NOW", 
      "tiempoEjecucion": {
        "$round": [
          {
            "$divide": [
              {
                "$subtract": [
                  "$$NOW", "$fechaInicio"
                ]
              }, 60000
            ]
          }, 2
        ]
      }
    }
  }, {
    "$merge": {
      "into": "sidis_statusProcesos", 
      "on": [
        "proceso", "fechaProceso"
      ], 
      "whenMatched": "merge"
    }
  }
]