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
      // M_1_Indicadores_Margenmetric
      // M_2_saldosPromedio6m_Margenmetric
      // M_3_SumaAnual13m_Margenmetric
      // M_4_CrecimientoAnual_Margenmetric
      // M_5_saldosPromedio3m_Margenmetric
      // A_5_AgrupacionMargengeneralmetric_Margengeneralmetric
      // A_6_AgrupacionMSN_Margenmetricsegmentnatural
      // A_7_AgrupacionMSJ_Margenmetricsegmentjuridico
      "procesos.M_1_Indicadores_Margenmetric.fechaProceso":
        "$fechaProceso",
      "procesos.M_1_Indicadores_Margenmetric.status":
        "Finalizado",
      "procesos.M_1_Indicadores_Margenmetric.fechaFin":
        "$$NOW",
      "procesos.M_1_Indicadores_Margenmetric.tiempoEjecucion":
        {
          $round: [
            {
              $divide: [
                {
                  $subtract: [
                    "$$NOW",
                    "$procesos.M_1_Indicadores_Margenmetric.fechaInicio",
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
      "procesos.M_1_Indicadores_Margenmetric.fechaProceso": "$fechaProceso", 
      "procesos.M_1_Indicadores_Margenmetric.status": "Finalizado", 
      "procesos.M_1_Indicadores_Margenmetric.fechaFin": "$$NOW", 
      "procesos.M_1_Indicadores_Margenmetric.tiempoEjecucion": {
        "$round": [
          {
            "$divide": [
              {
                "$subtract": [
                  "$$NOW", "$procesos.M_1_Indicadores_Margenmetric.fechaInicio"
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
      ]
    }
  }
]