[
  {
    $match: {
      $and: [
        {
          $expr: {
            $eq: [
              "$proceso",
              "1_Planificacion_E2_Procesamiento",
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
        "$procesos.PP_1_clienteIntegracion_Margenmetric.status",
        "$procesos.PP_2_sidisMargenActivos_Margenmetricactivo.status",
        "$procesos.PP_3_sidisMargenPasivos_Margenmetricpasivo.status",
        "$procesos.PP_4_sidisBeneficiarioIndicador_Margenmetric.status",
        "$procesos.I_1_margenMetricActivoIndicador_Margenmetric.status",
        "$procesos.I_2_margenMetricPaivosIndicador_Margenmetric.status",
        "$procesos.I_3_margenMetricPasivoConv20_Margenmetric.status",
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
              "$proceso", "1_Planificacion_E2_Procesamiento"
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
        "$procesos.PP_1_clienteIntegracion_Margenmetric.status", "$procesos.PP_2_sidisMargenActivos_Margenmetricactivo.status", "$procesos.PP_3_sidisMargenPasivos_Margenmetricpasivo.status", "$procesos.PP_4_sidisBeneficiarioIndicador_Margenmetric.status", "$procesos.I_1_margenMetricActivoIndicador_Margenmetric.status", "$procesos.I_2_margenMetricPaivosIndicador_Margenmetric.status", "$procesos.I_3_margenMetricPasivoConv20_Margenmetric.status"
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