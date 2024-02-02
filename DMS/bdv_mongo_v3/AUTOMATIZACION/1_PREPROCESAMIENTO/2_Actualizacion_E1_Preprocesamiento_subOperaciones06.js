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
    $unwind: {
      path: "$procesos.P_6_margenFormateoSidisMargen.sub_procesos",
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
        docs: {
          $addToSet: "$$ROOT",
        },
        statusProceso: {
          $addToSet:
            "$procesos.P_6_margenFormateoSidisMargen.sub_procesos",
        },
        sub_procesos: {
          $push:
            "$procesos.P_6_margenFormateoSidisMargen.sub_procesos",
        },
      },
  },
  {
    $addFields: {
      docs: {
        $first: "$docs",
      },
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
          $mergeObjects: ["$$ROOT", "$docs"],
        },
      },
  },
  {
    $addFields: {
      "procesos.P_6_margenFormateoSidisMargen.sub_procesos":
        "$sub_procesos",
      "procesos.P_6_margenFormateoSidisMargen.status":
        {
          $cond: [
            "$statusProceso",
            "Finalizado",
            "En Proceso",
          ],
        },
      docs: "$$REMOVE",
      sub_procesos: "$$REMOVE",
      statusProceso: "$$REMOVE",
    },
  },
  {
    $addFields: {
      "procesos.P_6_margenFormateoSidisMargen.fechaFin":
        "$$NOW",
      "procesos.P_6_margenFormateoSidisMargen.tiempoEjecucion":
        {
          $round: [
            {
              $divide: [
                {
                  $subtract: [
                    "$$NOW",
                    "$procesos.P_6_margenFormateoSidisMargen.fechaInicio",
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
      "procesos.P_2_segmentacionFormateoIntegracion_CBS.status": "Finalizado", 
      "procesos.P_2_segmentacionFormateoIntegracion_CBS.fechaFin": "$$NOW", 
      "procesos.P_2_segmentacionFormateoIntegracion_CBS.tiempoEjecucion": {
        "$round": [
          {
            "$divide": [
              {
                "$subtract": [
                  "$$NOW", "$procesos.P_2_segmentacionFormateoIntegracion_CBS.fechaInicio"
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