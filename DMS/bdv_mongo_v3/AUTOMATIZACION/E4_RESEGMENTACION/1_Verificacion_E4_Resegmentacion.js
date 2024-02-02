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
        statusProceso: "$procesos.status",
      },
    },
    {
      $unwind: {
        path: "$statusProceso",
      },
    },
    {
      $group: {
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
      $replaceRoot: {
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
        "statusProceso": "$procesos.status"
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