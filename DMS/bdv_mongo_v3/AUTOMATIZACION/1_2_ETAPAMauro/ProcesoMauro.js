[
  {
    $limit: 1,
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      proceso: "Etapa_Mauro_Planificacion",
      fechaProceso: {
        $toDate: "2023-09-30",
        //"$toDate": "{{$json.fechaProceso}}"
      },

      descripcion:
        "Preprocesamiento de datos de transacciones",
      status: "En Proceso",
      fechaInicio: "$$NOW",
      fechaFin: "nda",
      tiempoEjecucion: "nda",
      tipoOperación:
        "Paralela: 7 sub-procesos, 1 secuencia en la colección margen",
      frecuencia: "Mensual",
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
    "$limit": 1
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "proceso": "Etapa_Mauro_Planificacion", 
      "fechaProceso": {
        "$toDate": "{{$json.fechaProceso}}"
      }, 
      "descripcion": "Preprocesamiento de datos de transacciones", 
      "status": "En Proceso", 
      "fechaInicio": "$$NOW", 
      "fechaFin": "nda", 
      "tiempoEjecucion": "nda", 
      "tipoOperación": "Paralela: 7 sub-procesos, 1 secuencia en la colección margen", 
      "frecuencia": "Mensual"
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





////////////////////


[
  {
    $match: {
      $and: [
        {
          $expr: {
            $eq: [
              "$proceso",
              "Etapa_Mauro_Planificacion",
            ],
          },
        },
        {
          $expr: {
            $eq: [
              "$fechaProceso",
              {
                $toDate: "2023-09-30",
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
              "$proceso", "Etapa_Mauro_Planificacion"
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