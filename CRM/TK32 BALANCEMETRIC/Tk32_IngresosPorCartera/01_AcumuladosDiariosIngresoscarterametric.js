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
                $toInt: "373",
                //"567"
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
    $lookup: {
      from: "Parametricingresocarteracredito",
      pipeline: [
        {
          $project: {
            cuentaContable: 1,
            productoControlGestion: 1,
            _id: 0,
          },
        },
      ],
      as: "Parametricingresocarteracredito",
    },
  },
  {
    $addFields: {
      cuentasContable:
        "$Parametricingresocarteracredito.cuentaContable",
      //Generamos un nuevo con la fecha de hoy
    },
  },
  {
    $lookup: {
      //Traemos los documenos de la fecha hoy
      from: "sidis_brm",
      let: {
        todayDate: "$todayDate",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                "$$todayDate",
                "$fecha_odate",
              ],
            },
          },
        },
        {
          $project: {
            nucta: 1,
            sal_act: {
              $multiply: ["$sal_act", -1],
            },
            sal_ant: {
              $multiply: ["$sal_ant", -1],
            },
            sal_net_act: {
              $multiply: ["$sal_net_act", -1],
            },
          },
        },
      ],
      as: "sidis_brm",
    },
  },
  {
    $addFields: {
      avaiableData: {
        $cond: [
          {
            $gt: [
              {
                $size: "$sidis_brm",
              },
              0,
            ],
          },
          true,
          false,
        ],
      },
      firstDayMonth: {
        $eq: [
          {
            $dayOfMonth: "$todayDate",
          },
          1,
        ],
      },
      firstDayYear: {
        $and: [
          {
            $eq: [
              {
                $dayOfMonth: "$todayDate",
              },
              1,
            ],
          },
          {
            $eq: [
              {
                $month: "$todayDate",
              },
              1,
            ],
          },
        ],
      },
      //Filtra los documentos correspondientes a ingresos por comisión
      sidis_brm: {
        $filter: {
          input: "$sidis_brm",
          as: "brm",
          cond: {
            $in: [
              "$$brm.nucta",
              "$cuentasContable",
            ],
          },
        },
      },
      cuentasContable: "$$REMOVE",
      yesterdayDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "day",
          amount: -1,
        },
      },
      tomorrowDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "day",
          amount: 1,
        },
      },
      previusMonthDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "month",
          amount: -1,
        },
      },
      previusMonthlastDate: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$todayDate",
              },
              month: {
                $month: "$todayDate",
              },
            },
          },
          86400000,
        ],
      },
      previusYearDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "year",
          amount: -1,
        },
      },
      PreviusYearlastDate: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$todayDate",
              },
            },
          },
          86400000,
        ],
      },
    },
  },
  {
    $lookup: {
      from: "sidis_activosIa",
      let: {
        todayDate: "$todayDate",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$todayDate", "$fevalor"],
            },
          },
        },
        {
          $match: {
            $nor: [
              {
                sitdeuct: "CASTIGO",
              },
              {
                indretro: "S",
              },
              {
                cod_evento:
                  "CANCELACION ANTICIPADA",
                formpago: "EN TELEPROCESO",
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            capindif: 1,
          },
        },
      ],
      as: "sidis_activosIa",
    },
  },
  {
    $lookup: {
      from: "Ingresoscartcredmetric",
      localField: "yesterdayDate",
      foreignField: "fecha_valor",
      as: "IngresoscartcredmetricyesterdayDate",
    },
  },
  {
    $lookup: {
      from: "sidis_tasaconversion",
      localField: "todayDate",
      foreignField: "Fecha",
      as: "sidis_tasaconversion",
    },
  },
  {
    $addFields: {
      Parametricingresocarteracredito: "$$REMOVE",
      sidis_brm: "$$REMOVE",
      sidis_activosIa: "$$REMOVE",
      IngresoscartcredmetricyesterdayDate:
        "$$REMOVE",
      sidis_tasaconversion: "$$REMOVE",
      fecha_valor: "$todayDate",
      sal_actTotalBs: {
        $round: [
          {
            $cond: [
              "$avaiableData",
              {
                $sum: "$sidis_brm.sal_act",
              },
              {
                $first:
                  "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs",
              },
            ],
          },
          4,
        ],
      },
      sal_antTotalBs: {
        $round: [
          {
            $cond: [
              "$avaiableData",
              {
                $sum: "$sidis_brm.sal_ant",
              },
              {
                $first:
                  "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs",
              },
            ],
          },
          4,
        ],
      },
      sal_net_actTotalBs: {
        $round: [
          {
            $cond: [
              "$avaiableData",
              {
                $sum: "$sidis_brm.sal_net_act",
              },
              {
                $first:
                  "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs",
              },
            ],
          },
          4,
        ],
      },
      capindifTotalBs: {
        $round: [
          {
            $cond: [
              {
                $gt: [
                  {
                    $size: "$sidis_activosIa",
                  },
                  0,
                ],
              },
              {
                $sum: "$sidis_activosIa.capindif",
              },
              {
                $first:
                  "$IngresoscartcredmetricyesterdayDate.capindifBs",
              },
            ],
          },
          4,
        ],
      },
      sal_actTotalBsUSD: {
        $round: [
          {
            $divide: [
              {
                $round: [
                  {
                    $cond: [
                      "$avaiableData",
                      {
                        $sum: "$sidis_brm.sal_act",
                      },
                      {
                        $first:
                          "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs",
                      },
                    ],
                  },
                  4,
                ],
              },
              {
                $first:
                  "$sidis_tasaconversion.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      sal_antTotalBsUSD: {
        $round: [
          {
            $divide: [
              {
                $round: [
                  {
                    $cond: [
                      "$avaiableData",
                      {
                        $sum: "$sidis_brm.sal_ant",
                      },
                      {
                        $first:
                          "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs",
                      },
                    ],
                  },
                  4,
                ],
              },
              {
                $first:
                  "$sidis_tasaconversion.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      sal_net_actTotalBsUSD: {
        $round: [
          {
            $divide: [
              {
                $round: [
                  {
                    $cond: [
                      "$avaiableData",
                      {
                        $sum: "$sidis_brm.sal_net_act",
                      },
                      {
                        $first:
                          "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs",
                      },
                    ],
                  },
                  4,
                ],
              },
              {
                $first:
                  "$sidis_tasaconversion.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      capindifTotalBsUSD: {
        $round: [
          {
            $divide: [
              {
                $round: [
                  {
                    $cond: [
                      {
                        $gt: [
                          {
                            $size:
                              "$sidis_activosIa",
                          },
                          0,
                        ],
                      },
                      {
                        $sum: "$sidis_activosIa.capindif",
                      },
                      {
                        $first:
                          "$IngresoscartcredmetricyesterdayDate.capindifBs",
                      },
                    ],
                  },
                  4,
                ],
              },
              {
                $first:
                  "$sidis_tasaconversion.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      sal_actTotalBsyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs",
      },
      sal_antTotalBsyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs",
      },
      sal_net_actTotalBsyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs",
      },
      capindifTotalBsyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.capindifTotalBs",
      },
      sal_actTotalBsUSDyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_actTotalBsUSD",
      },
      sal_antTotalBsUSDyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_antTotalBsUSD",
      },
      sal_net_actTotalBsUSDyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBsUSD",
      },
      capindifTotalBsUSDyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.capindifTotalBsUSD",
      },
      condVarIDIyesterday: {
        $first:
          "$IngresoscartcredmetricyesterdayDate.condVarIDI",
      },
    },
  },
  {
    $addFields: {
      condVarIDI: {
        $cond: [
          {
            $and: [
              {
                $or: [
                  {
                    $eq: [
                      {
                        $month: "$todayDate",
                      },
                      7,
                    ],
                  },
                  {
                    $eq: [
                      {
                        $month: "$todayDate",
                      },
                      1,
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
                                "$sal_actTotalBs",
                                "$sal_actTotalBsyesterday",
                              ],
                            },
                          },
                          "$sal_actTotalBs",
                        ],
                      },
                      4,
                    ],
                  },
                  3.5,
                ],
              },
            ],
          },
          {
            $not: "$condVarIDIyesterday",
          },
          {
            $ifNull: [
              "$condVarIDIyesterday",
              false,
            ],
          },
        ],
      },
      varCapindif: {
        $and: [
          {
            $or: [
              {
                $eq: [
                  {
                    $month: "$todayDate",
                  },
                  7,
                ],
              },
              {
                $eq: [
                  {
                    $month: "$todayDate",
                  },
                  1,
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
                            "$sal_actTotalBs",
                            "$sal_actTotalBsyesterday",
                          ],
                        },
                      },
                      "$sal_actTotalBs",
                    ],
                  },
                  4,
                ],
              },
              3.5,
            ],
          },
        ],
      },
      varCapindifValue: {
        $round: [
          {
            $divide: [
              {
                $abs: {
                  $subtract: [
                    "$sal_actTotalBs",
                    "$sal_actTotalBsyesterday",
                  ],
                },
              },
              "$sal_actTotalBs",
            ],
          },
          4,
        ],
      },
    },
  },
  // {
  //   $addFields:
  //justo for test
  //     {
  //       sal_actTotalBs: {
  //         $round: ["$sal_actTotalBs", 0],
  //       },
  //       sal_antTotalBs: {
  //         $round: ["$sal_antTotalBs", 0],
  //       },
  //       sal_net_actTotalBs: {
  //         $round: ["$sal_net_actTotalBs", 0],
  //       },
  //       capindifTotalBs: {
  //         $round: ["$capindifTotalBs", 0],
  //       },
  //       sal_actTotalBsUSD: {
  //         $round: ["$sal_actTotalBsUSD", 0],
  //       },
  //       sal_antTotalBsUSD: {
  //         $round: ["$sal_antTotalBsUSD", 0],
  //       },
  //       sal_net_actTotalBsUSD: {
  //         $round: ["$sal_net_actTotalBsUSD", 0],
  //       },
  //       capindifTotalBsUSD: {
  //         $round: ["$capindifTotalBsUSD", 0],
  //       },
  //     },
  // },
  {
    $merge: {
      into: "Ingresoscartcredmetric",
      on: "fecha_valor",
      whenMatched: "replace",
    },
  },
]

////////////////////

[
  {
    "$limit": 1
  }, {
    "$project": {
      "_id": 0, 
      "todayDate": {
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
    "$lookup": {
      "from": "Parametricingresocarteracredito", 
      "pipeline": [
        {
          "$project": {
            "cuentaContable": 1, 
            "productoControlGestion": 1, 
            "_id": 0
          }
        }
      ], 
      "as": "Parametricingresocarteracredito"
    }
  }, {
    "$addFields": {
      "cuentasContable": "$Parametricingresocarteracredito.cuentaContable"
    }
  }, {
    "$lookup": {
      "from": "sidis_brm", 
      "let": {
        "todayDate": "$todayDate"
      }, 
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$$todayDate", "$fecha_odate"
              ]
            }
          }
        }, {
          "$project": {
            "nucta": 1, 
            "sal_act": {
              "$multiply": [
                "$sal_act", -1
              ]
            }, 
            "sal_ant": {
              "$multiply": [
                "$sal_ant", -1
              ]
            }, 
            "sal_net_act": {
              "$multiply": [
                "$sal_net_act", -1
              ]
            }
          }
        }
      ], 
      "as": "sidis_brm"
    }
  }, {
    "$addFields": {
      "avaiableData": {
        "$cond": [
          {
            "$gt": [
              {
                "$size": "$sidis_brm"
              }, 0
            ]
          }, true, false
        ]
      }, 
      "firstDayMonth": {
        "$eq": [
          {
            "$dayOfMonth": "$todayDate"
          }, 1
        ]
      }, 
      "firstDayYear": {
        "$and": [
          {
            "$eq": [
              {
                "$dayOfMonth": "$todayDate"
              }, 1
            ]
          }, {
            "$eq": [
              {
                "$month": "$todayDate"
              }, 1
            ]
          }
        ]
      }, 
      "sidis_brm": {
        "$filter": {
          "input": "$sidis_brm", 
          "as": "brm", 
          "cond": {
            "$in": [
              "$$brm.nucta", "$cuentasContable"
            ]
          }
        }
      }, 
      "cuentasContable": "$$REMOVE", 
      "yesterdayDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "day", 
          "amount": -1
        }
      }, 
      "tomorrowDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "day", 
          "amount": 1
        }
      }, 
      "previusMonthDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "month", 
          "amount": -1
        }
      }, 
      "previusMonthlastDate": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$todayDate"
              }, 
              "month": {
                "$month": "$todayDate"
              }
            }
          }, 86400000
        ]
      }, 
      "previusYearDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "year", 
          "amount": -1
        }
      }, 
      "PreviusYearlastDate": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$todayDate"
              }
            }
          }, 86400000
        ]
      }
    }
  }, {
    "$lookup": {
      "from": "sidis_activosIa", 
      "let": {
        "todayDate": "$todayDate"
      }, 
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$$todayDate", "$fevalor"
              ]
            }
          }
        }, {
          "$match": {
            "$nor": [
              {
                "sitdeuct": "CASTIGO"
              }, {
                "indretro": "S"
              }, {
                "cod_evento": "CANCELACION ANTICIPADA", 
                "formpago": "EN TELEPROCESO"
              }
            ]
          }
        }, {
          "$project": {
            "_id": 0, 
            "capindif": 1
          }
        }
      ], 
      "as": "sidis_activosIa"
    }
  }, {
    "$lookup": {
      "from": "Ingresoscartcredmetric", 
      "localField": "yesterdayDate", 
      "foreignField": "fecha_valor", 
      "as": "IngresoscartcredmetricyesterdayDate"
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "todayDate", 
      "foreignField": "Fecha", 
      "as": "sidis_tasaconversion"
    }
  }, {
    "$addFields": {
      "Parametricingresocarteracredito": "$$REMOVE", 
      "sidis_brm": "$$REMOVE", 
      "sidis_activosIa": "$$REMOVE", 
      "IngresoscartcredmetricyesterdayDate": "$$REMOVE", 
      "sidis_tasaconversion": "$$REMOVE", 
      "fecha_valor": "$todayDate", 
      "sal_actTotalBs": {
        "$round": [
          {
            "$cond": [
              "$avaiableData", {
                "$sum": "$sidis_brm.sal_act"
              }, {
                "$first": "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs"
              }
            ]
          }, 4
        ]
      }, 
      "sal_antTotalBs": {
        "$round": [
          {
            "$cond": [
              "$avaiableData", {
                "$sum": "$sidis_brm.sal_ant"
              }, {
                "$first": "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs"
              }
            ]
          }, 4
        ]
      }, 
      "sal_net_actTotalBs": {
        "$round": [
          {
            "$cond": [
              "$avaiableData", {
                "$sum": "$sidis_brm.sal_net_act"
              }, {
                "$first": "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs"
              }
            ]
          }, 4
        ]
      }, 
      "capindifTotalBs": {
        "$round": [
          {
            "$cond": [
              {
                "$gt": [
                  {
                    "$size": "$sidis_activosIa"
                  }, 0
                ]
              }, {
                "$sum": "$sidis_activosIa.capindif"
              }, {
                "$first": "$IngresoscartcredmetricyesterdayDate.capindifBs"
              }
            ]
          }, 4
        ]
      }, 
      "sal_actTotalBsUSD": {
        "$round": [
          {
            "$divide": [
              {
                "$round": [
                  {
                    "$cond": [
                      "$avaiableData", {
                        "$sum": "$sidis_brm.sal_act"
                      }, {
                        "$first": "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs"
                      }
                    ]
                  }, 4
                ]
              }, {
                "$first": "$sidis_tasaconversion.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "sal_antTotalBsUSD": {
        "$round": [
          {
            "$divide": [
              {
                "$round": [
                  {
                    "$cond": [
                      "$avaiableData", {
                        "$sum": "$sidis_brm.sal_ant"
                      }, {
                        "$first": "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs"
                      }
                    ]
                  }, 4
                ]
              }, {
                "$first": "$sidis_tasaconversion.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "sal_net_actTotalBsUSD": {
        "$round": [
          {
            "$divide": [
              {
                "$round": [
                  {
                    "$cond": [
                      "$avaiableData", {
                        "$sum": "$sidis_brm.sal_net_act"
                      }, {
                        "$first": "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs"
                      }
                    ]
                  }, 4
                ]
              }, {
                "$first": "$sidis_tasaconversion.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "capindifTotalBsUSD": {
        "$round": [
          {
            "$divide": [
              {
                "$round": [
                  {
                    "$cond": [
                      {
                        "$gt": [
                          {
                            "$size": "$sidis_activosIa"
                          }, 0
                        ]
                      }, {
                        "$sum": "$sidis_activosIa.capindif"
                      }, {
                        "$first": "$IngresoscartcredmetricyesterdayDate.capindifBs"
                      }
                    ]
                  }, 4
                ]
              }, {
                "$first": "$sidis_tasaconversion.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "sal_actTotalBsyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_actTotalBs"
      }, 
      "sal_antTotalBsyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_antTotalBs"
      }, 
      "sal_net_actTotalBsyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBs"
      }, 
      "capindifTotalBsyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.capindifTotalBs"
      }, 
      "sal_actTotalBsUSDyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_actTotalBsUSD"
      }, 
      "sal_antTotalBsUSDyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_antTotalBsUSD"
      }, 
      "sal_net_actTotalBsUSDyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.sal_net_actTotalBsUSD"
      }, 
      "capindifTotalBsUSDyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.capindifTotalBsUSD"
      }, 
      "condVarIDIyesterday": {
        "$first": "$IngresoscartcredmetricyesterdayDate.condVarIDI"
      }
    }
  }, {
    "$addFields": {
      "condVarIDI": {
        "$cond": [
          {
            "$and": [
              {
                "$or": [
                  {
                    "$eq": [
                      {
                        "$month": "$todayDate"
                      }, 7
                    ]
                  }, {
                    "$eq": [
                      {
                        "$month": "$todayDate"
                      }, 1
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
                                "$sal_actTotalBs", "$sal_actTotalBsyesterday"
                              ]
                            }
                          }, "$sal_actTotalBs"
                        ]
                      }, 4
                    ]
                  }, 3.5
                ]
              }
            ]
          }, {
            "$not": "$condVarIDIyesterday"
          }, {
            "$ifNull": [
              "$condVarIDIyesterday", false
            ]
          }
        ]
      }, 
      "varCapindif": {
        "$and": [
          {
            "$or": [
              {
                "$eq": [
                  {
                    "$month": "$todayDate"
                  }, 7
                ]
              }, {
                "$eq": [
                  {
                    "$month": "$todayDate"
                  }, 1
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
                            "$sal_actTotalBs", "$sal_actTotalBsyesterday"
                          ]
                        }
                      }, "$sal_actTotalBs"
                    ]
                  }, 4
                ]
              }, 3.5
            ]
          }
        ]
      }, 
      "varCapindifValue": {
        "$round": [
          {
            "$divide": [
              {
                "$abs": {
                  "$subtract": [
                    "$sal_actTotalBs", "$sal_actTotalBsyesterday"
                  ]
                }
              }, "$sal_actTotalBs"
            ]
          }, 4
        ]
      }
    }
  }, {
    "$merge": {
      "into": "Ingresoscartcredmetric", 
      "on": "fecha_valor", 
      "whenMatched": "replace"
    }
  }
]