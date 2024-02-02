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
  *setear el proceso
  "P_0_1_margenShardingMargenShad",
  "P_1_clienteFormateoIntegracion_CBS",
  "P_2_segmentacionFormateoIntegracion_CBS",
  "P_3_baseClienteFormateoIntegracion_CBS",
  "P_4_beneficiarioFormateoSidisBeneficiario",
  "P_5_ordenanteFormateoSidisOrdenante",
  "P_6_margenFormateoSidisMargen",
  */
      {
        "procesos.P_0_1_margenShardingMargenShad.status":
          "Finalizado",
        "procesos.P_0_1_margenShardingMargenShad.fechaFin":
          "$$NOW",
        "procesos.P_0_1_margenShardingMargenShad.tiempoEjecucion":
          {
            $round: [
              {
                $divide: [
                  {
                    $subtract: [
                      "$$NOW",
                      "$procesos.P_0_1_margenShardingMargenShad.fechaInicio",
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
      "procesos.P_0_1_margenShardingMargenShad.status": "Finalizado", 
      "procesos.P_0_1_margenShardingMargenShad.fechaFin": "$$NOW", 
      "procesos.P_0_1_margenShardingMargenShad.tiempoEjecucion": {
        "$round": [
          {
            "$divide": [
              {
                "$subtract": [
                  "$$NOW", "$procesos.P_0_1_margenShardingMargenShad.fechaInicio"
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