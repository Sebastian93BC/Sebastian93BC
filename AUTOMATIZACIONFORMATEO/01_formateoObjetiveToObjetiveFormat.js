[
    {
      $project: {
        _id: 0,
        // Excluye el campo _id
        name: "$name",
        fecha: "$fechaObjetivo",
        iccTot: {
          $multiply: [
            "$IngresosCarteraCreditoTotalGoalMensual",
            1000000,
          ],
        },
        icProdSaldo: {
          $multiply: [
            "$IngresosComisionesicConsultaSaldoGoal",
            1000000,
          ],
        },
        icProdMedPagos: {
          $multiply: [
            "$IngresosComisionesicMediosPagoGoal",
            1000000,
          ],
        },
        icProdNomina: {
          $multiply: [
            "$IngresosComisionesicNominaGoal",
            1000000,
          ],
        },
        icProdOpCamb: {
          $multiply: [
            "$IngresosComisionesicOpCambiariasGoal",
            1000000,
          ],
        },
        icProdOtros: {
          $multiply: [
            "$IngresosComisionesicOtrosGoal",
            1000000,
          ],
        },
        icProdPagmov: {
          $multiply: [
            "$IngresosComisionesicPagoMovilGoal",
            1000000,
          ],
        },
        icProdPagosProv: {
          $multiply: [
            "$IngresosComisionesicPagosProveedoresGoal",
            1000000,
          ],
        },
        icProdPos: {
          $multiply: [
            "$IngresosComisionesicPosGoal",
            1000000,
          ],
        },
        icProdRecaud: {
          $multiply: [
            "$IngresosComisionesicRecaudacionGoal",
            1000000,
          ],
        },
        icTot: {
          $multiply: [
            "$IngresosComisionesicTotalGoalMensual",
            1000000,
          ],
        },
        cmCobAct: {
          $multiply: [
            "$cobranzaMoragoalCobranzaActual",
            1000000,
          ],
        },
        cmCobRet: {
          $multiply: [
            "$cobranzaMoragoalCobranzaRetrazo",
            1000000,
          ],
        },
        liqPlazoEmprBdv1a: {
          $multiply: [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo1a",
            100,
          ],
        },
        liqPlazoEmprBdv45d: {
          $multiply: [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo45d",
            100,
          ],
        },
        liqPlazoEmprBdv6m: {
          $multiply: [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo6m",
            100,
          ],
        },
        liqPlazoEmprBdv9m: {
          $multiply: [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo9m",
            100,
          ],
        },
        liqPlazoEmprBdv1aM: {
          $multiply: [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazoMas1a",
            100,
          ],
        },
        liqPlazoMicCre1a: {
          $multiply: [
            "$liquidacionesgoalMontLiqMicroCredPlazo1a",
            100,
          ],
        },
        liqPlazoMicCre45d: {
          $multiply: [
            "$liquidacionesgoalMontLiqMicroCredPlazo45d",
            100,
          ],
        },
        liqPlazoMicCre6m: {
          $multiply: [
            "$liquidacionesgoalMontLiqMicroCredPlazo6m",
            100,
          ],
        },
        liqPlazoMicCre9m: {
          $multiply: [
            "$liquidacionesgoalMontLiqMicroCredPlazo9m",
            100,
          ],
        },
        liqPlazoMicCre1aM: {
          $multiply: [
            "$liquidacionesgoalMontLiqMicroCredPlazoMas1a",
            100,
          ],
        },
        liqPlazoTot1a: {
          $multiply: [
            "$liquidacionesgoalMontLiquidadoPlazo1a",
            100,
          ],
        },
        liqPlazoTot45d: {
          $multiply: [
            "$liquidacionesgoalMontLiquidadoPlazo45d",
            100,
          ],
        },
        liqPlazoTot6m: {
          $multiply: [
            "$liquidacionesgoalMontLiquidadoPlazo6m",
            100,
          ],
        },
        liqPlazoTot9m: {
          $multiply: [
            "$liquidacionesgoalMontLiquidadoPlazo9m",
            100,
          ],
        },
        liqPlazoTot1aM: {
          $multiply: [
            "$liquidacionesgoalMontLiquidadoPlazoMas1a",
            100,
          ],
        },
        liqProdMtoTot: {
          $multiply: [
            "$liquidacionesgoalProdMontTotal",
            1000000,
          ],
        },
        liqProdMtoProduc: {
          $multiply: [
            "$liquidacionesgoalProdMontProductivo",
            1000000,
          ],
        },
        liqProdMtoHip: {
          $multiply: [
            "$liquidacionesgoalProdMontHipotecario",
            1000000,
          ],
        },
        liqProdMtoCom: {
          $multiply: [
            "$liquidacionesgoalProdMontComercial",
            1000000,
          ],
        },
        liqProdMtoEmprend: {
          $multiply: [
            "$liquidacionesgoalProdMontEmprende",
            1000000,
          ],
        },
        liqProdNumTot: {
          $multiply: [
            "$liquidacionesgoalProdNumTotal",
            1,
          ],
        },
        liqProdNumProduc: {
          $multiply: [
            "$liquidacionesgoalProdNumProductivo",
            1,
          ],
        },
        liqProdNumHip: {
          $multiply: [
            "$liquidacionesgoalProdNumHipotecario",
            1,
          ],
        },
        liqProdNumCom: {
          $multiply: [
            "$liquidacionesgoalProdNumComercial",
            1,
          ],
        },
        liqProdNumEmprend: {
          $multiply: [
            "$liquidacionesgoalProdNumEmprende",
            1,
          ],
        },
        objectiveType: "$objetiveType",
        updatedAt: "$updatedAt",
      },
    },
    {
      $merge: {
        into: "Objectiveformat",
        on: "fecha",
        whenMatched: "merge",
        whenNotMatched: "insert",
      },
    },
  ]

  //n8n

[
    {
      "$project": {
        "_id": 0, 
        "name": "$name", 
        "fecha": "$fechaObjetivo", 
        "iccTot": {
          "$multiply": [
            "$IngresosCarteraCreditoTotalGoalMensual", 1000000
          ]
        }, 
        "icProdSaldo": {
          "$multiply": [
            "$IngresosComisionesicConsultaSaldoGoal", 1000000
          ]
        }, 
        "icProdMedPagos": {
          "$multiply": [
            "$IngresosComisionesicMediosPagoGoal", 1000000
          ]
        }, 
        "icProdNomina": {
          "$multiply": [
            "$IngresosComisionesicNominaGoal", 1000000
          ]
        }, 
        "icProdOpCamb": {
          "$multiply": [
            "$IngresosComisionesicOpCambiariasGoal", 1000000
          ]
        }, 
        "icProdOtros": {
          "$multiply": [
            "$IngresosComisionesicOtrosGoal", 1000000
          ]
        }, 
        "icProdPagmov": {
          "$multiply": [
            "$IngresosComisionesicPagoMovilGoal", 1000000
          ]
        }, 
        "icProdPagosProv": {
          "$multiply": [
            "$IngresosComisionesicPagosProveedoresGoal", 1000000
          ]
        }, 
        "icProdPos": {
          "$multiply": [
            "$IngresosComisionesicPosGoal", 1000000
          ]
        }, 
        "icProdRecaud": {
          "$multiply": [
            "$IngresosComisionesicRecaudacionGoal", 1000000
          ]
        }, 
        "icTot": {
          "$multiply": [
            "$IngresosComisionesicTotalGoalMensual", 1000000
          ]
        }, 
        "cmCobAct": {
          "$multiply": [
            "$cobranzaMoragoalCobranzaActual", 1000000
          ]
        }, 
        "cmCobRet": {
          "$multiply": [
            "$cobranzaMoragoalCobranzaRetrazo", 1000000
          ]
        }, 
        "liqPlazoEmprBdv1a": {
          "$multiply": [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo1a", 100
          ]
        }, 
        "liqPlazoEmprBdv45d": {
          "$multiply": [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo45d", 100
          ]
        }, 
        "liqPlazoEmprBdv6m": {
          "$multiply": [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo6m", 100
          ]
        }, 
        "liqPlazoEmprBdv9m": {
          "$multiply": [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazo9m", 100
          ]
        }, 
        "liqPlazoEmprBdv1aM": {
          "$multiply": [
            "$liquidacionesgoalMontLiqEmprendeBdvPlazoMas1a", 100
          ]
        }, 
        "liqPlazoMicCre1a": {
          "$multiply": [
            "$liquidacionesgoalMontLiqMicroCredPlazo1a", 100
          ]
        }, 
        "liqPlazoMicCre45d": {
          "$multiply": [
            "$liquidacionesgoalMontLiqMicroCredPlazo45d", 100
          ]
        }, 
        "liqPlazoMicCre6m": {
          "$multiply": [
            "$liquidacionesgoalMontLiqMicroCredPlazo6m", 100
          ]
        }, 
        "liqPlazoMicCre9m": {
          "$multiply": [
            "$liquidacionesgoalMontLiqMicroCredPlazo9m", 100
          ]
        }, 
        "liqPlazoMicCre1aM": {
          "$multiply": [
            "$liquidacionesgoalMontLiqMicroCredPlazoMas1a", 100
          ]
        }, 
        "liqPlazoTot1a": {
          "$multiply": [
            "$liquidacionesgoalMontLiquidadoPlazo1a", 100
          ]
        }, 
        "liqPlazoTot45d": {
          "$multiply": [
            "$liquidacionesgoalMontLiquidadoPlazo45d", 100
          ]
        }, 
        "liqPlazoTot6m": {
          "$multiply": [
            "$liquidacionesgoalMontLiquidadoPlazo6m", 100
          ]
        }, 
        "liqPlazoTot9m": {
          "$multiply": [
            "$liquidacionesgoalMontLiquidadoPlazo9m", 100
          ]
        }, 
        "liqPlazoTot1aM": {
          "$multiply": [
            "$liquidacionesgoalMontLiquidadoPlazoMas1a", 100
          ]
        }, 
        "liqProdMtoTot": {
          "$multiply": [
            "$liquidacionesgoalProdMontTotal", 1000000
          ]
        }, 
        "liqProdMtoProduc": {
          "$multiply": [
            "$liquidacionesgoalProdMontProductivo", 1000000
          ]
        }, 
        "liqProdMtoHip": {
          "$multiply": [
            "$liquidacionesgoalProdMontHipotecario", 1000000
          ]
        }, 
        "liqProdMtoCom": {
          "$multiply": [
            "$liquidacionesgoalProdMontComercial", 1000000
          ]
        }, 
        "liqProdMtoEmprend": {
          "$multiply": [
            "$liquidacionesgoalProdMontEmprende", 1000000
          ]
        }, 
        "liqProdNumTot": {
          "$multiply": [
            "$liquidacionesgoalProdNumTotal", 1
          ]
        }, 
        "liqProdNumProduc": {
          "$multiply": [
            "$liquidacionesgoalProdNumProductivo", 1
          ]
        }, 
        "liqProdNumHip": {
          "$multiply": [
            "$liquidacionesgoalProdNumHipotecario", 1
          ]
        }, 
        "liqProdNumCom": {
          "$multiply": [
            "$liquidacionesgoalProdNumComercial", 1
          ]
        }, 
        "liqProdNumEmprend": {
          "$multiply": [
            "$liquidacionesgoalProdNumEmprende", 1
          ]
        }, 
        "objectiveType": "$objetiveType", 
        "updatedAt": "$updatedAt"
      }
    }, {
      "$merge": {
        "into": "Objectiveformat", 
        "on": "fecha", 
        "whenMatched": "merge", 
        "whenNotMatched": "insert"
      }
    }
  ]