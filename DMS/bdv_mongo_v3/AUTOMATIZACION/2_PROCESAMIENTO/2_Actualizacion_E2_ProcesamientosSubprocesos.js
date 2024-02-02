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
      $addFields:
        /**
         * newField: The new field name.
         * expression: The new field expression.
         */
        {
          //PP_1_clienteIntegracion_Margenmetric
          //PP_2_sidisMargenActivos_Margenmetricactivo
          //PP_3_sidisMargenPasivos_Margenmetricpasiv:
          //PP_4_sidisBeneficiarioIndicador_Margenmetric
          //I_1_margenMetricActivoIndicador_Margenmetric
          //I_2_margenMetricPaivosIndicador_Margenmetric
          //I_3_margenMetricPasivoConv20_Margenmetric
          "procesos.PP_1_clienteIntegracion_Margenmetric.fechaProceso":
            "$fechaProceso",
          "procesos.PP_1_clienteIntegracion_Margenmetric.status":
            "Finalizado",
          "procesos.PP_1_clienteIntegracion_Margenmetric.fechaFin":
            "$$NOW",
          "procesos.PP_1_clienteIntegracion_Margenmetric.tiempoEjecucion":
            {
              $round: [
                {
                  $divide: [
                    {
                      $subtract: [
                        "$$NOW",
                        "$procesos.PP_1_clienteIntegracion_Margenmetric.fechaInicio",
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
        "procesos.PP_1_clienteIntegracion_Margenmetric.fechaProceso": "$fechaProceso", 
        "procesos.PP_1_clienteIntegracion_Margenmetric.status": "Finalizado", 
        "procesos.PP_1_clienteIntegracion_Margenmetric.fechaFin": "$$NOW", 
        "procesos.PP_1_clienteIntegracion_Margenmetric.tiempoEjecucion": {
          "$round": [
            {
              "$divide": [
                {
                  "$subtract": [
                    "$$NOW", "$procesos.PP_1_clienteIntegracion_Margenmetric.fechaInicio"
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