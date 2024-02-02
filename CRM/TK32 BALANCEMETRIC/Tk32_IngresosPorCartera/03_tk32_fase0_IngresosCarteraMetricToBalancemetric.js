[
  {
    $sort: {
      fecha_odate: 1,
    },
  },
  {
    $addFields: {
      fechaAyer: {
        $subtract: ["$fecha_odate", 86400000],
      },
    },
  },
  {
    $lookup: {
      from: "sidis_brm_ingresosCartera",
      localField: "fechaAyer",
      foreignField: "fecha_odate",
      as: "sidis_brm_ingresosCarteraAyer",
    },
  },
  {
    $addFields: {
      condicion: {
        $and: [
          {
            $or: [
              {
                $eq: [
                  {
                    $month: "$fecha_odate",
                  },
                  7,
                ],
              },
            ],
          },
          {
            $gte: [
              {
                $round: [
                  {
                    $divide: [
                      {
                        $abs: {
                          $subtract: [
                            "$salActBs",
                            {
                              $first:
                                "$sidis_brm_ingresosCarteraAyer.salActBs",
                            },
                          ],
                        },
                      },
                      "$salActBs",
                    ],
                  },
                  4,
                ],
              },
              0.9,
            ],
          },
        ],
      },
    },
  },
  {
    $match: {
      condicion: true,
    },
  },
  {
    $project: {
      _id: 0,
      salActAjusteBs: {
        $first:
          "$sidis_brm_ingresosCarteraAyer.salActBs",
      },
      fechaAjuste: "$fecha_odate",
    },
  },
  {
    $lookup: {
      from: "sidis_brm_ingresosCartera",
      let: {
        ano: {
          $year: "$fechaAjuste",
        },
        fechaAjuste: "$fechaAjuste",
      },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $gte: [
                    "$fecha_odate",
                    "$$fechaAjuste",
                  ],
                },
              },
              {
                $expr: {
                  $eq: [
                    "$$ano",
                    {
                      $year: "$fecha_odate",
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ],
      as: "sidis_brm_ingresosCartera",
    },
  },
  {
    $unwind: {
      path: "$sidis_brm_ingresosCartera",
    },
  },
  {
    $addFields: {
      fecha_odate:
        "$sidis_brm_ingresosCartera.fecha_odate",
      sidis_brm_ingresosCartera: "$$REMOVE",
      ajuste: true,
    },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
        fecha_odate: -1,
      },
  },
  {
    $merge: {
      into: "sidis_brm_ingresosCartera",
      on: "fecha_odate",
    },
  },
]

//N8N

[
  {
    "$sort": {
      "fecha_odate": 1
    }
  }, {
    "$addFields": {
      "fechaAyer": {
        "$subtract": [
          "$fecha_odate", 86400000
        ]
      }
    }
  }, {
    "$lookup": {
      "from": "sidis_brm_ingresosCartera", 
      "localField": "fechaAyer", 
      "foreignField": "fecha_odate", 
      "as": "sidis_brm_ingresosCarteraAyer"
    }
  }, {
    "$addFields": {
      "condicion": {
        "$and": [
          {
            "$or": [
              {
                "$eq": [
                  {
                    "$month": "$fecha_odate"
                  }, 7
                ]
              }
            ]
          }, {
            "$gte": [
              {
                "$round": [
                  {
                    "$divide": [
                      {
                        "$abs": {
                          "$subtract": [
                            "$salActBs", {
                              "$first": "$sidis_brm_ingresosCarteraAyer.salActBs"
                            }
                          ]
                        }
                      }, "$salActBs"
                    ]
                  }, 4
                ]
              }, 0.9
            ]
          }
        ]
      }
    }
  }, {
    "$match": {
      "condicion": true
    }
  }, {
    "$project": {
      "_id": 0, 
      "salActAjusteBs": {
        "$first": "$sidis_brm_ingresosCarteraAyer.salActBs"
      }, 
      "fechaAjuste": "$fecha_odate"
    }
  }, {
    "$lookup": {
      "from": "sidis_brm_ingresosCartera", 
      "let": {
        "ano": {
          "$year": "$fechaAjuste"
        }, 
        "fechaAjuste": "$fechaAjuste"
      }, 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$gte": [
                    "$fecha_odate", "$$fechaAjuste"
                  ]
                }
              }, {
                "$expr": {
                  "$eq": [
                    "$$ano", {
                      "$year": "$fecha_odate"
                    }
                  ]
                }
              }
            ]
          }
        }, {
          "$project": {
            "_id": 0
          }
        }
      ], 
      "as": "sidis_brm_ingresosCartera"
    }
  }, {
    "$unwind": {
      "path": "$sidis_brm_ingresosCartera"
    }
  }, {
    "$addFields": {
      "fecha_odate": "$sidis_brm_ingresosCartera.fecha_odate", 
      "sidis_brm_ingresosCartera": "$$REMOVE", 
      "ajuste": true
    }
  }, {
    "$sort": {
      "fecha_odate": -1
    }
  }, {
    "$merge": {
      "into": "sidis_brm_ingresosCartera", 
      "on": "fecha_odate"
    }
  }
]