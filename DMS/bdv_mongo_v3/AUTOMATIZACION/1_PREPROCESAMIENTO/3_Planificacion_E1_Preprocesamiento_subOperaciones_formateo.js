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
                      $toInt: "10",
                      //"$toInt": "{{$json.lastDigRif}}"
                    },
                  ],
                },
                {
                  $concat: [
                    {
                      $toString: "10",
                      //"$toString": "{{$json.lastDigRif}}"
                    },
                    "_En proceso",
                  ],
                },
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
                    "$toInt": "10"
                  }
                ]
              }, {
                "$concat": [
                  {
                    "$toString": "10"
                  }, "_En proceso"
                ]
              }, "$$elemento"
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