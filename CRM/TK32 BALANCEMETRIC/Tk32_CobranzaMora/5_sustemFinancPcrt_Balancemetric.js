[
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      todayDate: {
        $subtract: [
          {
            $dateTrunc: {
              date: "$$NOW",
              unit: "day",
            },
          },
          {
            $multiply: [
              {
                $toInt: "1",
                //"{{$json.offSet}}"
              },
              86400000,
            ],
          },
        ],
      },
    },
  },
  {
    $addFields: {
      previusMonthFirstDate: {
        $dateFromParts: {
          day: 1,
          month: {
            $month: {
              $dateAdd: {
                startDate: "$todayDate",
                unit: "month",
                amount: -1,
              },
            },
          },
          year: {
            $year: {
              $dateAdd: {
                startDate: "$todayDate",
                unit: "month",
                amount: -1,
              },
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "Balancemetric",
      let: {
        todayDate: "$todayDate",
        previusMonthFirstDate:
          "$previusMonthFirstDate",
      },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $gte: [
                    "$fecha_valor",
                    "$$previusMonthFirstDate",
                  ],
                },
              },
              {
                $expr: {
                  $lte: [
                    "$fecha_valor",
                    "$$todayDate",
                  ],
                },
              },
            ],
          },
        },
        {
          $project: {
            cobranzaMora: 1,
            cobranzaMoraUVC: 1,
            fecha_valor: 1,
          },
        },
      ],
      as: "Balancemetric",
    },
  },
  {
    $unwind: {
      path: "$Balancemetric",
    },
  },
  {
    $replaceRoot: {
      newRoot: "$Balancemetric",
    },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
        fecha_valor: 1,
      },
  },
  {
    $lookup: {
      from: "Financialstatementdashboard",
      let: {
        mes: {
          $month: "$fecha_valor",
        },
        ano: {
          $year: "$fecha_valor",
        },
      },
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: [
                    "$$mes",
                    {
                      $month: "$fechaProceso",
                    },
                  ],
                },
              },
              {
                $expr: {
                  $eq: [
                    "$$ano",
                    {
                      $year: "$fechaProceso",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
      as: "Financialstatementdashboard",
    },
  },
  {
    $set: {
      Financialstatementdashboard: "$$REMOVE",
      "cobranzaMora.indiceMora.sustemFinancPcrt":
        {
          $round: [
            {
              $multiply: [
                100,
                {
                  $first: {
                    $first:
                      "$Financialstatementdashboard.loanDelincuency.globalValue",
                  },
                },
              ],
            },
            4,
          ],
        },
      "cobranzaMoraUVC.indiceMora.sustemFinancPcrt":
        {
          $round: [
            {
              $multiply: [
                100,
                {
                  $first: {
                    $first:
                      "$Financialstatementdashboard.loanDelincuency.globalValue",
                  },
                },
              ],
            },
            4,
          ],
        },
    },
  },
  {
    $merge: {
      into: "Balancemetric",
      on: "fecha_valor",
    },
  },
]

////////
[
  {
    "$limit": 1
  }, {
    "$project": {
      "_id": 0, 
      "todayDate": {
        "$subtract": [
          {
            "$dateTrunc": {
              "date": "$$NOW", 
              "unit": "day"
            }
          }, {
            "$multiply": [
              {
                "$toInt": "{{$json.offSet}}"
              }, 86400000
            ]
          }
        ]
      }
    }
  }, {
    "$addFields": {
      "previusMonthFirstDate": {
        "$dateFromParts": {
          "day": 1, 
          "month": {
            "$month": {
              "$dateAdd": {
                "startDate": "$todayDate", 
                "unit": "month", 
                "amount": -1
              }
            }
          }, 
          "year": {
            "$year": {
              "$dateAdd": {
                "startDate": "$todayDate", 
                "unit": "month", 
                "amount": -1
              }
            }
          }
        }
      }
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "let": {
        "todayDate": "$todayDate", 
        "previusMonthFirstDate": "$previusMonthFirstDate"
      }, 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$gte": [
                    "$fecha_valor", "$$previusMonthFirstDate"
                  ]
                }
              }, {
                "$expr": {
                  "$lte": [
                    "$fecha_valor", "$$todayDate"
                  ]
                }
              }
            ]
          }
        }, {
          "$project": {
            "cobranzaMora": 1, 
            "cobranzaMoraUVC": 1, 
            "fecha_valor": 1
          }
        }
      ], 
      "as": "Balancemetric"
    }
  }, {
    "$unwind": {
      "path": "$Balancemetric"
    }
  }, {
    "$replaceRoot": {
      "newRoot": "$Balancemetric"
    }
  }, {
    "$sort": {
      "fecha_valor": 1
    }
  }, {
    "$lookup": {
      "from": "Financialstatementdashboard", 
      "let": {
        "mes": {
          "$month": "$fecha_valor"
        }, 
        "ano": {
          "$year": "$fecha_valor"
        }
      }, 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$eq": [
                    "$$mes", {
                      "$month": "$fechaProceso"
                    }
                  ]
                }
              }, {
                "$expr": {
                  "$eq": [
                    "$$ano", {
                      "$year": "$fechaProceso"
                    }
                  ]
                }
              }
            ]
          }
        }
      ], 
      "as": "Financialstatementdashboard"
    }
  }, {
    "$set": {
      "Financialstatementdashboard": "$$REMOVE", 
      "cobranzaMora.indiceMora.sustemFinancPcrt": {
        "$round": [
          {
            "$multiply": [
              100, {
                "$first": {
                  "$first": "$Financialstatementdashboard.loanDelincuency.globalValue"
                }
              }
            ]
          }, 4
        ]
      }, 
      "cobranzaMoraUVC.indiceMora.sustemFinancPcrt": {
        "$round": [
          {
            "$multiply": [
              100, {
                "$first": {
                  "$first": "$Financialstatementdashboard.loanDelincuency.globalValue"
                }
              }
            ]
          }, 4
        ]
      }
    }
  }, {
    "$merge": {
      "into": "Balancemetric", 
      "on": "fecha_valor"
    }
  }
]