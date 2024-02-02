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
    $addFields: {
      "procesos.P_6_margenFormateoSidisMargen.sub_procesos":
        {
          $map: {
            input:
              "$procesos.P_6_margenFormateoSidisMargen.sub_procesos",
            as: "elemento",
            in: {
              $cond: [
                {
                  $eq: [
                    {
                      $indexOfArray: [
                        "$procesos.P_6_margenFormateoSidisMargen.sub_procesos",
                        "$$elemento",
                      ],
                    },
                    {
                      $toInt: "0",
                      //"$toInt": "{{$json.lastDigRif}}"
                    },
                  ],
                },
                "Finalizado",
                // Nuevo valor para el elemento en el índice x
                "$$elemento",
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

//n8n

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
      "procesos.P_6_margenFormateoSidisMargen.sub_procesos": {
        "$map": {
          "input": "$procesos.P_6_margenFormateoSidisMargen.sub_procesos", 
          "as": "elemento", 
          "in": {
            "$cond": [
              {
                "$eq": [
                  {
                    "$indexOfArray": [
                      "$procesos.P_6_margenFormateoSidisMargen.sub_procesos", "$$elemento"
                    ]
                  }, {
                    "$toInt": "{{$json.lastDigRif}}"
                  }
                ]
              }, "Finalizado", "$$elemento"
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