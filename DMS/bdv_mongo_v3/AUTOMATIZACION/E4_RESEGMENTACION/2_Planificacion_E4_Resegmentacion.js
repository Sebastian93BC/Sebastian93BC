[
  {
    $match: {
      $and: [
        {
          $expr: {
            $eq: [
              "$proceso",
              "1_Planificacion_E4_Resegmentacion",
            ],
          },
        },
        {
          $expr: {
            $eq: [
              "$fechaProceso",
              {
                $toDate: "2023-07-31",
                //"{{$json.fechaProceso}}"
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
              // Cambia "1" por el código del elemento que deseas modificar
              {
                $eq: [
                  "$$proceso.codigo",
                  1,
                  //{"$toInt": "{{$json.lastDigRif}}"}
                ],
              },
              {
                $mergeObjects: [
                  "$$proceso",
                  {
                    status: "En Proceso",
                    fechaInicio: "$$NOW",
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
              "$proceso", "1_Planificacion_E4_Resegmentacion"
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
                  "$$proceso.codigo", {"$toInt": "{{$json.lastDigRif}}"}
                ]
              }, {
                "$mergeObjects": [
                  "$$proceso", {
                    "status": "En Proceso", 
                    "fechaInicio": "$$NOW"
                  }
                ]
              }, "$$proceso"
            ]
          }
        }
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