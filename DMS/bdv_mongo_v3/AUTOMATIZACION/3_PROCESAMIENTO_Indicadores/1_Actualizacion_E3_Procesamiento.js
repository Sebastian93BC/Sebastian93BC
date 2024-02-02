[
  {
    $match: {
      $and: [
        {
          $expr: {
            $eq: [
              "$proceso",
              "1_Planificacion_E3_Procesamiento",
            ],
          },
        },
        {
          $expr: {
            $eq: [
              "$fechaProceso",
              {
                $toDate: "2023-06-30",
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
      statusProceso: [
        "$procesos.M_1_Indicadores_Margenmetric.status",
        "$procesos.M_2_saldosPromedio6m_Margenmetric.status",
        "$procesos.M_3_SumaAnual13m_Margenmetric.status",
        "$procesos.M_4_CrecimientoAnual_Margenmetric.status",
        "$procesos.M_5_saldosPromedio3m_Margenmetric.status",
        "$procesos.A_5_AgrupacionMargengeneralmetric_Margengeneralmetric.status",
        "$procesos.A_6_AgrupacionMSN_Margenmetricsegmentnatural.status",
        "$procesos.A_7_AgrupacionMSJ_Margenmetricsegmentjuridico.status",
      ],
    },
  },
  {
    $unwind: {
      path: "$statusProceso",
    },
  },
  {
    $group: {
      _id: "$_id",
      doc: {
        $first: "$$ROOT",
      },
      statusProceso: {
        $addToSet: "$statusProceso",
      },
    },
  },
  {
    $addFields: {
      statusProceso: {
        $switch: {
          branches: [
            {
              case: {
                $and: [
                  {
                    $eq: [
                      {
                        $size: "$statusProceso",
                      },
                      1,
                    ],
                  },
                  {
                    $eq: [
                      {
                        $first: "$statusProceso",
                      },
                      "Finalizado",
                    ],
                  },
                ],
              },
              then: true,
            },
          ],
          default: false,
        },
      },
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ["$doc", "$$ROOT"],
      },
    },
  },
  {
    $addFields: {
      status: {
        $cond: [
          "$statusProceso",
          "Finalizado",
          "En Proceso",
        ],
      },
      doc: "$$REMOVE",
      sub_procesos: "$$REMOVE",
      statusProceso: "$$REMOVE",
    },
  },
  {
    $addFields: {
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
              "$proceso", "1_Planificacion_E3_Procesamiento"
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
      "statusProceso": [
        "$procesos.M_1_Indicadores_Margenmetric.status", "$procesos.M_2_saldosPromedio6m_Margenmetric.status", "$procesos.M_3_SumaAnual13m_Margenmetric.status", "$procesos.M_4_CrecimientoAnual_Margenmetric.status", "$procesos.M_5_saldosPromedio3m_Margenmetric.status", "$procesos.A_5_AgrupacionMargengeneralmetric_Margengeneralmetric.status", "$procesos.A_6_AgrupacionMSN_Margenmetricsegmentnatural.status", "$procesos.A_7_AgrupacionMSJ_Margenmetricsegmentjuridico.status"
      ]
    }
  }, {
    "$unwind": {
      "path": "$statusProceso"
    }
  }, {
    "$group": {
      "_id": "$_id", 
      "doc": {
        "$first": "$$ROOT"
      }, 
      "statusProceso": {
        "$addToSet": "$statusProceso"
      }
    }
  }, {
    "$addFields": {
      "statusProceso": {
        "$switch": {
          "branches": [
            {
              "case": {
                "$and": [
                  {
                    "$eq": [
                      {
                        "$size": "$statusProceso"
                      }, 1
                    ]
                  }, {
                    "$eq": [
                      {
                        "$first": "$statusProceso"
                      }, "Finalizado"
                    ]
                  }
                ]
              }, 
              "then": true
            }
          ], 
          "default": false
        }
      }
    }
  }, {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          "$doc", "$$ROOT"
        ]
      }
    }
  }, {
    "$addFields": {
      "status": {
        "$cond": [
          "$statusProceso", "Finalizado", "En Proceso"
        ]
      }, 
      "doc": "$$REMOVE", 
      "sub_procesos": "$$REMOVE", 
      "statusProceso": "$$REMOVE"
    }
  }, {
    "$addFields": {
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