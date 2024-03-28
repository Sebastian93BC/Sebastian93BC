{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "ff0549c3-5b2a-406b-bce4-e7895fb94b58",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -1220,
          460
        ],
        "disabled": true
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "E3_PROCESAMIENTO_INDICADORES",
          "options": {}
        },
        "id": "21b3fed9-b6d4-4cf6-ae79-8bba106b271a",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -740,
          840
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f",
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\":  \"{{$json.processDate}}\"\n          }\n        ]\n      }, \n      \"persona\": \"Natural\", \n      \"origenSegmentacion\": true\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"banca\": \"$nombreBanca\", \n        \"segmento\": \"$nombreSegmento\", \n        \"subsegmento\": \"$nombreSubsegmento\", \n        \"nivel_socioecon\": \"$nombreNSE\", \n        \"generacion\": \"$generacion\", \n        \"sexo\": \"$sexo\", \n        \"state\": \"$state\", \n        \"nombreRegion\": \"$regionName\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"cantidadClientesActivos\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$clienteActivo\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$_id\", \"$$ROOT\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"integrationIds\": {\n        \"margen\": \"$_id\"\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"banca\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"banca\": {\n            \"$ne\": null\n          }\n        }, {\n          \"banca\": {\n            \"$ne\": 0\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": 0\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": null\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": null\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": \"NDA\"\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": \"\"\n          }\n        }\n      ]\n    }\n  }, {\n    \"$out\": \"Margenmetricsegmentnatural\"\n  }\n]"
        },
        "id": "4fd66b7a-d9fd-46d9-8023-c94f488ec189",
        "name": "A_6_AgrupacionMSN_Margenmetricsegmentnatural",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1760,
          1540
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }, \n      \"persona\": \"Jurídica\", \n      \"origenSegmentacion\": true\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"banca\": \"$nombreBanca\", \n        \"segmento\": \"$nombreSegmento\", \n        \"subsegmento\": \"$nombreSubsegmento\", \n        \"state\": \"$state\", \n        \"nombreRegion\": \"$regionName\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"cantidadClientesActivos\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$clienteActivo\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$_id\", \"$$ROOT\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"integrationIds\": {\n        \"margen\": \"$_id\"\n      }, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"banca\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"banca\": {\n            \"$ne\": null\n          }\n        }, {\n          \"banca\": {\n            \"$ne\": 0\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": 0\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"segmento\": {\n            \"$ne\": null\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": null\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": \"NDA\"\n          }\n        }, {\n          \"subsegmento\": {\n            \"$ne\": \"\"\n          }\n        }\n      ]\n    }\n  }, {\n    \"$out\": \"Margenmetricsegmentjuridico\"\n  }\n]"
        },
        "id": "d9a724ce-21df-4b30-8af1-e9a8295e8c74",
        "name": "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1740,
          1960
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
          "collection": "Margenmetricsegmentnatural",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"segmento\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$segmento\", \"PYMES I (PEQUE�A INDUSTRIA)\"\n                ]\n              }, \n              \"then\": \"PYMES I (PEQUEÑA INDUSTRIA)\"\n            }\n          ], \n          \"default\": \"$segmento\"\n        }\n      }, \n      \"subsegmento\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$subsegmento\", \"PYMES I (PEQUE�A INDUSTRIA)\"\n                ]\n              }, \n              \"then\": \"PYMES I (PEQUEÑA INDUSTRIA)\"\n            }\n          ], \n          \"default\": \"$subsegmento\"\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmentnatural\", \n      \"on\": \"_id\"\n    }\n  }\n]"
        },
        "id": "c3b7addf-c8d2-4e18-be00-17d93e942d57",
        "name": "A_6.1_Parche_Ñ_Margenmetricsegmentnatural",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1960,
          1540
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
          "collection": "Margenmetricsegmentnatural",
          "query": "=[\n  {\n    \"$addFields\": {\n      \"stateOriginal\": \"$state\", \n      \"state\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$state\", \"DEPENDENCIAS FE\"\n                ]\n              }, \n              \"then\": \"DEPENDENCIAS FEDERALES\"\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$state\", \"DISTRITO CAPITA\"\n                ]\n              }, \n              \"then\": \"DISTRITO CAPITAL\"\n            }\n          ], \n          \"default\": \"$state\"\n        }\n      }\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_estados\", \n      \"localField\": \"state\", \n      \"foreignField\": \"state\", \n      \"as\": \"result\"\n    }\n  }, {\n    \"$addFields\": {\n      \"codState\": {\n        \"$first\": \"$result.id\"\n      }, \n      \"result\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetricsegmentnatural\", \n      \"on\": \"_id\"\n    }\n  }\n]"
        },
        "id": "341a1488-69bf-47af-a2ab-2e4e7a63feac",
        "name": "A_6.2_CodState_Margenmetricsegmentnatural",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2160,
          1540
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
          "collection": "Margenmetricsegmentjuridico",
          "query": "=  [\n    {\n      \"$addFields\": {\n        \"segmento\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"$segmento\", \"PYMES I (PEQUE�A INDUSTRIA)\"\n                  ]\n                }, \n                \"then\": \"PYMES I (PEQUEÑA INDUSTRIA)\"\n              }\n            ], \n            \"default\": \"$segmento\"\n          }\n        }, \n        \"subsegmento\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"$subsegmento\", \"PYMES I (PEQUE�A INDUSTRIA)\"\n                  ]\n                }, \n                \"then\": \"PYMES I (PEQUEÑA INDUSTRIA)\"\n              }\n            ], \n            \"default\": \"$subsegmento\"\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"Margenmetricsegmentjuridico\", \n        \"on\": \"_id\"\n      }\n    }\n  ]"
        },
        "id": "fdbc654f-63d8-49e5-85ac-0eb5fa1d24cf",
        "name": "A_7.1_Parche_Ñ__Margenmetricsegmentjuridico",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1940,
          1960
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
          "collection": "Margenmetricsegmentjuridico",
          "query": "=  [\n    {\n      \"$addFields\": {\n        \"stateOriginal\": \"$state\", \n        \"state\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"$state\", \"DEPENDENCIAS FE\"\n                  ]\n                }, \n                \"then\": \"DEPENDENCIAS FEDERALES\"\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"$state\", \"DISTRITO CAPITA\"\n                  ]\n                }, \n                \"then\": \"DISTRITO CAPITAL\"\n              }\n            ], \n            \"default\": \"$state\"\n          }\n        }\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_estados\", \n        \"localField\": \"state\", \n        \"foreignField\": \"state\", \n        \"as\": \"result\"\n      }\n    }, {\n      \"$addFields\": {\n        \"codState\": {\n          \"$first\": \"$result.id\"\n        }, \n        \"result\": \"$$REMOVE\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"Margenmetricsegmentjuridico\", \n        \"on\": \"_id\"\n      }\n    }\n  ]"
        },
        "id": "15a677d7-4c40-4dfa-aaf4-0a54397ec2bb",
        "name": "A_7.2_CodState_Margenmetricsegmentjuridico",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2140,
          1960
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Procesamiento_Indicadores_Margen\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "3cfb8b0d-2a99-46a4-aa74-0cb2fe1ecadd",
        "name": "Code Body9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -600,
          840
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "7c387565-e8e6-42f5-9c30-5e58edb98898",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -280,
          820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "64fa16ed-13b9-49a8-bab0-cdf05aaa7b3c",
        "name": "Merge1",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          940,
          -40
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c5fbb96c-ce6d-442f-b66e-fdd8e9d8cc8a",
        "name": "Merge2",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1300,
          -60
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2938be1c-7875-4830-aafe-19aafe8a1ab3",
        "name": "Merge3",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1600,
          -80
        ]
      },
      {
        "parameters": {
          "content": "M_1_Indicadores_Margenmetric",
          "height": 347.40569063358305,
          "width": 1630.0480590789089
        },
        "id": "98c8a18b-f24f-40ae-a9f4-ce0881dc012b",
        "name": "Note5",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          140,
          -197.74656675694985
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"montoAbonado\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$abonoLiqActivo\", null\n            ]\n          }, {\n            \"$round\": [\n              {\n                \"$sum\": [\n                  \"$montoCreditoPasivo\", \"$depositosEfectivoDolares\"\n                ]\n              }, 4\n            ]\n          }, {\n            \"$round\": [\n              {\n                \"$subtract\": [\n                  {\n                    \"$sum\": [\n                      \"$montoCreditoPasivo\", \"$depositosEfectivoDolares\"\n                    ]\n                  }, \"$abonoLiqActivo\"\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"rifCedula\": 1, \n      \"fechaProceso\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "f6065b86-52d9-4f1d-9b43-529194acc8ea",
        "name": "M_1_Indicadores_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1120,
          -160
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
        "id": "fcb8d68f-1668-406c-b354-196948836e1f",
        "name": "Merge5",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1940,
          1280
        ]
      },
      {
        "parameters": {
          "content": "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric",
          "height": 340.68014285260585,
          "width": 1574.1851160822753
        },
        "id": "0a9a24ef-2d21-417a-9e08-2b79b25bf6cf",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1100,
          1140
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "41e92e12-1da3-49ff-823a-2da4d6009a2e",
        "name": "Merge7",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1580,
          1660
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "6c46a07b-ed7e-4814-b942-7eaac29c485a",
        "name": "Code2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1260,
          1680
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d42a2b00-4385-4cbd-9361-39d63578318e",
        "name": "Merge8",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2360,
          1640
        ]
      },
      {
        "parameters": {
          "content": "A_6_AgrupacionMSN_Margenmetricsegmentnatural",
          "height": 358.167237065229,
          "width": 1579.4185143477403
        },
        "id": "57533a33-3e70-4115-a60a-8843edf6967b",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1100,
          1520
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6b7898fe-31b7-4f57-8eb0-a7f3134e25a2",
        "name": "Merge10",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1560,
          2080
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "8c33d95b-6792-4594-bb23-b8ac5ad40e69",
        "name": "Code3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1260,
          2100
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4f1c9dcb-20c4-44b7-af5c-7f22c5766898",
        "name": "Merge11",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2340,
          2060
        ]
      },
      {
        "parameters": {
          "content": "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico",
          "height": 444.0297258941424,
          "width": 1577.837198551936
        },
        "id": "879dc5c6-0900-43d8-ad40-b5532d433d50",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1100,
          1900
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }, \n      \"origenSegmentacion\": true\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fecha\": \"$fechaProceso\", \n        \"nombreBanca\": \"$nombreBanca\", \n        \"nombreSegmento\": \"$nombreSegmento\", \n        \"nombreNSE\": \"$nombreNSE\", \n        \"persona\": \"$persona\"\n      }, \n      \"fecha\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": 1\n      }, \n      \"cantidadClientesActivos\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$clienteActivo\", true\n              ]\n            }, 1, 0\n          ]\n        }\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$clienteActivo\", true\n              ]\n            }, \"$saldoPasivo\", 0\n          ]\n        }\n      }, \n      \"montoCreditoPasivo\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$clienteActivo\", true\n              ]\n            }, \"$montoCreditoPasivo\", 0\n          ]\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoPasivo\": {\n        \"$round\": [\n          \"$saldoPasivo\", 0\n        ]\n      }, \n      \"montoCreditoPasivo\": {\n        \"$round\": [\n          \"$montoCreditoPasivo\", 0\n        ]\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$_id\", \"$$ROOT\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"nombreBanca\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"nombreBanca\": {\n            \"$ne\": null\n          }\n        }, {\n          \"nombreBanca\": {\n            \"$ne\": \"0\"\n          }\n        }, {\n          \"nombreSegmento\": {\n            \"$ne\": \"0\"\n          }\n        }, {\n          \"nombreSegmento\": {\n            \"$ne\": \"\"\n          }\n        }, {\n          \"nombreSegmento\": {\n            \"$ne\": null\n          }\n        }, {\n          \"persona\": {\n            \"$ne\": null\n          }\n        }, {\n          \"persona\": {\n            \"$ne\": \"NDA\"\n          }\n        }, {\n          \"persona\": {\n            \"$ne\": \"\"\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"nombreSegmento\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  \"$nombreSegmento\", \"PYMES I (PEQUE\\ufffdA INDUSTRIA)\"\n                ]\n              }, {\n                \"$eq\": [\n                  \"$nombreSegmento\", \"PYMES I (PEQUE¬A INDUSTRIA)\"\n                ]\n              }\n            ]\n          }, \"PYMES I (PEQUEÑA INDUSTRIA)\", \"$nombreSegmento\"\n        ]\n      }\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Parametricbancasegnse\", \n      \"let\": {\n        \"nombreBanca\": \"$nombreBanca\", \n        \"nombreSegmento\": \"$nombreSegmento\", \n        \"nombreNSE\": \"$nombreNSE\", \n        \"persona\": \"$persona\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$$nombreBanca\", \"$banca_old\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$$nombreSegmento\", \"$segmento_old\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$$nombreNSE\", \"$nivel_socioecon_old\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$$persona\", \"$persona_old\"\n                  ]\n                }\n              }\n            ]\n          }\n        }\n      ], \n      \"as\": \"Parametricbancasegnse\"\n    }\n  }, {\n    \"$addFields\": {\n      \"cond\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$Parametricbancasegnse\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"segmentacionAnt.nombreBanca\": \"$nombreBanca\", \n      \"segmentacionAnt.nombreSegmento\": \"$nombreSegmento\", \n      \"segmentacionAnt.nombreNSE\": \"$nombreNSE\", \n      \"segmentacionAnt.persona\": \"$persona\", \n      \"nombreBanca\": {\n        \"$cond\": [\n          \"$cond\", {\n            \"$first\": \"$Parametricbancasegnse.banca_new\"\n          }, \"$nombreBanca\"\n        ]\n      }, \n      \"nombreSegmento\": {\n        \"$cond\": [\n          \"$cond\", {\n            \"$first\": \"$Parametricbancasegnse.segmento_new\"\n          }, \"$nombreSegmento\"\n        ]\n      }, \n      \"nombreNSE\": {\n        \"$cond\": [\n          \"$cond\", {\n            \"$first\": \"$Parametricbancasegnse.nivel_socioecon_new\"\n          }, \"$nombreNSE\"\n        ]\n      }, \n      \"persona\": {\n        \"$cond\": [\n          \"$cond\", {\n            \"$first\": \"$Parametricbancasegnse.persona_new\"\n          }, \"$persona\"\n        ]\n      }, \n      \"Parametricbancasegnse\": \"$$REMOVE\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fecha\": \"$fecha\", \n        \"nombreBanca\": \"$nombreBanca\", \n        \"nombreSegmento\": \"$nombreSegmento\", \n        \"nombreNSE\": \"$nombreNSE\", \n        \"persona\": \"$persona\"\n      }, \n      \"cantidadClientes\": {\n        \"$sum\": \"$cantidadClientes\"\n      }, \n      \"cantidadClientesActivos\": {\n        \"$sum\": \"$cantidadClientesActivos\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"montoCreditoPasivo\": {\n        \"$sum\": \"$montoCreditoPasivo\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"fecha\": \"$_id.fecha\", \n      \"nombreBanca\": \"$_id.nombreBanca\", \n      \"nombreSegmento\": \"$_id.nombreSegmento\", \n      \"nombreNSE\": \"$_id.nombreNSE\", \n      \"persona\": \"$_id.persona\", \n      \"cantidadClientes\": 1, \n      \"cantidadClientesActivos\": 1, \n      \"saldoPasivo\": 1, \n      \"montoCreditoPasivo\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margengeneralmetric\", \n      \"on\": [\n        \"fecha\", \"nombreBanca\", \"nombreSegmento\", \"nombreNSE\", \"persona\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "d5a68361-446b-4e03-83ed-fb98cb8c4afb",
        "name": "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1760,
          1180
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
        "id": "e376d505-7c0f-4dc7-954e-347c7ea889d2",
        "name": "Merge16",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2680,
          -1160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6878cb38-f69a-4411-ae51-e708f3ea0e59",
        "name": "Merge17",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          -1180
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProceso\", {\n                \"$dateAdd\": {\n                  \"startDate\": {\n                    \"$toDate\": \"{{$json.processDate}}\"\n                  }, \n                  \"unit\": \"month\", \n                  \"amount\": -5\n                }\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"rifCedula\": {\n        \"$first\": \"$rifCedula\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"saldoDolar6m\": {\n        \"$sum\": \"$saldoDolar\"\n      }, \n      \"saldoEuro6m\": {\n        \"$sum\": \"$saldoEuro\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"saldoDolarProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoDolar6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"saldoEuroProm6m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$saldoEuro6m\", 6\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\", \n      \"saldoDolar6m\": \"$$REMOVE\", \n      \"saldoEuro6m\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ]\n    }\n  }\n]"
        },
        "id": "02619665-729b-4d09-9a7a-1c616e20eb24",
        "name": "M_2_saldosPromedio6m_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2840,
          -1280
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProceso\", {\n                \"$dateSubtract\": {\n                  \"startDate\": {\n                    \"$toDate\": \"{{$json.processDate}}\"\n                  }, \n                  \"unit\": \"month\", \n                  \"amount\": 12\n                }\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumAAbonoLiqActivo\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"sumAMontoAbonado\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "12b7663d-fc37-4b54-82f7-cc230714af16",
        "name": "M_3_SumaAnual13m_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2880,
          -940
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$concat\": [\n                      \"31-12-\", {\n                        \"$toString\": {\n                          \"$subtract\": [\n                            {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.processDate}}\"\n                              }\n                            }, 1\n                          ]\n                        }\n                      }\n                    ]\n                  }, \n                  \"format\": \"%d-%m-%Y\"\n                }\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"rifCedula\": 1, \n      \"fechaProceso\": 1, \n      \"fechaProcesoDic\": {\n        \"$dateFromString\": {\n          \"dateString\": {\n            \"$concat\": [\n              \"31-12-\", {\n                \"$toString\": {\n                  \"$subtract\": [\n                    {\n                      \"$year\": {\n                        \"$toDate\": \"{{$json.processDate}}\"\n                      }\n                    }, 1\n                  ]\n                }\n              }\n            ]\n          }, \n          \"format\": \"%d-%m-%Y\"\n        }\n      }, \n      \"saldoActivo\": 1, \n      \"abonoLiqActivo\": 1, \n      \"montoAbonado\": 1, \n      \"promedioPasivo\": 1\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$rifCedula\", \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"val\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }, \n      \"valDic\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"doc\", \n          \"cond\": {\n            \"$ne\": [\n              \"$$doc.fechaProceso\", \"$fechaProceso\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"rifCedula\": \"$_id\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"_id\": \"$$REMOVE\", \n      \"creASaldoActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.saldoActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.saldoActivo\"\n                          }, {\n                            \"$first\": \"$valDic.saldoActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.saldoActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAAbonoLiqActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.abonoLiqActivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.abonoLiqActivo\"\n                          }, {\n                            \"$first\": \"$valDic.abonoLiqActivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.abonoLiqActivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAMontoAbonado\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.montoAbonado\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.montoAbonado\"\n                          }, {\n                            \"$first\": \"$valDic.montoAbonado\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.montoAbonado\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }, \n      \"creAPromedioPasivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, 0\n                ]\n              }, {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$valDic.promedioPasivo\"\n                  }, null\n                ]\n              }\n            ]\n          }, 0, {\n            \"$round\": [\n              {\n                \"$multiply\": [\n                  {\n                    \"$divide\": [\n                      {\n                        \"$subtract\": [\n                          {\n                            \"$first\": \"$val.promedioPasivo\"\n                          }, {\n                            \"$first\": \"$valDic.promedioPasivo\"\n                          }\n                        ]\n                      }, {\n                        \"$first\": \"$valDic.promedioPasivo\"\n                      }\n                    ]\n                  }, 100\n                ]\n              }, 4\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "c5269b48-ce0d-4e60-9496-7cf4d905376c",
        "name": "M_4_CrecimientoAnual_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2900,
          -560
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProceso\", {\n                \"$dateAdd\": {\n                  \"startDate\": {\n                    \"$toDate\": \"{{$json.processDate}}\"\n                  }, \n                  \"unit\": \"month\", \n                  \"amount\": -2\n                }\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"rifCedula\": {\n        \"$first\": \"$rifCedula\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"montoAbonado3m\": {\n        \"$sum\": \"$montoAbonado\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"montoAbonadoProm3m\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$montoAbonado3m\", 3\n            ]\n          }, 4\n        ]\n      }, \n      \"rifCedula\": \"$rifCedula\", \n      \"_id\": \"$$REMOVE\", \n      \"montoAbonado3m\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ]\n    }\n  }\n]"
        },
        "id": "d83eeb7c-d1f8-434c-bd94-7b9ed32311a5",
        "name": "M_5_saldosPromedio3m_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2880,
          -240
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"reciprocidadGeneral\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  \"$montoAbonadoProm3m\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$lte\": [\n                  \"$saldoActivo\", null\n                ]\n              }, \n              \"then\": 0\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$saldoActivo\", 0\n                ]\n              }, \n              \"then\": 0\n            }\n          ], \n          \"default\": {\n            \"$round\": [\n              {\n                \"$divide\": [\n                  \"$montoAbonadoProm3m\", \"$saldoActivo\"\n                ]\n              }, 4\n            ]\n          }\n        }\n      }, \n      \"fechaProceso\": 1, \n      \"rifCedula\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ]\n    }\n  }\n]"
        },
        "id": "62bdcf09-5866-48c7-be3f-ecb538ca9ea9",
        "name": "M_6_Reciprocicad_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3900,
          -300
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
          "collection": "sidis_margen",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"mcl_naturaleza_producto\": {\n            \"$in\": [\n              1, \"1\"\n            ]\n          }\n        }, {\n          \"mcl_producto\": {\n            \"$in\": [\n              9501, 9502, 9509, 9506, \"9501\", \"9502\", \"9509\", \"9506\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$mcl_fecha_proceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"tarjeta\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$in\": [\n                    \"$mcl_bin_tarjeta\", [\n                      \"455612\", \"455613\", \"455615\", \"448174\", \"459347\", \"462229\", \"455614\"\n                    ]\n                  ]\n                }, \n                \"then\": \"VISA\"\n              }, {\n                \"case\": {\n                  \"$in\": [\n                    \"$mcl_bin_tarjeta\", [\n                      \"542037\", \"540019\", \"546690\", \"552292\"\n                    ]\n                  ]\n                }, \n                \"then\": \"MASTERCARD\"\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"$mcl_bin_tarjeta\", \"540145\"\n                  ]\n                }, \n                \"then\": \"MASTERCARD_PRE\"\n              }\n            ], \n            \"default\": \"OTRO\"\n          }\n        }, \n        \"rifCedula\": \"$mcl_rif_cedula\", \n        \"nroTarjetas\": {\n          \"$substr\": [\n            \"$mcl_documento_asociado\", 4, 16\n          ]\n        }, \n        \"fechaProceso\": \"$mcl_fecha_proceso\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$mcl_fecha_proceso\"\n      }, \n      \"rifCedula\": {\n        \"$first\": \"$mcl_rif_cedula\"\n      }, \n      \"nombreCliente\": {\n        \"$first\": \"$mcl_nombre_cliente\"\n      }, \n      \"nroTarjeta\": {\n        \"$first\": {\n          \"$substr\": [\n            \"$mcl_documento_asociado\", 4, 16\n          ]\n        }\n      }, \n      \"binTarjeta\": {\n        \"$first\": \"$mcl_bin_tarjeta\"\n      }, \n      \"limiteCredito\": {\n        \"$max\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$mcl_limite_credito\", \"$tasa_dolar\"\n              ]\n            }, 4\n          ]\n        }\n      }, \n      \"limiteCreditoBs\": {\n        \"$max\": {\n          \"$round\": [\n            \"$mcl_limite_credito\", 4\n          ]\n        }\n      }, \n      \"saldo\": {\n        \"$sum\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$mcl_saldo\", \"$tasa_dolar\"\n              ]\n            }, 4\n          ]\n        }\n      }, \n      \"saldoBs\": {\n        \"$sum\": {\n          \"$round\": [\n            \"$mcl_saldo\", 4\n          ]\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"rifCedula\": 1, \n      \"fechaProceso\": 1, \n      \"credictCards.cardType\": \"$_id.tarjeta\", \n      \"credictCards.balance\": \"$saldo\", \n      \"credictCards.limit\": \"$limiteCredito\", \n      \"credictCards.cardNumber\": \"$nroTarjeta\", \n      \"credictCards.cardNumMask\": {\n        \"$concat\": [\n          {\n            \"$substrCP\": [\n              \"$nroTarjeta\", 0, 4\n            ]\n          }, \"-\", {\n            \"$substrCP\": [\n              \"$nroTarjeta\", 4, 2\n            ]\n          }, \"xx-xxxx-\", {\n            \"$substrCP\": [\n              \"$nroTarjeta\", 12, 16\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"fechaProceso\": {\n        \"$first\": \"$fechaProceso\"\n      }, \n      \"rifCedula\": {\n        \"$first\": \"$rifCedula\"\n      }, \n      \"credictCards\": {\n        \"$push\": \"$credictCards\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "77af4c48-43ff-444e-a7ac-c3b07d2c6265",
        "name": "M_7_tarjetaCredito_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2880,
          80
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
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "=2024-01-31"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "2a41b262-1532-4c73-9e45-e63be0a22e61",
        "name": "HTTP Request16",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -940,
          840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gte\": [\n              \"$fechaProceso\", {\n                \"$dateSubtract\": {\n                  \"startDate\": {\n                    \"$toDate\": \"{{$json.processDate}}\"\n                  }, \n                  \"unit\": \"month\", \n                  \"amount\": 11\n                }\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"fechaProceso\": {\n        \"$max\": \"$fechaProceso\"\n      }, \n      \"sumAbonoLiqActivo12M\": {\n        \"$sum\": \"$abonoLiqActivo\"\n      }, \n      \"sumMontoAbonado12M\": {\n        \"$sum\": \"$montoAbonado\"\n      }, \n      \"sumSaldoPromedio12M\": {\n        \"$sum\": \"$promedioPasivo\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"_id\": \"$$REMOVE\", \n      \"saldoPromedio12M\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              \"$sumSaldoPromedio12M\", 12\n            ]\n          }, 4\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "26eef445-f6f1-4140-812b-743c7e211994",
        "name": "M_8_SumaAnual12m_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2920,
          400
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
          "collection": "sidis_margen",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$mcl_fecha_proceso\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }, \n      \"mcl_banca\": {\n        \"$nin\": [\n          \"0\", \"4\", \"5\", 0, 4, 5\n        ]\n      }, \n      \"sidisProducto.prd_codigo_producto\": {\n        \"$in\": [\n          1117, 1140, 1106, 1136, 1406, 200, 1111, 1197, 1404, 100, 819, 805, 1133, 113, 198, 1414, 1405, 1408, 1122, 108, 9502, 9501, 101, 1407, 9506, 1190, 1114, 1330, 1170, 197, 210, 1310, 1112, 1410, 106, 1160, 1401, 1121, 1360, 381, 1350, 280, 1316, 2701, 1390, 2601, 329, 1320, 107, 208, 1380, 1152, 1134, 5329, 2501, 325, 316, 1315, 851, 1340, 1123, 120, 313, 1264, 203, 1341, 861, 2401, 211, 2402, 852, 809, 196, 202, 324, 1131, 206, 853, 311, 860, 808, 201, 1416, 858, 205, 530, 2608, 364, 2502, 1105, 9509, 315, 730, 308, 1104, 1113, 1268, 2603, 2702, 2703, 301, 333, 906, 1115, 1150, 1262, 1415, 2503, 2607, 2704, 2705, 102, 103, 104, 105, 109, 110, 111, 112, 199, 204, 207, 209, 215, 300, 302, 303, 304, 305, 306, 307, 309, 310, 312, 314, 317, 318, 319, 320, 321, 322, 323, 326, 327, 328, 330, 331, 332, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 383, 386, 388, 393, 394, 395, 396, 397, 398, 399, 401, 402, 404, 410, 412, 414, 416, 511, 512, 520, 521, 522, 526, 527, 529, 532, 534, 535, 550, 556, 558, 559, 561, 563, 570, 571, 572, 595, 600, 601, 602, 603, 604, 605, 607, 608, 609, 610, 611, 612, 699, 700, 701, 703, 731, 800, 801, 802, 803, 804, 806, 807, 810, 811, 812, 813, 814, 815, 816, 817, 818, 820, 821, 822, 823, 824, 825, 826, 827, 854, 855, 856, 857, 859, 887, 899, 902, 904, 905, 907, 908, 909, 910, 911, 912, 1101, 1103, 1107, 1108, 1109, 1110, 1116, 1118, 1119, 1120, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1132, 1135, 1141, 1142, 1180, 1191, 1192, 1199, 1261, 1263, 1265, 1266, 1267, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1277, 1278, 1279, 1280, 1301, 1307, 1317, 1322, 1323, 1324, 1400, 1402, 1403, 1501, 1502, 1503, 1506, 1507, 1508, 2064, 2070, 2071, 2100, 2101, 2102, 2200, 2201, 2202, 2300, 2301, 2302, 2324, 2403, 2504, 2606, 2609, 3300, 3301, 3302, 3384, 3385, 3394, 3395, 3404, 3405, 4301, 4302, 4304, 4305, 4308, 4309, 4311, 4312, 4313, 4314, 4315, 4316, 4320, 4321, 4323, 4324, 4325, 4328, 4329, 4333, 4334, 4364, 4383, 8887, 8888, 8890, 8891, 9503, 9504, 9507, 9508, 9510, 9998\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"rifCedula\": \"$mcl_rif_cedula\", \n      \"fechaProceso\": \"$mcl_fecha_proceso\", \n      \"productName\": \"$sidisProducto.prd_nombre_producto\", \n      \"productCode\": \"$sidisProducto.prd_codigo_producto\", \n      \"_id\": 0\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"relatedProducts\": {\n        \"$addToSet\": {\n          \"name\": \"$productName\", \n          \"lastUse\": \"$fechaProceso\", \n          \"code\": \"$productCode\", \n          \"active\": {\n            \"$cond\": [\n              {\n                \"$in\": [\n                  \"$productCode\", [\n                    1117, 1140, 1106, 1136, 1406, 200, 1111, 1197, 1404, 100, 819, 805, 1133, 113, 198, 1414, 1405, 1408, 1122, 108, 9502, 9501, 101, 1407, 9506, 1190, 1114, 1330, 1170, 197, 210, 1310, 1112, 1410, 106, 1160, 1401, 1121, 1360, 381, 1350, 280, 1316, 2701, 1390, 2601, 329, 1320, 107, 208, 1380, 1152, 1134, 5329, 2501, 325, 316, 1315, 851, 1340, 1123, 120, 313, 1264, 203, 1341, 861, 2401, 211, 2402, 852, 809, 196, 202, 324, 1131, 206, 853, 311, 860, 808, 201, 1416, 858, 205, 530, 2608, 364, 2502, 1105, 9509, 315, 730, 308, 1104, 1113, 1268, 2603, 2702, 2703, 301, 333, 906, 1115, 1150, 1262, 1415, 2503, 2607, 2704, 2705\n                  ]\n                ]\n              }, true, false\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "b92691a7-6520-4c62-84e2-4d290385734b",
        "name": "M_9_relatedProducts_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2920,
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
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "490dd7c7-d244-43f5-b477-7c2f5afbfc1f",
        "name": "create_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -440,
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
          "content": "Activa las etapas 2 y 3",
          "height": 2346.5356190318525,
          "width": 383.95697315941254
        },
        "id": "ea86342b-cc54-43f8-9d99-0b6a22221a35",
        "name": "Note4",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1840,
          -1293.1047887679142
        ]
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "cae644c2-cc40-460c-8107-fe66b1fb3bd9",
        "name": "Wait19",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          160,
          -20
        ],
        "webhookId": "a76e53b6-58fa-48cf-b5d0-5f505cd9975a"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_1_Indicadores_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "5a658454-5df1-4174-af9c-61e66f942342",
        "name": "Code12",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          640,
          -20
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/13d80ae6-1a00-4381-97a0-d8bc1a8d128a",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "a01d6d06-94d8-411e-9cf7-d4b3495f3771",
        "name": "HTTP Request4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          300,
          -20
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "13d80ae6-1a00-4381-97a0-d8bc1a8d128a",
          "options": {}
        },
        "id": "afe1bc70-f46c-4ac8-b27b-f9a9e6c7a1e6",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          500,
          -20
        ],
        "webhookId": "13d80ae6-1a00-4381-97a0-d8bc1a8d128a"
      },
      {
        "parameters": {
          "amount": 3,
          "unit": "seconds"
        },
        "id": "fb1bc08c-10af-454f-b87c-de5609bc09f7",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1920,
          -1160
        ],
        "webhookId": "38a992d2-c098-4efe-8357-bcd630af023f"
      },
      {
        "parameters": {
          "amount": 6,
          "unit": "seconds"
        },
        "id": "de5c6488-4589-4714-bf49-be39976ecddc",
        "name": "Wait1",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1920,
          -800
        ],
        "webhookId": "a2797217-ebb1-412e-a914-8f377329fc9c"
      },
      {
        "parameters": {
          "amount": 9,
          "unit": "seconds"
        },
        "id": "c9604bd4-c295-46ad-93fe-f91ab0610ac3",
        "name": "Wait2",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1900,
          -420
        ],
        "webhookId": "255accf8-c384-4200-910c-2d27ec494064"
      },
      {
        "parameters": {
          "amount": 12,
          "unit": "seconds"
        },
        "id": "b697857e-dc2d-417f-b365-505f86fb1027",
        "name": "Wait3",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1880,
          -80
        ],
        "webhookId": "083979f4-b690-4b6a-ae03-c90c43617745"
      },
      {
        "parameters": {
          "amount": 15,
          "unit": "seconds"
        },
        "id": "e878aa2a-4554-4897-8a7c-2765f1d362f4",
        "name": "Wait4",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1880,
          220
        ],
        "webhookId": "0403276a-df9e-484c-bbe7-139d8d9e1fcd"
      },
      {
        "parameters": {
          "amount": 18,
          "unit": "seconds"
        },
        "id": "22dd4acf-2e7b-453c-adb2-3e5d5dd03226",
        "name": "Wait5",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1900,
          540
        ],
        "webhookId": "e07c77d2-dfef-43e1-b6aa-035262119065"
      },
      {
        "parameters": {
          "amount": 21,
          "unit": "seconds"
        },
        "id": "5dd84dda-2b2a-4a85-a5f0-f2d03358a84c",
        "name": "Wait6",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1920,
          860
        ],
        "webhookId": "5e060a0a-6c83-40c5-b876-4e8f4f1de1a4"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "6f59373b-41a5-43d0-86a1-e681e95c15ee",
        "name": "StartOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          780,
          -120
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "cadc6216-28ea-44d4-8be2-e59fe92b522c",
        "name": "UpdatedOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1460,
          -160
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
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_2_saldosPromedio6m_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "1b8bb7b2-4be1-492d-b822-158492384138",
        "name": "Code13",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2400,
          -1140
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "f962caa9-61ff-4345-b6d4-7a98fd1350f8",
        "name": "StartOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
          -1240
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "a9670189-73e6-4f24-b741-78e2104237bf",
        "name": "UpdatedOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3180,
          -1280
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
        "id": "571c94a3-b584-4e42-9516-a4ac4cc36e44",
        "name": "Merge18",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3340,
          -1200
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "96058657-aa7a-465e-81c8-af1f07392e50",
        "name": "Merge19",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          -820
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_3_SumaAnual13m_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "a44d70d9-46f1-4247-85cd-cdb6bb4079ce",
        "name": "Code14",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2400,
          -800
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "0cb804b4-a216-4546-b6ee-42e742b0bad0",
        "name": "StartOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2560,
          -900
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
        "id": "70e83eb0-b40b-4530-87f1-2dc4c3e2705c",
        "name": "Merge20",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2720,
          -440
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_4_CrecimientoAnual_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "7cd1369e-7c7e-4ab4-9646-92201fa6b75a",
        "name": "Code15",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2440,
          -420
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "3635e5e7-ecb8-47f1-a7d5-26d1e00a98aa",
        "name": "StartOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2580,
          -520
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
        "id": "57082dba-58d0-45fa-953c-925c4f6a3c9b",
        "name": "Merge21",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2720,
          -120
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_5_saldosPromedio3m_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "e6a768b8-d674-421f-b35f-e4de92b48aec",
        "name": "Code16",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2440,
          -100
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "ec53e819-8aff-4647-aae9-64021cd3ce7a",
        "name": "StartOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2580,
          -200
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
        "id": "69c09300-44cd-4267-a02e-dc4a3cd7c668",
        "name": "Merge22",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2720,
          200
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_7_tarjetaCredito_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "74e0b959-1a81-45de-bf8c-598c196b668e",
        "name": "Code17",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2440,
          220
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "20b270ac-9d9c-450f-a79d-b82d12051502",
        "name": "StartOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2580,
          120
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
        "id": "d8b6ac2e-2839-4606-85a4-33b0c7ccce71",
        "name": "Merge23",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2740,
          520
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_8_SumaAnual12m_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "65996b93-184f-4602-85a9-03f840cb4d7b",
        "name": "Code18",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2460,
          540
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2e043fcd-4402-4b64-b9eb-7125688d68c9",
        "name": "StartOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2600,
          440
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
        "id": "92f75308-5456-4b5b-a847-f854abb55022",
        "name": "Merge24",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2760,
          840
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_9_relatedProducts_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "131bf173-b233-4a5a-b773-3758c3186686",
        "name": "Code19",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2460,
          860
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d5718dd7-2f24-427d-aef3-745f98479c1a",
        "name": "StartOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2620,
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
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"M_6_Reciprocicad_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "3c585027-9f78-4657-8271-21ff6da5b26b",
        "name": "Code20",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          3460,
          -160
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5a2f4f92-2507-487e-94aa-90454a23d068",
        "name": "StartOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3600,
          -280
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
        "id": "ca209d02-7ebf-4406-9012-eae29645917b",
        "name": "Merge25",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3740,
          -180
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/0b3d2e90-1dcd-47c7-9752-c6d60e505357",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "6b729832-4f59-4671-8448-e070e075ab66",
        "name": "HTTP Request7",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2080,
          -1160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/625c16a2-b87b-44ad-bcb7-dca6322dfd0a",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "72882880-170c-4b4d-9363-25735f96da50",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2080,
          -800
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/d3c8b8c2-0256-49e6-84ab-7c5a8fce3583",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "9d86955c-90c2-4721-94d7-3b402792350a",
        "name": "HTTP Request1",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2080,
          -420
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/1a598cec-ac96-4eff-acfe-7f9b7d1d93a6",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "73cdfa14-b523-450f-8f0d-16323855acc3",
        "name": "HTTP Request2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2060,
          -80
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/0d5b438c-ac59-4eff-a8c4-f05ead223298",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "c873ba87-1ce4-400f-a057-42980b6ce498",
        "name": "HTTP Request3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2080,
          220
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/31fde8e0-a161-4377-96b8-0d723a4f50e3",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "238601d6-c31d-4386-97e7-d33842c8468f",
        "name": "HTTP Request5",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2100,
          540
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/42aa6cdd-5cb7-491e-90d2-b7f50e765d9a",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "954dcafd-9204-4b8d-a85b-4b0c62b3f172",
        "name": "HTTP Request6",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2100,
          860
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6f4dda50-5b42-49b9-8213-d31a6372fe6e",
        "name": "Merge26",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3060,
          -840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "8f45a5b7-045e-4828-892c-fbfcfa7eaac0",
        "name": "UpdatedOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          -940
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
        "id": "789843f8-dbb0-4ab9-ac5d-0e12b03bd269",
        "name": "Merge27",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3380,
          -860
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "7d7a3fa4-30b4-43d9-a126-53fa5f174b6f",
        "name": "Merge28",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3080,
          -460
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "847013eb-8f47-4a25-a700-80eddb4fe162",
        "name": "UpdatedOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
          -560
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
        "id": "0551e0b2-a019-4ef3-93ed-12a4cbbf9687",
        "name": "Merge29",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3380,
          -480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c0db55e0-d136-4ec5-b799-d464206e5ad9",
        "name": "Merge30",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          -140
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "b38216bf-768b-4931-ac1f-46618bc79749",
        "name": "UpdatedOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3160,
          -240
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
        "id": "49b9398b-3255-4d23-9af4-55569662e589",
        "name": "Merge31",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3320,
          -160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "25c74ede-70d0-46bb-9003-26a2d20f8fd9",
        "name": "Merge32",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4060,
          -200
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "050a9ddb-cc86-4e36-9b80-6edf32d012eb",
        "name": "UpdatedOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          4220,
          -300
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
        "id": "8d002074-a13a-45f5-b55e-a81a5584804f",
        "name": "Merge33",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4380,
          -220
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2a075212-ef64-45fd-8835-0c121e586da4",
        "name": "Merge34",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          180
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5e785c2b-ea44-4158-87c9-19b14eaca012",
        "name": "UpdatedOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3180,
          80
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
        "id": "00ea8979-d236-49bb-9be7-85d3fb83e609",
        "name": "Merge35",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3340,
          160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "3be01b1b-1f2c-4163-8d69-59f9e91fc62b",
        "name": "Merge36",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3080,
          500
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "870ce275-31da-4222-8b1e-2f5103685735",
        "name": "UpdatedOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3240,
          400
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
        "id": "f6a745b9-50a0-4591-8d9b-16ebee7d9e27",
        "name": "Merge37",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "36eced5c-06c4-4e21-aac6-8d5a344cda3d",
        "name": "Merge38",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3080,
          820
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "aacc5c3f-ed7b-4a6e-8bbc-1d61b2b534e1",
        "name": "UpdatedOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3240,
          720
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
        "id": "b17aa3dc-45e0-4bc2-bfcc-911f08b8e144",
        "name": "Merge39",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          800
        ]
      },
      {
        "parameters": {
          "content": "E3_MARGENMETRIC_ETAPA 2 Y 3\n",
          "height": 2356.303345345678,
          "width": 2520.577483739915
        },
        "id": "16cf3c59-7c90-4dc7-bb1f-7321d69464c7",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          2240,
          -1300.1124162067708
        ]
      },
      {
        "parameters": {
          "content": "E3_Procesamiento_Indicadores_Margen",
          "height": 2407.7461076367713,
          "width": 4721.5724090065405
        },
        "id": "e9b5ea8f-d08d-4ab5-8c5e-d1a889ee5dae",
        "name": "Note6",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          58.42759099345949,
          -1347.7461076367713
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "0b3d2e90-1dcd-47c7-9752-c6d60e505357",
          "options": {}
        },
        "id": "83708d4c-e6ed-4b7f-bc03-57f7c41b4e7b",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2260,
          -1140
        ],
        "webhookId": "0b3d2e90-1dcd-47c7-9752-c6d60e505357"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "625c16a2-b87b-44ad-bcb7-dca6322dfd0a",
          "options": {}
        },
        "id": "37c0cbd1-9cae-4104-aa5f-d5b3257ec03b",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2260,
          -800
        ],
        "webhookId": "625c16a2-b87b-44ad-bcb7-dca6322dfd0a"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "d3c8b8c2-0256-49e6-84ab-7c5a8fce3583",
          "options": {}
        },
        "id": "f3e84cce-3451-45c2-b0ff-826d6794ca97",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2280,
          -420
        ],
        "webhookId": "d3c8b8c2-0256-49e6-84ab-7c5a8fce3583"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "1a598cec-ac96-4eff-acfe-7f9b7d1d93a6",
          "options": {}
        },
        "id": "0e6c7df2-22f2-4a1c-b70b-be2442c3c548",
        "name": "Webhook5",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2280,
          -100
        ],
        "webhookId": "1a598cec-ac96-4eff-acfe-7f9b7d1d93a6"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "0d5b438c-ac59-4eff-a8c4-f05ead223298",
          "options": {}
        },
        "id": "e0528b4e-b68d-4322-ac31-a4802490cdbb",
        "name": "Webhook6",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2260,
          220
        ],
        "webhookId": "0d5b438c-ac59-4eff-a8c4-f05ead223298"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "31fde8e0-a161-4377-96b8-0d723a4f50e3",
          "options": {}
        },
        "id": "2d5466f8-5d2f-4f7b-b10f-1fa3789a2e6e",
        "name": "Webhook7",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2280,
          540
        ],
        "webhookId": "31fde8e0-a161-4377-96b8-0d723a4f50e3"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "42aa6cdd-5cb7-491e-90d2-b7f50e765d9a",
          "options": {}
        },
        "id": "6a32706b-882c-4011-8b2f-5a5eeea479f1",
        "name": "Webhook8",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2280,
          860
        ],
        "webhookId": "42aa6cdd-5cb7-491e-90d2-b7f50e765d9a"
      },
      {
        "parameters": {
          "amount": 21,
          "unit": "seconds"
        },
        "id": "48698ec7-383a-4b2f-8092-72c5e42b515d",
        "name": "Wait7",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          80,
          1700
        ],
        "webhookId": "5e060a0a-6c83-40c5-b876-4e8f4f1de1a4"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/25ccb0ef-5d64-4c05-8dca-85f24bdfccb8",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "7642a152-16e4-4bbf-b012-12fa0c69ed9a",
        "name": "HTTP Request8",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          240,
          1700
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "5385dec3-fe92-4536-8ab3-b761b0f7ce3c",
        "name": "Code21",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1280,
          1320
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "485d91eb-c39f-4494-a4ba-85b00bb8a68f",
        "name": "Merge6",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1580,
          1300
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d0877f5e-2328-4294-a82b-ca2003d6959b",
        "name": "StartOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1420,
          1220
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "8d437b10-d6f1-4888-b336-25f942fb23d5",
        "name": "UpdatedOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2100,
          1280
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Agrupaciones_Generalmetric\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "3e177244-adf4-4807-8ba9-b50fdae3a69b",
        "name": "Code Body",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          580,
          1700
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f9917443-5cb4-4ee3-a18a-548cda0292f6",
        "name": "Merge4",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          900,
          1680
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "381fddaf-5214-44dc-b807-7af78eeef26d",
        "name": "create_operation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          740,
          1600
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
        "parameters": {},
        "id": "ec9a354f-a3ed-42c5-8c82-748e1b2b5dd9",
        "name": "Wait8",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1120,
          1320
        ],
        "webhookId": "19172958-4f79-4418-8fbc-76333f29635a"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "25ccb0ef-5d64-4c05-8dca-85f24bdfccb8",
          "options": {}
        },
        "id": "cf191753-d40b-4222-8808-1f78a6751581",
        "name": "Webhook9",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          420,
          1700
        ],
        "webhookId": "25ccb0ef-5d64-4c05-8dca-85f24bdfccb8"
      },
      {
        "parameters": {},
        "id": "b6624884-187d-4a5f-be5b-1f0a1bf48f5b",
        "name": "Wait9",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1120,
          1680
        ],
        "webhookId": "33b927e2-553f-4c4f-ba07-41f3bdb57a21"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "3ed60b88-8dde-45d0-97cb-dcb721583dba",
        "name": "StartOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1400,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "44dd3cf8-437e-479d-b380-be38033580bc",
        "name": "UpdatedOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2520,
          1640
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7389ded8-6748-4b7e-8732-c14d2fd1a080",
        "name": "UpdatedOperation11",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          2060
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2935516a-fda6-4eee-af42-3709f34276f4",
        "name": "StartOperation11",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1400,
          2000
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
        "parameters": {},
        "id": "56e7c31c-122e-4fa5-a3bc-608df2b3a843",
        "name": "Wait10",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1120,
          2100
        ],
        "webhookId": "76781d15-53ef-4e23-93cb-0f07b21f2d3a"
      },
      {
        "parameters": {
          "content": "E3_Agrupaciones_Generalmetric",
          "height": 1234.986319125877,
          "width": 2643.1397061618377
        },
        "id": "831d9c13-60bc-4769-8c98-4abbc454007e",
        "name": "Note7",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          60,
          1120
        ]
      },
      {
        "parameters": {
          "content": "E3_Transacciones_IngresosComisiones",
          "height": 953.3892147565574,
          "width": 2634.3709043648496
        },
        "id": "5a5592a1-e7f2-44e3-a861-0f7e7dd5e42c",
        "name": "Note8",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          80,
          2400
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "75963093-7b6e-47e9-b4a6-7bd2b7ce2f4d",
          "options": {}
        },
        "id": "385fc307-4c1c-4eb5-a060-19d5aced7346",
        "name": "Webhook10",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          160,
          2900
        ],
        "webhookId": "75963093-7b6e-47e9-b4a6-7bd2b7ce2f4d"
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Transacciones_IngresosComisiones\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "0dd6fd7c-218f-478d-97ba-c54b20347a99",
        "name": "Code Body1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          320,
          2900
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d004c3ce-5815-434f-817e-bb2113c3ea96",
        "name": "create_operation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          500,
          2800
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
        "id": "543f104a-af3e-4f3f-a934-f22dbcb5d632",
        "name": "Merge9",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          680,
          2880
        ]
      },
      {
        "parameters": {},
        "id": "b25c116c-3b88-4bfb-9a0f-3b2e94c54b22",
        "name": "Wait11",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          920,
          2560
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T03_3_Sumar_Comisiones\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "6cafc92c-921c-4f78-806c-29585cb4e43a",
        "name": "Code",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1060,
          2560
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "e2d8d854-7b9e-4ade-9866-a7500f53c386",
        "name": "StartOperation12",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1240,
          2460
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
        "id": "21cd39ea-989d-4685-9ce5-08ad3ee93c30",
        "name": "Merge12",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1420,
          2540
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a70776d8-8430-4880-808f-b3c391bbeda0",
        "name": "Merge13",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1760,
          2520
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "3311fb98-ec5a-4ba0-a719-326ee6267a6e",
        "name": "UpdatedOperation12",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1920,
          2520
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
        "parameters": {},
        "id": "c82727e4-ada5-4e7f-ae07-79e2ef1edfee",
        "name": "Wait12",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          900,
          2880
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T03_4_Totalizar_Mes\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "e405a402-066f-4349-8557-f9fae8cfcd77",
        "name": "Code1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1040,
          2880
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "eda389e8-7401-4862-bd3a-747c5452cecf",
        "name": "StartOperation13",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
          2780
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
        "id": "ebb1bf3c-a392-4b74-be6c-bb57fd5dae84",
        "name": "Merge14",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1400,
          2860
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a9fb7d25-4bf8-4660-966b-20b8bdf35fa3",
        "name": "Merge15",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1740,
          2840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "298bfa31-9802-4ec4-8683-6fd51e41ffd7",
        "name": "UpdatedOperation13",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1900,
          2840
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
        "parameters": {},
        "id": "879e83c7-e5d1-4fed-b898-b47a3858a599",
        "name": "Wait13",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          920,
          3200
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T03_5_Acumulado_Promedio_7M\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "e9d77205-5567-4737-a277-9bc2d580b062",
        "name": "Code4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1060,
          3200
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "f5e686b5-676b-4f02-8b2e-e12509ed77d7",
        "name": "StartOperation14",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1240,
          3100
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
        "id": "5f46468e-b8c0-4a96-9cc9-b006de3a39d9",
        "name": "Merge40",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1420,
          3180
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f9be4207-a942-4739-9441-2750d027dccd",
        "name": "Merge41",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1760,
          3160
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5263eb64-7c73-41b7-a008-e7e49bb06587",
        "name": "UpdatedOperation14",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1920,
          3160
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
          "collection": "sidis_ingresoComisiones",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }, {\n            \"rifCedula\": {\n              \"$nin\": [\n                \"\", \"00000000\"\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$addFields\": {\n        \"posBolivares\": {\n          \"$round\": [\n            {\n              \"$add\": [\n                {\n                  \"$ifNull\": [\n                    \"$posTransaccionesBolivares\", 0\n                  ]\n                }, {\n                  \"$ifNull\": [\n                    \"$posComisionesBolivares\", 0\n                  ]\n                }\n              ]\n            }, 4\n          ]\n        }, \n        \"posDolares\": {\n          \"$add\": [\n            {\n              \"$ifNull\": [\n                \"$posTransaccionesDolares\", 0\n              ]\n            }, {\n              \"$ifNull\": [\n                \"$posComisionesDolares\", 0\n              ]\n            }\n          ]\n        }, \n        \"posEuros\": {\n          \"$add\": [\n            {\n              \"$ifNull\": [\n                \"$posTransaccionesEuros\", 0\n              ]\n            }, {\n              \"$ifNull\": [\n                \"$posComisionesEuros\", 0\n              ]\n            }\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"fechaProceso\": 1, \n        \"rifCedula\": 1, \n        \"posBolivares\": 1, \n        \"posDolares\": 1, \n        \"posEuros\": 1\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_ingresoComisiones\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ], \n        \"whenNotMatched\": \"discard\"\n      }\n    }\n  ]"
        },
        "id": "19f52111-5add-480b-b92b-6aae32e4a9b2",
        "name": "T03_3_Sumar Comisiones",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1580,
          2420
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
          "collection": "sidis_ingresoComisiones",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$gte\": [\n                \"$fechaProceso\", {\n                  \"$dateAdd\": {\n                    \"startDate\": {\n                      \"$dateAdd\": {\n                        \"startDate\": {\n                          \"$dateFromParts\": {\n                            \"year\": {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.processDate}}\"\n                              }\n                            }, \n                            \"month\": {\n                              \"$month\": {\n                                \"$toDate\": \"{{$json.processDate}}\"\n                              }\n                            }\n                          }\n                        }, \n                        \"unit\": \"month\", \n                        \"amount\": -5\n                      }\n                    }, \n                    \"unit\": \"day\", \n                    \"amount\": -1\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$lte\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"rifCedula\": {\n          \"$first\": \"$rifCedula\"\n        }, \n        \"fechaProceso\": {\n          \"$max\": \"$fechaProceso\"\n        }, \n        \"totalMesBolivares7m\": {\n          \"$sum\": \"$totalMesBolivares\"\n        }, \n        \"totalMesDolares7m\": {\n          \"$sum\": \"$totalMesDolares\"\n        }, \n        \"totalMesEuros7m\": {\n          \"$sum\": \"$totalMesEuros\"\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"totalPromBolivares7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesBolivares7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"totalPromDolares7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesDolares7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"totalPromEuros7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesEuros7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"rifCedula\": \"$rifCedula\", \n        \"_id\": \"$$REMOVE\", \n        \"acumuladoBolivares7m\": {\n          \"$sum\": \"$totalMesBolivares7m\"\n        }, \n        \"acumuladoEuros7m\": {\n          \"$sum\": \"$totalMesEuros7m\"\n        }, \n        \"acumuladoDolares7m\": {\n          \"$sum\": \"$totalMesDolares7m\"\n        }, \n        \"totalMesBolivares7m\": \"$$REMOVE\", \n        \"totalMesDolares7m\": \"$$REMOVE\", \n        \"totalMesEuros7m\": \"$$REMOVE\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_ingresoComisiones\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ], \n        \"whenNotMatched\": \"discard\"\n      }\n    }\n  ]"
        },
        "id": "dd37429f-1646-4eeb-9257-0e0b7f844cf4",
        "name": "T03_5_Acumulado_Promedio_7M",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1580,
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
          "collection": "sidis_ingresoComisiones",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }, {\n            \"rifCedula\": {\n              \"$nin\": [\n                \"\", \"00000000\"\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"fechaProceso\": \"$fechaProceso\", \n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"totalMesDolares\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$posDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$pagoProveedoresDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$otrosDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$opCambiariasDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$nominaDolares\", 0\n                ]\n              }\n            ]\n          }\n        }, \n        \"totalMesEuros\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$posEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$pagoProveedoresEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$otroEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$opCambiariasEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$nominaEuros\", 0\n                ]\n              }\n            ]\n          }\n        }, \n        \"totalMesBolivares\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$posBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$pagoProveedoresBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$otroBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$opCambiariasBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$nominaBolivares\", 0\n                ]\n              }\n            ]\n          }\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"fechaProceso\": \"$_id.fechaProceso\", \n        \"rifCedula\": \"$_id.rifCedula\", \n        \"_id\": \"$$REMOVE\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_ingresoComisiones\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "15b0dc86-c3d0-4bd2-92e5-d2311ec20ae6",
        "name": "T03_4_Totalizar_Mes",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1560,
          2740
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
          "content": "E3_Transacciones_FacturacionPos",
          "height": 341.24673891741827,
          "width": 2653.7527241803364
        },
        "id": "60bf4bf7-38f3-47f0-83d8-af754d0b8f63",
        "name": "Note9",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          80,
          3420
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Transacciones_FacturacionPos\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "9e38d7f9-e0e7-4131-ac45-1d65a68b97db",
        "name": "Code Body2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          320,
          3600
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "35150b30-6ed2-43db-9f97-ca7a18a0281d",
        "name": "create_operation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          500,
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
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "806a8c12-3c44-414a-b42f-6b75692462b3",
        "name": "Merge42",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          680,
          3580
        ]
      },
      {
        "parameters": {},
        "id": "a5d16b2e-6a1a-4b34-a4fc-ae886e194b6d",
        "name": "Wait14",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          880,
          3580
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T0_4_2_Acumululado_Promedios_7M\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "7866d567-7f9d-431d-a2a4-51d35d2ca03c",
        "name": "Code5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1020,
          3580
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "314e5bdc-7c96-4bf4-9c1e-87c6dc273e69",
        "name": "StartOperation15",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1200,
          3480
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
        "id": "19538dca-73d8-43a1-859f-dec90770fb88",
        "name": "Merge43",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1380,
          3560
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4f09c1f7-1a35-4f11-acae-23ead83d9ca1",
        "name": "Merge44",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1720,
          3540
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "dcab9d97-b43d-4565-8e7f-ad7addbd7742",
        "name": "UpdatedOperation15",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1880,
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
          "collection": "sidis_transaccionesFacturacionPOS",
          "query": "=[\n    {\n      \"$addFields\": {\n        \"fechaSuperior\": {\n          \"$toDate\": \"{{$json.processDate}}\"\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"fechaProcesoAct\": {\n          \"$dateFromParts\": {\n            \"year\": {\n              \"$year\": \"$fechaProceso\"\n            }, \n            \"month\": {\n              \"$month\": \"$fechaProceso\"\n            }\n          }\n        }, \n        \"fechaInferior\": {\n          \"$dateSubtract\": {\n            \"startDate\": {\n              \"$dateFromParts\": {\n                \"year\": {\n                  \"$year\": \"$fechaSuperior\"\n                }, \n                \"month\": {\n                  \"$month\": \"$fechaSuperior\"\n                }\n              }\n            }, \n            \"unit\": \"month\", \n            \"amount\": 6\n          }\n        }\n      }\n    }, {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$gte\": [\n                \"$fechaProcesoAct\", \"$fechaInferior\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$lte\": [\n                \"$fechaProcesoAct\", \"$fechaSuperior\"\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"rifCedula\": {\n          \"$first\": \"$rifCedula\"\n        }, \n        \"fechaProceso\": {\n          \"$max\": \"$fechaProceso\"\n        }, \n        \"acumuladoTransaccionesUlt7Meses\": {\n          \"$sum\": \"$cantidadTransacciones\"\n        }, \n        \"acumuladoFacturacionUlt7MesesBolivares\": {\n          \"$sum\": \"$montoFacturacionBolivares\"\n        }, \n        \"acumuladoFacturacionUlt7MesesDolares\": {\n          \"$sum\": \"$montoFacturacionDolares\"\n        }, \n        \"acumuladoFacturacionUlt7MesesEuros\": {\n          \"$sum\": \"$montoFacturacionEuros\"\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"promedioTransaccionesUlt7Meses\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$acumuladoTransaccionesUlt7Meses\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"promedioFacturacionUlt7MesesBolivares\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$acumuladoFacturacionUlt7MesesBolivares\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"promedioFacturacionUlt7MesesDolares\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$acumuladoFacturacionUlt7MesesDolares\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"promedioFacturacionUlt7MesesEuros\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$acumuladoFacturacionUlt7MesesEuros\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"rifCedula\": \"$rifCedula\", \n        \"_id\": \"$$REMOVE\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_transaccionesFacturacionPOS\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "ea686b95-b607-44b3-8248-da38d7cb7e87",
        "name": "T0_4_2_Acumululado_Promedios_7M",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1540,
          3440
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
          "path": "9449fe1b-01c5-409b-9828-bbcb053faa0e",
          "options": {}
        },
        "id": "0a1c4e77-03b3-4e13-8346-fe4f09b2d827",
        "name": "Webhook12",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          140,
          3600
        ],
        "webhookId": "9449fe1b-01c5-409b-9828-bbcb053faa0e"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "b187ac81-e3db-42f4-905e-50920b45ef5d",
        "name": "addlastDigRifs1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1660,
          3980
        ]
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "9e29e8f9-44c1-4aab-8d8f-7547b4cfbb0b",
        "name": "SplitInBatches2",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1000,
          3980
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "0b210974-3871-4abe-9e5c-0d061775c821",
        "name": "Operation_subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2140,
          3860
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
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "5b43e59e-02ab-4a46-93e6-cd835ccdce72",
        "name": "createOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          480,
          3920
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Transacciones_ProductosVinculados\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "8f7fd7e5-7946-414c-9378-a5184512f53f",
        "name": "Definición de parametros",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          320,
          4000
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "1bc639fa-384a-4500-b5aa-90ad5d5bba3d",
        "name": "Bring operations subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          820,
          3980
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
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/276cb768-f277-450a-aaa7-a7e8d8ffcda5",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "offSet",
                "value": "={{$json.offSet}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "541399d3-0025-4420-a790-383c02047193",
        "name": "HTTP Request10",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3160,
          3900
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/9c212d54-4605-4e5a-a863-fbc53a4cb8a4",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "offSet",
                "value": "={{$json.offSet}}"
              },
              {
                "name": "subProcessName",
                "value": "={{$json.subProcessName}}"
              },
              {
                "name": "parallelizationIndex",
                "value": "={{$json.parallelizationIndex}}"
              },
              {
                "name": "fromCollection",
                "value": "={{$json.fromCollection}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "aggregate",
                "value": "={{$json.aggregate}}"
              },
              {
                "name": "subStage",
                "value": "={{$json.subStage}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "4a59ac3a-d204-40d9-8c64-35e6145a3641",
        "name": "HTTP Request9",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1160,
          3980
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "69661683-afe2-4d11-af5c-cb09142bb278",
        "name": "Wait16",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1320,
          3980
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4d37fbcc-788e-4195-8b96-476056329d3f",
        "name": "Merge48",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1980,
          3960
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fcf5af35-4024-4022-835f-a6d2d83cbde6",
        "name": "Merge49",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2300,
          3940
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c4bb1d25-7b36-47ef-9f8a-8e414d7f3868",
        "name": "Merge50",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2640,
          3920
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bca1f454-a9c0-4cfb-94fd-6020f14a2f3f",
        "name": "StartOperation17",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1820,
          3880
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "51dc66d6-31f3-45cd-b71e-b35323b553bd",
        "name": "UpdatedOperation17",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2460,
          3840
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
        "id": "1b419767-6444-47f9-bb7f-c51603f6ad42",
        "name": "Merge51",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          640,
          3980
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "7ca74352-b82c-4979-821a-61b06b32d4e2",
        "name": "addlastDigRifs",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1660,
          4340
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/368e66bb-18b4-43b0-a870-39ec74a3712e",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "offSet",
                "value": "={{$json.offSet}}"
              },
              {
                "name": "subProcessName",
                "value": "={{$json.subProcessName}}"
              },
              {
                "name": "parallelizationIndex",
                "value": "={{$json.parallelizationIndex}}"
              },
              {
                "name": "fromCollection",
                "value": "={{$json.fromCollection}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "aggregate",
                "value": "={{$json.aggregate}}"
              },
              {
                "name": "subStage",
                "value": "={{$json.subStage}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "eb203803-2b4e-460e-99d1-2f93b4a5e7cf",
        "name": "HTTP Request11",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1160,
          4340
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "a8119350-1ad6-4873-91ea-0fd4a825e3ab",
        "name": "Wait17",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1320,
          4340
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "7b643810-2306-4505-883e-79f5b54a1e1e",
        "name": "SplitInBatches",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1000,
          4340
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d38888dd-a5c2-41b3-9622-2555bf037991",
        "name": "Merge52",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1980,
          4320
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "242cef7a-5522-417c-8c56-e8309af4fbce",
        "name": "Merge53",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2300,
          4300
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "33a8a551-f52e-4a53-b860-091b3c550245",
        "name": "Merge54",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2640,
          4280
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bad70f51-fb74-41eb-b64a-453578ce8d22",
        "name": "StartOperation18",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1820,
          4240
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "13417957-7a51-4762-9762-ecca6f74c8d6",
        "name": "UpdatedOperation18",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2460,
          4200
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "ca58e3ea-fa1c-4c98-a8ef-60c5af050f65",
        "name": "Operation_subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2140,
          4220
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = body.processName;  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"2\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "88667fcd-e7e6-480b-b725-9ea30d9313e2",
        "name": "Definición de parametros1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          660,
          4340
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "976bd4a6-98c5-431f-a1b1-dfca0704cd0a",
        "name": "Bring operations subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          820,
          4340
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
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "71121914-aa1e-4984-a15a-c1a542685d16",
        "name": "addlastDigRifs2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1680,
          4660
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/e9801f9e-96e7-4b82-9131-363a45044cb3",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "offSet",
                "value": "={{$json.offSet}}"
              },
              {
                "name": "subProcessName",
                "value": "={{$json.subProcessName}}"
              },
              {
                "name": "parallelizationIndex",
                "value": "={{$json.parallelizationIndex}}"
              },
              {
                "name": "fromCollection",
                "value": "={{$json.fromCollection}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "aggregate",
                "value": "={{$json.aggregate}}"
              },
              {
                "name": "subStage",
                "value": "={{$json.subStage}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "08fc7a90-4d28-46d4-b89a-25af241dd80b",
        "name": "HTTP Request13",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1180,
          4660
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "4ddae8d7-4c65-49ba-9f6d-c6b0cc8b76d5",
        "name": "Wait18",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1340,
          4660
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "777cfc9b-9423-451e-a42b-876b21c1ff96",
        "name": "SplitInBatches3",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1020,
          4660
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "db32edf4-1582-4eb5-9fcf-e993c883cf7f",
        "name": "Merge56",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2000,
          4640
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fc78ddcb-c0c9-4110-8176-550ddcddfcde",
        "name": "Merge57",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2320,
          4620
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "01b319b8-e3fb-49af-a571-64345bdc32e9",
        "name": "Merge58",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2660,
          4600
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "0459d56f-f73f-42fc-99af-d8d20fa058c4",
        "name": "StartOperation19",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1840,
          4560
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "ce83e674-2238-4805-b99d-5ee6823419cc",
        "name": "UpdatedOperation19",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2480,
          4520
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "dc138404-5483-4a7c-8046-f50e2c0a3c1a",
        "name": "Operation_subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2160,
          4540
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = body.processName;  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"3\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "401e35dd-b9bd-4285-9add-f63237602a4c",
        "name": "Definición de parametros2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          660,
          4660
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "91dd2c3d-2ab7-4503-b2f7-739b95ec1902",
        "name": "Bring operations subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          840,
          4660
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
          "content": "E3_Transacciones_ProductosVinculados",
          "height": 1088.7121994920976,
          "width": 3265.6275353395795
        },
        "id": "0f897212-ba5c-4d8b-8ab4-cda35910e486",
        "name": "Note11",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          80,
          3800
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "eee0b013-b5c0-4b03-b2c7-4f3914492922",
          "options": {}
        },
        "id": "abe1fa8a-42ff-4a54-8824-07f38f8d7091",
        "name": "Webhook13",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          120,
          4000
        ],
        "webhookId": "eee0b013-b5c0-4b03-b2c7-4f3914492922"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processName}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$project\": {\n      \"subStage\": \"$subProcess.subStage\", \n      \"status\": \"$subProcess.status\"\n    }\n  }, {\n    \"$match\": {\n      \"subStage\": \"{{$json.subStage}}\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$subStage\", \n      \"status\": {\n        \"$addToSet\": \"$status\"\n      }\n    }\n  }, {\n    \"$set\": {\n      \"subStageStatus\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"status\": \"$$REMOVE\", \n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": \"{{$json.processDate}}\",\n      \"offSet\": \"{{$json.offSet}}\"\n    }\n  }\n]"
        },
        "id": "3bd368c2-7c4f-4eeb-a767-39ae75e458a3",
        "name": "checkSubStageOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2800,
          3920
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "ec6b8893-2909-4984-a141-d65d3368a4ea",
        "name": "IF3",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          2960,
          3920
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/ffd0cb7d-b675-4ede-845b-2ef2ab82b3ef",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "offSet",
                "value": "={{$json.offSet}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "25e898f5-22a3-435e-9dab-e7803ad2d26d",
        "name": "HTTP Request12",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3160,
          4260
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processName}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$project\": {\n      \"subStage\": \"$subProcess.subStage\", \n      \"status\": \"$subProcess.status\"\n    }\n  }, {\n    \"$match\": {\n      \"subStage\": \"{{$json.subStage}}\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$subStage\", \n      \"status\": {\n        \"$addToSet\": \"$status\"\n      }\n    }\n  }, {\n    \"$set\": {\n      \"subStageStatus\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"status\": \"$$REMOVE\", \n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": \"{{$json.processDate}}\",\n      \"offSet\": \"{{$json.offSet}}\"\n    }\n  }\n]"
        },
        "id": "1f27034e-8626-44fe-8b8d-db9fbc87c5b4",
        "name": "checkSubStageOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2800,
          4280
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "e0f88959-07f1-4902-837c-628ffcc40c4e",
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          2960,
          4280
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processName}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$project\": {\n      \"subStage\": \"$subProcess.subStage\", \n      \"status\": \"$subProcess.status\"\n    }\n  }, {\n    \"$match\": {\n      \"subStage\": \"{{$json.subStage}}\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$subStage\", \n      \"status\": {\n        \"$addToSet\": \"$status\"\n      }\n    }\n  }, {\n    \"$set\": {\n      \"subStageStatus\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"status\": \"$$REMOVE\", \n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": \"{{$json.processDate}}\",\n      \"offSet\": \"{{$json.offSet}}\"\n    }\n  }\n]"
        },
        "id": "6d87512d-f54a-4b8c-bce7-b4140d14c0cc",
        "name": "checkSubStageOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2820,
          4600
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
          "path": "9c212d54-4605-4e5a-a863-fbc53a4cb8a4",
          "options": {}
        },
        "id": "805b57b8-4fdf-4622-a5be-0ce9fe9f8aa9",
        "name": "Webhook14",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1500,
          3980
        ],
        "webhookId": "9c212d54-4605-4e5a-a863-fbc53a4cb8a4"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "276cb768-f277-450a-aaa7-a7e8d8ffcda5",
          "options": {}
        },
        "id": "d580d4d5-2d3a-422c-bd1a-2664fd671957",
        "name": "Webhook15",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          520,
          4340
        ],
        "webhookId": "276cb768-f277-450a-aaa7-a7e8d8ffcda5"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "368e66bb-18b4-43b0-a870-39ec74a3712e",
          "options": {}
        },
        "id": "83ce590c-b3ef-44fb-8919-7abf047da034",
        "name": "Webhook16",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1520,
          4340
        ],
        "webhookId": "368e66bb-18b4-43b0-a870-39ec74a3712e"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "ffd0cb7d-b675-4ede-845b-2ef2ab82b3ef",
          "options": {}
        },
        "id": "e7ddee1f-cd41-43ce-b294-ec34de7adb2a",
        "name": "Webhook17",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          520,
          4660
        ],
        "webhookId": "ffd0cb7d-b675-4ede-845b-2ef2ab82b3ef"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "e9801f9e-96e7-4b82-9131-363a45044cb3",
          "options": {}
        },
        "id": "51091162-c41f-4efc-af9e-840ce39f73fd",
        "name": "Webhook18",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1540,
          4660
        ],
        "webhookId": "e9801f9e-96e7-4b82-9131-363a45044cb3"
      },
      {
        "parameters": {
          "content": "E3_Transacciones_IngresosCarteraCredito",
          "height": 953.3892147565574,
          "width": 2412.2861784216334
        },
        "id": "6a1d1241-117a-4f25-b014-8f54868b0746",
        "name": "Note12",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          80,
          4920
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Transacciones_IngresosCarteraCredito\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "9bdad675-77ad-43f3-ac3a-5e3ca865fb4d",
        "name": "Code Body4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          320,
          5420
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "c0414ba6-7694-4b35-9379-18f78d863a37",
        "name": "create_operation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          500,
          5320
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
        "id": "e42cb30f-e95b-44a4-926a-d144c4ac8548",
        "name": "Merge55",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          680,
          5400
        ]
      },
      {
        "parameters": {},
        "id": "fc98cb6e-a25a-47b7-a53a-0757a09ff6c7",
        "name": "Wait20",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          920,
          5080
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T01_2_totalizacionMes\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "46b3f32e-7dae-4b0c-878d-ad10c4fc0f14",
        "name": "Code7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1060,
          5080
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "72d63652-2edf-48f0-9702-adb7ee90d7a6",
        "name": "StartOperation20",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1240,
          4980
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
        "id": "dea4383e-72d3-4146-a921-5ff38d2b67a1",
        "name": "Merge59",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1420,
          5060
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "0ddccbd6-40d2-4b31-8c39-b01d034c9f2b",
        "name": "Merge60",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1760,
          5040
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7ad094ce-6e71-4703-a711-19fa848c418a",
        "name": "UpdatedOperation20",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1920,
          4960
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
        "parameters": {},
        "id": "b4145a37-b056-4aa3-8121-321aeea8b5c3",
        "name": "Wait21",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          900,
          5400
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T01_3_promedioAcumulado7M\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "b2e599e6-e6ce-4244-9114-91bbd010ff02",
        "name": "Code8",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1040,
          5400
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "90be3b35-35ea-4970-a8b8-7605521e8713",
        "name": "StartOperation21",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
          5300
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
        "id": "12d65947-95dd-4658-9ee5-ef92d4c6aed8",
        "name": "Merge61",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1400,
          5380
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d34e35d8-2c92-42f9-8bb1-5add057fb855",
        "name": "Merge62",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1740,
          5360
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d2d23cfc-7d0b-4e72-9c24-b34ae0ba7e61",
        "name": "UpdatedOperation21",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1900,
          5260
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
        "parameters": {},
        "id": "dcc5a867-9abf-4d40-9825-0f75cccada94",
        "name": "Wait22",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          920,
          5720
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T01_4_Integracion_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "a4f030fe-1309-4876-8707-d2442b8882b9",
        "name": "Code9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1060,
          5720
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "48f91a45-b5d8-48ad-bd8f-5a86e907e635",
        "name": "StartOperation22",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1240,
          5620
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
        "id": "21ec0880-e961-4b17-a572-f58467932b49",
        "name": "Merge63",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1420,
          5700
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f4fa718f-ffa2-47cc-9d56-35f1e906c0c0",
        "name": "Merge64",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1760,
          5680
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bf18cd48-72db-4bc7-bc37-1639a997b107",
        "name": "UpdatedOperation22",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1900,
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
          "httpMethod": "POST",
          "path": "deae21a1-51ce-4b6a-a7be-60cd14b941ac",
          "options": {}
        },
        "id": "f6099f17-e276-4b04-af77-d901fb0331ee",
        "name": "Webhook19",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          140,
          5420
        ],
        "webhookId": "deae21a1-51ce-4b6a-a7be-60cd14b941ac"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_ingresoCarteraCredito",
          "query": "=[\n    {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$fechaProceso\", {\n              \"$toDate\": \"{{$json.processDate}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"fechaProceso\": \"$fechaProceso\", \n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"totalMesDolares\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$tasaInteresDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$gastosFlatOtrosDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$variacionIDIDolares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$lineaCreditoDolares\", 0\n                ]\n              }\n            ]\n          }\n        }, \n        \"totalMesEuros\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$tasaInteresEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$gastosFlatOtrosEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$variacionIDIEuros\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$lineaCreditoEuros\", 0\n                ]\n              }\n            ]\n          }\n        }, \n        \"totalMesBolivares\": {\n          \"$sum\": {\n            \"$add\": [\n              {\n                \"$ifNull\": [\n                  \"$tasaInteresBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$gastosFlatOtrosBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$variacionIDIBolivares\", 0\n                ]\n              }, {\n                \"$ifNull\": [\n                  \"$lineaCreditoBolivares\", 0\n                ]\n              }\n            ]\n          }\n        }\n      }\n    }, {\n      \"$project\": {\n        \"fechaProceso\": \"$_id.fechaProceso\", \n        \"rifCedula\": \"$_id.rifCedula\", \n        \"totalMesBolivares\": {\n          \"$round\": [\n            \"$totalMesBolivares\", 4\n          ]\n        }, \n        \"totalMesDolares\": {\n          \"$round\": [\n            \"$totalMesDolares\", 4\n          ]\n        }, \n        \"totalMesEuros\": {\n          \"$round\": [\n            \"$totalMesEuros\", 4\n          ]\n        }, \n        \"_id\": 0\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_ingresoCarteraCredito\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "5c95504c-f2d8-49bc-bb53-258d22de5a31",
        "name": "T01_2_totalizacionMes",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1580,
          4940
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
          "collection": "sidis_ingresoCarteraCredito",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$gte\": [\n                \"$fechaProceso\", {\n                  \"$dateAdd\": {\n                    \"startDate\": {\n                      \"$dateAdd\": {\n                        \"startDate\": {\n                          \"$dateFromParts\": {\n                            \"year\": {\n                              \"$year\": {\n                                \"$toDate\": \"{{$json.processDate}}\"\n                              }\n                            }, \n                            \"month\": {\n                              \"$month\": {\n                                \"$toDate\": \"{{$json.processDate}}\"\n                              }\n                            }\n                          }\n                        }, \n                        \"unit\": \"month\", \n                        \"amount\": -5\n                      }\n                    }, \n                    \"unit\": \"day\", \n                    \"amount\": -1\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$lte\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"rifCedula\": {\n          \"$first\": \"$rifCedula\"\n        }, \n        \"fechaProceso\": {\n          \"$max\": \"$fechaProceso\"\n        }, \n        \"totalMesBolivares7m\": {\n          \"$sum\": \"$totalMesBolivares\"\n        }, \n        \"totalMesDolares7m\": {\n          \"$sum\": \"$totalMesDolares\"\n        }, \n        \"totalMesEuros7m\": {\n          \"$sum\": \"$totalMesEuros\"\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"totalPromBolivares7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesBolivares7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"totalPromDolares7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesDolares7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"totalPromEuros7m\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$totalMesEuros7m\", 7\n              ]\n            }, 4\n          ]\n        }, \n        \"rifCedula\": \"$rifCedula\", \n        \"_id\": \"$$REMOVE\", \n        \"acumuladoBolivares7m\": {\n          \"$round\": [\n            {\n              \"$sum\": \"$totalMesBolivares7m\"\n            }, 4\n          ]\n        }, \n        \"acumuladoEuros7m\": {\n          \"$round\": [\n            {\n              \"$sum\": \"$totalMesEuros7m\"\n            }, 4\n          ]\n        }, \n        \"acumuladoDolares7m\": {\n          \"$round\": [\n            {\n              \"$sum\": \"$totalMesDolares7m\"\n            }, 4\n          ]\n        }, \n        \"totalMesBolivares7m\": \"$$REMOVE\", \n        \"totalMesDolares7m\": \"$$REMOVE\", \n        \"totalMesEuros7m\": \"$$REMOVE\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_ingresoCarteraCredito\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ], \n        \"whenNotMatched\": \"discard\"\n      }\n    }\n  ]"
        },
        "id": "a93528b9-9544-49c5-841a-379fee7859f7",
        "name": "T01_3_promedioAcumulado7M",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1560,
          5260
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
          "collection": "sidis_ingresoCarteraCredito",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }, {\n            \"rifCedula\": {\n              \"$nin\": [\n                \"\", \"00000000\"\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$addFields\": {\n        \"icc_totalMesBolivares\": \"$totalMesBolivares\", \n        \"icc_totalMesDolares\": \"$totalMesDolares\", \n        \"icc_totalMesEuros\": \"$totalMesEuros\", \n        \"icc_acumuladoBolivares7m\": \"$acumuladoBolivares7m\", \n        \"icc_acumuladoDolares7m\": \"$acumuladoDolares7m\", \n        \"icc_acumuladoEuros7m\": \"$acumuladoEuros7m\", \n        \"icc_totalPromBolivares7m\": \"$totalPromBolivares7m\", \n        \"icc_totalPromDolares7m\": \"$totalPromDolares7m\", \n        \"icc_totalPromEuros7m\": \"$totalPromEuros7m\", \n        \"totalMesBolivares\": \"$$REMOVE\", \n        \"totalMesDolares\": \"$$REMOVE\", \n        \"totalMesEuros\": \"$$REMOVE\", \n        \"acumuladoBolivares7m\": \"$$REMOVE\", \n        \"acumuladoDolares7m\": \"$$REMOVE\", \n        \"acumuladoEuros7m\": \"$$REMOVE\", \n        \"totalPromBolivares7m\": \"$$REMOVE\", \n        \"totalPromDolares7m\": \"$$REMOVE\", \n        \"totalPromEuros7m\": \"$$REMOVE\"\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"Margenmetric\", \n        \"on\": [\n          \"rifCedula\", \"fechaProceso\"\n        ], \n        \"whenNotMatched\": \"discard\"\n      }\n    }\n  ]"
        },
        "id": "098d2c0b-477c-44f2-9ec4-aa0ec4b66ab6",
        "name": "T01_4_Integracion_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1580,
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
          "content": "E3_Transacciones_ComprasDepositosDivisa",
          "height": 341.24673891741827,
          "width": 2041.3867519104372
        },
        "id": "03795ba0-0f2c-4fd2-97e8-b1f6871b36f9",
        "name": "Note10",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          80,
          5900
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E3_Transacciones_ComprasDepositosDivisa\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "61a76c5c-fa01-4880-8f43-7f5da83d9439",
        "name": "Code Body3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          300,
          6080
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E3_Procesamiento_Indicadores\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento de Indicadores, margenmetric y proceso de agrupaciones\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, Margenmetricsegmentnatural, Margenmetricsegmentjuridico\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"M_1_Indicadores_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento de indicadores base en la colección margenmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_2_saldosPromedio6m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 6 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_3_SumaAnual13m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 13 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_4_CrecimientoAnual_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento crecimiento anual diciembre-mes actual\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_5_saldosPromedio3m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento saldos promedio 3 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_6_Reciprocicad_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento reciprocidad\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_7_tarjetaCredito_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento tarjetas de crédito\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_8_SumaAnual12m_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento suma anual 12 meses\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"M_9_relatedProducts_Margenmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento relatedProducts\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_5_AgrupacionMargengeneralmetric_Margengeneralmetric\", \n          \"processDate\": \"nda\", \n          \"description\": \"Genera la colección Margengeneralmetric\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margengeneralmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_6_AgrupacionMSN_Margenmetricsegmentnatural\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentnatural\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentnatural\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_7_AgrupacionMSJ_Margenmetricsegmentjuridico\", \n          \"processDate\": \"nda\", \n          \"description\": \"Procesamiento Margenmetricsegmentjuridico\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetricsegmentjuridico\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "b51ae08c-dea9-4df3-8ce3-d21077d442d2",
        "name": "create_operation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          480,
          5980
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
        "id": "0c4ed0c5-7135-4389-8066-718232ed8685",
        "name": "Merge45",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          660,
          6060
        ]
      },
      {
        "parameters": {},
        "id": "3899c90b-120a-4b17-9f43-1a1275fa227e",
        "name": "Wait15",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          860,
          6060
        ],
        "webhookId": "1cfbe77e-9499-47de-aa64-07dd70573bb4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T02_2_acumuladoYTD\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "efffb195-49f1-44d3-b998-6271e963a338",
        "name": "Code6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1000,
          6060
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "9683a9fe-273b-4b0b-b05d-45f8dbddb98e",
        "name": "StartOperation16",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1140,
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
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "ff33a0d3-d762-4811-81e9-887d29d9d4db",
        "name": "Merge46",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1300,
          6040
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2b5ffb2d-07dd-4bcf-ae01-972077526d75",
        "name": "Merge47",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1620,
          6020
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "e4bb2b16-334f-4fdb-9dfd-de3e66d30a93",
        "name": "UpdatedOperation16",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1780,
          6020
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
          "path": "0699bc02-8f1f-49d9-a116-205e00200472",
          "options": {}
        },
        "id": "98028521-dbb0-4cd7-826e-75636938d428",
        "name": "Webhook11",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          120,
          6080
        ],
        "webhookId": "0699bc02-8f1f-49d9-a116-205e00200472"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_comprasDepositosDivisa",
          "query": "=[\n    {\n      \"$match\": {\n        \"$or\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$dateFromString\": {\n                    \"dateString\": {\n                      \"$concat\": [\n                        \"31-01-\", {\n                          \"$toString\": {\n                            \"$subtract\": [\n                              {\n                                \"$year\": {\n                                  \"$toDate\": \"{{$json.processDate}}\"\n                                }\n                              }, 0\n                            ]\n                          }\n                        }\n                      ]\n                    }, \n                    \"format\": \"%d-%m-%Y\"\n                  }\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"rifCedula\": {\n          \"$first\": \"$rifCedula\"\n        }, \n        \"fechaProceso\": {\n          \"$max\": \"$fechaProceso\"\n        }, \n        \"acumComprasDolares\": {\n          \"$sum\": \"$comprasDolares\"\n        }, \n        \"acumComprasEuros\": {\n          \"$sum\": \"$comprasEuros\"\n        }, \n        \"acumDepositosDolares\": {\n          \"$sum\": \"$depositosDolares\"\n        }, \n        \"acumDepositosEuros\": {\n          \"$sum\": \"$depositosEuros\"\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"rifCedula\": \"$rifCedula\", \n        \"_id\": \"$$REMOVE\"\n      }\n    }, {\n      \"$addFields\": {\n        \"_id.fechaProceso\": \"$fechaProceso\", \n        \"_id.rifCedula\": \"$rifCedula\"\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_comprasDepositosDivisa\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\", \"_id\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "507c9904-717f-4ac6-a593-8c516b80859b",
        "name": "T02_2_acumuladoYTD",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1460,
          5940
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
        "id": "23c7f353-742e-4fb2-9e55-5e934caf576b",
        "name": "Merge65",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2100,
          5020
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "05528451-acca-426a-b87f-210d084b4872",
        "name": "Merge66",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2080,
          5340
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "1735f26f-c24e-4c83-b3c8-f1a2ccb08213",
        "name": "Merge67",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2100,
          5660
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "b4611f6d-8f3a-418c-8e82-9c067717c1da",
        "name": "HTTP Request14",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3540,
          -1200
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "9f0f0ed4-4aa6-4530-9f1b-b4a8caca103c",
        "name": "HTTP Request15",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          -860
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "e2364b74-bf0a-449b-9073-6314b543a406",
        "name": "HTTP Request17",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3540,
          -480
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "1a22b34b-ba7c-4a0d-ad0b-241c6adc6355",
        "name": "HTTP Request18",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4560,
          -220
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "2067bd33-07b5-49eb-80b6-94ddff17f846",
        "name": "HTTP Request19",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3520,
          160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "07cf0367-fc99-48cf-b914-f5ca95f00d7d",
        "name": "HTTP Request20",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          480
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "cc04a909-2ae6-4cb8-919d-01aae5271e1e",
        "name": "HTTP Request21",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          800
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "77c2db15-2a62-444e-b307-3654c46fe028",
        "name": "HTTP Request22",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3180,
          4580
        ]
      },
      {
        "parameters": {
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "3fbe2578-5955-48df-b614-babbc138efb1",
        "name": "IF1",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          2980,
          4600
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "42e29ea3-6631-4200-a0dd-375fa1091683",
        "name": "HTTP Request23",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2280,
          5020
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "cf7bde1a-8291-4d63-a22b-d61c8ff8bf74",
        "name": "HTTP Request24",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2280,
          5340
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E3_PROCESAMIENTO_INDICADORES",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
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
        "id": "b27887b1-e145-4b37-8aa9-65b30f0e5c26",
        "name": "HTTP Request25",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2280,
          5660
        ]
      }
    ],
    "connections": {
      "Webhook4": {
        "main": [
          [
            {
              "node": "Code Body9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_6_AgrupacionMSN_Margenmetricsegmentnatural": {
        "main": [
          [
            {
              "node": "A_6.1_Parche_Ñ_Margenmetricsegmentnatural",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico": {
        "main": [
          [
            {
              "node": "A_7.1_Parche_Ñ__Margenmetricsegmentjuridico",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_6.1_Parche_Ñ_Margenmetricsegmentnatural": {
        "main": [
          [
            {
              "node": "A_6.2_CodState_Margenmetricsegmentnatural",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_6.2_CodState_Margenmetricsegmentnatural": {
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
      "A_7.1_Parche_Ñ__Margenmetricsegmentjuridico": {
        "main": [
          [
            {
              "node": "A_7.2_CodState_Margenmetricsegmentjuridico",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_7.2_CodState_Margenmetricsegmentjuridico": {
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
      "Code Body9": {
        "main": [
          [
            {
              "node": "create_operation",
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
      "Merge": {
        "main": [
          [
            {
              "node": "Wait19",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait7",
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
              "node": "Merge2",
              "type": "main",
              "index": 1
            },
            {
              "node": "M_1_Indicadores_Margenmetric",
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
              "node": "Merge3",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge3": {
        "main": [
          [
            {
              "node": "Wait",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait3",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait4",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait5",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "M_1_Indicadores_Margenmetric": {
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
      "Merge5": {
        "main": [
          [
            {
              "node": "UpdatedOperation8",
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
              "node": "A_6_AgrupacionMSN_Margenmetricsegmentnatural",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge8",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code2": {
        "main": [
          [
            {
              "node": "Merge7",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation10",
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
              "node": "UpdatedOperation10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge10": {
        "main": [
          [
            {
              "node": "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge11",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code3": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation11",
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
              "node": "UpdatedOperation11",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric": {
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
      "Merge16": {
        "main": [
          [
            {
              "node": "M_2_saldosPromedio6m_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge17",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge17": {
        "main": [
          [
            {
              "node": "UpdatedOperation",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge18",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "M_2_saldosPromedio6m_Margenmetric": {
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
      "M_3_SumaAnual13m_Margenmetric": {
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
      "M_4_CrecimientoAnual_Margenmetric": {
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
      "M_5_saldosPromedio3m_Margenmetric": {
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
      "M_6_Reciprocicad_Margenmetric": {
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
      "M_7_tarjetaCredito_Margenmetric": {
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
      "M_8_SumaAnual12m_Margenmetric": {
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
      "M_9_relatedProducts_Margenmetric": {
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
      "create_operation": {
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
      "Wait19": {
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
      "Code12": {
        "main": [
          [
            {
              "node": "Merge1",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation9",
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
              "node": "Code12",
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
              "node": "HTTP Request7",
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
              "node": "HTTP Request",
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
              "node": "HTTP Request2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait4": {
        "main": [
          [
            {
              "node": "HTTP Request3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait5": {
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
      "Wait6": {
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
      "StartOperation9": {
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
      "UpdatedOperation9": {
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
      "Code13": {
        "main": [
          [
            {
              "node": "StartOperation",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge16",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation": {
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
      "UpdatedOperation": {
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
      "Merge18": {
        "main": [
          [
            {
              "node": "HTTP Request14",
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
              "node": "M_3_SumaAnual13m_Margenmetric",
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
      "Code14": {
        "main": [
          [
            {
              "node": "StartOperation1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge19",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation1": {
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
      "Merge20": {
        "main": [
          [
            {
              "node": "M_4_CrecimientoAnual_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge28",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code15": {
        "main": [
          [
            {
              "node": "StartOperation2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge20",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation2": {
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
      "Merge21": {
        "main": [
          [
            {
              "node": "M_5_saldosPromedio3m_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge30",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code16": {
        "main": [
          [
            {
              "node": "StartOperation3",
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
      "StartOperation3": {
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
      "Merge22": {
        "main": [
          [
            {
              "node": "M_7_tarjetaCredito_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge34",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code17": {
        "main": [
          [
            {
              "node": "StartOperation4",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge22",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation4": {
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
      "Merge23": {
        "main": [
          [
            {
              "node": "M_8_SumaAnual12m_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge36",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code18": {
        "main": [
          [
            {
              "node": "StartOperation5",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge23",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation5": {
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
      "Merge24": {
        "main": [
          [
            {
              "node": "M_9_relatedProducts_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge38",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Code19": {
        "main": [
          [
            {
              "node": "StartOperation6",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge24",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation6": {
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
      "Code20": {
        "main": [
          [
            {
              "node": "Merge25",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "StartOperation7": {
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
              "node": "M_6_Reciprocicad_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge32",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge26": {
        "main": [
          [
            {
              "node": "UpdatedOperation1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge27",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation1": {
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
      "Merge27": {
        "main": [
          [
            {
              "node": "HTTP Request15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge28": {
        "main": [
          [
            {
              "node": "UpdatedOperation2",
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
      "UpdatedOperation2": {
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
      "Merge29": {
        "main": [
          [
            {
              "node": "HTTP Request17",
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
              "node": "UpdatedOperation3",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge31",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation3": {
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
      "Merge31": {
        "main": [
          [
            {
              "node": "Code20",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge32": {
        "main": [
          [
            {
              "node": "UpdatedOperation4",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge33",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation4": {
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
      "Merge33": {
        "main": [
          [
            {
              "node": "HTTP Request18",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge34": {
        "main": [
          [
            {
              "node": "UpdatedOperation5",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge35",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation5": {
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
      "Merge35": {
        "main": [
          [
            {
              "node": "HTTP Request19",
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
              "node": "UpdatedOperation6",
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
      "UpdatedOperation6": {
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
              "node": "HTTP Request20",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge38": {
        "main": [
          [
            {
              "node": "UpdatedOperation7",
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
      "UpdatedOperation7": {
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
      "Merge39": {
        "main": [
          [
            {
              "node": "HTTP Request21",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook1": {
        "main": [
          [
            {
              "node": "Code13",
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
              "node": "Code14",
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
              "node": "Code15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook5": {
        "main": [
          [
            {
              "node": "Code16",
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
              "node": "Code17",
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
              "node": "Code18",
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
              "node": "Code19",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait7": {
        "main": [
          [
            {
              "node": "HTTP Request8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code21": {
        "main": [
          [
            {
              "node": "Merge6",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation8",
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
              "node": "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric",
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
      "StartOperation8": {
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
      "Code Body": {
        "main": [
          [
            {
              "node": "create_operation1",
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
      "Merge4": {
        "main": [
          [
            {
              "node": "Wait8",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait9",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation1": {
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
      "Wait8": {
        "main": [
          [
            {
              "node": "Code21",
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
              "node": "Code Body",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait9": {
        "main": [
          [
            {
              "node": "Code2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "StartOperation10": {
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
      "StartOperation11": {
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
      "Wait10": {
        "main": [
          [
            {
              "node": "Code3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook10": {
        "main": [
          [
            {
              "node": "Code Body1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code Body1": {
        "main": [
          [
            {
              "node": "Merge9",
              "type": "main",
              "index": 1
            },
            {
              "node": "create_operation2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation2": {
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
      "Merge9": {
        "main": [
          [
            {
              "node": "Wait11",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait12",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait13",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait11": {
        "main": [
          [
            {
              "node": "Code",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code": {
        "main": [
          [
            {
              "node": "StartOperation12",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge12",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation12": {
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
      "Merge12": {
        "main": [
          [
            {
              "node": "T03_3_Sumar Comisiones",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge13",
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
              "node": "UpdatedOperation12",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait12": {
        "main": [
          [
            {
              "node": "Code1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code1": {
        "main": [
          [
            {
              "node": "StartOperation13",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge14",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation13": {
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
      "Merge14": {
        "main": [
          [
            {
              "node": "T03_4_Totalizar_Mes",
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
              "node": "UpdatedOperation13",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait13": {
        "main": [
          [
            {
              "node": "Code4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code4": {
        "main": [
          [
            {
              "node": "StartOperation14",
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
      "StartOperation14": {
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
      "Merge40": {
        "main": [
          [
            {
              "node": "T03_5_Acumulado_Promedio_7M",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge41",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge41": {
        "main": [
          [
            {
              "node": "UpdatedOperation14",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T03_3_Sumar Comisiones": {
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
      "T03_5_Acumulado_Promedio_7M": {
        "main": [
          [
            {
              "node": "Merge41",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T03_4_Totalizar_Mes": {
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
      "Code Body2": {
        "main": [
          [
            {
              "node": "Merge42",
              "type": "main",
              "index": 1
            },
            {
              "node": "create_operation3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation3": {
        "main": [
          [
            {
              "node": "Merge42",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge42": {
        "main": [
          [
            {
              "node": "Wait14",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait14": {
        "main": [
          [
            {
              "node": "Code5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code5": {
        "main": [
          [
            {
              "node": "StartOperation15",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge43",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation15": {
        "main": [
          [
            {
              "node": "Merge43",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge43": {
        "main": [
          [
            {
              "node": "T0_4_2_Acumululado_Promedios_7M",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge44",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge44": {
        "main": [
          [
            {
              "node": "UpdatedOperation15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T0_4_2_Acumululado_Promedios_7M": {
        "main": [
          [
            {
              "node": "Merge44",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook12": {
        "main": [
          [
            {
              "node": "Code Body2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "addlastDigRifs1": {
        "main": [
          [
            {
              "node": "StartOperation17",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge48",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "SplitInBatches2": {
        "main": [
          [
            {
              "node": "HTTP Request9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=1": {
        "main": [
          [
            {
              "node": "Merge49",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "createOperation": {
        "main": [
          [
            {
              "node": "Merge51",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros": {
        "main": [
          [
            {
              "node": "Merge51",
              "type": "main",
              "index": 1
            },
            {
              "node": "createOperation",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=1": {
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
      "HTTP Request9": {
        "main": [
          [
            {
              "node": "Wait16",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait16": {
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
      "Merge48": {
        "main": [
          [
            {
              "node": "Operation_subStage=1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge49",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge49": {
        "main": [
          [
            {
              "node": "UpdatedOperation17",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge50",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge50": {
        "main": [
          [
            {
              "node": "checkSubStageOperation",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "StartOperation17": {
        "main": [
          [
            {
              "node": "Merge48",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "UpdatedOperation17": {
        "main": [
          [
            {
              "node": "Merge50",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge51": {
        "main": [
          [
            {
              "node": "Bring operations subStage=1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "addlastDigRifs": {
        "main": [
          [
            {
              "node": "StartOperation18",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge52",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "HTTP Request11": {
        "main": [
          [
            {
              "node": "Wait17",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait17": {
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
      "SplitInBatches": {
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
      "Merge52": {
        "main": [
          [
            {
              "node": "Operation_subStage=",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge53",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge53": {
        "main": [
          [
            {
              "node": "UpdatedOperation18",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge54",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge54": {
        "main": [
          [
            {
              "node": "checkSubStageOperation1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "StartOperation18": {
        "main": [
          [
            {
              "node": "Merge52",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "UpdatedOperation18": {
        "main": [
          [
            {
              "node": "Merge54",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=": {
        "main": [
          [
            {
              "node": "Merge53",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros1": {
        "main": [
          [
            {
              "node": "Bring operations subStage=",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=": {
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
      "addlastDigRifs2": {
        "main": [
          [
            {
              "node": "StartOperation19",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge56",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "HTTP Request13": {
        "main": [
          [
            {
              "node": "Wait18",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait18": {
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
      "SplitInBatches3": {
        "main": [
          [
            {
              "node": "HTTP Request13",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge56": {
        "main": [
          [
            {
              "node": "Operation_subStage=2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge57",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge57": {
        "main": [
          [
            {
              "node": "UpdatedOperation19",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge58",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge58": {
        "main": [
          [
            {
              "node": "checkSubStageOperation2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "StartOperation19": {
        "main": [
          [
            {
              "node": "Merge56",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "UpdatedOperation19": {
        "main": [
          [
            {
              "node": "Merge58",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=2": {
        "main": [
          [
            {
              "node": "Merge57",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros2": {
        "main": [
          [
            {
              "node": "Bring operations subStage=2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=2": {
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
      "Webhook13": {
        "main": [
          [
            {
              "node": "Definición de parametros",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "checkSubStageOperation": {
        "main": [
          [
            {
              "node": "IF3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF3": {
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
      "checkSubStageOperation1": {
        "main": [
          [
            {
              "node": "IF",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF": {
        "main": [
          [
            {
              "node": "HTTP Request12",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "checkSubStageOperation2": {
        "main": [
          [
            {
              "node": "IF1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook14": {
        "main": [
          [
            {
              "node": "addlastDigRifs1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook15": {
        "main": [
          [
            {
              "node": "Definición de parametros1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook16": {
        "main": [
          [
            {
              "node": "addlastDigRifs",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook17": {
        "main": [
          [
            {
              "node": "Definición de parametros2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook18": {
        "main": [
          [
            {
              "node": "addlastDigRifs2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code Body4": {
        "main": [
          [
            {
              "node": "Merge55",
              "type": "main",
              "index": 1
            },
            {
              "node": "create_operation5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation5": {
        "main": [
          [
            {
              "node": "Merge55",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge55": {
        "main": [
          [
            {
              "node": "Wait20",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait21",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait22",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait20": {
        "main": [
          [
            {
              "node": "Code7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code7": {
        "main": [
          [
            {
              "node": "StartOperation20",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge59",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation20": {
        "main": [
          [
            {
              "node": "Merge59",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge59": {
        "main": [
          [
            {
              "node": "T01_2_totalizacionMes",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge60",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge60": {
        "main": [
          [
            {
              "node": "UpdatedOperation20",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge65",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation20": {
        "main": [
          [
            {
              "node": "Merge65",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait21": {
        "main": [
          [
            {
              "node": "Code8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code8": {
        "main": [
          [
            {
              "node": "StartOperation21",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge61",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation21": {
        "main": [
          [
            {
              "node": "Merge61",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge61": {
        "main": [
          [
            {
              "node": "T01_3_promedioAcumulado7M",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge62",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge62": {
        "main": [
          [
            {
              "node": "UpdatedOperation21",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge66",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation21": {
        "main": [
          [
            {
              "node": "Merge66",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait22": {
        "main": [
          [
            {
              "node": "Code9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code9": {
        "main": [
          [
            {
              "node": "StartOperation22",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge63",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation22": {
        "main": [
          [
            {
              "node": "Merge63",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge63": {
        "main": [
          [
            {
              "node": "T01_4_Integracion_Margenmetric",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge64",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge64": {
        "main": [
          [
            {
              "node": "UpdatedOperation22",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge67",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "UpdatedOperation22": {
        "main": [
          [
            {
              "node": "Merge67",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook19": {
        "main": [
          [
            {
              "node": "Code Body4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T01_2_totalizacionMes": {
        "main": [
          [
            {
              "node": "Merge60",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T01_3_promedioAcumulado7M": {
        "main": [
          [
            {
              "node": "Merge62",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T01_4_Integracion_Margenmetric": {
        "main": [
          [
            {
              "node": "Merge64",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code Body3": {
        "main": [
          [
            {
              "node": "Merge45",
              "type": "main",
              "index": 1
            },
            {
              "node": "create_operation4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "create_operation4": {
        "main": [
          [
            {
              "node": "Merge45",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge45": {
        "main": [
          [
            {
              "node": "Wait15",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait15": {
        "main": [
          [
            {
              "node": "Code6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code6": {
        "main": [
          [
            {
              "node": "StartOperation16",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge46",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "StartOperation16": {
        "main": [
          [
            {
              "node": "Merge46",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge46": {
        "main": [
          [
            {
              "node": "T02_2_acumuladoYTD",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge47",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge47": {
        "main": [
          [
            {
              "node": "UpdatedOperation16",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook11": {
        "main": [
          [
            {
              "node": "Code Body3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T02_2_acumuladoYTD": {
        "main": [
          [
            {
              "node": "Merge47",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge65": {
        "main": [
          [
            {
              "node": "HTTP Request23",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge66": {
        "main": [
          [
            {
              "node": "HTTP Request24",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge67": {
        "main": [
          [
            {
              "node": "HTTP Request25",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF1": {
        "main": [
          [
            {
              "node": "HTTP Request22",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }