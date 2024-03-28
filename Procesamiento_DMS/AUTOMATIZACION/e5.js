{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "68c7d66e-bd16-4405-b7c4-fb1e753ee9fe",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -320,
          140
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "E5_AGRUPACIONES",
          "options": {}
        },
        "id": "c08c49e6-bfe7-4ad4-91d4-48d3e5823a32",
        "name": "Webhook5",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -420,
          2360
        ],
        "webhookId": "227b564d-0afb-452d-b09c-da726702e8df",
        "alwaysOutputData": true
      },
      {
        "parameters": {},
        "id": "b3989335-9d27-4551-b807-89f5f7427325",
        "name": "NoOp8",
        "type": "n8n-nodes-base.noOp",
        "typeVersion": 1,
        "position": [
          1260,
          4800
        ]
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "a45d816f-3fac-40ad-a055-7535a7b973f7",
        "name": "fecha proceso",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -220,
          2360
        ]
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "9d0e4c44-a280-47ef-ae03-8b197668f01d",
        "name": "SplitInBatches",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1100,
          920
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_1_AgrupacionBanca_Margenmetricbanca",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "4b79ae2d-80f2-4c04-bfe9-44b52d1186f7",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1440,
          920
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst processDate = body.processDate;\n//Fecha de Proceso mes actual de procesamiento\nconst subProcessDate = body.subProcessDate;\n// para enviar la variable a las operaciones\nconst fechaProceso = body.subProcessDate;\n// Nombre del proceso/etapa\nconst processName = \"E5_Agrupaciones\"\n//nombre subProceso, varia en cada nodo del wf\nconst groupName =  \"banca\";\n\n//Arma el arreglo con los tres campos\noutput.push({processName,groupName,processDate,subProcessDate,fechaProceso});\n\nreturn output;\n\n"
        },
        "id": "cb6f613c-f5fd-40ac-874f-a2c2d65c5070",
        "name": "fecha proceso1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1840,
          920
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_1_AgrupacionBanca_Margenmetricbanca",
          "options": {}
        },
        "id": "46a5f4be-1651-4fcc-a546-6d7cb13890be",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1660,
          920
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d",
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "ebd3017a-3dbd-41db-8e6b-e5256871c160",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2220,
          900
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoBanca\": \"$codigoBanca\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"codigoBanca\": {\n        \"$first\": \"$codigoBanca\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"saldoActivo\": {\n        \"$sum\": \"$saldoActivo\"\n      }, \n      \"abonoLiqActivo\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": \"$promedioPasivo\"\n      }, \n      \"saldoDolar\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro\": {\n        \"$sum\": \"$saldoEuro\"\n      }, \n      \"saldoConv20\": {\n        \"$sum\": \"$saldoConv20\"\n      }, \n      \"montoAbonado\": {\n        \"$sum\": \"$montoAbonado\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"gastosFlatOtrosBolivares\": {\n        \"$sum\": \"$gastosFlatOtrosBolivares\"\n      }, \n      \"gastosFlatOtrosDolares\": {\n        \"$sum\": \"$gastosFlatOtrosDolares\"\n      }, \n      \"gastosFlatOtrosEuros\": {\n        \"$sum\": \"$gastosFlatOtrosEuros\"\n      }, \n      \"lineaCreditoBolivares\": {\n        \"$sum\": \"$lineaCreditoBolivares\"\n      }, \n      \"lineaCreditoDolares\": {\n        \"$sum\": \"$lineaCreditoDolares\"\n      }, \n      \"lineaCreditoEuros\": {\n        \"$sum\": \"$lineaCreditoEuros\"\n      }, \n      \"tasaInteresBolivares\": {\n        \"$sum\": \"$tasaInteresBolivares\"\n      }, \n      \"tasaInteresDolares\": {\n        \"$sum\": \"$tasaInteresDolares\"\n      }, \n      \"tasaInteresEuros\": {\n        \"$sum\": \"$tasaInteresEuros\"\n      }, \n      \"variacionIDIBolivares\": {\n        \"$sum\": \"$variacionIDIBolivares\"\n      }, \n      \"variacionIDIDolares\": {\n        \"$sum\": \"$variacionIDIDolares\"\n      }, \n      \"variacionIDIEuros\": {\n        \"$sum\": \"$variacionIDIEuros \"\n      }, \n      \"icc_totalMesBolivares\": {\n        \"$sum\": \"$icc_totalMesBolivares\"\n      }, \n      \"icc_totalMesDolares\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"icc_totalMesEuros\": {\n        \"$sum\": \"$icc_totalMesEuros\"\n      }, \n      \"icc_acumuladoBolivares7m\": {\n        \"$sum\": \"$icc_acumuladoBolivares7m\"\n      }, \n      \"icc_acumuladoDolares7m\": {\n        \"$sum\": \"$icc_acumuladoDolares7m\"\n      }, \n      \"icc_acumuladoEuros7m\": {\n        \"$sum\": \"$icc_acumuladoEuros7m\"\n      }, \n      \"nominaBolivares\": {\n        \"$sum\": \"$nominaBolivares\"\n      }, \n      \"nominaDolares\": {\n        \"$sum\": \"$nominaDolares\"\n      }, \n      \"nominaEuros\": {\n        \"$sum\": \"$nominaEuros\"\n      }, \n      \"opCambiariasBolivares\": {\n        \"$sum\": \"$opCambiariasBolivares\"\n      }, \n      \"opCambiariasDolares\": {\n        \"$sum\": \"$opCambiariasDolares\"\n      }, \n      \"opCambiariasEuros\": {\n        \"$sum\": \"$opCambiariasEuros\"\n      }, \n      \"otrosBolivares\": {\n        \"$sum\": \"$otrosBolivares\"\n      }, \n      \"otrosDolares\": {\n        \"$sum\": \"$otrosDolares\"\n      }, \n      \"otrosEuros\": {\n        \"$sum\": \"$otrosEuros\"\n      }, \n      \"pagoProveedoresBolivares\": {\n        \"$sum\": \"$pagoProveedoresBolivares\"\n      }, \n      \"pagoProveedoresDolares\": {\n        \"$sum\": \"$pagoProveedoresDolares\"\n      }, \n      \"pagoProveedoresEuros\": {\n        \"$sum\": \"$pagoProveedoresEuros\"\n      }, \n      \"posBolivares\": {\n        \"$sum\": \"$posBolivares\"\n      }, \n      \"posComisionesBolivares\": {\n        \"$sum\": \"$posComisionesBolivares\"\n      }, \n      \"posComisionesDolares\": {\n        \"$sum\": \"$posComisionesDolares\"\n      }, \n      \"posComisionesEuros\": {\n        \"$sum\": \"$posComisionesEuros\"\n      }, \n      \"posDolaresposEuros\": {\n        \"$sum\": \"$posDolaresposEuros\"\n      }, \n      \"posTransaccionesBolivares\": {\n        \"$sum\": \"$posTransaccionesBolivares\"\n      }, \n      \"posTransaccionesDolares\": {\n        \"$sum\": \"$posTransaccionesDolares\"\n      }, \n      \"posTransaccionesEuros\": {\n        \"$sum\": \"$posTransaccionesEuros\"\n      }, \n      \"ic_totalMesBolivares\": {\n        \"$sum\": \"$ic_totalMesBolivares\"\n      }, \n      \"ic_totalMesDolares\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"ic_totalMesEuros\": {\n        \"$sum\": \"$ic_totalMesEuros\"\n      }, \n      \"ic_acumuladoBolivares7m\": {\n        \"$sum\": \"$ic_acumuladoBolivares7m\"\n      }, \n      \"ic_acumuladoDolares7m\": {\n        \"$sum\": \"$ic_acumuladoDolares7m\"\n      }, \n      \"ic_acumuladoEuros7m\": {\n        \"$sum\": \"$ic_acumuladoEuros7m\"\n      }, \n      \"comprasDolares\": {\n        \"$sum\": \"$comprasDolares\"\n      }, \n      \"comprasEuros\": {\n        \"$sum\": \"$comprasEuros\"\n      }, \n      \"depositosDolares\": {\n        \"$sum\": \"$depositosDolares\"\n      }, \n      \"depositosEuros\": {\n        \"$sum\": \"$depositosEuros\"\n      }, \n      \"depositosEfectivoDolares\": {\n        \"$sum\": \"$depositosEfectivoDolares\"\n      }, \n      \"acumComprasDolares\": {\n        \"$sum\": \"$acumComprasDolares\"\n      }, \n      \"acumComprasEuros\": {\n        \"$sum\": \"$acumComprasEuros\"\n      }, \n      \"acumDepositosDolares\": {\n        \"$sum\": \"$acumDepositosDolares\"\n      }, \n      \"acumDepositosEuros\": {\n        \"$sum\": \"$acumDepositosEuros\"\n      }, \n      \"cantidadTransacciones\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }, \n      \"montoFacturacionBolivares\": {\n        \"$sum\": \"$montoFacturacionBolivares\"\n      }, \n      \"montoFacturacionDolares\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"montoFacturacionEuros\": {\n        \"$sum\": \"$montoFacturacionEuros\"\n      }, \n      \"acumuladoFacturacionUlt7MesesBolivares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesBolivares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesDolares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesDolares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesEuros\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesEuros\"\n      }, \n      \"acumuladoTransaccionesUlt7Meses\": {\n        \"$sum\": \"$acumuladoTransaccionesUlt7Meses\"\n      }, \n      \"sumAAbonoLiqActivo\": {\n        \"$sum\": \"$sumAAbonoLiqActivo\"\n      }, \n      \"sumAMontoAbonado\": {\n        \"$sum\": \"$sumAMontoAbonado\"\n      }, \n      \"sumAbonoLiqActivo12M\": {\n        \"$sum\": \"$sumAbonoLiqActivo12M\"\n      }, \n      \"sumMontoAbonado12M\": {\n        \"$sum\": \"$sumMontoAbonado12M\"\n      }, \n      \"sumSaldoPromedio12M\": {\n        \"$sum\": \"$sumSaldoPromedio12M\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoPromedio12M\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumSaldoPromedio12M\", 12\n            ]\n          }, 4\n        ]\n      }, \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"codigoBanca\": {\n        \"$nin\": [\n          null, \"\", 0\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"codigoBanca\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "c89d430c-6260-405b-91a6-f670b29b7e9e",
        "name": "A_1_AgrupacionBanca_Margenmetricbanca",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2480,
          360
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$consultaProveerdor\", true\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$snb_rif_empresa\", \n        \"rifBenefic\": \"$snb_ci_benefic\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$snb_mto_pcorrecto\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$ne\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }, \n      \"codigo\": {\n        \"$first\": \"$codigoBanca\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"codigo\": \"$codigo\"\n      }, \n      \"beneficiarios\": {\n        \"$sum\": 1\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": \"$volumenPagosProveedorOTRO\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"codigo\": \"$_id.codigo\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"cantidadBeneficiario\": \"$beneficiarios\", \n      \"volumenPagosProveedor\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedor\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorOTRO\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorBDV\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigo\": \"$$REMOVE\", \n      \"codigoBanca\": \"$codigo\", \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"codigoBanca\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "6e9e45ba-0012-4855-a046-36b87040096d",
        "name": "A_1.1_AgrupacionBancaBeneficiarios_Margenmetricbanca",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2480,
          560
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "0e7acafd-0027-4832-b14e-fbcf7fd1c303",
        "name": "Merge27",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3640,
          500
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricbanca",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 2\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoBanca\": \"$codigoBanca\"\n      }, \n      \"codigoBanca\": {\n        \"$first\": \"$codigoBanca\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"montoAbonado3m\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"montoAbonadoProm3m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$montoAbonado3m\", 3\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"fechaProceso\", \"codigoBanca\"\n      ]\n    }\n  }\n]"
        },
        "id": "9dbf7504-34db-4a45-9383-d9b9676a91ef",
        "name": "1_Promedio3m",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3280,
          260
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricbanca",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 5\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoBanca\": \"$codigoBanca\"\n      }, \n      \"codigoBanca\": {\n        \"$first\": \"$codigoBanca\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"saldoDolar6m\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro6m\": {\n        \"$sum\": \"$saldoEuro\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoDolarProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoDolar6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"saldoEuroProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoEuro6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"fechaProceso\", \"codigoBanca\"\n      ]\n    }\n  }\n]"
        },
        "id": "aea2dd61-422b-4e6a-94c7-04cbba2c6a8b",
        "name": "2_Promedio6m",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3280,
          420
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricbanca",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$concat\": [\n                      \"31-12-\", {\n                        \"$toString\": {\n                          \"$subtract\": [\n                            {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.fechaProceso}}\"\n                              }\n                            }, 1\n                          ]\n                        }\n                      }\n                    ]\n                  }, \n                  \"format\": \"%d-%m-%Y\"\n                }\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigoBanca\": 1, \n      \"fechaProceso\": 1, \n      \"fechaProcesoDic\": {\n        \"$dateFromString\": {\n          \"dateString\": {\n            \"$concat\": [\n              \"31-12-\", {\n                \"$toString\": {\n                  \"$subtract\": [\n                    {\n                      \"$year\": {\n                        \"$toDate\": \"{{$json.fechaProceso}}\"\n                      }\n                    }, 1\n                  ]\n                }\n              }\n            ]\n          }, \n          \"format\": \"%d-%m-%Y\"\n        }\n      }, \n      \"saldoActivo\": 1, \n      \"abonoLiqActivo\": 1, \n      \"montoAbonado\": 1, \n      \"promedioPasivo\": 1\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$codigoBanca\", \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"val\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }, \n      \"valDic\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$ne\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"codigoBanca\": \"$_id\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"_id\": \"$$REMOVE\", \n      \"creASaldoActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.saldoActivo\"\n                          }, {\n                            \"$first\": \"$valDic.saldoActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.saldoActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAAbonoLiqActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.abonoLiqActivo\"\n                          }, {\n                            \"$first\": \"$valDic.abonoLiqActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.abonoLiqActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAMontoAbonado\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.montoAbonado\"\n                          }, {\n                            \"$first\": \"$valDic.montoAbonado\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.montoAbonado\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAPromedioPasivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.promedioPasivo\"\n                          }, {\n                            \"$first\": \"$valDic.promedioPasivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.promedioPasivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"codigoBanca\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "30bc8ed7-8475-48ec-94e9-2b5865ed478a",
        "name": "3_crecimientoAnual_dicAnt-Act",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3280,
          760
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricbanca",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"reciprocidadGeneral\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  \"$montoAbonadoProm3m\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$lte\": [\n                  \"$saldoActivo\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$saldoActivo\", 0\n                ]\n              }, \n              \"then\": 0\n            }\n          ], \n          \"default\": {\n            \"$round\": [\n              {\n                \"$divide\": [\n                  \"$montoAbonadoProm3m\", \"$saldoActivo\"\n                ]\n              }, 4\n            ]\n          }\n        }\n      }, \n      \"fechaProceso\": 1, \n      \"codigoBanca\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"fechaProceso\", \"codigoBanca\"\n      ]\n    }\n  }\n]"
        },
        "id": "ac1e2a7d-dfe2-43fa-9b64-802c544431ab",
        "name": "4_Reciprocidad",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3960,
          700
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricbanca",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 6\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoBanca\": \"$codigoBanca\"\n      }, \n      \"codigoBanca\": {\n        \"$first\": \"$codigoBanca\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumIcc_totalMesDolares7m\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"sumCantidadTransacciones7m\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sumIcc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIcc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$round\": [\n          \"$sumMontoFacturacionDolares7m\", 4\n        ]\n      }, \n      \"icc_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIcc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"ic_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioFacturacionUlt7MesesDolares\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumMontoFacturacionDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioTransaccionesUlt7Meses\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumCantidadTransacciones7m\", 7\n            ]\n          }, 0\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"fechaProceso\", \"codigoBanca\"\n      ]\n    }\n  }\n]"
        },
        "id": "a7b99381-e4c2-4fd3-93b6-b04471e774c9",
        "name": "5_Promedio7m",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3280,
          580
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigo\": \"$codigoBanca\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": 1\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$linkedProducts\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigo\": \"$codigo\", \n        \"name\": \"$linkedProducts.name\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"active\": {\n        \"$max\": \"$linkedProducts.active\"\n      }, \n      \"qtyActive\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$linkedProducts.active\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }, \n      \"lastUse\": {\n        \"$max\": \"$linkedProducts.lastUse\"\n      }, \n      \"firstUse\": {\n        \"$min\": \"$linkedProducts.firstUse\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$_id.codigo\", \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"linkedProducts\": {\n        \"$push\": {\n          \"name\": \"$_id.name\", \n          \"active\": \"$active\", \n          \"qtyActive\": \"$qtyActive\", \n          \"lastUse\": \"$lastUse\", \n          \"firstUse\": \"$firstUse\"\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": \"$$REMOVE\", \n      \"codigo\": \"$_id\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": \"$linkedProducts\"\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$nin\": [\n          null, \"\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigoBanca\": \"$codigo\", \n      \"codigo\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricbanca\", \n      \"on\": [\n        \"codigoBanca\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "9e043151-f3cc-4079-b2fb-7d43d6c0c033",
        "name": "A_1.2_AgrupacionLinkedProduct_Margenmetricbanca",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2480,
          740
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "dfd9855b-8c10-42bb-9098-f9e0c56301e3",
        "name": "Merge18",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3440,
          660
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "c9218e62-29b4-4dd8-a395-2aa37d3656b7",
        "name": "Merge22",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3460,
          340
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2a87c62d-92af-4dfe-b9ca-5797a0b7e08a",
        "name": "Merge4",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3800,
          860
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "9744ec3a-4907-4e4e-8669-4aa2574a1408",
        "name": "Merge5",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4140,
          840
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "8213e818-db64-40b9-827c-e7ceda163f43",
        "name": "Merge3",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2680,
          480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "6e00f8e0-5bca-4bef-ba55-e77084a5c20d",
        "name": "Merge6",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2860,
          640
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "ad03386f-4f50-4312-8e69-d8b38651b6e8",
        "name": "Merge7",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          880
        ]
      },
      {
        "parameters": {
          "content": "ajustar agrupacion",
          "height": 234.60664335664347,
          "width": 162.6301476301478
        },
        "id": "d77bfa6b-7be8-413c-b667-b4fb677feb5f",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1800,
          860
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d55b9a15-7dc5-453b-aaf3-2110effaaffa",
        "name": "Merge13",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          3300
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "0dda77c2-fbf3-4d9d-96d4-a84a93aac14a",
        "name": "Merge14",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          3700
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"nombreNSE\": \"$nombreNSE\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"nombreNSE\": {\n        \"$first\": \"$nombreNSE\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"saldoActivo\": {\n        \"$sum\": \"$saldoActivo\"\n      }, \n      \"abonoLiqActivo\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": \"$promedioPasivo\"\n      }, \n      \"saldoDolar\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro\": {\n        \"$sum\": \"$saldoEuro\"\n      }, \n      \"saldoConv20\": {\n        \"$sum\": \"$saldoConv20\"\n      }, \n      \"montoAbonado\": {\n        \"$sum\": \"$montoAbonado\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"gastosFlatOtrosBolivares\": {\n        \"$sum\": \"$gastosFlatOtrosBolivares\"\n      }, \n      \"gastosFlatOtrosDolares\": {\n        \"$sum\": \"$gastosFlatOtrosDolares\"\n      }, \n      \"gastosFlatOtrosEuros\": {\n        \"$sum\": \"$gastosFlatOtrosEuros\"\n      }, \n      \"lineaCreditoBolivares\": {\n        \"$sum\": \"$lineaCreditoBolivares\"\n      }, \n      \"lineaCreditoDolares\": {\n        \"$sum\": \"$lineaCreditoDolares\"\n      }, \n      \"lineaCreditoEuros\": {\n        \"$sum\": \"$lineaCreditoEuros\"\n      }, \n      \"tasaInteresBolivares\": {\n        \"$sum\": \"$tasaInteresBolivares\"\n      }, \n      \"tasaInteresDolares\": {\n        \"$sum\": \"$tasaInteresDolares\"\n      }, \n      \"tasaInteresEuros\": {\n        \"$sum\": \"$tasaInteresEuros\"\n      }, \n      \"variacionIDIBolivares\": {\n        \"$sum\": \"$variacionIDIBolivares\"\n      }, \n      \"variacionIDIDolares\": {\n        \"$sum\": \"$variacionIDIDolares\"\n      }, \n      \"variacionIDIEuros\": {\n        \"$sum\": \"$variacionIDIEuros \"\n      }, \n      \"icc_totalMesBolivares\": {\n        \"$sum\": \"$icc_totalMesBolivares\"\n      }, \n      \"icc_totalMesDolares\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"icc_totalMesEuros\": {\n        \"$sum\": \"$icc_totalMesEuros\"\n      }, \n      \"icc_acumuladoBolivares7m\": {\n        \"$sum\": \"$icc_acumuladoBolivares7m\"\n      }, \n      \"icc_acumuladoDolares7m\": {\n        \"$sum\": \"$icc_acumuladoDolares7m\"\n      }, \n      \"icc_acumuladoEuros7m\": {\n        \"$sum\": \"$icc_acumuladoEuros7m\"\n      }, \n      \"nominaBolivares\": {\n        \"$sum\": \"$nominaBolivares\"\n      }, \n      \"nominaDolares\": {\n        \"$sum\": \"$nominaDolares\"\n      }, \n      \"nominaEuros\": {\n        \"$sum\": \"$nominaEuros\"\n      }, \n      \"opCambiariasBolivares\": {\n        \"$sum\": \"$opCambiariasBolivares\"\n      }, \n      \"opCambiariasDolares\": {\n        \"$sum\": \"$opCambiariasDolares\"\n      }, \n      \"opCambiariasEuros\": {\n        \"$sum\": \"$opCambiariasEuros\"\n      }, \n      \"otrosBolivares\": {\n        \"$sum\": \"$otrosBolivares\"\n      }, \n      \"otrosDolares\": {\n        \"$sum\": \"$otrosDolares\"\n      }, \n      \"otrosEuros\": {\n        \"$sum\": \"$otrosEuros\"\n      }, \n      \"pagoProveedoresBolivares\": {\n        \"$sum\": \"$pagoProveedoresBolivares\"\n      }, \n      \"pagoProveedoresDolares\": {\n        \"$sum\": \"$pagoProveedoresDolares\"\n      }, \n      \"pagoProveedoresEuros\": {\n        \"$sum\": \"$pagoProveedoresEuros\"\n      }, \n      \"posBolivares\": {\n        \"$sum\": \"$posBolivares\"\n      }, \n      \"posComisionesBolivares\": {\n        \"$sum\": \"$posComisionesBolivares\"\n      }, \n      \"posComisionesDolares\": {\n        \"$sum\": \"$posComisionesDolares\"\n      }, \n      \"posComisionesEuros\": {\n        \"$sum\": \"$posComisionesEuros\"\n      }, \n      \"posDolaresposEuros\": {\n        \"$sum\": \"$posDolaresposEuros\"\n      }, \n      \"posTransaccionesBolivares\": {\n        \"$sum\": \"$posTransaccionesBolivares\"\n      }, \n      \"posTransaccionesDolares\": {\n        \"$sum\": \"$posTransaccionesDolares\"\n      }, \n      \"posTransaccionesEuros\": {\n        \"$sum\": \"$posTransaccionesEuros\"\n      }, \n      \"ic_totalMesBolivares\": {\n        \"$sum\": \"$ic_totalMesBolivares\"\n      }, \n      \"ic_totalMesDolares\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"ic_totalMesEuros\": {\n        \"$sum\": \"$ic_totalMesEuros\"\n      }, \n      \"ic_acumuladoBolivares7m\": {\n        \"$sum\": \"$ic_acumuladoBolivares7m\"\n      }, \n      \"ic_acumuladoDolares7m\": {\n        \"$sum\": \"$ic_acumuladoDolares7m\"\n      }, \n      \"ic_acumuladoEuros7m\": {\n        \"$sum\": \"$ic_acumuladoEuros7m\"\n      }, \n      \"comprasDolares\": {\n        \"$sum\": \"$comprasDolares\"\n      }, \n      \"comprasEuros\": {\n        \"$sum\": \"$comprasEuros\"\n      }, \n      \"depositosDolares\": {\n        \"$sum\": \"$depositosDolares\"\n      }, \n      \"depositosEuros\": {\n        \"$sum\": \"$depositosEuros\"\n      }, \n      \"depositosEfectivoDolares\": {\n        \"$sum\": \"$depositosEfectivoDolares\"\n      }, \n      \"acumComprasDolares\": {\n        \"$sum\": \"$acumComprasDolares\"\n      }, \n      \"acumComprasEuros\": {\n        \"$sum\": \"$acumComprasEuros\"\n      }, \n      \"acumDepositosDolares\": {\n        \"$sum\": \"$acumDepositosDolares\"\n      }, \n      \"acumDepositosEuros\": {\n        \"$sum\": \"$acumDepositosEuros\"\n      }, \n      \"cantidadTransacciones\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }, \n      \"montoFacturacionBolivares\": {\n        \"$sum\": \"$montoFacturacionBolivares\"\n      }, \n      \"montoFacturacionDolares\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"montoFacturacionEuros\": {\n        \"$sum\": \"$montoFacturacionEuros\"\n      }, \n      \"acumuladoFacturacionUlt7MesesBolivares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesBolivares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesDolares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesDolares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesEuros\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesEuros\"\n      }, \n      \"acumuladoTransaccionesUlt7Meses\": {\n        \"$sum\": \"$acumuladoTransaccionesUlt7Meses\"\n      }, \n      \"sumAAbonoLiqActivo\": {\n        \"$sum\": \"$sumAAbonoLiqActivo\"\n      }, \n      \"sumAMontoAbonado\": {\n        \"$sum\": \"$sumAMontoAbonado\"\n      }, \n      \"sumAbonoLiqActivo12M\": {\n        \"$sum\": \"$sumAbonoLiqActivo12M\"\n      }, \n      \"sumMontoAbonado12M\": {\n        \"$sum\": \"$sumMontoAbonado12M\"\n      }, \n      \"sumSaldoPromedio12M\": {\n        \"$sum\": \"$sumSaldoPromedio12M\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoPromedio12M\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumSaldoPromedio12M\", 12\n            ]\n          }, 4\n        ]\n      }, \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"nombreNSE\": {\n        \"$ne\": null\n      }, \n      \"fechaProceso\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"nombreNSE\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "05fec29e-8814-471d-bc91-c99819c02312",
        "name": "A_3_AgrupacionNSE_Margenmetricnse",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          3240
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$consultaProveerdor\", true\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$snb_rif_empresa\", \n        \"rifBenefic\": \"$snb_ci_benefic\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$snb_mto_pcorrecto\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$ne\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }, \n      \"codigo\": {\n        \"$first\": \"$nombreNSE\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"codigo\": \"$codigo\"\n      }, \n      \"beneficiarios\": {\n        \"$sum\": 1\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": \"$volumenPagosProveedorOTRO\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"codigo\": \"$_id.codigo\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"cantidadBeneficiario\": \"$beneficiarios\", \n      \"volumenPagosProveedor\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedor\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorOTRO\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorBDV\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigo\": \"$$REMOVE\", \n      \"nombreNSE\": \"$codigo\", \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"nombreNSE\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "884a21fd-0b13-4382-8bcb-451c98b4c4f9",
        "name": "A_3.1_AgrupacionNSEBeneficiarios_Margenmetricnse",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          3420
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "f2406e38-4597-4806-804a-83ca41a0a2f8",
        "name": "Merge10",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          3140
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "b50fe893-e288-4efd-ade4-87f97d9ddb06",
        "name": "Merge30",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          3460
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "74f107cf-1ad4-49de-a62a-f8d2689bbd51",
        "name": "Merge31",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4060,
          3660
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricnse",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 2\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"nombreNSE\": \"$nombreNSE\"\n      }, \n      \"nombreNSE\": {\n        \"$first\": \"$nombreNSE\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"montoAbonado3m\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"montoAbonadoProm3m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$montoAbonado3m\", 3\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"fechaProceso\", \"nombreNSE\"\n      ]\n    }\n  }\n]"
        },
        "id": "b3ff809a-57e8-4b1a-aa90-24819cefdc2a",
        "name": "1_Promedio3m2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          3060
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricnse",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 5\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"nombreNSE\": \"$nombreNSE\"\n      }, \n      \"nombreNSE\": {\n        \"$first\": \"$nombreNSE\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"saldoDolar6m\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro6m\": {\n        \"$sum\": \"$saldoEuro\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoDolarProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoDolar6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"saldoEuroProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoEuro6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"fechaProceso\", \"nombreNSE\"\n      ]\n    }\n  }\n]"
        },
        "id": "42fa78d4-64c1-48ad-a448-1a20a7c3b16a",
        "name": "2_Promedio6m2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          3220
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricnse",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$concat\": [\n                      \"31-12-\", {\n                        \"$toString\": {\n                          \"$subtract\": [\n                            {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.fechaProceso}}\"\n                              }\n                            }, 1\n                          ]\n                        }\n                      }\n                    ]\n                  }, \n                  \"format\": \"%d-%m-%Y\"\n                }\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"nombreNSE\": 1, \n      \"fechaProceso\": 1, \n      \"fechaProcesoDic\": {\n        \"$dateFromString\": {\n          \"dateString\": {\n            \"$concat\": [\n              \"31-12-\", {\n                \"$toString\": {\n                  \"$subtract\": [\n                    {\n                      \"$year\": {\n                        \"$toDate\": \"{{$json.fechaProceso}}\"\n                      }\n                    }, 1\n                  ]\n                }\n              }\n            ]\n          }, \n          \"format\": \"%d-%m-%Y\"\n        }\n      }, \n      \"saldoActivo\": 1, \n      \"abonoLiqActivo\": 1, \n      \"montoAbonado\": 1, \n      \"promedioPasivo\": 1\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$nombreNSE\", \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"val\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }, \n      \"valDic\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$ne\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"nombreNSE\": \"$_id\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"_id\": \"$$REMOVE\", \n      \"creASaldoActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.saldoActivo\"\n                          }, {\n                            \"$first\": \"$valDic.saldoActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.saldoActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAAbonoLiqActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.abonoLiqActivo\"\n                          }, {\n                            \"$first\": \"$valDic.abonoLiqActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.abonoLiqActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAMontoAbonado\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.montoAbonado\"\n                          }, {\n                            \"$first\": \"$valDic.montoAbonado\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.montoAbonado\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAPromedioPasivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.promedioPasivo\"\n                          }, {\n                            \"$first\": \"$valDic.promedioPasivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.promedioPasivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"nombreNSE\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "957b661f-1bff-489e-8772-00359b464e27",
        "name": "3_crecimientoAnual_dicAnt-Act2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          3540
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricnse",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"reciprocidadGeneral\": {\n        \"$convert\": {\n          \"input\": {\n            \"$switch\": {\n              \"branches\": [\n                {\n                  \"case\": {\n                    \"$lte\": [\n                      \"$montoAbonadoProm3m\", null\n                    ]\n                  }, \n                  \"then\": 0\n                }, {\n                  \"case\": {\n                    \"$lte\": [\n                      \"$saldoActivo\", null\n                    ]\n                  }, \n                  \"then\": 0\n                }, {\n                  \"case\": {\n                    \"$eq\": [\n                      \"$saldoActivo\", 0\n                    ]\n                  }, \n                  \"then\": 0\n                }\n              ], \n              \"default\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$montoAbonadoProm3m\", \"$saldoActivo\"\n                    ]\n                  }, 4\n                ]\n              }\n            }\n          }, \n          \"to\": \"decimal\", \n          \"onError\": \"$$REMOVE\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"fechaProceso\": 1, \n      \"nombreNSE\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"fechaProceso\", \"nombreNSE\"\n      ]\n    }\n  }\n]"
        },
        "id": "7ae600a1-af94-411f-8525-3e32e0bebd67",
        "name": "4_Reciprocidad2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3920,
          3500
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricnse",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 6\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"nombreNSE\": \"$nombreNSE\"\n      }, \n      \"nombreNSE\": {\n        \"$first\": \"$nombreNSE\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumIcc_totalMesDolares7m\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"sumCantidadTransacciones7m\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sumIcc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIcc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$round\": [\n          \"$sumMontoFacturacionDolares7m\", 4\n        ]\n      }, \n      \"icc_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIcc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"ic_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioFacturacionUlt7MesesDolares\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumMontoFacturacionDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioTransaccionesUlt7Meses\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumCantidadTransacciones7m\", 7\n            ]\n          }, 0\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"fechaProceso\", \"nombreNSE\"\n      ]\n    }\n  }\n]"
        },
        "id": "17cc2275-eec6-4e4c-b55b-5030a0dc5b40",
        "name": "5_Promedio7m2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          3380
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "2165edf6-8836-4429-8270-354979f6135a",
        "name": "Merge36",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3600,
          3280
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d843fe36-f2b2-4263-b41a-25df3f730287",
        "name": "Merge16",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2860,
          3460
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigo\": \"$nombreNSE\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": 1\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$linkedProducts\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigo\": \"$codigo\", \n        \"name\": \"$linkedProducts.name\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"active\": {\n        \"$max\": \"$linkedProducts.active\"\n      }, \n      \"qtyActive\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$linkedProducts.active\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }, \n      \"lastUse\": {\n        \"$max\": \"$linkedProducts.lastUse\"\n      }, \n      \"firstUse\": {\n        \"$min\": \"$linkedProducts.firstUse\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$_id.codigo\", \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"linkedProducts\": {\n        \"$push\": {\n          \"name\": \"$_id.name\", \n          \"active\": \"$active\", \n          \"qtyActive\": \"$qtyActive\", \n          \"lastUse\": \"$lastUse\", \n          \"firstUse\": \"$firstUse\"\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": \"$$REMOVE\", \n      \"codigo\": \"$_id\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": \"$linkedProducts\"\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$nin\": [\n          null, \"\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"nombreNSE\": \"$codigo\", \n      \"codigo\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricnse\", \n      \"on\": [\n        \"nombreNSE\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "a4d21764-f8b2-4752-af8c-9357181399b2",
        "name": "A_3.2_AgrupacionLinkedProduct_Margenmetricnse",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          3600
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "62c03d41-88c7-497c-92b1-930e4baf0656",
        "name": "Merge39",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3780,
          3680
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst processDate = body.processDate;\n//Fecha de Proceso mes actual de procesamiento\nconst subProcessDate = body.subProcessDate;\n// para enviar la variable a las operaciones\nconst fechaProceso = body.subProcessDate;\n// Nombre del proceso/etapa\nconst processName = \"E5_Agrupaciones\"\n//nombre subProceso, varia en cada nodo del wf\nconst groupName =  \"nse\";\n\n//Arma el arreglo con los tres campos\noutput.push({processName,groupName,processDate,subProcessDate,fechaProceso});\n\nreturn output;\n\n"
        },
        "id": "56d20143-e5e5-4fc0-936d-5e9afc6d77d0",
        "name": "fecha proceso2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1900,
          3740
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_3_AgrupacionSegmento_MargenmetricsNSE",
          "options": {}
        },
        "id": "1900f2f2-b35f-414c-8349-1c579f44e095",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1720,
          3740
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d",
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "1c613ecd-fb83-4daa-9260-da65fcaa5ee3",
        "name": "Merge1",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2280,
          3720
        ]
      },
      {
        "parameters": {
          "content": "ajustar agrupacion",
          "height": 234.60664335664347,
          "width": 162.6301476301478
        },
        "id": "6128eced-a72b-4897-8feb-df2956cb9cc7",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1860,
          3680
        ]
      },
      {
        "parameters": {
          "height": 889.4363378776745,
          "width": 3367.5058601224578
        },
        "id": "53e8ebc8-508a-458f-83ea-ee6913f67559",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1640,
          220
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoGrupoeconomico\": \"$codigoGrupoeconomico\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$first\": \"$codigoGrupoeconomico\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"saldoActivo\": {\n        \"$sum\": \"$saldoActivo\"\n      }, \n      \"abonoLiqActivo\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": \"$promedioPasivo\"\n      }, \n      \"saldoDolar\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro\": {\n        \"$sum\": \"$saldoEuro\"\n      }, \n      \"saldoConv20\": {\n        \"$sum\": \"$saldoConv20\"\n      }, \n      \"montoAbonado\": {\n        \"$sum\": \"$montoAbonado\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"gastosFlatOtrosBolivares\": {\n        \"$sum\": \"$gastosFlatOtrosBolivares\"\n      }, \n      \"gastosFlatOtrosDolares\": {\n        \"$sum\": \"$gastosFlatOtrosDolares\"\n      }, \n      \"gastosFlatOtrosEuros\": {\n        \"$sum\": \"$gastosFlatOtrosEuros\"\n      }, \n      \"lineaCreditoBolivares\": {\n        \"$sum\": \"$lineaCreditoBolivares\"\n      }, \n      \"lineaCreditoDolares\": {\n        \"$sum\": \"$lineaCreditoDolares\"\n      }, \n      \"lineaCreditoEuros\": {\n        \"$sum\": \"$lineaCreditoEuros\"\n      }, \n      \"tasaInteresBolivares\": {\n        \"$sum\": \"$tasaInteresBolivares\"\n      }, \n      \"tasaInteresDolares\": {\n        \"$sum\": \"$tasaInteresDolares\"\n      }, \n      \"tasaInteresEuros\": {\n        \"$sum\": \"$tasaInteresEuros\"\n      }, \n      \"variacionIDIBolivares\": {\n        \"$sum\": \"$variacionIDIBolivares\"\n      }, \n      \"variacionIDIDolares\": {\n        \"$sum\": \"$variacionIDIDolares\"\n      }, \n      \"variacionIDIEuros\": {\n        \"$sum\": \"$variacionIDIEuros \"\n      }, \n      \"icc_totalMesBolivares\": {\n        \"$sum\": \"$icc_totalMesBolivares\"\n      }, \n      \"icc_totalMesDolares\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"icc_totalMesEuros\": {\n        \"$sum\": \"$icc_totalMesEuros\"\n      }, \n      \"icc_acumuladoBolivares7m\": {\n        \"$sum\": \"$icc_acumuladoBolivares7m\"\n      }, \n      \"icc_acumuladoDolares7m\": {\n        \"$sum\": \"$icc_acumuladoDolares7m\"\n      }, \n      \"icc_acumuladoEuros7m\": {\n        \"$sum\": \"$icc_acumuladoEuros7m\"\n      }, \n      \"nominaBolivares\": {\n        \"$sum\": \"$nominaBolivares\"\n      }, \n      \"nominaDolares\": {\n        \"$sum\": \"$nominaDolares\"\n      }, \n      \"nominaEuros\": {\n        \"$sum\": \"$nominaEuros\"\n      }, \n      \"opCambiariasBolivares\": {\n        \"$sum\": \"$opCambiariasBolivares\"\n      }, \n      \"opCambiariasDolares\": {\n        \"$sum\": \"$opCambiariasDolares\"\n      }, \n      \"opCambiariasEuros\": {\n        \"$sum\": \"$opCambiariasEuros\"\n      }, \n      \"otrosBolivares\": {\n        \"$sum\": \"$otrosBolivares\"\n      }, \n      \"otrosDolares\": {\n        \"$sum\": \"$otrosDolares\"\n      }, \n      \"otrosEuros\": {\n        \"$sum\": \"$otrosEuros\"\n      }, \n      \"pagoProveedoresBolivares\": {\n        \"$sum\": \"$pagoProveedoresBolivares\"\n      }, \n      \"pagoProveedoresDolares\": {\n        \"$sum\": \"$pagoProveedoresDolares\"\n      }, \n      \"pagoProveedoresEuros\": {\n        \"$sum\": \"$pagoProveedoresEuros\"\n      }, \n      \"posBolivares\": {\n        \"$sum\": \"$posBolivares\"\n      }, \n      \"posComisionesBolivares\": {\n        \"$sum\": \"$posComisionesBolivares\"\n      }, \n      \"posComisionesDolares\": {\n        \"$sum\": \"$posComisionesDolares\"\n      }, \n      \"posComisionesEuros\": {\n        \"$sum\": \"$posComisionesEuros\"\n      }, \n      \"posDolaresposEuros\": {\n        \"$sum\": \"$posDolaresposEuros\"\n      }, \n      \"posTransaccionesBolivares\": {\n        \"$sum\": \"$posTransaccionesBolivares\"\n      }, \n      \"posTransaccionesDolares\": {\n        \"$sum\": \"$posTransaccionesDolares\"\n      }, \n      \"posTransaccionesEuros\": {\n        \"$sum\": \"$posTransaccionesEuros\"\n      }, \n      \"ic_totalMesBolivares\": {\n        \"$sum\": \"$ic_totalMesBolivares\"\n      }, \n      \"ic_totalMesDolares\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"ic_totalMesEuros\": {\n        \"$sum\": \"$ic_totalMesEuros\"\n      }, \n      \"ic_acumuladoBolivares7m\": {\n        \"$sum\": \"$ic_acumuladoBolivares7m\"\n      }, \n      \"ic_acumuladoDolares7m\": {\n        \"$sum\": \"$ic_acumuladoDolares7m\"\n      }, \n      \"ic_acumuladoEuros7m\": {\n        \"$sum\": \"$ic_acumuladoEuros7m\"\n      }, \n      \"comprasDolares\": {\n        \"$sum\": \"$comprasDolares\"\n      }, \n      \"comprasEuros\": {\n        \"$sum\": \"$comprasEuros\"\n      }, \n      \"depositosDolares\": {\n        \"$sum\": \"$depositosDolares\"\n      }, \n      \"depositosEuros\": {\n        \"$sum\": \"$depositosEuros\"\n      }, \n      \"depositosEfectivoDolares\": {\n        \"$sum\": \"$depositosEfectivoDolares\"\n      }, \n      \"acumComprasDolares\": {\n        \"$sum\": \"$acumComprasDolares\"\n      }, \n      \"acumComprasEuros\": {\n        \"$sum\": \"$acumComprasEuros\"\n      }, \n      \"acumDepositosDolares\": {\n        \"$sum\": \"$acumDepositosDolares\"\n      }, \n      \"acumDepositosEuros\": {\n        \"$sum\": \"$acumDepositosEuros\"\n      }, \n      \"cantidadTransacciones\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }, \n      \"montoFacturacionBolivares\": {\n        \"$sum\": \"$montoFacturacionBolivares\"\n      }, \n      \"montoFacturacionDolares\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"montoFacturacionEuros\": {\n        \"$sum\": \"$montoFacturacionEuros\"\n      }, \n      \"acumuladoFacturacionUlt7MesesBolivares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesBolivares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesDolares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesDolares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesEuros\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesEuros\"\n      }, \n      \"acumuladoTransaccionesUlt7Meses\": {\n        \"$sum\": \"$acumuladoTransaccionesUlt7Meses\"\n      }, \n      \"sumAAbonoLiqActivo\": {\n        \"$sum\": \"$sumAAbonoLiqActivo\"\n      }, \n      \"sumAMontoAbonado\": {\n        \"$sum\": \"$sumAMontoAbonado\"\n      }, \n      \"sumAbonoLiqActivo12M\": {\n        \"$sum\": \"$sumAbonoLiqActivo12M\"\n      }, \n      \"sumMontoAbonado12M\": {\n        \"$sum\": \"$sumMontoAbonado12M\"\n      }, \n      \"sumSaldoPromedio12M\": {\n        \"$sum\": \"$sumSaldoPromedio12M\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoPromedio12M\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumSaldoPromedio12M\", 12\n            ]\n          }, 4\n        ]\n      }, \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"codigoGrupoeconomico\": {\n        \"$nin\": [\n          null, \"\"\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"codigoGrupoeconomico\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "e671d35a-8750-49b6-8357-0b306551aec2",
        "name": "A_2_AgrupacionGrupo_Margenmetricgrupo",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          1400
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$consultaProveerdor\", true\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\":  \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$snb_rif_empresa\", \n        \"rifBenefic\": \"$snb_ci_benefic\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$snb_mto_pcorrecto\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$ne\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }, \n      \"codigo\": {\n        \"$first\": \"$codigoGrupoeconomico\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"codigo\": \"$codigo\"\n      }, \n      \"beneficiarios\": {\n        \"$sum\": 1\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": \"$volumenPagosProveedorOTRO\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"codigo\": \"$_id.codigo\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"cantidadBeneficiario\": \"$beneficiarios\", \n      \"volumenPagosProveedor\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedor\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorOTRO\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorBDV\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigo\": \"$$REMOVE\", \n      \"codigoGrupoeconomico\": \"$codigo\", \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"codigoGrupoeconomico\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "1ccb44ac-ed85-46ee-bd96-1f132b23af17",
        "name": "A_2.1_AgrupacionGrupoBeneficiarios_Margenmetricgrupo",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          1580
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "91d4dd15-1cd4-4efb-9125-980e05133e78",
        "name": "Merge28",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3500,
          1680
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "b4a20bac-ad4b-4854-af1d-88bf4c860c6b",
        "name": "Merge29",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4200,
          1840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricgrupo",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 2\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoGrupoeconomico\": \"$codigoGrupoeconomico\"\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$first\": \"$codigoGrupoeconomico\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"montoAbonado3m\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"montoAbonadoProm3m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$montoAbonado3m\", 3\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"fechaProceso\", \"codigoGrupoeconomico\"\n      ]\n    }\n  }\n]"
        },
        "id": "004ad4ce-63aa-4b45-888a-ea9eb9d921e2",
        "name": "1_Promedio3m1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3300,
          1240
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricgrupo",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 5\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoGrupoeconomico\": \"$codigoGrupoeconomico\"\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$first\": \"$codigoGrupoeconomico\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"saldoDolar6m\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro6m\": {\n        \"$sum\": \"$saldoEuro\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoDolarProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoDolar6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"saldoEuroProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoEuro6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"fechaProceso\", \"codigoGrupoeconomico\"\n      ]\n    }\n  }\n]"
        },
        "id": "dfa85a31-f8cd-4f74-97f2-4d9e68c42086",
        "name": "2_Promedio6m1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3300,
          1400
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricgrupo",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$concat\": [\n                      \"31-12-\", {\n                        \"$toString\": {\n                          \"$subtract\": [\n                            {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.fechaProceso}}\"\n                              }\n                            }, 1\n                          ]\n                        }\n                      }\n                    ]\n                  }, \n                  \"format\": \"%d-%m-%Y\"\n                }\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigoGrupoeconomico\": 1, \n      \"fechaProceso\": 1, \n      \"fechaProcesoDic\": {\n        \"$dateFromString\": {\n          \"dateString\": {\n            \"$concat\": [\n              \"31-12-\", {\n                \"$toString\": {\n                  \"$subtract\": [\n                    {\n                      \"$year\": {\n                        \"$toDate\": \"{{$json.fechaProceso}}\"\n                      }\n                    }, 1\n                  ]\n                }\n              }\n            ]\n          }, \n          \"format\": \"%d-%m-%Y\"\n        }\n      }, \n      \"saldoActivo\": 1, \n      \"abonoLiqActivo\": 1, \n      \"montoAbonado\": 1, \n      \"promedioPasivo\": 1\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$codigoGrupoeconomico\", \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"val\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }, \n      \"valDic\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$ne\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"codigoGrupoeconomico\": \"$_id\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"_id\": \"$$REMOVE\", \n      \"creASaldoActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.saldoActivo\"\n                          }, {\n                            \"$first\": \"$valDic.saldoActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.saldoActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAAbonoLiqActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.abonoLiqActivo\"\n                          }, {\n                            \"$first\": \"$valDic.abonoLiqActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.abonoLiqActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAMontoAbonado\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.montoAbonado\"\n                          }, {\n                            \"$first\": \"$valDic.montoAbonado\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.montoAbonado\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAPromedioPasivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.promedioPasivo\"\n                          }, {\n                            \"$first\": \"$valDic.promedioPasivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.promedioPasivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"codigoGrupoeconomico\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "09110986-af0b-483f-a81b-42d482138bb2",
        "name": "3_crecimientoAnual_dicAnt-Act1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3300,
          1760
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricgrupo",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"reciprocidadGeneral\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  \"$montoAbonadoProm3m\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$lte\": [\n                  \"$saldoActivo\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$saldoActivo\", 0\n                ]\n              }, \n              \"then\": 0\n            }\n          ], \n          \"default\": {\n            \"$round\": [\n              {\n                \"$divide\": [\n                  \"$montoAbonadoProm3m\", \"$saldoActivo\"\n                ]\n              }, 4\n            ]\n          }\n        }\n      }, \n      \"fechaProceso\": 1, \n      \"codigoGrupoeconomico\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"fechaProceso\", \"codigoGrupoeconomico\"\n      ]\n    }\n  }\n]"
        },
        "id": "9555d8d5-0f19-4453-b46e-c73e0ac51978",
        "name": "4_Reciprocidad1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4040,
          1660
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricgrupo",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 6\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoGrupoeconomico\": \"$codigoGrupoeconomico\"\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$first\": \"$codigoGrupoeconomico\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumIcc_totalMesDolares7m\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"sumCantidadTransacciones7m\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sumIcc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIcc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$round\": [\n          \"$sumMontoFacturacionDolares7m\", 4\n        ]\n      }, \n      \"icc_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIcc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"ic_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioFacturacionUlt7MesesDolares\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumMontoFacturacionDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioTransaccionesUlt7Meses\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumCantidadTransacciones7m\", 7\n            ]\n          }, 0\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"fechaProceso\", \"codigoGrupoeconomico\"\n      ]\n    }\n  }\n]"
        },
        "id": "6c363a75-893e-4c50-9d69-63d825455230",
        "name": "5_Promedio7m1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3300,
          1580
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "75e06f17-2cd5-4a33-b587-2e042196e4a6",
        "name": "Merge35",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3500,
          1320
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "c13e4c9d-2e1c-4181-98da-3fa4e685e3a3",
        "name": "Merge12",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2860,
          1640
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigo\": \"$codigoGrupoeconomico\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": 1\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$linkedProducts\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigo\": \"$codigo\", \n        \"name\": \"$linkedProducts.name\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"active\": {\n        \"$max\": \"$linkedProducts.active\"\n      }, \n      \"qtyActive\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$linkedProducts.active\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }, \n      \"lastUse\": {\n        \"$max\": \"$linkedProducts.lastUse\"\n      }, \n      \"firstUse\": {\n        \"$min\": \"$linkedProducts.firstUse\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$_id.codigo\", \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"linkedProducts\": {\n        \"$push\": {\n          \"name\": \"$_id.name\", \n          \"active\": \"$active\", \n          \"qtyActive\": \"$qtyActive\", \n          \"lastUse\": \"$lastUse\", \n          \"firstUse\": \"$firstUse\"\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": \"$$REMOVE\", \n      \"codigo\": \"$_id\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": \"$linkedProducts\"\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$nin\": [\n          null, \"\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigoGrupoeconomico\": \"$codigo\", \n      \"codigo\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricgrupo\", \n      \"on\": [\n        \"codigoGrupoeconomico\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "fe64b6c1-c4ef-45ef-b5e3-df81d9a370c1",
        "name": "A_2.2_AgrupacionLinkedProduct_Margenmetricgrupo",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          1760
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "682b279e-e018-47b6-adc6-f7f83ae9a004",
        "name": "Merge38",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3700,
          1520
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_2_AgrupacionGrupo_Margenmetricgrupo",
          "options": {}
        },
        "id": "9ca582f7-48db-40cf-bf02-f98f221349af",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1700,
          1920
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d"
      },
      {
        "parameters": {
          "content": "GRUPO ECONOMICO\n",
          "height": 911.2864896129668,
          "width": 3375.0171592800007
        },
        "id": "b748e65c-5f0c-4687-808f-6c6aec8536e8",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1640,
          1180
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "336c9294-6907-4ffb-be7e-bb2cfe3d9ebc",
        "name": "Merge11",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2680,
          1500
        ]
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "ceff34d0-ab5d-4186-a0b1-861f4b3ed5e7",
        "name": "SplitInBatches1",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1080,
          2820
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_4_AgrupacionSegmento_Margenmetricsegmento",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "23ab4d1d-a570-4606-aa92-73bf5a6c1544",
        "name": "HTTP Request1",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1440,
          2820
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst processDate = body.processDate;\n//Fecha de Proceso mes actual de procesamiento\nconst subProcessDate = body.subProcessDate;\n// para enviar la variable a las operaciones\nconst fechaProceso = body.subProcessDate;\n// Nombre del proceso/etapa\nconst processName = \"E5_Agrupaciones\"\n//nombre subProceso, varia en cada nodo del wf\nconst groupName =  \"grupo\";\n\n//Arma el arreglo con los tres campos\noutput.push({processName,groupName,processDate,subProcessDate,fechaProceso});\n\nreturn output;\n\n"
        },
        "id": "16d03264-47f0-49cd-ae86-016abf4de1ed",
        "name": "fecha proceso3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1880,
          1920
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "05cf1b49-5e22-4ff0-affa-4d71c73cdb3a",
        "name": "Merge2",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2260,
          1900
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "91414ef7-e9fa-4446-b1a9-c6bbab1142c9",
        "name": "Merge15",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3060,
          1880
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "49ecd768-c052-4fe6-b445-8887f64c0da0",
        "name": "Merge40",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3880,
          1860
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoSegmento\": \"$codigoSegmento\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"codigoSegmento\": {\n        \"$first\": \"$codigoSegmento\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"saldoActivo\": {\n        \"$sum\": \"$saldoActivo\"\n      }, \n      \"abonoLiqActivo\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": \"$promedioPasivo\"\n      }, \n      \"saldoDolar\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro\": {\n        \"$sum\": \"$saldoEuro\"\n      }, \n      \"saldoConv20\": {\n        \"$sum\": \"$saldoConv20\"\n      }, \n      \"montoAbonado\": {\n        \"$sum\": \"$montoAbonado\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"gastosFlatOtrosBolivares\": {\n        \"$sum\": \"$gastosFlatOtrosBolivares\"\n      }, \n      \"gastosFlatOtrosDolares\": {\n        \"$sum\": \"$gastosFlatOtrosDolares\"\n      }, \n      \"gastosFlatOtrosEuros\": {\n        \"$sum\": \"$gastosFlatOtrosEuros\"\n      }, \n      \"lineaCreditoBolivares\": {\n        \"$sum\": \"$lineaCreditoBolivares\"\n      }, \n      \"lineaCreditoDolares\": {\n        \"$sum\": \"$lineaCreditoDolares\"\n      }, \n      \"lineaCreditoEuros\": {\n        \"$sum\": \"$lineaCreditoEuros\"\n      }, \n      \"tasaInteresBolivares\": {\n        \"$sum\": \"$tasaInteresBolivares\"\n      }, \n      \"tasaInteresDolares\": {\n        \"$sum\": \"$tasaInteresDolares\"\n      }, \n      \"tasaInteresEuros\": {\n        \"$sum\": \"$tasaInteresEuros\"\n      }, \n      \"variacionIDIBolivares\": {\n        \"$sum\": \"$variacionIDIBolivares\"\n      }, \n      \"variacionIDIDolares\": {\n        \"$sum\": \"$variacionIDIDolares\"\n      }, \n      \"variacionIDIEuros\": {\n        \"$sum\": \"$variacionIDIEuros \"\n      }, \n      \"icc_totalMesBolivares\": {\n        \"$sum\": \"$icc_totalMesBolivares\"\n      }, \n      \"icc_totalMesDolares\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"icc_totalMesEuros\": {\n        \"$sum\": \"$icc_totalMesEuros\"\n      }, \n      \"icc_acumuladoBolivares7m\": {\n        \"$sum\": \"$icc_acumuladoBolivares7m\"\n      }, \n      \"icc_acumuladoDolares7m\": {\n        \"$sum\": \"$icc_acumuladoDolares7m\"\n      }, \n      \"icc_acumuladoEuros7m\": {\n        \"$sum\": \"$icc_acumuladoEuros7m\"\n      }, \n      \"nominaBolivares\": {\n        \"$sum\": \"$nominaBolivares\"\n      }, \n      \"nominaDolares\": {\n        \"$sum\": \"$nominaDolares\"\n      }, \n      \"nominaEuros\": {\n        \"$sum\": \"$nominaEuros\"\n      }, \n      \"opCambiariasBolivares\": {\n        \"$sum\": \"$opCambiariasBolivares\"\n      }, \n      \"opCambiariasDolares\": {\n        \"$sum\": \"$opCambiariasDolares\"\n      }, \n      \"opCambiariasEuros\": {\n        \"$sum\": \"$opCambiariasEuros\"\n      }, \n      \"otrosBolivares\": {\n        \"$sum\": \"$otrosBolivares\"\n      }, \n      \"otrosDolares\": {\n        \"$sum\": \"$otrosDolares\"\n      }, \n      \"otrosEuros\": {\n        \"$sum\": \"$otrosEuros\"\n      }, \n      \"pagoProveedoresBolivares\": {\n        \"$sum\": \"$pagoProveedoresBolivares\"\n      }, \n      \"pagoProveedoresDolares\": {\n        \"$sum\": \"$pagoProveedoresDolares\"\n      }, \n      \"pagoProveedoresEuros\": {\n        \"$sum\": \"$pagoProveedoresEuros\"\n      }, \n      \"posBolivares\": {\n        \"$sum\": \"$posBolivares\"\n      }, \n      \"posComisionesBolivares\": {\n        \"$sum\": \"$posComisionesBolivares\"\n      }, \n      \"posComisionesDolares\": {\n        \"$sum\": \"$posComisionesDolares\"\n      }, \n      \"posComisionesEuros\": {\n        \"$sum\": \"$posComisionesEuros\"\n      }, \n      \"posDolaresposEuros\": {\n        \"$sum\": \"$posDolaresposEuros\"\n      }, \n      \"posTransaccionesBolivares\": {\n        \"$sum\": \"$posTransaccionesBolivares\"\n      }, \n      \"posTransaccionesDolares\": {\n        \"$sum\": \"$posTransaccionesDolares\"\n      }, \n      \"posTransaccionesEuros\": {\n        \"$sum\": \"$posTransaccionesEuros\"\n      }, \n      \"ic_totalMesBolivares\": {\n        \"$sum\": \"$ic_totalMesBolivares\"\n      }, \n      \"ic_totalMesDolares\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"ic_totalMesEuros\": {\n        \"$sum\": \"$ic_totalMesEuros\"\n      }, \n      \"ic_acumuladoBolivares7m\": {\n        \"$sum\": \"$ic_acumuladoBolivares7m\"\n      }, \n      \"ic_acumuladoDolares7m\": {\n        \"$sum\": \"$ic_acumuladoDolares7m\"\n      }, \n      \"ic_acumuladoEuros7m\": {\n        \"$sum\": \"$ic_acumuladoEuros7m\"\n      }, \n      \"comprasDolares\": {\n        \"$sum\": \"$comprasDolares\"\n      }, \n      \"comprasEuros\": {\n        \"$sum\": \"$comprasEuros\"\n      }, \n      \"depositosDolares\": {\n        \"$sum\": \"$depositosDolares\"\n      }, \n      \"depositosEuros\": {\n        \"$sum\": \"$depositosEuros\"\n      }, \n      \"depositosEfectivoDolares\": {\n        \"$sum\": \"$depositosEfectivoDolares\"\n      }, \n      \"acumComprasDolares\": {\n        \"$sum\": \"$acumComprasDolares\"\n      }, \n      \"acumComprasEuros\": {\n        \"$sum\": \"$acumComprasEuros\"\n      }, \n      \"acumDepositosDolares\": {\n        \"$sum\": \"$acumDepositosDolares\"\n      }, \n      \"acumDepositosEuros\": {\n        \"$sum\": \"$acumDepositosEuros\"\n      }, \n      \"cantidadTransacciones\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }, \n      \"montoFacturacionBolivares\": {\n        \"$sum\": \"$montoFacturacionBolivares\"\n      }, \n      \"montoFacturacionDolares\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"montoFacturacionEuros\": {\n        \"$sum\": \"$montoFacturacionEuros\"\n      }, \n      \"acumuladoFacturacionUlt7MesesBolivares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesBolivares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesDolares\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesDolares\"\n      }, \n      \"acumuladoFacturacionUlt7MesesEuros\": {\n        \"$sum\": \"$acumuladoFacturacionUlt7MesesEuros\"\n      }, \n      \"acumuladoTransaccionesUlt7Meses\": {\n        \"$sum\": \"$acumuladoTransaccionesUlt7Meses\"\n      }, \n      \"sumAAbonoLiqActivo\": {\n        \"$sum\": \"$sumAAbonoLiqActivo\"\n      }, \n      \"sumAMontoAbonado\": {\n        \"$sum\": \"$sumAMontoAbonado\"\n      }, \n      \"sumAbonoLiqActivo12M\": {\n        \"$sum\": \"$sumAbonoLiqActivo12M\"\n      }, \n      \"sumMontoAbonado12M\": {\n        \"$sum\": \"$sumMontoAbonado12M\"\n      }, \n      \"sumSaldoPromedio12M\": {\n        \"$sum\": \"$sumSaldoPromedio12M\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoPromedio12M\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumSaldoPromedio12M\", 12\n            ]\n          }, 4\n        ]\n      }, \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"codigoSegmento\": {\n        \"$nin\": [\n          null, \"\", 0\n        ]\n      }, \n      \"fechaProceso\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"codigoSegmento\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "a1f9d0c0-22fa-4d85-a509-5b2cac5053d5",
        "name": "A_4_AgrupacionSegmento_Margenmetricsegmento",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2440,
          2300
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$consultaProveerdor\", true\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$snb_rif_empresa\", \n        \"rifBenefic\": \"$snb_ci_benefic\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$snb_mto_pcorrecto\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$ne\": [\n                \"$tipoBanco\", \"BDV\"\n              ]\n            }, \n            \"then\": \"$snb_mto_pcorrecto\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }, \n      \"codigo\": {\n        \"$first\": \"$codigoSegmento\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"codigo\": \"$codigo\"\n      }, \n      \"beneficiarios\": {\n        \"$sum\": 1\n      }, \n      \"volumenPagosProveedor\": {\n        \"$sum\": \"$volumenPagosProveedor\"\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$sum\": \"$volumenPagosProveedorBDV\"\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$sum\": \"$volumenPagosProveedorOTRO\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$USDConvertRte\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"codigo\": \"$_id.codigo\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"cantidadBeneficiario\": \"$beneficiarios\", \n      \"volumenPagosProveedor\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedor\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorOTRO\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorOTRO\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }, \n      \"volumenPagosProveedorBDV\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$volumenPagosProveedorBDV\", \"$USDConvertRte\"\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$ne\": null\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigo\": \"$$REMOVE\", \n      \"codigoSegmento\": \"$codigo\", \n      \"reciprocidadBeneficiario\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$volumenPagosProveedor\", 0\n            ]\n          }, \n          \"then\": 0, \n          \"else\": {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                    ]\n                  }, 100\n                ]\n              }, 2\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"codigoSegmento\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "4d402ef9-6b91-4516-8547-96e5bd9e9159",
        "name": "A_4.1_AgrupacionSegmentoBeneficiarios_Margenmetricsegmento",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2440,
          2480
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "88aaa3af-7181-4cfd-9dfa-c95d810e445b",
        "name": "Merge32",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          2580
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "04ce2843-f3de-4c41-b223-a468bbee2936",
        "name": "Merge33",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4060,
          2740
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricsegmento",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 2\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoSegmento\": \"$codigoSegmento\"\n      }, \n      \"codigoSegmento\": {\n        \"$first\": \"$codigoSegmento\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"montoAbonado3m\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"montoAbonadoProm3m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$montoAbonado3m\", 3\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"fechaProceso\", \"codigoSegmento\"\n      ]\n    }\n  }\n]"
        },
        "id": "a0773064-0507-421b-8195-0371884edda6",
        "name": "1_Promedio3m3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          2180
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricsegmento",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 5\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoSegmento\": \"$codigoSegmento\"\n      }, \n      \"codigoSegmento\": {\n        \"$first\": \"$codigoSegmento\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"saldoDolar6m\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro6m\": {\n        \"$sum\": \"$saldoEuro\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoDolarProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoDolar6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"saldoEuroProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoEuro6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"fechaProceso\", \"codigoSegmento\"\n      ]\n    }\n  }\n]"
        },
        "id": "231fd20f-a070-401e-a9ab-c1987f044342",
        "name": "2_Promedio6m3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          2340
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricsegmento",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$concat\": [\n                      \"31-12-\", {\n                        \"$toString\": {\n                          \"$subtract\": [\n                            {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.fechaProceso}}\"\n                              }\n                            }, 1\n                          ]\n                        }\n                      }\n                    ]\n                  }, \n                  \"format\": \"%d-%m-%Y\"\n                }\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigoSegmento\": 1, \n      \"fechaProceso\": 1, \n      \"fechaProcesoDic\": {\n        \"$dateFromString\": {\n          \"dateString\": {\n            \"$concat\": [\n              \"31-12-\", {\n                \"$toString\": {\n                  \"$subtract\": [\n                    {\n                      \"$year\": {\n                        \"$toDate\": \"{{$json.fechaProceso}}\"\n                      }\n                    }, 1\n                  ]\n                }\n              }\n            ]\n          }, \n          \"format\": \"%d-%m-%Y\"\n        }\n      }, \n      \"saldoActivo\": 1, \n      \"abonoLiqActivo\": 1, \n      \"montoAbonado\": 1, \n      \"promedioPasivo\": 1\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$codigoSegmento\", \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"val\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }, \n      \"valDic\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$ne\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"codigoSegmento\": \"$_id\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"_id\": \"$$REMOVE\", \n      \"creASaldoActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.saldoActivo\"\n                          }, {\n                            \"$first\": \"$valDic.saldoActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.saldoActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAAbonoLiqActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.abonoLiqActivo\"\n                          }, {\n                            \"$first\": \"$valDic.abonoLiqActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.abonoLiqActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAMontoAbonado\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.montoAbonado\"\n                          }, {\n                            \"$first\": \"$valDic.montoAbonado\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.montoAbonado\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAPromedioPasivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.promedioPasivo\"\n                          }, {\n                            \"$first\": \"$valDic.promedioPasivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.promedioPasivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"codigoSegmento\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "5051a696-39da-42cc-ab29-b4d0911232c2",
        "name": "3_crecimientoAnual_dicAnt-Act3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          2660
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricsegmento",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"reciprocidadGeneral\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  \"$montoAbonadoProm3m\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$lte\": [\n                  \"$saldoActivo\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$saldoActivo\", 0\n                ]\n              }, \n              \"then\": 0\n            }\n          ], \n          \"default\": {\n            \"$round\": [\n              {\n                \"$divide\": [\n                  \"$montoAbonadoProm3m\", \"$saldoActivo\"\n                ]\n              }, 4\n            ]\n          }\n        }\n      }, \n      \"fechaProceso\": 1, \n      \"codigoSegmento\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"fechaProceso\", \"codigoSegmento\"\n      ]\n    }\n  }\n]"
        },
        "id": "bc7a3cbd-78bf-4510-91c0-bb949948ecaf",
        "name": "4_Reciprocidad3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3920,
          2640
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetricsegmento",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"fechaSuperior\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }, \n          \"month\": {\n            \"$month\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProcesoAct\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaProceso\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaProceso\"\n          }\n        }\n      }, \n      \"fechaInferior\": {\n        \"$dateSubtract\": {\n          \"startDate\": {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$fechaSuperior\"\n              }, \n              \"month\": {\n                \"$month\": \"$fechaSuperior\"\n              }\n            }\n          }, \n          \"unit\": \"month\", \n          \"amount\": 6\n        }\n      }\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProcesoAct\", \"$fechaInferior\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProcesoAct\", \"$fechaSuperior\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigoSegmento\": \"$codigoSegmento\"\n      }, \n      \"codigoSegmento\": {\n        \"$first\": \"$codigoSegmento\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumIcc_totalMesDolares7m\": {\n        \"$sum\": \"$icc_totalMesDolares\"\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$sum\": \"$ic_totalMesDolares\"\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$sum\": \"$montoFacturacionDolares\"\n      }, \n      \"sumCantidadTransacciones7m\": {\n        \"$sum\": \"$cantidadTransacciones\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sumIcc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIcc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumIc_totalMesDolares7m\": {\n        \"$round\": [\n          \"$sumIc_totalMesDolares7m\", 4\n        ]\n      }, \n      \"sumMontoFacturacionDolares7m\": {\n        \"$round\": [\n          \"$sumMontoFacturacionDolares7m\", 4\n        ]\n      }, \n      \"icc_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIcc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"ic_totalPromDolares7m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumIc_totalMesDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioFacturacionUlt7MesesDolares\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumMontoFacturacionDolares7m\", 7\n            ]\n          }, 4\n        ]\n      }, \n      \"promedioTransaccionesUlt7Meses\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumCantidadTransacciones7m\", 7\n            ]\n          }, 0\n        ]\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"fechaProceso\", \"codigoSegmento\"\n      ]\n    }\n  }\n]"
        },
        "id": "37759c32-da27-4553-85b6-24f3081d2451",
        "name": "5_Promedio7m3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          2500
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"codigo\": \"$codigoSegmento\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": 1\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$linkedProducts\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"codigo\": \"$codigo\", \n        \"name\": \"$linkedProducts.name\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"active\": {\n        \"$max\": \"$linkedProducts.active\"\n      }, \n      \"qtyActive\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$linkedProducts.active\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }, \n      \"lastUse\": {\n        \"$max\": \"$linkedProducts.lastUse\"\n      }, \n      \"firstUse\": {\n        \"$min\": \"$linkedProducts.firstUse\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$_id.codigo\", \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"linkedProducts\": {\n        \"$push\": {\n          \"name\": \"$_id.name\", \n          \"active\": \"$active\", \n          \"qtyActive\": \"$qtyActive\", \n          \"lastUse\": \"$lastUse\", \n          \"firstUse\": \"$firstUse\"\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": \"$$REMOVE\", \n      \"codigo\": \"$_id\", \n      \"fechaProceso\": 1, \n      \"linkedProducts\": \"$linkedProducts\"\n    }\n  }, {\n    \"$match\": {\n      \"codigo\": {\n        \"$nin\": [\n          null, \"\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"codigoSegmento\": \"$codigo\", \n      \"codigo\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmento\", \n      \"on\": [\n        \"codigoSegmento\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
        },
        "id": "aa338890-a164-47bc-85c4-7fff0afb772d",
        "name": "A_4.2_AgrupacionLinekedProduct_Margenmetricsegmento",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2440,
          2660
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_4_AgrupacionSegmento_Margenmetricsegmento",
          "options": {}
        },
        "id": "6d9ae640-e41f-4ab7-bc9d-b5bd522e44e2",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1720,
          2820
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "30386472-1bb0-45e3-bb93-157a62202a89",
        "name": "Merge23",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          2260
        ]
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "455a75ed-128f-41a2-b7f6-c1258b7f28db",
        "name": "SplitInBatches2",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1080,
          1940
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_2_AgrupacionGrupo_Margenmetricgrupo",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "c5c9d166-afcd-4aa9-af02-f5e90e76fba3",
        "name": "HTTP Request2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1440,
          1940
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst processDate = body.processDate;\n//Fecha de Proceso mes actual de procesamiento\nconst subProcessDate = body.subProcessDate;\n// para enviar la variable a las operaciones\nconst fechaProceso = body.subProcessDate;\n// Nombre del proceso/etapa\nconst processName = \"E5_Agrupaciones\"\n//nombre subProceso, varia en cada nodo del wf\nconst groupName =  \"segmento\";\n\n//Arma el arreglo con los tres campos\noutput.push({processName,groupName,processDate,subProcessDate,fechaProceso});\n\nreturn output;\n\n"
        },
        "id": "3e557560-9896-4fc9-a460-0747319c7247",
        "name": "fecha proceso4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1900,
          2820
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "05ac90e4-b884-416f-8683-966dcd9ba24d",
        "name": "Merge8",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2240,
          2800
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "708290bf-c753-4df8-a4e8-716b834266a8",
        "name": "Merge24",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2640,
          2400
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "de84e996-5e8b-489f-88ae-cc90e4396587",
        "name": "Merge25",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2820,
          2540
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "e15239ce-5831-44e9-9f18-aa4d8383351f",
        "name": "Merge26",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3000,
          2780
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "empty"
        },
        "id": "df01118c-b10d-4814-b960-26fe6c4cbc3b",
        "name": "Merge34",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3600,
          2420
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "3de3af8a-5726-4376-b6f9-7cf218a3abe3",
        "name": "Merge37",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3760,
          2760
        ]
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "4f967709-4dc5-458a-95a4-6b973fdb35b8",
        "name": "SplitInBatches3",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1100,
          3740
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_3_AgrupacionSegmento_MargenmetricsNSE",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "b68c661c-2815-4a27-998b-c1716bdaf0e8",
        "name": "HTTP Request3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1460,
          3740
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "content": "Margenmetricsegmento",
          "height": 862.0163407468258,
          "width": 3376.2023868608935
        },
        "id": "4314086d-885c-4747-a86e-c2cbda7a576f",
        "name": "Note6",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1640,
          2120
        ]
      },
      {
        "parameters": {
          "height": 889.3701171875,
          "width": 3376.0163224452745
        },
        "id": "1ab2cdae-3067-4862-bd96-248b3cec8aee",
        "name": "Note7",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1640,
          3020
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E5_AGRUPACIONES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "b446f7f8-cf7e-4f2d-9021-809c6194830a",
        "name": "HTTP Request4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4840,
          820
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E5_AGRUPACIONES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "5a4b3110-8d75-4a6d-967b-55921fe4f141",
        "name": "HTTP Request5",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4820,
          1820
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E5_AGRUPACIONES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "7fdf0453-44e5-412f-a5e4-725e16a8685f",
        "name": "HTTP Request6",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4840,
          2720
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E5_AGRUPACIONES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "1889e121-aa3c-4dc6-aacc-266f60d76ec2",
        "name": "HTTP Request7",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4780,
          3640
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5fb451f5-ec08-4dc1-805d-a765b53cd752",
        "name": "Merge9",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4520,
          820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "42e31933-6680-4364-8392-f032f8aa30a6",
        "name": "Merge17",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4540,
          1820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2b12c250-e59c-4f6b-a6ab-8670ce3c56a1",
        "name": "Merge19",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4440,
          2720
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a7e4698b-a416-46b4-8d4b-56d612ab4a66",
        "name": "Merge20",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4400,
          3640
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "caecc5bf-ab57-490b-b923-c747b6b396ed",
        "name": "Merge21",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          140,
          2340
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E5_AGRUPACIONES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "2024-02-29"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "3950756c-9c6f-463a-ad08-28b252fd83d4",
        "name": "HTTP Request8",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -640,
          2360
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n    {\n      \"$limit\": 1\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"lastUpdatedAt\": \"$$REMOVE\", \n        \"proceso\": \"$$REMOVE\", \n        \"currentUpdatedDate\": \"$$REMOVE\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"Margenmetric\", \n        \"let\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$or\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00266443\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J30468971\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00343994\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00041312\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J50019975\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00020200\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00006372\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J00324454\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J41302282\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"J30240664\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V12229669\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V12045759\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V10339024\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V10201389\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V19030100\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V24798174\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V17932801\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V13811301\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V18380504\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V16273096\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V10897401\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V16721253\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V17219608\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$rifCedula\", \"V21355144\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"fechaProceso\": 1, \n              \"_id\": 0\n            }\n          }\n        ], \n        \"as\": \"Margenmetric\"\n      }\n    }, {\n      \"$addFields\": {\n        \"processName\": \"$$REMOVE\", \n        \"processDate\": \"$$REMOVE\", \n        \"Margenmetric\": \"$$REMOVE\", \n        \"fechaProceso\": {\n          \"$setUnion\": \"$Margenmetric.fechaProceso\"\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processName\": \"E5_Agrupaciones\", \n        \"processDate\": {\n          \"$toDate\": \"{{$json.fechaProceso}}\"\n        }, \n        \"description\": \"Agrupación por banca, grupo económico, segmento, nivel socio económico y cálculo de indicadores\", \n        \"processFrequency\": \"Mensual\", \n        \"fromColletion\": \"Margenmetric\", \n        \"toColletion\": \"Margenmetricbanca, Margenmetricgrupo, Margenmetricsegmento, Margenmetricnse\", \n        \"startDate\": \"$$NOW\", \n        \"endDate\": \"nda\", \n        \"runtimeInMinutes\": \"nda\", \n        \"status\": \"En Proceso\", \n        \"subProcessDate\": \"$fechaProceso\", \n        \"groupName\": [\n          \"banca\", \"grupo\", \"segmento\", \"nse\"\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcessDate\"\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$groupName\"\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcessDate\": \"$$REMOVE\", \n        \"groupName\": \"$$REMOVE\", \n        \"subProcess\": {\n          \"processName\": {\n            \"$concat\": [\n              \"Agrupacion_\", \"$groupName\", \"_\", {\n                \"$substr\": [\n                  {\n                    \"$toString\": \"$subProcessDate\"\n                  }, 0, 10\n                ]\n              }\n            ]\n          }, \n          \"processDate\": \"$subProcessDate\", \n          \"description\": {\n            \"$concat\": [\n              \"$description\", \" agrupacion \", \"$groupName\", \" \", {\n                \"$toString\": \"$subProcessDate\"\n              }\n            ]\n          }, \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": {\n            \"$concat\": [\n              \"Margenmetric\", \"$groupName\"\n            ]\n          }, \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\", \n          \"subProcessDate\": \"nda\", \n          \"groupName\": \"$groupName\"\n        }\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"processName\": \"$processName\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"processName\": {\n          \"$first\": \"$processName\"\n        }, \n        \"processDate\": {\n          \"$first\": \"$processDate\"\n        }, \n        \"description\": {\n          \"$first\": \"$description\"\n        }, \n        \"processFrequency\": {\n          \"$first\": \"$processFrequency\"\n        }, \n        \"fromColletion\": {\n          \"$first\": \"$fromColletion\"\n        }, \n        \"toColletion\": {\n          \"$first\": \"$toColletion\"\n        }, \n        \"startDate\": {\n          \"$first\": \"$startDate\"\n        }, \n        \"endDate\": {\n          \"$first\": \"$endDate\"\n        }, \n        \"runtimeInMinutes\": {\n          \"$first\": \"$runtimeInMinutes\"\n        }, \n        \"status\": {\n          \"$first\": \"$status\"\n        }, \n        \"subProcess\": {\n          \"$push\": \"$subProcess\"\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "07fb3260-82eb-47d6-823a-63eb588376d7",
        "name": "create_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -40,
          2220
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_statusProcesos\", \n      \"let\": {\n        \"processName\": \"E5_Agrupaciones\", \n        \"processDate\": {\n          \"$toDate\": \"{{$json.fechaProceso}}\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$processName\", \"$$processName\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$processDate\", \"$$processDate\"\n                  ]\n                }\n              }\n            ]\n          }\n        }, {\n          \"$project\": {\n            \"processDate\": 1, \n            \"subProcessDate\": \"$subProcess.processDate\"\n          }\n        }\n      ], \n      \"as\": \"sidis_statusProcesos\"\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processDate\": {\n        \"$first\": \"$sidis_statusProcesos.processDate\"\n      }, \n      \"subProcessDate\": {\n        \"$setUnion\": {\n          \"$first\": \"$sidis_statusProcesos.subProcessDate\"\n        }\n      }\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcessDate\"\n    }\n  }, {\n    \"$addFields\": {\n      \"processDate\": {\n        \"$substr\": [\n          {\n            \"$toDate\": \"$processDate\"\n          }, 0, 10\n        ]\n      }, \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toDate\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }\n    }\n  }\n]"
        },
        "id": "973c5e4b-327f-4423-8356-f1134fe81c60",
        "name": "bring_dates",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          360,
          2340
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d915b866-77b5-4e66-9cdd-1f43d0a009a7",
        "name": "start_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2020,
          740
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2aab3d9d-8f8a-4838-89e6-8c4f3df4b4ea",
        "name": "updated_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4340,
          680
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7604417a-d8d6-4c3d-b1cc-4644f0ef54a3",
        "name": "start_operation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2080,
          1820
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7312d05f-726c-4033-a1ae-8a35bf8cbfb7",
        "name": "updated_operation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4360,
          1720
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "1de6781f-0ef0-44e6-b12a-7f045300a76f",
        "name": "start_operation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2080,
          2680
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "ef7c19cc-5c74-4fb9-8e83-3ea2d4fac91d",
        "name": "start_operation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2100,
          3620
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "8f768885-dfc5-4747-a573-da699de953b3",
        "name": "start_operation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2100,
          3460
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5e94ac83-32d1-4a4d-9c41-99966bb693af",
        "name": "updated_operation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4260,
          2600
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "fafc08d9-ce26-474e-ad14-907eb42b4687",
        "name": "updated_operation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4240,
          3540
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"Agrupacion_\",\"{{$json.groupName}}\", \"_\", \"{{$json.subProcessDate}}\"                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"groupName\": \"$$item.groupName\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "4d97c96b-831d-4f93-b380-569c955b7672",
        "name": "updated_operation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4240,
          3360
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "11709de6-b7c4-42f0-9d2b-11f21051c73e",
        "name": "SplitInBatches4",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1940,
          4320
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"collectionName\": [\n        \"margen\", \"clientes\", \"segmentacion\", \"base_cliente\", \"beneficiario\", \"ordenante\"\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$collectionName\"\n    }\n  }\n]"
        },
        "id": "29ef6d02-11ec-4b17-bb5a-eb388c9382b2",
        "name": "bring_collections",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1720,
          4320
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "delete",
          "collection": "={{$json.collectionName}}",
          "query": "={}"
        },
        "id": "ad576275-c724-41a8-834d-cce16ecee1ee",
        "name": "borrado_segmentacion1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2740,
          4320
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "872bf110-fbd5-44fe-a5ce-471fe6da29f9",
          "options": {}
        },
        "id": "34371108-b0b9-4acc-8110-ae7e1159dfc6",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2360,
          4320
        ],
        "webhookId": "872bf110-fbd5-44fe-a5ce-471fe6da29f9"
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst collectionName = body.collectionName;\n//Fecha de Proceso mes actual de procesamiento\n\n\n//Arma el arreglo con los tres campos\noutput.push({collectionName});\n\nreturn output;\n\n"
        },
        "id": "519da00e-eafd-4d6d-be9f-7da2bbc9928d",
        "name": "fecha proceso5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2560,
          4320
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/872bf110-fbd5-44fe-a5ce-471fe6da29f9",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "collectionName",
                "value": "={{$json.collectionName}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "d3c03db6-a06d-4f9b-a917-91ba31cdfcfc",
        "name": "HTTP Request10",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2140,
          4320
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "content": "limpieza de colecciones crudas",
          "height": 362.38205698478555,
          "width": 1364.0738345781463
        },
        "id": "6f5b1def-3239-4117-9a0d-a07f1e73e3fc",
        "name": "Note4",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1620,
          4200
        ]
      },
      {
        "parameters": {
          "batchSize": "1",
          "options": {}
        },
        "id": "ecc57763-ce63-4025-8284-deb812db9f9a",
        "name": "SplitInBatches5",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1940,
          4800
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"collectionName\": [\n        \"sidis_cliente_base_segmentacion\", \"Margenmetric\"\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$collectionName\"\n    }\n  }\n]"
        },
        "id": "08f67069-013f-4dfa-b98d-ef744378e326",
        "name": "bring_collections1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1720,
          4800
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "operation": "delete",
          "collection": "={{$json.collectionName}}",
          "query": "=[\n    {\n      \"$match\": {\n        \"rifCedula\": {\n          \"$exists\": true\n        }, \n        \"$expr\": {\n          \"$eq\": [\n            \"$fechaProceso\", {\n              \"$dateAdd\": {\n                \"startDate\": {\n                  \"$dateFromParts\": {\n                    \"year\": {\n                      \"$year\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }, \n                    \"month\": {\n                      \"$month\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }\n                  }\n                }, \n                \"unit\": \"day\", \n                \"amount\": -1\n              }\n            }\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "fdad9939-48e4-416b-89a1-a1e843af3b6a",
        "name": "borrado_segmentacion",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2740,
          4800
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst collectionName = body.collectionName;\n//Fecha de Proceso mes actual de procesamiento\nconst processDate = body.processDate;\n\n//Arma el arreglo con los tres campos\noutput.push({collectionName,processDate});\n\n\nreturn output;\n\n"
        },
        "id": "b871ca1f-a657-4903-8175-2b2b329ef225",
        "name": "fecha proceso6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2560,
          4800
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/4bde43ef-e741-46cb-b107-6b4ac7114b30",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "collectionName",
                "value": "={{$json.collectionName}}"
              },
              {
                "name": "processDate",
                "value": "={{$json.fechaProceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "18ec738f-1bbd-4c4f-a6be-813983bd9485",
        "name": "HTTP Request11",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2140,
          4800
        ],
        "alwaysOutputData": false,
        "disabled": true
      },
      {
        "parameters": {
          "content": "limpieza de colecciones 24 meses\n",
          "height": 362.38205698478555,
          "width": 1364.0738345781463
        },
        "id": "b741b260-f984-47b6-a71b-987a9e8e722a",
        "name": "Note5",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1620,
          4680
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "4bde43ef-e741-46cb-b107-6b4ac7114b30",
          "options": {}
        },
        "id": "f2f2b0a6-3a56-46c4-bcc1-ac93cee73b77",
        "name": "Webhook6",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2400,
          4800
        ],
        "webhookId": "4bde43ef-e741-46cb-b107-6b4ac7114b30"
      },
      {
        "parameters": {
          "operation": "delete",
          "collection": "sidis_beneficiario",
          "query": "=[\n    {\n      \"$match\": {\n        \"snb_ci_benefic\": {\n          \"$exists\": true\n        }, \n        \"$expr\": {\n          \"$eq\": [\n            \"$fechaProceso\", {\n              \"$dateAdd\": {\n                \"startDate\": {\n                  \"$dateFromParts\": {\n                    \"year\": {\n                      \"$year\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }, \n                    \"month\": {\n                      \"$month\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }\n                  }\n                }, \n                \"unit\": \"day\", \n                \"amount\": -1\n              }\n            }\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "8b12467e-8137-4dbf-8010-4d8c659b2dfd",
        "name": "borrado_segmentacion3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2280,
          5220
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst collectionName = body.collectionName;\n//Fecha de Proceso mes actual de procesamiento\nconst processDate = body.processDate;\n\n//Arma el arreglo con los tres campos\noutput.push({collectionName,processDate});\n\n\nreturn output;\n\n"
        },
        "id": "e4d0fccd-be84-4a7f-9141-89192c5a4d78",
        "name": "fecha proceso8",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2100,
          5220
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/6baa6d09-b394-4ec8-a2b6-eaeff5989c47",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.fechaProceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "0f923639-46ee-48be-8c62-ff07282657cf",
        "name": "HTTP Request13",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1700,
          5220
        ],
        "alwaysOutputData": false,
        "disabled": true
      },
      {
        "parameters": {
          "content": "limpieza de beneficiario 24 meses\n",
          "height": 304.1843253506969,
          "width": 874.7817945434003
        },
        "id": "fc068330-822b-409c-b0a4-c0885b04b1b8",
        "name": "Note9",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1620,
          5120
        ]
      },
      {
        "parameters": {
          "operation": "delete",
          "collection": "sidis_ordenante",
          "query": "=[\n    {\n      \"$match\": {\n        \"sno_rif_empresa\": {\n          \"$exists\": true\n        }, \n        \"$expr\": {\n          \"$eq\": [\n            \"$fechaProceso\", {\n              \"$dateAdd\": {\n                \"startDate\": {\n                  \"$dateFromParts\": {\n                    \"year\": {\n                      \"$year\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }, \n                    \"month\": {\n                      \"$month\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }\n                  }\n                }, \n                \"unit\": \"day\", \n                \"amount\": -1\n              }\n            }\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "96d2fb18-13df-4c96-954a-f4cdbbf92a5a",
        "name": "borrado_segmentacion4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2280,
          5580
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst collectionName = body.collectionName;\n//Fecha de Proceso mes actual de procesamiento\nconst processDate = body.processDate;\n\n//Arma el arreglo con los tres campos\noutput.push({collectionName,processDate});\n\n\nreturn output;\n\n"
        },
        "id": "e62636f0-85cd-4565-9732-5f5b2f92f344",
        "name": "fecha proceso9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2100,
          5580
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/e47ef8da-07b8-4c82-99c3-3b8b96ca8700",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.fechaProceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "17b26f28-1202-4f3e-a289-e77b65460392",
        "name": "HTTP Request14",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1700,
          5580
        ],
        "alwaysOutputData": false,
        "disabled": true
      },
      {
        "parameters": {
          "content": "limpieza de ordenante 24 meses\n",
          "height": 304.1843253506969,
          "width": 874.7817945434003
        },
        "id": "972dc33d-c0dc-48a5-ac3f-11845bca9b92",
        "name": "Note10",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1620,
          5480
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "6baa6d09-b394-4ec8-a2b6-eaeff5989c47",
          "options": {}
        },
        "id": "b0a8a242-cf5f-431b-9fd3-2e476bc50115",
        "name": "Webhook7",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1920,
          5220
        ],
        "webhookId": "6baa6d09-b394-4ec8-a2b6-eaeff5989c47"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "e47ef8da-07b8-4c82-99c3-3b8b96ca8700",
          "options": {}
        },
        "id": "3458dba7-0322-47ee-9678-27d5e5ac754c",
        "name": "Webhook8",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1920,
          5580
        ],
        "webhookId": "e47ef8da-07b8-4c82-99c3-3b8b96ca8700"
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n//Fecha variable del proceso\nconst collectionName = body.collectionName;\n//Fecha de Proceso mes actual de procesamiento\nconst processDate = body.processDate;\n\n//Arma el arreglo con los tres campos\noutput.push({collectionName,processDate});\n\n\nreturn output;\n\n"
        },
        "id": "5b110d05-20b8-4adb-8d70-85a00e25a27c",
        "name": "fecha proceso10",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2140,
          5960
        ],
        "alwaysOutputData": false
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/fc5a820d-72eb-4ea8-b2b4-0bc79b421fdb",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.fechaProceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "2d8b20f2-97f6-4fd4-bb21-6fbe5bfa10c6",
        "name": "HTTP Request15",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1740,
          5960
        ],
        "alwaysOutputData": false,
        "disabled": true
      },
      {
        "parameters": {
          "content": "limpieza de margen 24 meses\n",
          "height": 304.1843253506969,
          "width": 874.7817945434003
        },
        "id": "abe8f683-3df2-400f-8949-ea2b7fa397d3",
        "name": "Note11",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1660,
          5860
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "fc5a820d-72eb-4ea8-b2b4-0bc79b421fdb",
          "options": {}
        },
        "id": "0cd4cb04-fe0d-49bc-b4da-976294ee1cd6",
        "name": "Webhook9",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1960,
          5960
        ],
        "webhookId": "fc5a820d-72eb-4ea8-b2b4-0bc79b421fdb"
      },
      {
        "parameters": {
          "operation": "delete",
          "collection": "sidis_margen",
          "query": "=[\n    {\n      \"$match\": {\n        \"mcl_rif_cedula\": {\n          \"$exists\": true\n        }, \n        \"$expr\": {\n          \"$eq\": [\n            \"$mcl_fecha_proceso\", {\n              \"$dateAdd\": {\n                \"startDate\": {\n                  \"$dateFromParts\": {\n                    \"year\": {\n                      \"$year\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }, \n                    \"month\": {\n                      \"$month\": {\n                        \"$dateAdd\": {\n                          \"startDate\": {\n                            \"$toDate\": \"{{$json.processDate}}\"\n                          }, \n                          \"unit\": \"month\", \n                          \"amount\": -24\n                        }\n                      }\n                    }\n                  }\n                }, \n                \"unit\": \"day\", \n                \"amount\": -1\n              }\n            }\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "ddf14687-479e-43ce-9792-a2b9b20bfdd9",
        "name": "borrado_ sidis_margen",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2320,
          5960
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "da8b4808-5122-4ad1-96db-4393d1880441",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1260,
          920
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "c00daa7e-d971-4e80-8309-e055133bb64e",
        "name": "Wait1",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1260,
          1940
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "f32621b7-4973-4f5c-a0cd-9b0793447dc3",
        "name": "Wait2",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1260,
          2820
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "b4202c6b-7635-4ba1-a279-0e2aa431ee76",
        "name": "Wait3",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1300,
          3740
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      }
    ],
    "connections": {
      "Webhook5": {
        "main": [
          [
            {
              "node": "fecha proceso",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "NoOp8": {
        "main": [
          [
            {
              "node": "bring_collections",
              "type": "main",
              "index": 0
            },
            {
              "node": "bring_collections1",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request13",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request14",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso": {
        "main": [
          [
            {
              "node": "create_operation",
              "type": "main",
              "index": 0
            },
            {
              "node": "NoOp8",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge21",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "SplitInBatches": {
        "main": [
          [
            {
              "node": "Wait",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request": {
        "main": [
          [
            {
              "node": "SplitInBatches",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso1": {
        "main": [
          [
            {
              "node": "start_operation",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Webhook1": {
        "main": [
          [
            {
              "node": "fecha proceso1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge": {
        "main": [
          [
            {
              "node": "A_1_AgrupacionBanca_Margenmetricbanca",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_1.1_AgrupacionBancaBeneficiarios_Margenmetricbanca",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_1.2_AgrupacionLinkedProduct_Margenmetricbanca",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge7",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "A_1_AgrupacionBanca_Margenmetricbanca": {
        "main": [
          [
            {
              "node": "Merge3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_1.1_AgrupacionBancaBeneficiarios_Margenmetricbanca": {
        "main": [
          [
            {
              "node": "Merge3",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge27": {
        "main": [
          [
            {
              "node": "Merge4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "1_Promedio3m": {
        "main": [
          [
            {
              "node": "Merge22",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "2_Promedio6m": {
        "main": [
          [
            {
              "node": "Merge22",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "3_crecimientoAnual_dicAnt-Act": {
        "main": [
          [
            {
              "node": "Merge18",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "4_Reciprocidad": {
        "main": [
          [
            {
              "node": "Merge5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "5_Promedio7m": {
        "main": [
          [
            {
              "node": "Merge18",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_1.2_AgrupacionLinkedProduct_Margenmetricbanca": {
        "main": [
          [
            {
              "node": "Merge6",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge18": {
        "main": [
          [
            {
              "node": "Merge27",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge22": {
        "main": [
          [
            {
              "node": "Merge27",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge4": {
        "main": [
          [
            {
              "node": "4_Reciprocidad",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge5",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge5": {
        "main": [
          [
            {
              "node": "updated_operation",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge9",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge3": {
        "main": [
          [
            {
              "node": "Merge6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge6": {
        "main": [
          [
            {
              "node": "Merge7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge7": {
        "main": [
          [
            {
              "node": "1_Promedio3m",
              "type": "main",
              "index": 0
            },
            {
              "node": "2_Promedio6m",
              "type": "main",
              "index": 0
            },
            {
              "node": "5_Promedio7m",
              "type": "main",
              "index": 0
            },
            {
              "node": "3_crecimientoAnual_dicAnt-Act",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge4",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge13": {
        "main": [
          [
            {
              "node": "Merge16",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge14": {
        "main": [
          [
            {
              "node": "1_Promedio3m2",
              "type": "main",
              "index": 0
            },
            {
              "node": "3_crecimientoAnual_dicAnt-Act2",
              "type": "main",
              "index": 0
            },
            {
              "node": "2_Promedio6m2",
              "type": "main",
              "index": 0
            },
            {
              "node": "5_Promedio7m2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge39",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "A_3_AgrupacionNSE_Margenmetricnse": {
        "main": [
          [
            {
              "node": "Merge13",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_3.1_AgrupacionNSEBeneficiarios_Margenmetricnse": {
        "main": [
          [
            {
              "node": "Merge13",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge10": {
        "main": [
          [
            {
              "node": "Merge36",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge30": {
        "main": [
          [
            {
              "node": "Merge36",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge31": {
        "main": [
          [
            {
              "node": "Merge20",
              "type": "main",
              "index": 1
            },
            {
              "node": "updated_operation6",
              "type": "main",
              "index": 0
            },
            {
              "node": "updated_operation7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "1_Promedio3m2": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "2_Promedio6m2": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "3_crecimientoAnual_dicAnt-Act2": {
        "main": [
          [
            {
              "node": "Merge30",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "4_Reciprocidad2": {
        "main": [
          [
            {
              "node": "Merge31",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "5_Promedio7m2": {
        "main": [
          [
            {
              "node": "Merge30",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge36": {
        "main": [
          [
            {
              "node": "Merge39",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge16": {
        "main": [
          [
            {
              "node": "Merge14",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_3.2_AgrupacionLinkedProduct_Margenmetricnse": {
        "main": [
          [
            {
              "node": "Merge16",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge39": {
        "main": [
          [
            {
              "node": "Merge31",
              "type": "main",
              "index": 1
            },
            {
              "node": "4_Reciprocidad2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso2": {
        "main": [
          [
            {
              "node": "Merge1",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation6",
              "type": "main",
              "index": 0
            },
            {
              "node": "start_operation7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook2": {
        "main": [
          [
            {
              "node": "fecha proceso2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge1": {
        "main": [
          [
            {
              "node": "Merge14",
              "type": "main",
              "index": 1
            },
            {
              "node": "A_3.2_AgrupacionLinkedProduct_Margenmetricnse",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_3.1_AgrupacionNSEBeneficiarios_Margenmetricnse",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_3_AgrupacionNSE_Margenmetricnse",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_2_AgrupacionGrupo_Margenmetricgrupo": {
        "main": [
          [
            {
              "node": "Merge11",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_2.1_AgrupacionGrupoBeneficiarios_Margenmetricgrupo": {
        "main": [
          [
            {
              "node": "Merge11",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge28": {
        "main": [
          [
            {
              "node": "Merge38",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge29": {
        "main": [
          [
            {
              "node": "Merge17",
              "type": "main",
              "index": 1
            },
            {
              "node": "updated_operation2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "1_Promedio3m1": {
        "main": [
          [
            {
              "node": "Merge35",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "2_Promedio6m1": {
        "main": [
          [
            {
              "node": "Merge35",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "3_crecimientoAnual_dicAnt-Act1": {
        "main": [
          [
            {
              "node": "Merge28",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "4_Reciprocidad1": {
        "main": [
          [
            {
              "node": "Merge29",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "5_Promedio7m1": {
        "main": [
          [
            {
              "node": "Merge28",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge35": {
        "main": [
          [
            {
              "node": "Merge38",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge12": {
        "main": [
          [
            {
              "node": "Merge15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_2.2_AgrupacionLinkedProduct_Margenmetricgrupo": {
        "main": [
          [
            {
              "node": "Merge12",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge38": {
        "main": [
          [
            {
              "node": "Merge40",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook3": {
        "main": [
          [
            {
              "node": "fecha proceso3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge11": {
        "main": [
          [
            {
              "node": "Merge12",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches1": {
        "main": [
          [
            {
              "node": "Wait2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request1": {
        "main": [
          [
            {
              "node": "SplitInBatches1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso3": {
        "main": [
          [
            {
              "node": "Merge2",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge2": {
        "main": [
          [
            {
              "node": "A_2.2_AgrupacionLinkedProduct_Margenmetricgrupo",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_2.1_AgrupacionGrupoBeneficiarios_Margenmetricgrupo",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_2_AgrupacionGrupo_Margenmetricgrupo",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge15",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge15": {
        "main": [
          [
            {
              "node": "3_crecimientoAnual_dicAnt-Act1",
              "type": "main",
              "index": 0
            },
            {
              "node": "5_Promedio7m1",
              "type": "main",
              "index": 0
            },
            {
              "node": "2_Promedio6m1",
              "type": "main",
              "index": 0
            },
            {
              "node": "1_Promedio3m1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge40",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge40": {
        "main": [
          [
            {
              "node": "4_Reciprocidad1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge29",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "A_4_AgrupacionSegmento_Margenmetricsegmento": {
        "main": [
          [
            {
              "node": "Merge24",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_4.1_AgrupacionSegmentoBeneficiarios_Margenmetricsegmento": {
        "main": [
          [
            {
              "node": "Merge24",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge32": {
        "main": [
          [
            {
              "node": "Merge34",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge33": {
        "main": [
          [
            {
              "node": "Merge19",
              "type": "main",
              "index": 1
            },
            {
              "node": "updated_operation4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "1_Promedio3m3": {
        "main": [
          [
            {
              "node": "Merge23",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "2_Promedio6m3": {
        "main": [
          [
            {
              "node": "Merge23",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "3_crecimientoAnual_dicAnt-Act3": {
        "main": [
          [
            {
              "node": "Merge32",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "4_Reciprocidad3": {
        "main": [
          [
            {
              "node": "Merge33",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "5_Promedio7m3": {
        "main": [
          [
            {
              "node": "Merge32",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_4.2_AgrupacionLinekedProduct_Margenmetricsegmento": {
        "main": [
          [
            {
              "node": "Merge25",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Webhook4": {
        "main": [
          [
            {
              "node": "fecha proceso4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge23": {
        "main": [
          [
            {
              "node": "Merge34",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches2": {
        "main": [
          [
            {
              "node": "Wait1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request2": {
        "main": [
          [
            {
              "node": "SplitInBatches2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso4": {
        "main": [
          [
            {
              "node": "Merge8",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge8": {
        "main": [
          [
            {
              "node": "A_4.2_AgrupacionLinekedProduct_Margenmetricsegmento",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_4.1_AgrupacionSegmentoBeneficiarios_Margenmetricsegmento",
              "type": "main",
              "index": 0
            },
            {
              "node": "A_4_AgrupacionSegmento_Margenmetricsegmento",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge26",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge24": {
        "main": [
          [
            {
              "node": "Merge25",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge25": {
        "main": [
          [
            {
              "node": "Merge26",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge26": {
        "main": [
          [
            {
              "node": "3_crecimientoAnual_dicAnt-Act3",
              "type": "main",
              "index": 0
            },
            {
              "node": "5_Promedio7m3",
              "type": "main",
              "index": 0
            },
            {
              "node": "2_Promedio6m3",
              "type": "main",
              "index": 0
            },
            {
              "node": "1_Promedio3m3",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge37",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge34": {
        "main": [
          [
            {
              "node": "Merge37",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge37": {
        "main": [
          [
            {
              "node": "Merge33",
              "type": "main",
              "index": 1
            },
            {
              "node": "4_Reciprocidad3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches3": {
        "main": [
          [
            {
              "node": "Wait3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request3": {
        "main": [
          [
            {
              "node": "SplitInBatches3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge9": {
        "main": [
          [
            {
              "node": "HTTP Request4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge17": {
        "main": [
          [
            {
              "node": "HTTP Request5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge19": {
        "main": [
          [
            {
              "node": "HTTP Request6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge20": {
        "main": [
          [
            {
              "node": "HTTP Request7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge21": {
        "main": [
          [
            {
              "node": "bring_dates",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation": {
        "main": [
          [
            {
              "node": "Merge21",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "bring_dates": {
        "main": [
          [
            {
              "node": "SplitInBatches1",
              "type": "main",
              "index": 0
            },
            {
              "node": "SplitInBatches3",
              "type": "main",
              "index": 0
            },
            {
              "node": "SplitInBatches2",
              "type": "main",
              "index": 0
            },
            {
              "node": "SplitInBatches",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation": {
        "main": [
          [
            {
              "node": "Merge",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "updated_operation": {
        "main": [
          [
            {
              "node": "Merge9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation2": {
        "main": [
          [
            {
              "node": "Merge2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "updated_operation2": {
        "main": [
          [
            {
              "node": "Merge17",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation4": {
        "main": [
          [
            {
              "node": "Merge8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation6": {
        "main": [
          [
            {
              "node": "Merge1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "updated_operation4": {
        "main": [
          [
            {
              "node": "Merge19",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "updated_operation6": {
        "main": [
          [
            {
              "node": "Merge20",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches4": {
        "main": [
          [
            {
              "node": "HTTP Request10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "bring_collections": {
        "main": [
          [
            {
              "node": "SplitInBatches4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook": {
        "main": [
          [
            {
              "node": "fecha proceso5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso5": {
        "main": [
          [
            {
              "node": "borrado_segmentacion1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request10": {
        "main": [
          [
            {
              "node": "SplitInBatches4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches5": {
        "main": [
          [
            {
              "node": "HTTP Request11",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "bring_collections1": {
        "main": [
          [
            {
              "node": "SplitInBatches5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso6": {
        "main": [
          [
            {
              "node": "borrado_segmentacion",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "HTTP Request11": {
        "main": [
          [
            {
              "node": "SplitInBatches5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook6": {
        "main": [
          [
            {
              "node": "fecha proceso6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso8": {
        "main": [
          [
            {
              "node": "borrado_segmentacion3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso9": {
        "main": [
          [
            {
              "node": "borrado_segmentacion4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook7": {
        "main": [
          [
            {
              "node": "fecha proceso8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook8": {
        "main": [
          [
            {
              "node": "fecha proceso9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fecha proceso10": {
        "main": [
          [
            {
              "node": "borrado_ sidis_margen",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook9": {
        "main": [
          [
            {
              "node": "fecha proceso10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait": {
        "main": [
          [
            {
              "node": "HTTP Request",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait1": {
        "main": [
          [
            {
              "node": "HTTP Request2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait2": {
        "main": [
          [
            {
              "node": "HTTP Request1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait3": {
        "main": [
          [
            {
              "node": "HTTP Request3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }