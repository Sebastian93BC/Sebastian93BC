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
        "procesos.P_2_segmentacionFormateoIntegracion_CBS.fechaProceso":
          {
            $toDate: "2023-08-31",
            //"$toDate": "{{$json.fechaProceso}}"
          },

        "procesos.P_2_segmentacionFormateoIntegracion_CBS.status":
          "En Proceso",
        "procesos.P_2_segmentacionFormateoIntegracion_CBS.fechaInicio":
          "$$NOW",
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
      "procesos.P_3_baseClienteFormateoIntegracion_CBS.fechaProceso": {
        "$toDate": "{{$json.fechaProceso}}"
      }, 
      "procesos.P_3_baseClienteFormateoIntegracion_CBS.status": "En Proceso", 
      "procesos.P_3_baseClienteFormateoIntegracion_CBS.fechaInicio": "$$NOW"
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