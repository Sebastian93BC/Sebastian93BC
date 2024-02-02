[
  {
    $match: {
      $expr: {
        $eq: [
          "$file_date",
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
                    // "$toInt": "{{$json.offSet}}"
                    $toInt: "1",
                  },
                  86400000,
                ],
              },
            ],
          },
        ],
      },
    },
  },
  {
    $project: {
      file_date: 1,
      saldo_capital: {
        $convert: {
          input: "$saldo_capital",
          to: "decimal",
          onError: "$saldo_capital",
          onNull: "$$REMOVE",
        },
      },
      cuota_actual: {
        $convert: {
          input: "$cuota_actual",
          to: "decimal",
          onError: "$cuota_actual",
          onNull: "$$REMOVE",
        },
      },
      fecha_liquidacion: 1,
      monto_otorgado: {
        $convert: {
          input: "$monto_otorgado",
          to: "decimal",
          onError: "$monto_otorgado",
          onNull: "$$REMOVE",
        },
      },
      capital_vencido_contable: {
        $convert: {
          input: "$capital_vencido_contable",
          to: "decimal",
          onError: "$capital_vencido_contable",
          onNull: "$$REMOVE",
        },
      },
      segmento_1: {
        $convert: {
          input: "$segmento_1",
          to: "string",
          onError: "$segmento_1",
          onNull: "$$REMOVE",
        },
      },
      relacion_linea: {
        $convert: {
          input: "$relacion_linea",
          to: "string",
          onError: "$relacion_linea",
          onNull: "$$REMOVE",
        },
      },
      monto_capital_vencido: {
        $convert: {
          input: "$monto_capital_vencido",
          to: "decimal",
          onError: "$monto_capital_vencido",
          onNull: "$$REMOVE",
        },
      },
      fecha_vencimiento: 1,
      monto_mora: {
        $convert: {
          input: "$monto_mora",
          to: "decimal",
          onError: "$monto_mora",
          onNull: "$$REMOVE",
        },
      },
      tasa_interes: {
        $convert: {
          input: "$tasa_interes",
          to: "decimal",
          onError: "$tasa_interes",
          onNull: "$$REMOVE",
        },
      },
      subproducto: {
        $convert: {
          input: "$subproducto",
          to: "string",
          onError: "$subproducto",
          onNull: "$$REMOVE",
        },
      },
      cantidad_cuotas_vencidas: {
        $convert: {
          input: "$cantidad_cuotas_vencidas",
          to: "int",
          onError: "$cantidad_cuotas_vencidas",
          onNull: "$$REMOVE",
        },
      },
      actividad_economica: {
        $convert: {
          input: "$actividad_economica",
          to: "string",
          onError: "$actividad_economica",
          onNull: "$$REMOVE",
        },
      },
      producto: {
        $convert: {
          input: "$producto",
          to: "string",
          onError: "$producto",
          onNull: "$$REMOVE",
        },
      },
      cuenta_contable: {
        $convert: {
          input: "$cuenta_contable",
          to: "string",
          onError: "$cuenta_contable",
          onNull: "$$REMOVE",
        },
      },
      dias_vencidos: {
        $convert: {
          input: "$dias_vencidos",
          to: "int",
          onError: "$dias_vencidos",
          onNull: "$$REMOVE",
        },
      },
      nombre_del_cliente: {
        $convert: {
          input: "$nombre_del_cliente",
          to: "string",
          onError: "$nombre_del_cliente",
          onNull: "$$REMOVE",
        },
      },
      divisa: {
        $convert: {
          input: "$divisa",
          to: "string",
          onError: "$divisa",
          onNull: "$$REMOVE",
        },
      },
      rif: {
        $convert: {
          input: "$rif",
          to: "string",
          onError: "$rif",
          onNull: "$$REMOVE",
        },
      },
      numero_credito: {
        $convert: {
          input: "$numero_credito",
          to: "string",
          onError: "$numero_credito",
          onNull: "$$REMOVE",
        },
      },
      segmento: {
        $convert: {
          input: "$segmento",
          to: "string",
          onError: "$segmento",
          onNull: "$$REMOVE",
        },
      },
      cuenta_contrato: {
        $convert: {
          input: "$cuenta_contrato",
          to: "string",
          onError: "$cuenta_contrato",
          onNull: "$$REMOVE",
        },
      },
      plazo: {
        $convert: {
          input: "$plazo",
          to: "string",
          onError: "$plazo",
          onNull: "$$REMOVE",
        },
      },
      fecha_informacion: 1,
      monto_interes_vencido: {
        $convert: {
          input: "$monto_interes_vencido",
          to: "decimal",
          onError: "monto_interes_vencido",
          onNull: "$$REMOVE",
        },
      },
      estatus_credito: {
        $convert: {
          input: "$estatus_credito",
          to: "string",
          onError: "$estatus_credito",
          onNull: "$$REMOVE",
        },
      },
      segmento_2: {
        $convert: {
          input: "$segmento_2",
          to: "string",
          onError: "$segmento_2",
          onNull: "$$REMOVE",
        },
      },
      fecha_pase_castigo: 1,
    },
  },
  {
    $addFields:
      /**
       * newField: The new field name.
       * expression: The new field expression.
       */
      {
        saldo_capital: {
          $round: ["$saldo_capital", 4],
        },
        cuota_actual: {
          $round: ["$cuota_actual", 4],
        },
        capital_vencido_contable: {
          $round: [
            "$capital_vencido_contable",
            4,
          ],
        },
        monto_capital_vencido: {
          $round: ["$monto_capital_vencido", 4],
        },
        monto_mora: {
          $round: ["$monto_mora", 4],
        },
        tasa_interes: {
          $round: ["$tasa_interes", 4],
        },
        monto_interes_vencido: {
          $round: ["$monto_interes_vencido", 4],
        },
      },
  },
  {
    $merge: {
      into: "sidis_acr",
      on: ["rif", "fecha_liquidacion", "_id"],
    },
  },
]

//N8N

[
  {
    "$match": {
      "$expr": {
        "$eq": [
          "$file_date", {
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
                    "$toInt": "1"
                  }, 86400000
                ]
              }
            ]
          }
        ]
      }
    }
  }, {
    "$project": {
      "file_date": 1, 
      "saldo_capital": {
        "$convert": {
          "input": "$saldo_capital", 
          "to": "decimal", 
          "onError": "$saldo_capital", 
          "onNull": "$$REMOVE"
        }
      }, 
      "cuota_actual": {
        "$convert": {
          "input": "$cuota_actual", 
          "to": "decimal", 
          "onError": "$cuota_actual", 
          "onNull": "$$REMOVE"
        }
      }, 
      "fecha_liquidacion": 1, 
      "monto_otorgado": {
        "$convert": {
          "input": "$monto_otorgado", 
          "to": "decimal", 
          "onError": "$monto_otorgado", 
          "onNull": "$$REMOVE"
        }
      }, 
      "capital_vencido_contable": {
        "$convert": {
          "input": "$capital_vencido_contable", 
          "to": "decimal", 
          "onError": "$capital_vencido_contable", 
          "onNull": "$$REMOVE"
        }
      }, 
      "segmento_1": {
        "$convert": {
          "input": "$segmento_1", 
          "to": "string", 
          "onError": "$segmento_1", 
          "onNull": "$$REMOVE"
        }
      }, 
      "relacion_linea": {
        "$convert": {
          "input": "$relacion_linea", 
          "to": "string", 
          "onError": "$relacion_linea", 
          "onNull": "$$REMOVE"
        }
      }, 
      "monto_capital_vencido": {
        "$convert": {
          "input": "$monto_capital_vencido", 
          "to": "decimal", 
          "onError": "$monto_capital_vencido", 
          "onNull": "$$REMOVE"
        }
      }, 
      "fecha_vencimiento": 1, 
      "monto_mora": {
        "$convert": {
          "input": "$monto_mora", 
          "to": "decimal", 
          "onError": "$monto_mora", 
          "onNull": "$$REMOVE"
        }
      }, 
      "tasa_interes": {
        "$convert": {
          "input": "$tasa_interes", 
          "to": "decimal", 
          "onError": "$tasa_interes", 
          "onNull": "$$REMOVE"
        }
      }, 
      "subproducto": {
        "$convert": {
          "input": "$subproducto", 
          "to": "string", 
          "onError": "$subproducto", 
          "onNull": "$$REMOVE"
        }
      }, 
      "cantidad_cuotas_vencidas": {
        "$convert": {
          "input": "$cantidad_cuotas_vencidas", 
          "to": "int", 
          "onError": "$cantidad_cuotas_vencidas", 
          "onNull": "$$REMOVE"
        }
      }, 
      "actividad_economica": {
        "$convert": {
          "input": "$actividad_economica", 
          "to": "string", 
          "onError": "$actividad_economica", 
          "onNull": "$$REMOVE"
        }
      }, 
      "producto": {
        "$convert": {
          "input": "$producto", 
          "to": "string", 
          "onError": "$producto", 
          "onNull": "$$REMOVE"
        }
      }, 
      "cuenta_contable": {
        "$convert": {
          "input": "$cuenta_contable", 
          "to": "string", 
          "onError": "$cuenta_contable", 
          "onNull": "$$REMOVE"
        }
      }, 
      "dias_vencidos": {
        "$convert": {
          "input": "$dias_vencidos", 
          "to": "int", 
          "onError": "$dias_vencidos", 
          "onNull": "$$REMOVE"
        }
      }, 
      "nombre_del_cliente": {
        "$convert": {
          "input": "$nombre_del_cliente", 
          "to": "string", 
          "onError": "$nombre_del_cliente", 
          "onNull": "$$REMOVE"
        }
      }, 
      "divisa": {
        "$convert": {
          "input": "$divisa", 
          "to": "string", 
          "onError": "$divisa", 
          "onNull": "$$REMOVE"
        }
      }, 
      "rif": {
        "$convert": {
          "input": "$rif", 
          "to": "string", 
          "onError": "$rif", 
          "onNull": "$$REMOVE"
        }
      }, 
      "numero_credito": {
        "$convert": {
          "input": "$numero_credito", 
          "to": "string", 
          "onError": "$numero_credito", 
          "onNull": "$$REMOVE"
        }
      }, 
      "segmento": {
        "$convert": {
          "input": "$segmento", 
          "to": "string", 
          "onError": "$segmento", 
          "onNull": "$$REMOVE"
        }
      }, 
      "cuenta_contrato": {
        "$convert": {
          "input": "$cuenta_contrato", 
          "to": "string", 
          "onError": "$cuenta_contrato", 
          "onNull": "$$REMOVE"
        }
      }, 
      "plazo": {
        "$convert": {
          "input": "$plazo", 
          "to": "string", 
          "onError": "$plazo", 
          "onNull": "$$REMOVE"
        }
      }, 
      "fecha_informacion": 1, 
      "monto_interes_vencido": {
        "$convert": {
          "input": "$monto_interes_vencido", 
          "to": "decimal", 
          "onError": "monto_interes_vencido", 
          "onNull": "$$REMOVE"
        }
      }, 
      "estatus_credito": {
        "$convert": {
          "input": "$estatus_credito", 
          "to": "string", 
          "onError": "$estatus_credito", 
          "onNull": "$$REMOVE"
        }
      }, 
      "segmento_2": {
        "$convert": {
          "input": "$segmento_2", 
          "to": "string", 
          "onError": "$segmento_2", 
          "onNull": "$$REMOVE"
        }
      }, 
      "fecha_pase_castigo": 1
    }
  }, {
    "$addFields": {
      "saldo_capital": {
        "$round": [
          "$saldo_capital", 4
        ]
      }, 
      "cuota_actual": {
        "$round": [
          "$cuota_actual", 4
        ]
      }, 
      "capital_vencido_contable": {
        "$round": [
          "$capital_vencido_contable", 4
        ]
      }, 
      "monto_capital_vencido": {
        "$round": [
          "$monto_capital_vencido", 4
        ]
      }, 
      "monto_mora": {
        "$round": [
          "$monto_mora", 4
        ]
      }, 
      "tasa_interes": {
        "$round": [
          "$tasa_interes", 4
        ]
      }, 
      "monto_interes_vencido": {
        "$round": [
          "$monto_interes_vencido", 4
        ]
      }
    }
  }, {
    "$merge": {
      "into": "sidis_acr", 
      "on": [
        "rif", "fecha_liquidacion", "_id"
      ]
    }
  }
]