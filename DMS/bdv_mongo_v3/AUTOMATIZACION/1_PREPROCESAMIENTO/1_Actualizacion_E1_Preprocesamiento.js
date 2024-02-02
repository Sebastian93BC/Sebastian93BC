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
                "E1_Preprocesamiento",
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
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        statusProceso: [
          "$procesos.P_0_1_margenShardingMargenShad.status",
          "$procesos.P_1_clienteFormateoIntegracion_CBS.status",
          "$procesos.P_2_segmentacionFormateoIntegracion_CBS.status",
          "$procesos.P_3_baseClienteFormateoIntegracion_CBS.status",
          "$procesos.P_4_beneficiarioFormateoSidisBeneficiario.status",
          "$procesos.P_5_ordenanteFormateoSidisOrdenante.status",
          "$procesos.P_6_margenFormateoSidisMargen.status",
        ],
      },
  },
  {
    $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$statusProceso",
      },
  },
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
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
    $replaceRoot:
      /**
       * replacementDocument: A document or string.
       */
      {
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
      "detalles.fechaFin": "$$NOW",
      "detalles.tiempoEjecucion": {
        $round: [
          {
            $divide: [
              {
                $subtract: [
                  "$$NOW",
                  "$detalles.fechaInicio",
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
              "$proceso", "E1_Preprocesamiento"
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
        "$procesos.P_0_1_margenShardingMargenShad.status", "$procesos.P_1_clienteFormateoIntegracion_CBS.status", "$procesos.P_2_segmentacionFormateoIntegracion_CBS.status", "$procesos.P_3_baseClienteFormateoIntegracion_CBS.status", "$procesos.P_4_beneficiarioFormateoSidisBeneficiario.status", "$procesos.P_5_ordenanteFormateoSidisOrdenante.status", "$procesos.P_6_margenFormateoSidisMargen.status"
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
      "detalles.fechaFin": "$$NOW", 
      "detalles.tiempoEjecucion": {
        "$round": [
          {
            "$divide": [
              {
                "$subtract": [
                  "$$NOW", "$detalles.fechaInicio"
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