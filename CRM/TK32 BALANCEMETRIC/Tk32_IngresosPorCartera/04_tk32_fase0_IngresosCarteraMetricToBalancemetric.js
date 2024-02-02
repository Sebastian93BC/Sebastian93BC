[
  {
    $match: {
      $expr: {
        $eq: [
          {
            $subtract: [
              {
                $toDate: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        format:
                          "%Y-%m-%dT00:00:00%z",
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
                    $toInt: "474",
                    //"{{$json.offSet}}"
                  },
                  86400000,
                ],
              },
            ],
          },
          {
            $dateFromParts: {
              year: {
                $year: "$fecha_odate",
              },
              month: {
                $month: "$fecha_odate",
              },
              day: {
                $dayOfMonth: "$fecha_odate",
              },
            },
          },
        ],
      },
    },
  },
  {
    $addFields: {
      fechaAyer: {
        $subtract: ["$fecha_odate", 86400000],
      },
      fechaMesAnterior: {
        $dateFromParts: {
          day: {
            $dayOfMonth: "$fecha_odate",
          },
          month: {
            $cond: [
              {
                $eq: [
                  {
                    $month: "$fecha_odate",
                  },
                  1,
                ],
              },
              12,
              {
                $subtract: [
                  {
                    $month: "$fecha_odate",
                  },
                  1,
                ],
              },
            ],
          },
          year: {
            $cond: [
              {
                $eq: [
                  {
                    $month: "$fecha_odate",
                  },
                  1,
                ],
              },
              {
                $subtract: [
                  {
                    $year: "$fecha_odate",
                  },
                  1,
                ],
              },
              {
                $year: "$fecha_odate",
              },
            ],
          },
        },
      },
      fechaAnoAnterior: {
        $dateFromParts: {
          day: {
            $dayOfMonth: "$fecha_odate",
          },
          month: {
            $month: "$fecha_odate",
          },
          year: {
            $subtract: [
              {
                $year: "$fecha_odate",
              },
              1,
            ],
          },
        },
      },
      condPriMes: {
        $eq: [
          {
            $dayOfMonth: "$fecha_odate",
          },
          1,
        ],
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
    $lookup: {
      from: "sidis_brm_ingresosCartera",
      localField: "fechaMesAnterior",
      foreignField: "fecha_odate",
      as: "sidis_brm_ingresosCarteraMes",
    },
  },
  {
    $lookup: {
      from: "sidis_brm_ingresosCartera",
      localField: "fechaAnoAnterior",
      foreignField: "fecha_odate",
      as: "sidis_brm_ingresosCarteraAno",
    },
  },
  {
    $addFields: {
      iccActual: {
        $cond: [
          "$condPriMes",
          {
            $sum: ["$salNetActBs", "$capindifBs"],
          },
          {
            $subtract: [
              {
                $sum: [
                  "$salNetActBs",
                  "$capindifBs",
                ],
              },
              {
                $first:
                  "$sidis_brm_ingresosCarteraAyer.salNetActBs",
              },
            ],
          },
        ],
      },
      iccAcMensual: {
        $sum: [
          "$salNetActBs",
          "$capindifBsMensual",
        ],
      },
      iccAcAnual: {
        $cond: [
          "$ajuste",
          {
            $sum: [
              "$salActBs",
              "$capindifBsAnual",
              "$salActAjusteBs",
            ],
          },
          {
            $sum: [
              "$salActBs",
              "$capindifBsAnual",
            ],
          },
        ],
      },
      iccActual513: {
        $cond: [
          "$condPriMes",
          "$salNetActBs",
          {
            $subtract: [
              "$salNetActBs",
              {
                $first:
                  "$sidis_brm_ingresosCarteraAyer.salNetActBs",
              },
            ],
          },
        ],
      },
      iccAcMensual513: {
        $sum: ["$salNetActBs"],
      },
      iccAcAnual513: {
        $cond: [
          "$ajuste",
          {
            $sum: [
              "$salActBs",
              "$salActAjusteBs",
            ],
          },
          "$salActBs",
        ],
      },
      icAcMensual: "$salNetActBs",
      iccAcMensualAnt: {
        $first:
          "$sidis_brm_ingresosCarteraMes.salNetActBs",
      },
      iccAcAnualAnt: {
        $cond: [
          {
            $first:
              "$sidis_brm_ingresosCarteraAno.ajuste",
          },
          {
            $sum: [
              {
                $first:
                  "$sidis_brm_ingresosCarteraAno.salActBs",
              },
              {
                $first:
                  "$sidis_brm_ingresosCarteraAno.salActAjusteBs",
              },
            ],
          },
          {
            $first:
              "$sidis_brm_ingresosCarteraAno.salActBs",
          },
        ],
      },
      iccVarMensual: {
        $subtract: [
          {
            $sum: ["$salNetActBs", "$capindifBs"],
          },
          {
            $first:
              "$sidis_brm_ingresosCarteraMes.salNetActBs",
          },
        ],
      },
    },
  },
  {
    $lookup: {
      from: "sidis_tasaconversion",
      localField: "fecha_odate",
      foreignField: "Fecha",
      as: "tasa",
    },
  },
  {
    $lookup: {
      from: "sidis_objetives",
      let: {
        mes: {
          $month: "$fecha_odate",
        },
        ano: {
          $year: "$fecha_odate",
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
                      $month: "$fecha",
                    },
                  ],
                },
              },
              {
                $expr: {
                  $eq: [
                    "$$ano",
                    {
                      $year: "$fecha",
                    },
                  ],
                },
              },
            ],
          },
        },
        //
      ],

      as: "result",
    },
  },
  {
    $project: {
      _id: 0,
      fecha_valor: "$fecha_odate",
      "ingresosCarteraBs.iccActual": "$iccActual",
      "ingresosCarteraBs.iccAcMensual":
        "$iccAcMensual",
      "ingresosCarteraBs.iccAcAnual":
        "$iccAcAnual",
      "ingresosCarteraBs.iccActual513":
        "$iccActual513",
      "ingresosCarteraBs.iccAcMensual513":
        "$iccAcMensual513",
      "ingresosCarteraBs.iccAcAnual513":
        "$iccAcAnual513",
      "ingresosCarteraBs.capindifBs":
        "$capindifBs",
      "ingresosCarteraBs.capindifBsMensual":
        "$capindifBsMensual",
      "ingresosCarteraBs.capindifBsAnual":
        "$capindifBsAnual",
      "ingresosCarteraBs.iccAcMensualAnt":
        "$iccAcMensualAnt",
      "ingresosCarteraBs.iccAcAnualAnt":
        "$iccAcAnualAnt",
      "ingresosCarteraBs.iccVarMensual":
        "$iccVarMensual",
      "ingresosCartera.iccActual": {
        $round: [
          {
            $divide: [
              "$iccActual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcMensual": {
        $round: [
          {
            $divide: [
              "$iccAcMensual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcAnual": {
        $round: [
          {
            $divide: [
              "$iccAcAnual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccActual513": {
        $round: [
          {
            $divide: [
              "$iccActual513",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcMensual513": {
        $round: [
          {
            $divide: [
              "$iccAcMensual513",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcAnual513": {
        $round: [
          {
            $divide: [
              "$iccAcAnual513",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.capindif": {
        $round: [
          {
            $divide: [
              "$capindifBs",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.capindifAnual": {
        $round: [
          {
            $divide: [
              "$capindifBsAnual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.capindifMensual": {
        $round: [
          {
            $divide: [
              "$capindifBsMensual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcMensualAnt": {
        $round: [
          {
            $divide: [
              "$iccAcMensualAnt",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccAcAnualAnt": {
        $round: [
          {
            $divide: [
              "$iccAcAnualAnt",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.iccVarMensual": {
        $round: [
          {
            $divide: [
              "$iccVarMensual",
              {
                $first: "$tasa.Tasa_DOL",
              },
            ],
          },
          4,
        ],
      },
      "ingresosCartera.goalIccMensual": {
        $first: "$result.iccTot",
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

//n8n

[
  {
    "$match": {
      "$expr": {
        "$eq": [
          {
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
          }, {
            "$dateFromParts": {
              "year": {
                "$year": "$fecha_odate"
              }, 
              "month": {
                "$month": "$fecha_odate"
              }, 
              "day": {
                "$dayOfMonth": "$fecha_odate"
              }
            }
          }
        ]
      }
    }
  }, {
    "$addFields": {
      "fechaAyer": {
        "$subtract": [
          "$fecha_odate", 86400000
        ]
      }, 
      "fechaMesAnterior": {
        "$dateFromParts": {
          "day": {
            "$dayOfMonth": "$fecha_odate"
          }, 
          "month": {
            "$cond": [
              {
                "$eq": [
                  {
                    "$month": "$fecha_odate"
                  }, 1
                ]
              }, 12, {
                "$subtract": [
                  {
                    "$month": "$fecha_odate"
                  }, 1
                ]
              }
            ]
          }, 
          "year": {
            "$cond": [
              {
                "$eq": [
                  {
                    "$month": "$fecha_odate"
                  }, 1
                ]
              }, {
                "$subtract": [
                  {
                    "$year": "$fecha_odate"
                  }, 1
                ]
              }, {
                "$year": "$fecha_odate"
              }
            ]
          }
        }
      }, 
      "fechaAnoAnterior": {
        "$dateFromParts": {
          "day": {
            "$dayOfMonth": "$fecha_odate"
          }, 
          "month": {
            "$month": "$fecha_odate"
          }, 
          "year": {
            "$subtract": [
              {
                "$year": "$fecha_odate"
              }, 1
            ]
          }
        }
      }, 
      "condPriMes": {
        "$eq": [
          {
            "$dayOfMonth": "$fecha_odate"
          }, 1
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
    "$lookup": {
      "from": "sidis_brm_ingresosCartera", 
      "localField": "fechaMesAnterior", 
      "foreignField": "fecha_odate", 
      "as": "sidis_brm_ingresosCarteraMes"
    }
  }, {
    "$lookup": {
      "from": "sidis_brm_ingresosCartera", 
      "localField": "fechaAnoAnterior", 
      "foreignField": "fecha_odate", 
      "as": "sidis_brm_ingresosCarteraAno"
    }
  }, {
    "$addFields": {
      "iccActual": {
        "$cond": [
          "$condPriMes", {
            "$sum": [
              "$salNetActBs", "$capindifBs"
            ]
          }, {
            "$subtract": [
              {
                "$sum": [
                  "$salNetActBs", "$capindifBs"
                ]
              }, {
                "$first": "$sidis_brm_ingresosCarteraAyer.salNetActBs"
              }
            ]
          }
        ]
      }, 
      "iccAcMensual": {
        "$sum": [
          "$salNetActBs", "$capindifBsMensual"
        ]
      }, 
      "iccAcAnual": {
        "$cond": [
          "$ajuste", {
            "$sum": [
              "$salActBs", "$capindifBsAnual", "$salActAjusteBs"
            ]
          }, {
            "$sum": [
              "$salActBs", "$capindifBsAnual"
            ]
          }
        ]
      }, 
      "iccActual513": {
        "$cond": [
          "$condPriMes", "$salNetActBs", {
            "$subtract": [
              "$salNetActBs", {
                "$first": "$sidis_brm_ingresosCarteraAyer.salNetActBs"
              }
            ]
          }
        ]
      }, 
      "iccAcMensual513": {
        "$sum": [
          "$salNetActBs"
        ]
      }, 
      "iccAcAnual513": {
        "$cond": [
          "$ajuste", {
            "$sum": [
              "$salActBs", "$salActAjusteBs"
            ]
          }, "$salActBs"
        ]
      }, 
      "icAcMensual": "$salNetActBs", 
      "iccAcMensualAnt": {
        "$first": "$sidis_brm_ingresosCarteraMes.salNetActBs"
      }, 
      "iccAcAnualAnt": {
        "$cond": [
          {
            "$first": "$sidis_brm_ingresosCarteraAno.ajuste"
          }, {
            "$sum": [
              {
                "$first": "$sidis_brm_ingresosCarteraAno.salActBs"
              }, {
                "$first": "$sidis_brm_ingresosCarteraAno.salActAjusteBs"
              }
            ]
          }, {
            "$first": "$sidis_brm_ingresosCarteraAno.salActBs"
          }
        ]
      }, 
      "iccVarMensual": {
        "$subtract": [
          {
            "$sum": [
              "$salNetActBs", "$capindifBs"
            ]
          }, {
            "$first": "$sidis_brm_ingresosCarteraMes.salNetActBs"
          }
        ]
      }
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "fecha_odate", 
      "foreignField": "Fecha", 
      "as": "tasa"
    }
  }, {
    "$lookup": {
      "from": "sidis_objetives", 
      "let": {
        "mes": {
          "$month": "$fecha_odate"
        }, 
        "ano": {
          "$year": "$fecha_odate"
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
                      "$month": "$fecha"
                    }
                  ]
                }
              }, {
                "$expr": {
                  "$eq": [
                    "$$ano", {
                      "$year": "$fecha"
                    }
                  ]
                }
              }
            ]
          }
        }
      ], 
      "as": "result"
    }
  }, {
    "$project": {
      "_id": 0, 
      "fecha_valor": "$fecha_odate", 
      "ingresosCarteraBs.iccActual": "$iccActual", 
      "ingresosCarteraBs.iccAcMensual": "$iccAcMensual", 
      "ingresosCarteraBs.iccAcAnual": "$iccAcAnual", 
      "ingresosCarteraBs.iccActual513": "$iccActual513", 
      "ingresosCarteraBs.iccAcMensual513": "$iccAcMensual513", 
      "ingresosCarteraBs.iccAcAnual513": "$iccAcAnual513", 
      "ingresosCarteraBs.capindifBs": "$capindifBs", 
      "ingresosCarteraBs.capindifBsMensual": "$capindifBsMensual", 
      "ingresosCarteraBs.capindifBsAnual": "$capindifBsAnual", 
      "ingresosCarteraBs.iccAcMensualAnt": "$iccAcMensualAnt", 
      "ingresosCarteraBs.iccAcAnualAnt": "$iccAcAnualAnt", 
      "ingresosCarteraBs.iccVarMensual": "$iccVarMensual", 
      "ingresosCartera.iccActual": {
        "$round": [
          {
            "$divide": [
              "$iccActual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcMensual": {
        "$round": [
          {
            "$divide": [
              "$iccAcMensual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcAnual": {
        "$round": [
          {
            "$divide": [
              "$iccAcAnual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccActual513": {
        "$round": [
          {
            "$divide": [
              "$iccActual513", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcMensual513": {
        "$round": [
          {
            "$divide": [
              "$iccAcMensual513", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcAnual513": {
        "$round": [
          {
            "$divide": [
              "$iccAcAnual513", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.capindif": {
        "$round": [
          {
            "$divide": [
              "$capindifBs", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.capindifAnual": {
        "$round": [
          {
            "$divide": [
              "$capindifBsAnual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.capindifMensual": {
        "$round": [
          {
            "$divide": [
              "$capindifBsMensual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcMensualAnt": {
        "$round": [
          {
            "$divide": [
              "$iccAcMensualAnt", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccAcAnualAnt": {
        "$round": [
          {
            "$divide": [
              "$iccAcAnualAnt", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.iccVarMensual": {
        "$round": [
          {
            "$divide": [
              "$iccVarMensual", {
                "$first": "$tasa.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "ingresosCartera.goalIccMensual": {
        "$first": "$result.iccTot"
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