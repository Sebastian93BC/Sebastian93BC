[
  {
    $addFields: {
      today: {
        $subtract: [
          {
            $toDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT00:00:00%z",
                    date: {
                      $toDate: "$$NOW",
                    },
                  },
                },
              },
            },
          },
          {
            $multiply: [
              {
                $toInt: "691",
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
      dateStart: {
        $dateFromParts: {
          year: {
            $year: "$today",
          },
        },
      },
      dateFinish: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$today",
              },
              month: {
                $sum: [
                  {
                    $month: "$today",
                  },
                  1,
                ],
              },
            },
          },
          86400000,
        ],
      },
    },
  },
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $and: [
          {
            $expr: {
              $gte: ["$fecha", "$dateStart"],
            },
          },
          {
            $expr: {
              $lte: ["$fecha", "$dateFinish"],
            },
          },
        ],
      },
  },
  {
    $group: {
      _id: "$today",
      acAnualMonto: {
        $sum: "$castigo",
      },
      acMensualMonto: {
        $sum: {
          $cond: [
            {
              $eq: ["$dateFinish", "$fecha"],
            },
            "$castigo",
            0,
          ],
        },
      },
      monto: {
        $sum: {
          $cond: [
            {
              $eq: ["$dateFinish", "$fecha"],
            },
            "$castigo",
            0,
          ],
        },
      },
    },
  },
  {
    $lookup: {
      from: "Balancemetric",
      localField: "_id",
      foreignField: "fecha_valor",
      as: "result",
    },
  },
  {
    $lookup: {
      from: "sidis_tasaconversion",
      localField: "_id",
      foreignField: "Fecha",
      as: "result1",
    },
  },
  {
    $addFields: {
      result: "$$REMOVE",
      result1: "$$REMOVE",
      tasa: {
        $first: "$result1.Tasa_DOL",
      },
      cobranzaMora: {
        $first: "$result.cobranzaMora",
      },
      cobranzaMoraUVC: {
        $first: "$result.cobranzaMoraUVC",
      },
    },
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      acAnualMonto: "$$REMOVE",
      acMensualMonto: "$$REMOVE",
      monto: "$$REMOVE",
      tasa: "$$REMOVE",
      fecha_valor: "$_id",
      "cobranzaMora.castigo.monto": {
        $round: [
          {
            $multiply: ["$monto", 1000000],
          },
          4,
        ],
      },
      "cobranzaMora.castigo.acMensualMonto": {
        $round: [
          {
            $multiply: [
              "$acMensualMonto",
              1000000,
            ],
          },
          4,
        ],
      },
      "cobranzaMora.castigo.acAnualMonto": {
        $round: [
          {
            $multiply: ["$acAnualMonto", 1000000],
          },
          4,
        ],
      },
      "cobranzaMoraUVC.castigo.monto": {
        $round: [
          {
            $multiply: [
              {
                $multiply: ["$monto", "$tasa"],
              },
              1000000,
            ],
          },
          4,
        ],
      },
      "cobranzaMoraUVC.castigo.acMensualMonto": {
        $round: [
          {
            $multiply: [
              {
                $multiply: [
                  "$acMensualMonto",
                  "$tasa",
                ],
              },
              1000000,
            ],
          },
          4,
        ],
      },
      "cobranzaMoraUVC.castigo.acAnualMonto": {
        $round: [
          {
            $multiply: [
              {
                $multiply: [
                  "$acAnualMonto",
                  "$tasa",
                ],
              },
              1000000,
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
      whenMatched: "merge",
      whenNotMatched: "insert",
    },
  },
]


//N8N

[
  {
    "$addFields": {
      "today": {
        "$subtract": [
          {
            "$toDate": {
              "$dateFromString": {
                "dateString": {
                  "$dateToString": {
                    "format": "%Y-%m-%dT00:00:00%z", 
                    "date": {
                      "$toDate": "$$NOW"
                    }
                  }
                }
              }
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
      "dateStart": {
        "$dateFromParts": {
          "year": {
            "$year": "$today"
          }
        }
      }, 
      "dateFinish": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$today"
              }, 
              "month": {
                "$sum": [
                  {
                    "$month": "$today"
                  }, 1
                ]
              }
            }
          }, 86400000
        ]
      }
    }
  }, {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$gte": [
              "$fecha", "$dateStart"
            ]
          }
        }, {
          "$expr": {
            "$lte": [
              "$fecha", "$dateFinish"
            ]
          }
        }
      ]
    }
  }, {
    "$group": {
      "_id": "$today", 
      "acAnualMonto": {
        "$sum": "$castigo"
      }, 
      "acMensualMonto": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$dateFinish", "$fecha"
              ]
            }, "$castigo", 0
          ]
        }
      }, 
      "monto": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$dateFinish", "$fecha"
              ]
            }, "$castigo", 0
          ]
        }
      }
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "_id", 
      "foreignField": "fecha_valor", 
      "as": "result"
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "_id", 
      "foreignField": "Fecha", 
      "as": "result1"
    }
  }, {
    "$addFields": {
      "result": "$$REMOVE", 
      "result1": "$$REMOVE", 
      "tasa": {
        "$first": "$result1.Tasa_DOL"
      }, 
      "cobranzaMora": {
        "$first": "$result.cobranzaMora"
      }, 
      "cobranzaMoraUVC": {
        "$first": "$result.cobranzaMoraUVC"
      }
    }
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "acAnualMonto": "$$REMOVE", 
      "acMensualMonto": "$$REMOVE", 
      "monto": "$$REMOVE", 
      "tasa": "$$REMOVE", 
      "fecha_valor": "$_id", 
      "cobranzaMora.castigo.monto": {
        "$round": [
          {
            "$multiply": [
              "$monto", 1000000
            ]
          }, 4
        ]
      }, 
      "cobranzaMora.castigo.acMensualMonto": {
        "$round": [
          {
            "$multiply": [
              "$acMensualMonto", 1000000
            ]
          }, 4
        ]
      }, 
      "cobranzaMora.castigo.acAnualMonto": {
        "$round": [
          {
            "$multiply": [
              "$acAnualMonto", 1000000
            ]
          }, 4
        ]
      }, 
      "cobranzaMoraUVC.castigo.monto": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$monto", "$tasa"
                ]
              }, 1000000
            ]
          }, 4
        ]
      }, 
      "cobranzaMoraUVC.castigo.acMensualMonto": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$acMensualMonto", "$tasa"
                ]
              }, 1000000
            ]
          }, 4
        ]
      }, 
      "cobranzaMoraUVC.castigo.acAnualMonto": {
        "$round": [
          {
            "$multiply": [
              {
                "$multiply": [
                  "$acAnualMonto", "$tasa"
                ]
              }, 1000000
            ]
          }, 4
        ]
      }
    }
  }, {
    "$merge": {
      "into": "Balancemetric", 
      "on": "fecha_valor", 
      "whenMatched": "merge", 
      "whenNotMatched": "insert"
    }
  }
]