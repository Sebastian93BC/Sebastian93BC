{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "34f06b83-5921-42e3-a122-34f9610b8060",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -10240,
          3660
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processName",
                "value": "={{$json.processName}}"
              },
              {
                "name": "processDate",
                "value": "{{$json.processDate}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "f500c20e-58b0-4abc-9568-edef85fd8cc4",
        "name": "HTTP Request2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          2740
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_0_1_margenLastDigRifMargen",
          "options": {}
        },
        "id": "9c253941-f6ec-4c27-b6f7-6c9ce90ef9f9",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -540,
          2800
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen",
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
        "id": "49b39fec-8b39-4792-bb3e-808bc3b4ba36",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -720,
          2800
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_0_1_margenLastDigRifMargen_val",
          "options": {}
        },
        "id": "d692395d-e44a-4c89-a787-a8b37b087641",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1020,
          2740
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f"
      },
      {
        "parameters": {
          "content": "P_6_margenFormateoSidisMargen",
          "height": 374.8353307071993,
          "width": 2389.8674479928163
        },
        "id": "28c0207f-3b0a-4dbd-a781-0c9b87a47915",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          1000,
          2560
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_6_margenFormateoSidisMargen",
          "options": {}
        },
        "id": "fee5ca0c-e205-4afa-920b-265e6392f9b7",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1860,
          2740
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "content": "P_0_1_margenShardingMargenShad",
          "height": 326.91073926126046,
          "width": 1787.135301598853
        },
        "id": "4c409f87-b9e4-4af0-9fcd-cf51ad1d2ebf",
        "name": "Note11",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          2640
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = []\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar processDate = body.processDate;\nvar processName = \"E1_Preprocesamiento_Mensual\"\n\noutPut.push({processName: processName, processDate: processDate });\n\nreturn outPut;\n"
        },
        "id": "5bac0355-bae3-460c-b8ba-6d9a9e782880",
        "name": "Code Body",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -1540,
          3880
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c3920dc6-9efb-43a0-b91b-95311b753e4d",
        "name": "Merge1",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1220,
          3860
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_0_1_margenShardingMargenShad\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "503b0e5b-1250-4b45-87bb-f67624248d41",
        "name": "Code Body1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -400,
          2800
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "482a04c7-57e1-4cfb-b5be-2a15108a581b",
        "name": "Merge2",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          260,
          2760
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f921d33f-b836-4b7f-a8d8-b419eef34b6f",
        "name": "Merge3",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          580,
          2740
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "margen",
          "query": "=[\n  {\n    \"$project\": {\n      \"mcl_rif_cedula\": 1, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$mcl_rif_cedula\", 8, -1\n        ]\n      }, \n      \"last2DigRif\": {\n        \"$substr\": [\n          \"$mcl_rif_cedula\", 7, -1\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"margen\", \n      \"on\": [\n        \"mcl_rif_cedula\", \"_id\"\n      ]\n    }\n  }\n]"
        },
        "id": "1e4b70e7-a0b7-4f24-b635-e9826e415890",
        "name": "P_0_1_margenShardingMargenShad",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          80,
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
          "batchSize": "=1",
          "options": {}
        },
        "id": "a1ac9795-5e3e-4f05-91ca-3aafdbc51a33",
        "name": "SplitInBatches",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1340,
          2740
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar parallelizationIndex = body.parallelizationIndex;\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, parallelizationIndex: parallelizationIndex});\n\nreturn outPut;"
        },
        "id": "41b7ded8-9ab8-4320-a7b0-a81b9124ee19",
        "name": "Digitos Rid Cedula5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2000,
          2740
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "7b1f7060-a000-4c81-9478-73d24b888205",
        "name": "Merge4",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          2700
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "8506919e-947e-4cf8-a6a3-1d27e4108d27",
        "name": "Merge6",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2320,
          2720
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar subProcessName = \"P_6_margenFormateoSidisMargen\"\nvar parallelizationIndexs=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n           \"10\",\n          ];\n\n\nvar outPut = []\nvar i = 0\nfor (const item of $input.all()) {\n  for (const parallelizationIndex of parallelizationIndexs) {\n    outPut.push({ processName: item.json.processName, processDate: item.json.processDate, subProcessName: subProcessName + \"_\" + parallelizationIndex[i], parallelizationIndex: parallelizationIndex[i]})\n     i++\n  }\n}\nreturn outPut;"
        },
        "id": "3962c915-d0f1-411c-a4fc-3093537c2043",
        "name": "addlastDigRifs",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1160,
          2740
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "margen",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              {\n                \"$switch\": {\n                  \"branches\": [\n                    {\n                      \"case\": {\n                        \"$eq\": [\n                          {\n                            \"$toString\": \"{{$json.parallelizationIndex}}\"\n                          }, \"10\"\n                        ]\n                      }, \n                      \"then\": true\n                    }\n                  ], \n                  \"default\": false\n                }\n              }, true\n            ]\n          }, \n          \"lastDigRif\": {\n            \"$nin\": [\n              \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              {\n                \"$switch\": {\n                  \"branches\": [\n                    {\n                      \"case\": {\n                        \"$eq\": [\n                          {\n                            \"$toString\": \"{{$json.parallelizationIndex}}\"\n                          }, \"10\"\n                        ]\n                      }, \n                      \"then\": true\n                    }\n                  ], \n                  \"default\": false\n                }\n              }, false\n            ]\n          }, \n          \"$expr\": {\n            \"$eq\": [\n              \"$lastDigRif\", {\n                \"$toString\": \"{{$json.parallelizationIndex}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"mcl_estatus\": {\n        \"$convert\": {\n          \"input\": \"$mcl_estatus\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_banca\": {\n        \"$convert\": {\n          \"input\": \"$mcl_banca\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_segmento\": {\n        \"$convert\": {\n          \"input\": \"$mcl_segmento\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_subsegmento\": {\n        \"$convert\": {\n          \"input\": \"$mcl_subsegmento\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_grupo_economico\": {\n        \"$convert\": {\n          \"input\": \"$mcl_grupo_economico\", \n          \"to\": \"string\", \n          \"onError\": \"$$REMOVE\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"mcl_nivel_socioecon\": {\n        \"$convert\": {\n          \"input\": \"$mcl_nivel_socioecon\", \n          \"to\": \"string\", \n          \"onError\": \"$$REMOVE\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"mcl_rif_cedula\": {\n        \"$trim\": {\n          \"input\": \"$mcl_rif_cedula\"\n        }\n      }, \n      \"mcl_nombre_cliente\": {\n        \"$trim\": {\n          \"input\": \"$mcl_nombre_cliente\"\n        }\n      }, \n      \"mcl_oficina_tutora\": {\n        \"$convert\": {\n          \"input\": \"$mcl_oficina_tutora\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_territorio\": {\n        \"$convert\": {\n          \"input\": \"$mcl_territorio\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_bin_tarjeta\": {\n        \"$convert\": {\n          \"input\": \"$mcl_bin_tarjeta\", \n          \"to\": \"string\", \n          \"onError\": \"$mcl_bin_tarjeta\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"mcl_naturaleza_producto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_naturaleza_producto\", \n          \"to\": \"string\", \n          \"onError\": \"$mcl_naturaleza_producto\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"mcl_producto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_producto\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_oficina_contrato\": {\n        \"$convert\": {\n          \"input\": \"$mcl_oficina_contrato\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_territorio_contrato\": {\n        \"$convert\": {\n          \"input\": \"$mcl_territorio_contrato\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_entidad_banco\": {\n        \"$convert\": {\n          \"input\": \"$mcl_entidad_banco\", \n          \"to\": \"string\", \n          \"onError\": \"0\", \n          \"onNull\": \"0\"\n        }\n      }, \n      \"mcl_dias\": {\n        \"$convert\": {\n          \"input\": \"$mcl_dias\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_tipo_producto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_tipo_producto\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_origen\": {\n        \"$convert\": {\n          \"input\": \"$mcl_origen\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_total_ctas_asoc\": {\n        \"$convert\": {\n          \"input\": \"$mcl_total_ctas_asoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_provision_generica\": {\n        \"$convert\": {\n          \"input\": \"$mcl_provision_generica\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_provision_especifica\": {\n        \"$convert\": {\n          \"input\": \"$mcl_provision_especifica\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_provision_dudosidad\": {\n        \"$convert\": {\n          \"input\": \"$mcl_provision_dudosidad\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_provision_rendimiento\": {\n        \"$convert\": {\n          \"input\": \"$mcl_provision_rendimiento\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_convenios\": {\n        \"$convert\": {\n          \"input\": \"$mcl_convenios\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_producto_altair\": {\n        \"$convert\": {\n          \"input\": \"$mcl_producto_altair\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_subproducto_altair\": {\n        \"$convert\": {\n          \"input\": \"$mcl_subproducto_altair\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_saldo\": {\n        \"$convert\": {\n          \"input\": \"$mcl_saldo\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_promedio\": {\n        \"$convert\": {\n          \"input\": \"$mcl_promedio\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_comisiones\": {\n        \"$convert\": {\n          \"input\": \"$mcl_comisiones\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_intereses\": {\n        \"$convert\": {\n          \"input\": \"$mcl_intereses\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_egresos_operativos\": {\n        \"$convert\": {\n          \"input\": \"$mcl_egresos_operativos\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_provision\": {\n        \"$convert\": {\n          \"input\": \"$mcl_provision\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_tasa_pool\": {\n        \"$convert\": {\n          \"input\": \"$mcl_tasa_pool\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_pool\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_pool\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_numero_debitos\": {\n        \"$convert\": {\n          \"input\": \"$mcl_numero_debitos\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_debitos\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_debitos\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_numero_creditos\": {\n        \"$convert\": {\n          \"input\": \"$mcl_numero_creditos\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_creditos\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_creditos\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_rendimiento\": {\n        \"$convert\": {\n          \"input\": \"$mcl_rendimiento\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_contable1\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_contable1\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_contable2\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_contable2\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_costo_efectivo\": {\n        \"$convert\": {\n          \"input\": \"$mcl_costo_efectivo\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_margen_bruto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_margen_bruto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_margen_neto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_margen_neto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_saldo_minimo\": {\n        \"$convert\": {\n          \"input\": \"$mcl_saldo_minimo\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_saldo_disponible\": {\n        \"$convert\": {\n          \"input\": \"$mcl_saldo_disponible\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_apertura\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_apertura\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_limite_credito\": {\n        \"$convert\": {\n          \"input\": \"$mcl_limite_credito\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_bloqueado\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_bloqueado\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_diferido\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_diferido\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_interes_cta_flexible\": {\n        \"$convert\": {\n          \"input\": \"$mcl_interes_cta_flexible\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_interes_devengado\": {\n        \"$convert\": {\n          \"input\": \"$mcl_interes_devengado\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_tasa_pool_2\": {\n        \"$convert\": {\n          \"input\": \"$mcl_tasa_pool_2\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_monto_pool_2\": {\n        \"$convert\": {\n          \"input\": \"$mcl_monto_pool_2\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_saldo_prom_contable\": {\n        \"$convert\": {\n          \"input\": \"$mcl_saldo_prom_contable\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_porc_margen_bruto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_porc_margen_bruto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_porc_margen_neto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_porc_margen_neto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"mcl_fecha_apertura_d\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_apertura_d\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_canc_venci_d\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_canc_venci_d\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_revision_d\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_revision_d\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_ult_tran_d\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_ult_tran_d\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_prox_reprice\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_prox_reprice\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_proceso\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_proceso\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_reprice\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_reprice\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_fin_promocion\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_fin_promocion\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_liq_operacion\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_liq_operacion\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_apertura\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_apertura\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_canc_venci\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_canc_venci\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_revision\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_revision\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_fecha_ult_tran\": {\n        \"$dateFromString\": {\n          \"dateString\": \"$mcl_fecha_ult_tran\", \n          \"format\": \"%d/%m/%Y %H:%M:%S\", \n          \"onNull\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }, \n          \"onError\": {\n            \"$dateFromString\": {\n              \"dateString\": \"1990-01-01T00:00:00.000+00:00\"\n            }\n          }\n        }\n      }, \n      \"mcl_id_ejecutivo\": {\n        \"$convert\": {\n          \"input\": \"$mcl_id_ejecutivo\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_id_ejecutivo\"\n        }\n      }, \n      \"mcl_cuenta_asociada_1\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_asociada_1\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_asociada_1\"\n        }\n      }, \n      \"mcl_cuenta_contable1\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_contable1\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_contable1\"\n        }\n      }, \n      \"mcl_cuenta_asociada_3\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_asociada_3\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_asociada_3\"\n        }\n      }, \n      \"mcl_cuenta_asociada_4\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_asociada_4\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_asociada_4\"\n        }\n      }, \n      \"mcl_cuenta_asociada_2\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_asociada_2\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_asociada_2\"\n        }\n      }, \n      \"mcl_divisa\": {\n        \"$convert\": {\n          \"input\": \"$mcl_divisa\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_divisa\"\n        }\n      }, \n      \"mcl_contrato\": {\n        \"$convert\": {\n          \"input\": \"$mcl_contrato\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_contrato\"\n        }\n      }, \n      \"mcl_rif_asociado\": {\n        \"$convert\": {\n          \"input\": \"$mcl_rif_asociado\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_rif_asociado\"\n        }\n      }, \n      \"mcl_escala\": {\n        \"$convert\": {\n          \"input\": \"$mcl_escala\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_escala\"\n        }\n      }, \n      \"mcl_cuenta_contable2\": {\n        \"$convert\": {\n          \"input\": \"$mcl_cuenta_contable2\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_cuenta_contable2\"\n        }\n      }, \n      \"mcl_documento_asociado\": {\n        \"$convert\": {\n          \"input\": \"$mcl_documento_asociado\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_documento_asociado\"\n        }\n      }, \n      \"mcl_subtipo_producto\": {\n        \"$convert\": {\n          \"input\": \"$mcl_subtipo_producto\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_subtipo_producto\"\n        }\n      }, \n      \"mcl_ejecutivo\": {\n        \"$convert\": {\n          \"input\": \"$mcl_ejecutivo\", \n          \"to\": \"string\", \n          \"onError\": \"\", \n          \"onNull\": \"$mcl_ejecutivo\"\n        }\n      }, \n      \"file_date\": 1, \n      \"last2DigRif\": 1, \n      \"lastDigRif\": 1\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_productos\", \n      \"localField\": \"mcl_producto\", \n      \"foreignField\": \"prd_codigo_producto\", \n      \"as\": \"sidisProducto\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_libreconvertibilidad_convenio20\", \n      \"localField\": \"mcl_cuenta_contable1\", \n      \"foreignField\": \"cuentaContable\", \n      \"as\": \"sidisLibreconvertibilidadConvenio20\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_tasaconversion\", \n      \"localField\": \"mcl_fecha_proceso\", \n      \"foreignField\": \"Fecha\", \n      \"as\": \"sidisTasaconversion\"\n    }\n  }, {\n    \"$addFields\": {\n      \"sidisProducto\": {\n        \"$first\": \"$sidisProducto\"\n      }, \n      \"sidisLibreconvertibilidadConvenio20\": {\n        \"$first\": \"$sidisLibreconvertibilidadConvenio20\"\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }, \n      \"mcl_cuenta_contable1_substr\": {\n        \"$substr\": [\n          \"$mcl_cuenta_contable1\", 1, 3\n        ]\n      }, \n      \"mcl_cuenta_contable1_indicador\": {\n        \"$substr\": [\n          \"$mcl_cuenta_contable1\", 0, 3\n        ]\n      }, \n      \"prd_nombre_producto\": {\n        \"$arrayElemAt\": [\n          \"$sidisProducto.prd_nombre_producto\", 0\n        ]\n      }, \n      \"resultSize\": {\n        \"$size\": \"$sidisLibreconvertibilidadConvenio20\"\n      }, \n      \"condicion\": {\n        \"$first\": \"$sidisLibreconvertibilidadConvenio20.condicion\"\n      }, \n      \"moneda_base\": \"BOLIVARES\", \n      \"tasa_dolar\": {\n        \"$arrayElemAt\": [\n          \"$sidisTasaconversion.Tasa_DOL\", 0\n        ]\n      }, \n      \"relacion_eur\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$arrayElemAt\": [\n                  \"$sidisTasaconversion.Tasa_EUR\", 0\n                ]\n              }, {\n                \"$arrayElemAt\": [\n                  \"$sidisTasaconversion.Tasa_DOL\", 0\n                ]\n              }\n            ]\n          }, 4\n        ]\n      }, \n      \"tipoConsulta\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$mcl_estatus\", \"A\"\n                    ]\n                  }, {\n                    \"$eq\": [\n                      \"$mcl_naturaleza_producto\", \"1\"\n                    ]\n                  }, {\n                    \"$not\": {\n                      \"$in\": [\n                        \"$mcl_banca\", [\n                          4, 5, \"4\", \"5\"\n                        ]\n                      ]\n                    }\n                  }\n                ]\n              }, \n              \"then\": 1\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$mcl_estatus\", \"A\"\n                    ]\n                  }, {\n                    \"$in\": [\n                      \"$mcl_naturaleza_producto\", [\n                        \"2\", \"6\"\n                      ]\n                    ]\n                  }, {\n                    \"$not\": {\n                      \"$in\": [\n                        \"$mcl_producto\", [\n                          196, 197, 198, 808, 809\n                        ]\n                      ]\n                    }\n                  }, {\n                    \"$not\": {\n                      \"$in\": [\n                        \"$mcl_banca\", [\n                          4, 5, \"4\", \"5\"\n                        ]\n                      ]\n                    }\n                  }, {\n                    \"$not\": {\n                      \"$in\": [\n                        {\n                          \"$substr\": [\n                            \"$mcl_cuenta_contable1\", 1, 3\n                          ]\n                        }, [\n                          \"231\", \"241\", \"611\", \"819\"\n                        ]\n                      ]\n                    }\n                  }\n                ]\n              }, \n              \"then\": 2\n            }\n          ], \n          \"default\": 0\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_margen\", \n      \"on\": [\n        \"mcl_rif_cedula\", \"_id\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "6c03207b-b5ef-42bd-9199-8aacb28943f8",
        "name": "P_6_margenFormateoSidisMargen",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2520,
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
          "httpMethod": "POST",
          "path": "P_1_clienteFormateoIntegracion_CBS",
          "options": {}
        },
        "id": "da9cdd30-c34b-4299-87c8-b298e37b5306",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -540,
          3140
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "content": "P_1_clienteFormateoIntegracion_CBS",
          "height": 325.1699142949638,
          "width": 1793.004991946238
        },
        "id": "d84ef745-1071-4251-b5f6-9cf4da338dae",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          2980
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c2c09c5c-9ce7-4a85-99b3-ae536f0fd95f",
        "name": "Merge5",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -80,
          3120
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "cc87ffa0-b200-49b9-883e-aa4b02e1dbf0",
        "name": "Merge7",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          260,
          3100
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c1681d89-3210-4958-b12f-54a941ee9fa8",
        "name": "Merge9",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          580,
          3080
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "clientes",
          "query": "=[\n  {\n    \"$match\": {\n      \"cli_banca\": {\n        \"$nin\": [\n          5, 4, \"5\", \"4\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"sidisCliente\": {\n        \"_id\": \"$_id\", \n        \"cli_rif\": {\n          \"$trim\": {\n            \"input\": \"$cli_rif\"\n          }\n        }, \n        \"cli_nom_cliente\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_cliente\"\n          }\n        }, \n        \"cli_cod_ejecutivo\": {\n          \"$trim\": {\n            \"input\": \"$cli_cod_ejecutivo\"\n          }\n        }, \n        \"cli_sect_econ\": {\n          \"$trim\": {\n            \"input\": \"$cli_sect_econ\"\n          }\n        }, \n        \"cli_nom_banca\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_banca\"\n          }\n        }, \n        \"cli_nom_segmento\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_segmento\"\n          }\n        }, \n        \"cli_nom_subsegmento\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_subsegmento\"\n          }\n        }, \n        \"cli_nom_grupo_econ\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_grupo_econ\"\n          }\n        }, \n        \"cli_banca\": {\n          \"$convert\": {\n            \"input\": \"$cli_banca\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"cli_segmento\": {\n          \"$convert\": {\n            \"input\": \"$cli_segmento\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"cli_subsegmento\": {\n          \"$convert\": {\n            \"input\": \"$cli_subsegmento\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"cli_cod_grupo_econ\": {\n          \"$convert\": {\n            \"input\": \"$cli_cod_grupo_econ\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"cli_cod_ofic_tutora\": {\n          \"$convert\": {\n            \"input\": \"$cli_cod_ofic_tutora\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"cli_nom_ejecut_cuenta\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_ejecut_cuenta\"\n          }\n        }, \n        \"cli_nom_ofic_tutora\": {\n          \"$trim\": {\n            \"input\": \"$cli_nom_ofic_tutora\"\n          }\n        }, \n        \"cli_direccion\": {\n          \"$trim\": {\n            \"input\": \"$cli_direccion\"\n          }\n        }, \n        \"cli_cdef_ciudad\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_ciudad\"\n          }\n        }, \n        \"cli_estado\": {\n          \"$trim\": {\n            \"input\": \"$cli_estado\"\n          }\n        }, \n        \"cli_cdef_cod_postal\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_cod_postal\"\n          }\n        }, \n        \"cli_cdef_telefono1\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_telefono1\"\n          }\n        }, \n        \"cli_cdef_telefono2\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_telefono2\"\n          }\n        }, \n        \"cli_cdef_fax\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_fax\"\n          }\n        }, \n        \"cli_cdef_email\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_email\"\n          }\n        }, \n        \"cli_cdef_sexo\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_sexo\"\n          }\n        }, \n        \"cli_cdef_niv_estudios\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_niv_estudios\"\n          }\n        }, \n        \"cli_cdef_estadocivil\": {\n          \"$trim\": {\n            \"input\": \"$cli_cdef_estadocivil\"\n          }\n        }, \n        \"cli_serv_clave\": {\n          \"$trim\": {\n            \"input\": \"$cli_serv_clave\"\n          }\n        }, \n        \"cli_sector\": {\n          \"$trim\": {\n            \"input\": \"$cli_sector\"\n          }\n        }, \n        \"cli_marca_cliente\": {\n          \"$trim\": {\n            \"input\": \"$cli_marca_cliente\"\n          }\n        }, \n        \"cli_actividad_econ\": {\n          \"$trim\": {\n            \"input\": \"$cli_actividad_econ\"\n          }\n        }, \n        \"cli_desc_act_econ\": {\n          \"$trim\": {\n            \"input\": \"$cli_desc_act_econ\"\n          }\n        }, \n        \"cli_num_per\": 1, \n        \"cli_marca_itf\": {\n          \"$trim\": {\n            \"input\": \"$cli_marca_itf\"\n          }\n        }, \n        \"cli_fec_nac\": {\n          \"$toDate\": \"$cli_fec_nac\"\n        }, \n        \"cli_cdef_fecha_alta\": {\n          \"$toDate\": \"$cli_cdef_fecha_alta\"\n        }, \n        \"cli_fecha_carga\": {\n          \"$toDate\": \"$cli_fecha_carga\"\n        }, \n        \"cli_fecha_apertura\": {\n          \"$toDate\": \"$cli_fecha_apertura\"\n        }, \n        \"file_date\": 1, \n        \"cli_entidad\": {\n          \"$convert\": {\n            \"input\": \"$cli_entidad\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cdef_dependientes\": {\n          \"$convert\": {\n            \"input\": \"$cli_cdef_dependientes\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_activo_cont\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_activo_cont\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_activo_prod\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_activo_prod\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_pasivo_cont\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_pasivo_cont\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_pasivo_prod\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_pasivo_prod\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_coloca_cont\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_coloca_cont\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_coloca_prod\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_coloca_prod\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_capta_cont\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_capta_cont\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cross_capta_prod\": {\n          \"$convert\": {\n            \"input\": \"$cli_cross_capta_prod\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_cdef_facturacion\": {\n          \"$convert\": {\n            \"input\": \"$cli_cdef_facturacion\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"cli_ingre_econ\": {\n          \"$convert\": {\n            \"input\": \"$cli_ingre_econ\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }\n      }, \n      \"rifCedula\": {\n        \"$trim\": {\n          \"input\": \"$cli_rif\"\n        }\n      }, \n      \"fechaProceso\": {\n        \"$toDate\": \"$cli_fecha_carga\"\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$cli_rif\", 8, -1\n        ]\n      }, \n      \"origenCliente\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$_id\", null\n            ]\n          }, \n          \"then\": false, \n          \"else\": true\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_cliente_base_segmentacion\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "9577c6bc-e3bf-4888-8f80-9c97692a6da3",
        "name": "P_1_clienteFormateoIntegracion_CBS",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          80,
          3000
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
          "content": "P_2_segmentacionFormateoIntegracion_CBS",
          "height": 332.87687746234224,
          "width": 1796.1945556531512
        },
        "id": "244a5f6e-2daf-4fc5-bd19-1797d3e0f8b4",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          3320
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_2_segmentacionFormateoIntegracion_CBS",
          "options": {}
        },
        "id": "f53c0e52-4b11-4fa0-b88f-93c79599981e",
        "name": "Webhook5",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -520,
          3500
        ],
        "webhookId": "3ab038c6-7704-4b64-a5e7-e87cd2f89618"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fec79d82-b300-4a8d-b87d-2b59a9502d03",
        "name": "Merge11",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          280,
          3460
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "afc854db-e34e-442e-8503-524a949e3aa3",
        "name": "Merge12",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          600,
          3440
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "segmentacion",
          "query": "=[\n  {\n    \"$match\": {\n      \"seg_banca\": {\n        \"$nin\": [\n          \"5\", \"4\", 4, 5\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"sidisSegmentacion\": {\n        \"_id\": \"$_id\", \n        \"seg_rif_cedula\": {\n          \"$trim\": {\n            \"input\": \"$seg_rif_cedula\"\n          }\n        }, \n        \"seg_nombre_banca\": {\n          \"$trim\": {\n            \"input\": \"$seg_nombre_banca\"\n          }\n        }, \n        \"seg_fecha_nac\": {\n          \"$convert\": {\n            \"input\": \"$seg_fecha_nac\", \n            \"to\": \"date\", \n            \"onError\": \"$seg_fecha_nac\", \n            \"onNull\": \"$$REMOVE\"\n          }\n        }, \n        \"seg_fecha_apertura_d\": {\n          \"$convert\": {\n            \"input\": \"$seg_fecha_apertura_d\", \n            \"to\": \"date\", \n            \"onError\": \"$seg_fecha_apertura_d\", \n            \"onNull\": \"$$REMOVE\"\n          }\n        }, \n        \"file_date\": {\n          \"$convert\": {\n            \"input\": \"$file_date\", \n            \"to\": \"date\", \n            \"onError\": \"$file_date\", \n            \"onNull\": \"$$REMOVE\"\n          }\n        }, \n        \"seg_fecha_canc_venci_d\": {\n          \"$convert\": {\n            \"input\": \"$seg_fecha_canc_venci_d\", \n            \"to\": \"date\", \n            \"onError\": \"$seg_fecha_canc_venci_d\", \n            \"onNull\": \"$$REMOVE\"\n          }\n        }, \n        \"seg_fecha_alta\": {\n          \"$convert\": {\n            \"input\": \"$seg_fecha_alta\", \n            \"to\": \"date\", \n            \"onError\": \"$seg_fecha_alta\", \n            \"onNull\": \"$$REMOVE\"\n          }\n        }, \n        \"seg_nombre_segmento\": {\n          \"$trim\": {\n            \"input\": \"$seg_nombre_segmento\"\n          }\n        }, \n        \"seg_nombre_territorio\": {\n          \"$trim\": {\n            \"input\": \"$seg_nombre_territorio\"\n          }\n        }, \n        \"seg_nombre_oficina\": {\n          \"$trim\": {\n            \"input\": \"$seg_nombre_oficina\"\n          }\n        }, \n        \"seg_nombre_subsegmento\": {\n          \"$trim\": {\n            \"input\": \"$seg_nombre_subsegmento\"\n          }\n        }, \n        \"seg_banca\": {\n          \"$convert\": {\n            \"input\": \"$seg_banca\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"seg_segmento\": {\n          \"$convert\": {\n            \"input\": \"$seg_segmento\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"seg_subsegmento\": {\n          \"$convert\": {\n            \"input\": \"$seg_subsegmento\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"seg_territorio\": {\n          \"$convert\": {\n            \"input\": \"$seg_territorio\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"seg_oficina_tutora\": {\n          \"$convert\": {\n            \"input\": \"$seg_oficina_tutora\", \n            \"to\": \"string\", \n            \"onError\": \"0\", \n            \"onNull\": \"0\"\n          }\n        }, \n        \"seg_estatus\": {\n          \"$trim\": {\n            \"input\": \"$seg_estatus\"\n          }\n        }, \n        \"seg_nivel_socioecon_real\": {\n          \"$trim\": {\n            \"input\": \"$seg_nivel_socioecon_real\"\n          }\n        }, \n        \"seg_nivel_socioecon_sn\": {\n          \"$trim\": {\n            \"input\": \"$seg_nivel_socioecon_sn\"\n          }\n        }, \n        \"seg_nivel_socioecon_lc\": {\n          \"$trim\": {\n            \"input\": \"$seg_nivel_socioecon_lc\"\n          }\n        }, \n        \"seg_nivel_socioecon_prom\": {\n          \"$trim\": {\n            \"input\": \"$seg_nivel_socioecon_prom\"\n          }\n        }, \n        \"seg_nivel_socioecon_est\": {\n          \"$trim\": {\n            \"input\": \"$seg_nivel_socioecon_est\"\n          }\n        }, \n        \"seg_tipo_cliente\": {\n          \"$trim\": {\n            \"input\": \"$seg_tipo_cliente\"\n          }\n        }, \n        \"seg_tipo_cliente_per_ant\": {\n          \"$trim\": {\n            \"input\": \"$seg_tipo_cliente_per_ant\"\n          }\n        }, \n        \"seg_tipo_cliente_trim\": {\n          \"$trim\": {\n            \"input\": \"$seg_tipo_cliente_trim\"\n          }\n        }, \n        \"seg_tipo_cliente_acum\": {\n          \"$trim\": {\n            \"input\": \"$seg_tipo_cliente_acum\"\n          }\n        }, \n        \"seg_tipo_cliente_per_ant_acum\": {\n          \"$trim\": {\n            \"input\": \"$seg_tipo_cliente_per_ant_acum\"\n          }\n        }, \n        \"seg_cnt_contratos\": {\n          \"$convert\": {\n            \"input\": \"$seg_cnt_contratos\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cnt_productos\": {\n          \"$convert\": {\n            \"input\": \"$seg_cnt_productos\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_num_debitos\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_num_debitos\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_num_creditos\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_num_creditos\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cnt_producto_fam\": {\n          \"$convert\": {\n            \"input\": \"$seg_cnt_producto_fam\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_deb_ult_3m\": {\n          \"$convert\": {\n            \"input\": \"$seg_deb_ult_3m\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cre_ult_3m\": {\n          \"$convert\": {\n            \"input\": \"$seg_cre_ult_3m\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cant_cta_transac\": {\n          \"$convert\": {\n            \"input\": \"$seg_cant_cta_transac\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cant_tarj_deb\": {\n          \"$convert\": {\n            \"input\": \"$seg_cant_tarj_deb\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cant_prod\": {\n          \"$convert\": {\n            \"input\": \"$seg_cant_prod\", \n            \"to\": \"int\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_saldo\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_saldo\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_limite_credito\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_limite_credito\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_promedio\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_promedio\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_monto_debitos\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_monto_debitos\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_monto_creditos\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_monto_creditos\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_sum_producto_fam\": {\n          \"$convert\": {\n            \"input\": \"$seg_sum_producto_fam\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cierre_activo\": {\n          \"$convert\": {\n            \"input\": \"$seg_cierre_activo\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_saldo_prom_ult_3m\": {\n          \"$convert\": {\n            \"input\": \"$seg_saldo_prom_ult_3m\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_margen_basico_bruto\": {\n          \"$convert\": {\n            \"input\": \"$seg_margen_basico_bruto\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_ratio\": {\n          \"$convert\": {\n            \"input\": \"$seg_ratio\", \n            \"to\": \"decimal\", \n            \"onError\": 0, \n            \"onNull\": 0\n          }\n        }, \n        \"seg_cliente_gestionable\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_gestionable\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_gestionable\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_gestionable\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_vinculado\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_vinculado\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_vinculado\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_vinculado\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_nomina\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_nomina\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_nomina\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_nomina\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_universidades\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_universidades\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_universidades\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_universidades\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_gest\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_gest\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_gest\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_gest\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_vinc\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_vinc\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_todos\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_todos\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_todos\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_todos\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_part\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_part\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_part\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_part\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_jur\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_jur\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_jur\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_jur\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_todos_gest\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_todos_gest\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_todos_gest\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_todos_gest\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_part_gest\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_part_gest\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_part_gest\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_part_gest\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_jur_gest\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_jur_gest\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_jur_gest\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_jur_gest\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_todos_vinc\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_todos_vinc\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_todos_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_todos_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_part_vinc\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_part_vinc\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_part_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_part_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }, \n        \"seg_cliente_mbb_jur_vinc\": {\n          \"$switch\": {\n            \"branches\": [\n              {\n                \"case\": {\n                  \"$eq\": [\n                    \"S\", \"$seg_cliente_mbb_jur_vinc\"\n                  ]\n                }, \n                \"then\": true\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"N\", \"$seg_cliente_mbb_jur_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }, {\n                \"case\": {\n                  \"$eq\": [\n                    \"\", \"$seg_cliente_mbb_jur_vinc\"\n                  ]\n                }, \n                \"then\": false\n              }\n            ]\n          }\n        }\n      }, \n      \"rifCedula\": \"$seg_rif_cedula\", \n      \"fechaProceso\": \"$seg_fecha_proceso\", \n      \"persona\": {\n        \"$cond\": {\n          \"if\": {\n            \"$in\": [\n              \"$seg_segmento\", [\n                \"2\", \"4\", \"7\", \"10\", \"20\"\n              ]\n            ]\n          }, \n          \"then\": \"Natural\", \n          \"else\": {\n            \"$cond\": [\n              {\n                \"$eq\": [\n                  \"$seg_segmento\", \"0\"\n                ]\n              }, \"NDA\", \"Jurídica\"\n            ]\n          }\n        }\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$seg_rif_cedula\", 8, -1\n        ]\n      }, \n      \"origenSegmentacion\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$_id\", null\n            ]\n          }, \n          \"then\": false, \n          \"else\": true\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_cliente_base_segmentacion\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenNotMatched\": \"insert\", \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "ee6a8e2d-9e14-4911-9acb-610c269394d2",
        "name": "P_2_segmentacionFormateoIntegracion_CBS",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          100,
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
          "content": "P_3_baseClienteFormateoIntegracion_CBS",
          "height": 349.6596043882523,
          "width": 1814.7443332796897
        },
        "id": "ce87201e-2414-456d-83f2-4706b8ce3298",
        "name": "Note4",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          3680
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "cd751ee8-8c5f-4dd2-be64-14caaa6dfbcb",
        "name": "Merge13",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -60,
          3840
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_3_baseClienteFormateoIntegracion_CBS",
          "options": {}
        },
        "id": "c0d25a16-3f42-4a18-81f0-435b945fac7d",
        "name": "Webhook6",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -520,
          3860
        ],
        "webhookId": "3ab038c6-7704-4b64-a5e7-e87cd2f89618"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "91b44583-5fa3-4ae1-acaf-7c28359a3241",
        "name": "Merge14",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          280,
          3820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5a06631b-6068-4178-999e-b8c8f46a68b3",
        "name": "Merge15",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          600,
          3800
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "base_cliente",
          "query": "=[\n  {\n    \"$match\": {\n      \"mbc_cod_banca\": {\n        \"$nin\": [\n          5, 4, \"5\", \"4\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"sidisBaseCliente\": {\n        \"mbc_fecha_proceso\": {\n          \"$toDate\": \"$mbc_fecha_proceso\"\n        }, \n        \"mbc_feve\": {\n          \"$toBool\": \"$mbc_feve\"\n        }, \n        \"mbc_uai\": {\n          \"$toBool\": \"$mbc_uai\"\n        }\n      }, \n      \"rifCedula\": \"$mbc_rif_cliente\", \n      \"fechaProceso\": {\n        \"$toDate\": \"$mbc_fecha_proceso\"\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$mbc_rif_cliente\", 8, -1\n        ]\n      }, \n      \"origenBaseCliente\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              \"$_id\", null\n            ]\n          }, \n          \"then\": false, \n          \"else\": true\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_cliente_base_segmentacion\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "e7aacba7-0acf-4366-bc0c-b84f400b534f",
        "name": "P_3_baseClienteFormateoIntegracion_CBS",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          100,
          3720
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
          "content": "P_4_beneficiarioFormateoSidisBeneficiario",
          "height": 352.44074369714997,
          "width": 1811.1239099845334
        },
        "id": "a66bbce2-64c9-4e63-a5e8-fc8ba38f03ad",
        "name": "Note5",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          4060
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_4_beneficiarioFormateoSidisBeneficiario",
          "options": {}
        },
        "id": "8f3c8a0b-83a4-4a4a-88a3-4b1423b5c4c4",
        "name": "Webhook7",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -520,
          4240
        ],
        "webhookId": "3ab038c6-7704-4b64-a5e7-e87cd2f89618"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5d6777dc-bb23-4e7c-8206-b50102155be3",
        "name": "Merge17",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          280,
          4200
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "529367e8-85ab-4c4d-9aab-8e355a071ec2",
        "name": "Merge18",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          600,
          4180
        ]
      },
      {
        "parameters": {
          "content": "P_5_ordenanteFormateoSidisOrdenante",
          "height": 348.2564247793342,
          "width": 1804.1666865311765
        },
        "id": "f446ce09-e95a-4454-b6f1-13ed8bcc4ef5",
        "name": "Note6",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          4440
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "650f3d73-2c2a-45d1-9fb3-69a56db9320a",
        "name": "Merge19",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -60,
          4600
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "P_5_ordenanteFormateoSidisOrdenante",
          "options": {}
        },
        "id": "35a57de6-093c-4ce5-a215-b1ed9be5fe93",
        "name": "Webhook8",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -520,
          4620
        ],
        "webhookId": "3ab038c6-7704-4b64-a5e7-e87cd2f89618"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "e9d9428b-8214-444a-8e23-1be5e77b8298",
        "name": "Merge20",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          280,
          4580
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "91029b1c-8306-4f75-affe-76faa9aad6fe",
        "name": "Merge21",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          580,
          4560
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "beneficiario",
          "query": "=[\n  {\n    \"$set\": {\n      \"snb_rif_empresa\": {\n        \"$trim\": {\n          \"input\": \"$snb_rif_empresa\"\n        }\n      }, \n      \"snb_ci_benefic\": {\n        \"$trim\": {\n          \"input\": \"$snb_ci_benefic\"\n        }\n      }, \n      \"snb_num_cuenta\": {\n        \"$trim\": {\n          \"input\": \"$snb_num_cuenta\"\n        }\n      }, \n      \"snb_id_reflote\": {\n        \"$trim\": {\n          \"input\": \"$snb_id_reflote\"\n        }\n      }, \n      \"snb_fec_valor\": {\n        \"$convert\": {\n          \"input\": \"$snb_fec_valor\", \n          \"to\": \"date\", \n          \"onError\": \"$snb_fec_valor\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"snb_ind_cobcomi\": {\n        \"$convert\": {\n          \"input\": \"$snb_ind_cobcomi\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobahoben\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobahoben\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobahoord\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobahoord\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobcteben\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobcteben\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobcteord\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobcteord\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_pcorrecto\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_pcorrecto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_ctaben\": {\n        \"$convert\": {\n          \"input\": \"$snb_tipo_ctaben\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mecan_pago\": {\n        \"$trim\": {\n          \"input\": \"$snb_mecan_pago\"\n        }\n      }, \n      \"snb_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$snb_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$snb_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_registro\": {\n        \"$trim\": {\n          \"input\": \"$snb_tipo_registro\"\n        }\n      }, \n      \"snb_interfaz\": {\n        \"$trim\": {\n          \"input\": \"$snb_interfaz\"\n        }\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$snb_rif_empresa\", 8, -1\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"snb_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$snb_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$snb_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_ctaben\": {\n        \"$convert\": {\n          \"input\": \"$snb_tipo_ctaben\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"fechaProceso\": {\n        \"$subtract\": [\n          {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$snb_fec_valor\"\n              }, \n              \"month\": {\n                \"$sum\": [\n                  {\n                    \"$month\": \"$snb_fec_valor\"\n                  }, 1\n                ]\n              }\n            }\n          }, 86400000\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_beneficiario\", \n      \"on\": [\n        \"snb_ci_benefic\", \"snb_rif_empresa\", \"snb_id_debito\", \"_id\"\n      ], \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "acf270fc-8d72-414e-b269-9b8ef874a49c",
        "name": "P_4_beneficiarioFormateoSidisBeneficiario",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          100,
          4100
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
          "collection": "ordenante",
          "query": "=[\n  {\n    \"$set\": {\n      \"sno_ind_cobcomi\": {\n        \"$convert\": {\n          \"input\": \"$sno_ind_cobcomi\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$sno_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$sno_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_mto_debito\": {\n        \"$convert\": {\n          \"input\": \"$sno_mto_debito\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_mto_actuali\": {\n        \"$convert\": {\n          \"input\": \"$sno_mto_actuali\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_mto_cobcomi\": {\n        \"$convert\": {\n          \"input\": \"$sno_mto_cobcomi\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_fec_valor\": {\n        \"$convert\": {\n          \"input\": \"$sno_fec_valor\", \n          \"to\": \"date\", \n          \"onError\": \"$sno_fec_valor\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"sno_fec_inineg\": {\n        \"$convert\": {\n          \"input\": \"$sno_fec_inineg\", \n          \"to\": \"date\", \n          \"onError\": \"$sno_fec_inineg\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"sno_fec_recarch\": {\n        \"$convert\": {\n          \"input\": \"$sno_fec_recarch\", \n          \"to\": \"date\", \n          \"onError\": \"$sno_fec_recarch\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"sno_num_cuenta\": {\n        \"$trim\": {\n          \"input\": \"$sno_num_cuenta\"\n        }\n      }, \n      \"sno_id_reflote\": {\n        \"$trim\": {\n          \"input\": \"$sno_id_reflote\"\n        }\n      }, \n      \"sno_rif_empresa\": {\n        \"$trim\": {\n          \"input\": \"$sno_rif_empresa\"\n        }\n      }, \n      \"sno_medio_envi\": {\n        \"$trim\": {\n          \"input\": \"$sno_medio_envi\"\n        }\n      }, \n      \"sno_tipo_pago\": {\n        \"$trim\": {\n          \"input\": \"$sno_tipo_pago\"\n        }\n      }, \n      \"sno_neg_priabon\": {\n        \"$trim\": {\n          \"input\": \"$sno_neg_priabon\"\n        }\n      }, \n      \"sno_neg_sinabon\": {\n        \"$trim\": {\n          \"input\": \"$sno_neg_sinabon\"\n        }\n      }, \n      \"sno_cta_cobcomi\": {\n        \"$trim\": {\n          \"input\": \"$sno_cta_cobcomi\"\n        }\n      }, \n      \"sno_tipo_sobreg\": {\n        \"$trim\": {\n          \"input\": \"$sno_tipo_sobreg\"\n        }\n      }, \n      \"sno_serial_nego\": {\n        \"$trim\": {\n          \"input\": \"$sno_serial_nego\"\n        }\n      }, \n      \"sno_regla_negoc\": {\n        \"$trim\": {\n          \"input\": \"$sno_regla_negoc\"\n        }\n      }, \n      \"sno_id_perfil\": {\n        \"$trim\": {\n          \"input\": \"$sno_id_perfil\"\n        }\n      }, \n      \"sno_tipo_registro\": {\n        \"$trim\": {\n          \"input\": \"$sno_tipo_registro\"\n        }\n      }, \n      \"sno_interfaz\": {\n        \"$trim\": {\n          \"input\": \"$sno_interfaz\"\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sno_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$sno_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"sno_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$sno_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"fechaProceso\": {\n        \"$subtract\": [\n          {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$sno_fec_valor\"\n              }, \n              \"month\": {\n                \"$sum\": [\n                  {\n                    \"$month\": \"$sno_fec_valor\"\n                  }, 1\n                ]\n              }\n            }\n          }, 86400000\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_ordenante\", \n      \"on\": [\n        \"sno_rif_empresa\", \"sno_id_debito\", \"_id\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "8cc74579-96d1-4bfb-8660-84efc70a4298",
        "name": "P_5_ordenanteFormateoSidisOrdenante",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          120,
          4480
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
        "id": "a094b0e2-edae-4922-9778-abe374f30c32",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -80,
          2780
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c56ae541-0ea6-400c-bd3d-cef0ccf6be90",
        "name": "Merge22",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -60,
          3480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a97a1f21-8498-4609-a604-95e60405638b",
        "name": "Merge23",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -60,
          4220
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "672e0864-2a25-4415-ad9b-454e3da257fb",
        "name": "Merge10",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3020,
          2680
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"{{$json.processName}}\"\n      }\n    }, {\n      \"$set\": {\n        \"processDate\": {\n          \"$toDate\": \"{{$json.processDate}}\"\n        }, \n        \"startDate\": \"$$NOW\", \n        \"status\": \"En Proceso\"\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess.parallelizationIndex\", \n        \"preserveNullAndEmptyArrays\": true\n      }\n    }, {\n      \"$match\": {\n        \"subProcess.activeProcess\": true\n      }\n    }, {\n      \"$set\": {\n        \"subProcess.subProcessName\": {\n          \"$cond\": [\n            {\n              \"$ifNull\": [\n                \"$subProcess.parallelizationIndex\", false\n              ]\n            }, {\n              \"$concat\": [\n                \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n              ]\n            }, \"$subProcess.subProcessName\"\n          ]\n        }, \n        \"subProcess.subProcessDate\": \"$processDate\", \n        \"subProcess.status\": \"En Espera\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$processName\", \n        \"processName\": {\n          \"$first\": \"$processName\"\n        }, \n        \"processDate\": {\n          \"$first\": \"$processDate\"\n        }, \n        \"processFrequency\": {\n          \"$first\": \"$processFrequency\"\n        }, \n        \"fromColletion\": {\n          \"$first\": \"$fromColletion\"\n        }, \n        \"toColletion\": {\n          \"$first\": \"$toColletion\"\n        }, \n        \"startDate\": {\n          \"$first\": \"$startDate\"\n        }, \n        \"endDate\": {\n          \"$first\": \"$endDate\"\n        }, \n        \"runtimeInMinutes\": {\n          \"$first\": \"$runtimeInMinutes\"\n        }, \n        \"status\": {\n          \"$first\": \"$status\"\n        }, \n        \"subProcess\": {\n          \"$push\": \"$subProcess\"\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ], \n        \"whenMatched\": \"replace\"\n      }\n    }\n  ]"
        },
        "id": "4541832a-9d88-42be-89a3-859758ebd48c",
        "name": "1_created_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1380,
          3780
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
        "id": "a3e83501-bf58-4f76-8ac9-2736a8be1e1a",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1500,
          2740
        ],
        "webhookId": "950dc6f9-c0ea-4414-8922-b45ab0a35de4"
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "eb4ae31e-f54b-4d1e-8247-649b184625ba",
        "name": "Wait1",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -860,
          2800
        ],
        "webhookId": "7bb71d52-578e-4625-89b1-846c613ed9dc"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "a4999090-b2b1-40c6-b0ed-6bad0b8e626c",
        "name": "Wait2",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -860,
          3140
        ],
        "webhookId": "2ff9338a-58cd-4fad-804f-b856e9e970e5"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "b80c294f-a2f5-4279-ac2d-bbf266c245a5",
        "name": "Wait3",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -840,
          3500
        ],
        "webhookId": "2d1b669f-6397-4eea-a09b-9d4b87a621e3"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "57eddbbe-8787-4519-b5d3-01830ec6258b",
        "name": "Wait4",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -840,
          3860
        ],
        "webhookId": "a379eb5b-1098-458f-9829-036936ee690d"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "f4df3b2c-ae75-4507-8226-26b65a3cc659",
        "name": "Wait5",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -840,
          4240
        ],
        "webhookId": "1e3b37ba-3055-4947-90e4-435ffb1e4324"
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "bf980ae4-84a9-4da9-94f3-fa9fc62792c2",
        "name": "Wait6",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -840,
          4620
        ],
        "webhookId": "9e91b13a-be3f-4a4c-839b-fb3b65fc0f60"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "e73fb12d-ae13-4ebf-8a9b-adbd192cf6bf",
        "name": "addlastDigRifs1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -7400,
          3620
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/e0fc568b-bacc-4151-a1a6-48a10591cca2",
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
        "id": "d7170fd4-a6d1-40a4-bd0d-dcfff8be9ab5",
        "name": "HTTP Request8",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -7900,
          3620
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "e0fc568b-bacc-4151-a1a6-48a10591cca2",
          "options": {}
        },
        "id": "557ccf64-67aa-4ae9-88dc-1dc9a48924a1",
        "name": "Webhook9",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -7540,
          3620
        ],
        "webhookId": "e0fc568b-bacc-4151-a1a6-48a10591cca2"
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "2e478de3-a5ae-4762-b713-ff75bfb0fbbe",
        "name": "Wait7",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -7740,
          3620
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "5bc3d185-64bd-4f5d-8e65-f4d6cb1347e5",
        "name": "SplitInBatches2",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -8060,
          3620
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/1967fcb3-16ae-4753-90a3-f30937560db9",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "={{$json.processDate}}"
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
        "id": "efe1cde5-1196-406d-86ee-bcd3f0939742",
        "name": "HTTP Request11",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -9140,
          3640
        ]
      },
      {
        "parameters": {
          "content": "E1_PREPROCESAMIENTO_DIARIO tasas paso 1",
          "height": 414.7254355369307,
          "width": 3899.330371169306
        },
        "id": "aad5dbf1-4175-4c00-ab48-563f86588155",
        "name": "Note9",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -9920,
          3400
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "cb541c25-1cca-46ed-8366-2d0bbfcda5ff",
        "name": "Merge24",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -7080,
          3600
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c643429a-f06e-4763-a7e3-5dedc0009451",
        "name": "Merge25",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -6760,
          3580
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5cac716c-75f6-47d5-8261-85448375d043",
        "name": "Merge26",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -6420,
          3560
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "71b754ba-7de1-4277-b106-dc62f7095fb5",
        "name": "StartOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -7240,
          3520
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
        "id": "115e739d-58d2-4047-8085-b4a27c40d048",
        "name": "UpdatedOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -6600,
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
          "operation": "aggregate",
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "ac953b44-6366-4ed1-b903-555f4672763a",
        "name": "Operation_subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -6920,
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
        "id": "3cb57ae1-1601-4cae-a395-7143843f9967",
        "name": "Merge27",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -8420,
          3620
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "3988efd8-6668-4302-9c8e-11e743e60cf3",
        "name": "createOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -8580,
          3560
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Tasas\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "447c6b9b-29c0-4e98-bb64-434670ed71e7",
        "name": "Definición de parametros",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -8740,
          3640
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "5d75e084-9851-41b7-a559-eaf271acf50d",
        "name": "Bring operations subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -8240,
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
          "httpMethod": "POST",
          "path": "1967fcb3-16ae-4753-90a3-f30937560db9",
          "options": {}
        },
        "id": "3c10c34a-2a34-4558-b8f9-0874a514c7d9",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -8920,
          3640
        ],
        "webhookId": "1967fcb3-16ae-4753-90a3-f30937560db9"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/001d7b27-ede7-4183-9d1b-4dff5fc6ba6e",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "offSet",
                "value": "=1"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "247631d2-f3d9-4208-aaf1-c870d24d0e9e",
        "name": "HTTP Request12",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -9900,
          3640
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "001d7b27-ede7-4183-9d1b-4dff5fc6ba6e",
          "options": {}
        },
        "id": "2f0b6375-480e-454f-972b-ffd3c724694b",
        "name": "Webhook10",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -9700,
          3640
        ],
        "webhookId": "001d7b27-ede7-4183-9d1b-4dff5fc6ba6e"
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst offSet = body.offSet;\n\noutput.push({offSet: offSet});\n\nreturn output;"
        },
        "id": "888f0b8f-a6d6-4816-bdf9-2fce54780672",
        "name": "Definición de parametros1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -9520,
          3640
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"processDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": {\n              \"$dateTrunc\": {\n                \"date\": {\n                  \"$subtract\": [\n                    {\n                      \"$toDate\": {\n                        \"$dateTrunc\": {\n                          \"date\": \"$$NOW\", \n                          \"unit\": \"day\"\n                        }\n                      }\n                    }, {\n                      \"$multiply\": [\n                        {\n                          \"$toInt\": \"{{$json.offSet}}\"\n                        }, 86400000\n                      ]\n                    }\n                  ]\n                }, \n                \"unit\": \"day\"\n              }\n            }\n          }, 0, 10\n        ]\n      }, \n      \"_id\": 0\n    }\n  }\n]"
        },
        "id": "b4eadddf-9983-4895-ad74-81bd5688c547",
        "name": "fechaProceso_Diario",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -9340,
          3640
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/28eb2161-9f70-4da9-8b9b-15f05295caa3",
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
        "id": "90669083-9d07-456f-8b6b-0c13e8258a67",
        "name": "HTTP Request10",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -6240,
          3560
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "c1ec053c-9962-412c-a870-5439c401bcf1",
        "name": "addlastDigRifs2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -7380,
          4020
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/6f21e107-b298-4afa-87a4-36186b421ad4",
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
        "id": "e2d70458-78bb-4932-8f4b-c2524477c366",
        "name": "HTTP Request9",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -7880,
          4020
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "5e734525-56c8-4d29-917e-88c42d757b46",
        "name": "Wait8",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -7720,
          4020
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "de6fe82d-3de9-45da-90de-38b963f9303b",
        "name": "SplitInBatches3",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -8040,
          4020
        ]
      },
      {
        "parameters": {
          "content": "E1_PREPROCESAMIENTO_DIARIO tasas paso 2",
          "height": 425.2581732667307,
          "width": 2601.840098619042
        },
        "id": "4063f743-1121-487d-bd3a-14bb57a9dd59",
        "name": "Note10",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -8640,
          3880
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "079ce6ea-d704-465c-8fb3-6008ac39eef8",
        "name": "Merge28",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -7060,
          4000
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f3971229-c3e2-4ba5-b1eb-998316c7effd",
        "name": "Merge29",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -6740,
          3980
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "0e04afd1-b8a5-4f06-a012-82082f6ee311",
        "name": "Merge30",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -6400,
          3960
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "aa9bedb7-e794-4063-af00-b40d600464b4",
        "name": "StartOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -7220,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "9b3e99b3-c30e-4b7c-b90e-50d8ebf17ca8",
        "name": "UpdatedOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -6580,
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "5774ed4f-e842-4770-a600-de98ed643a61",
        "name": "Operation_subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -6900,
          3900
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Tasas\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"2\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "18aa8ff8-9f0e-46c2-91c8-22df49835ff8",
        "name": "Definición de parametros2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -8420,
          4020
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "68b1591b-7903-4c6c-ad6e-0399979a7004",
        "name": "Bring operations subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -8220,
          4020
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/c079470a-6390-45b3-84c8-991deaab6aae",
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
        "id": "6c867194-5132-41cf-bfbe-5e2db3d6a3a2",
        "name": "HTTP Request13",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -6220,
          3960
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "28eb2161-9f70-4da9-8b9b-15f05295caa3",
          "options": {}
        },
        "id": "1408fdb8-843f-401f-8a7e-e13510903cea",
        "name": "Webhook11",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -8580,
          4020
        ],
        "webhookId": "28eb2161-9f70-4da9-8b9b-15f05295caa3"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "6f21e107-b298-4afa-87a4-36186b421ad4",
          "options": {}
        },
        "id": "643b753e-3f39-4947-a094-67110e649e85",
        "name": "Webhook12",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -7520,
          4020
        ],
        "webhookId": "6f21e107-b298-4afa-87a4-36186b421ad4"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "133988a2-81be-4ec1-9ae8-f7cd30af0ea0",
        "name": "addlastDigRifs3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -4440,
          3940
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/58934a44-333c-4394-93f5-48e8c218fb94",
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
        "id": "dc47fac0-a7d7-4f93-b46e-e404ffb208da",
        "name": "HTTP Request14",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -4940,
          3940
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "83097eab-e34a-4926-8fd8-2a923ebaa272",
        "name": "Wait9",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -4780,
          3940
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "d383c358-a943-4483-bb7d-ff90d3a8a280",
        "name": "SplitInBatches4",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -5100,
          3940
        ]
      },
      {
        "parameters": {
          "content": "E1_PREPROCESAMIENTO_DIARIO ",
          "height": 362.21665444522284,
          "width": 2905.182945237283
        },
        "id": "234a6463-65f9-4d6a-9750-6591d8f669ab",
        "name": "Note12",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -5980,
          3780
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "696f0ce0-9264-4c99-87e9-b981efd2c439",
        "name": "Merge31",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -4120,
          3920
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4e01bc78-90bf-4bc8-bc79-5f3744c8688c",
        "name": "Merge32",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -3800,
          3900
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5cc137a6-4144-4a58-824f-513d8ac96819",
        "name": "Merge33",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -3460,
          3880
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "f1df5225-14af-4dca-806c-ae528c87dead",
        "name": "StartOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -4280,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bcffff26-3e4d-43a6-9085-8553bccf11fb",
        "name": "UpdatedOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -3640,
          3800
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
        "id": "8d05376c-896b-4f36-8afc-893949b945b1",
        "name": "Operation_subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -3960,
          3820
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
        "id": "00fa1c74-3607-4f3f-b6be-0104f632d77d",
        "name": "Merge34",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -5460,
          3940
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "0e10e784-c654-4535-b683-b10b3ed057e9",
        "name": "createOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -5620,
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
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Diario\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "51659063-c970-44d8-adae-a5c832cfc5a3",
        "name": "Definición de parametros3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -5780,
          3960
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "3fc6a8da-0c66-48ca-ba2e-aaf49e5c4577",
        "name": "Bring operations subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -5280,
          3940
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
          "path": "c079470a-6390-45b3-84c8-991deaab6aae",
          "options": {}
        },
        "id": "ffd4038a-edd1-447b-bd6a-08a01cc9879a",
        "name": "Webhook13",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -5920,
          3960
        ],
        "webhookId": "c079470a-6390-45b3-84c8-991deaab6aae"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "58934a44-333c-4394-93f5-48e8c218fb94",
          "options": {}
        },
        "id": "8256687b-6a9e-4544-91b3-24c12694824b",
        "name": "Webhook14",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -4600,
          3940
        ],
        "webhookId": "58934a44-333c-4394-93f5-48e8c218fb94"
      },
      {
        "parameters": {
          "content": "Una vez finalizado el procesamiento diario y el proceso mensual",
          "height": 300.74038275796136,
          "width": 654.0381105867614
        },
        "id": "832c6c44-561a-49ef-8b80-fa70f6f4eba8",
        "name": "Note13",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -1720,
          3740
        ]
      },
      {
        "parameters": {
          "content": "control ingesta, de las colecciones curdas que van a margen",
          "height": 294.94775115327155,
          "width": 1180.1020772146721
        },
        "id": "5434f264-a17a-4329-9b80-018fbaeda03e",
        "name": "Note14",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2980,
          3800
        ]
      },
      {
        "parameters": {
          "content": "P_7_FINANCIALSTATEMENT",
          "height": 342.46864041522826,
          "width": 1821.494388223283
        },
        "id": "7951c73f-14c0-4ffa-bcc5-81d0c06e3dbf",
        "name": "Note15",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -880,
          4820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fa7583d3-aa49-4317-8898-d81676daf379",
        "name": "Merge36",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          320,
          4960
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f1b1f2b7-f396-4518-ac05-df2e4f3abcbf",
        "name": "Merge37",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          600,
          4940
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "d5082617-92da-4ef1-b670-1f5a91077689",
          "options": {}
        },
        "id": "5077b5cb-6106-4a69-95cf-0dc9e82b98f2",
        "name": "Webhook15",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -500,
          5000
        ],
        "webhookId": "d5082617-92da-4ef1-b670-1f5a91077689"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2e1f2d5e-198b-4880-9d35-323e1e90dcce",
        "name": "Merge38",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -40,
          4980
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "90302f6b-20ca-4c26-a17e-81bbbc4c258f",
          "options": {}
        },
        "id": "8d019343-0fd5-4d3b-9f56-165603e44a7c",
        "name": "Webhook16",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -1680,
          3880
        ],
        "webhookId": "90302f6b-20ca-4c26-a17e-81bbbc4c258f"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/d2611937-e5cf-4c96-96f6-33653962a876",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
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
        "id": "7649abcb-4f86-4fd9-977a-d208ea0bd589",
        "name": "HTTP Request37",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          760,
          5240
        ]
      },
      {
        "parameters": {
          "content": "E2_PROCESAMIENTO\n",
          "height": 257.6961707665416,
          "width": 278.07682941005004
        },
        "id": "552d9c1d-052f-4a88-88a7-56d51974c538",
        "name": "Note17",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          660,
          5180
        ]
      },
      {
        "parameters": {
          "content": "Test operaciones con paralelización\n",
          "height": 348.31949580936816,
          "width": 2740.5618332812774
        },
        "id": "c50e7a87-6a87-4c18-906a-2545a0379adc",
        "name": "Note18",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -10020,
          6720
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "40509bd4-5588-41ba-a258-9c763ca20594",
        "name": "addlastDigRifs4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -8180,
          6880
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/690576e8-2c30-47ab-a677-5e98f4014533",
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
        "id": "daf05d40-b03c-4eb8-87fa-ec3bc8ddfe87",
        "name": "HTTP Request18",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -8680,
          6880
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "97a683f2-d5c3-4db1-8a69-6fa611e90736",
        "name": "Wait11",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -8500,
          6880
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "44bd791d-fd78-4081-9d7d-97ed2be71166",
        "name": "SplitInBatches5",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -8840,
          6880
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a8799880-3b8b-4896-ac7c-f8d23ed9a53c",
        "name": "Merge39",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -7820,
          6860
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "rawTransaccionesComisiones",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                {\n                  \"$substr\": [\n                    \"$tra_rif\", 8, -1\n                  ]\n                }, \"{{$json.parallelizationIndex}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$gte\": [\n                \"$file_date\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }, {\n            \"tra_banca\": {\n              \"$nin\": [\n                \"5\", 5, \"4\", 4, \"0\", 0, \"1\", 1\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$addFields\": {\n        \"fechaProceso\": {\n          \"$dateFromParts\": {\n            \"year\": {\n              \"$year\": \"$tra_fecha_operacion\"\n            }, \n            \"month\": {\n              \"$add\": [\n                {\n                  \"$month\": \"$tra_fecha_operacion\"\n                }, 1\n              ]\n            }, \n            \"day\": {\n              \"$subtract\": [\n                {\n                  \"$dayOfMonth\": {\n                    \"$dateFromParts\": {\n                      \"year\": {\n                        \"$year\": \"$tra_fecha_operacion\"\n                      }, \n                      \"month\": {\n                        \"$add\": [\n                          {\n                            \"$month\": \"$tra_fecha_operacion\"\n                          }, 1\n                        ]\n                      }, \n                      \"day\": 1\n                    }\n                  }\n                }, 1\n              ]\n            }, \n            \"hour\": 0, \n            \"minute\": 0, \n            \"second\": 0, \n            \"millisecond\": 0\n          }\n        }, \n        \"firstDigRif\": {\n          \"$substr\": [\n            \"$tra_rif\", 0, 1\n          ]\n        }, \n        \"lastDigRif\": {\n          \"$substr\": [\n            \"$tra_rif\", 8, -1\n          ]\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_transaccionesComisionesNew\", \n        \"on\": [\n          \"tra_rif\", \"fechaProceso\", \"tra_cuenta_contable\", \"tra_cod_op\", \"_id\"\n        ], \n        \"whenMatched\": \"replace\", \n        \"whenNotMatched\": \"insert\"\n      }\n    }\n  ]"
        },
        "id": "a0d7c1fb-221c-48c9-b3f5-e384e98d95a9",
        "name": "Operation_subStage=3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -8000,
          6760
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
          "jsCode": "var body\nvar outPut = [];\nparallelizationIndexs=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n          ];\nvar processName = \"\";  //process name\nvar processDate = \"\";\nvar subProcessName = \"\";  //process name\nvar offSet = \"\";\nvar parallelizationIndex = \"0\"\n\nvar i = 0\n\nfor (const item of $input.all()) {\n  for (const parallelizationIndex of parallelizationIndexs) {\n    outPut.push({processName: processName, processDate: item.json.processDate, subProcessName: subProcessName, offSet: item.json.offSet, parallelizationIndex: parallelizationIndex,})\n     i++\n  }\n}\n\n\nreturn outPut;"
        },
        "id": "1e7247d8-619a-467f-97b3-5359b639b192",
        "name": "Definición de parametros7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -9080,
          6880
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/a4914885-eeed-4b45-b25d-9a61e33633d7",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "offSet",
                "value": "=24"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "41ec1c3c-6549-41a2-82fe-21b27af95947",
        "name": "HTTP Request20",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -9960,
          6900
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst offSet = body.offSet;\n\noutput.push({offSet: offSet});\n\nreturn output;"
        },
        "id": "44aa2125-2387-4ce6-93c8-44acc82b48dd",
        "name": "Definición de parametros8",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -9600,
          6900
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n     \"offSet\": \"{{$json.offSet}}\",\n      \"processDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": {\n              \"$dateTrunc\": {\n                \"date\": {\n                  \"$subtract\": [\n                    {\n                      \"$toDate\": {\n                        \"$dateTrunc\": {\n                          \"date\": \"$$NOW\", \n                          \"unit\": \"day\"\n                        }\n                      }\n                    }, {\n                      \"$multiply\": [\n                        {\n                          \"$toInt\": \"{{$json.offSet}}\"\n                        }, 86400000\n                      ]\n                    }\n                  ]\n                }, \n                \"unit\": \"day\"\n              }\n            }\n          }, 0, 10\n        ]\n      }, \n      \"_id\": 0\n    }\n  }\n]"
        },
        "id": "1646e9de-875a-4f45-a2b4-c771bb6bfda8",
        "name": "fechaProceso_Diario1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -9240,
          6880
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
          "path": "a4914885-eeed-4b45-b25d-9a61e33633d7",
          "options": {}
        },
        "id": "325e3caf-5406-4102-858f-0cbe27518ae5",
        "name": "Webhook18",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -9760,
          6900
        ],
        "webhookId": "a4914885-eeed-4b45-b25d-9a61e33633d7"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "690576e8-2c30-47ab-a677-5e98f4014533",
          "options": {}
        },
        "id": "1d8c4918-163f-485e-a097-f84e8081dfc2",
        "name": "Webhook19",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -8320,
          6880
        ],
        "webhookId": "690576e8-2c30-47ab-a677-5e98f4014533"
      },
      {
        "parameters": {
          "jsCode": "var fechaProceso\nvar proceso \n  proceso = [\n    \"P_6_margenFormateoSidisMargen_0\",\n    \"P_6_margenFormateoSidisMargen_1\",\n    \"P_6_margenFormateoSidisMargen_2\",\n    \"P_6_margenFormateoSidisMargen_3\",\n    \"P_6_margenFormateoSidisMargen_4\",\n    \"P_6_margenFormateoSidisMargen_5\",\n    \"P_6_margenFormateoSidisMargen_6\",\n    \"P_6_margenFormateoSidisMargen_7\",\n    \"P_6_margenFormateoSidisMargen_8\",\n    \"P_6_margenFormateoSidisMargen_9\",\n    \"P_6_margenFormateoSidisMargen_10\",\n    \n  ];\nvar lastDigRifs\n  lastDigRifs=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n           \"10\",\n          ];\nvar result = []\nvar i = 0\nvar j = 0\nfor (const item of $input.all()) {\n  for (const lastDigRif of lastDigRifs) {\n    result.push({fechaProceso: item.json.fechaProceso,lastDigRif:lastDigRif,proceso:proceso[i]})\n     i++\n  }\n}\nreturn result;"
        },
        "id": "5dcb4eb8-cb1f-45d5-899c-e0999e7fd72c",
        "name": "addlastDigRifs5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -8960,
          7320
        ]
      },
      {
        "parameters": {
          "conditions": {
            "number": [
              {
                "value1": "={{$json}}",
                "operation": "isNotEmpty"
              },
              {
                "value1": "={{$json.offSet}}",
                "operation": "largerEqual",
                "value2": 1
              }
            ]
          }
        },
        "id": "827570f8-bee6-4c32-8c8d-05143ec10fa0",
        "name": "IF5",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          -9440,
          6900
        ]
      },
      {
        "parameters": {
          "conditions": {
            "number": [
              {
                "value1": "={{$json.parallelizationIndex}}",
                "operation": "largerEqual",
                "value2": "9"
              }
            ]
          }
        },
        "id": "25c94fd1-e4a3-4ca8-b6ec-65d19fd599a0",
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          -7660,
          6860
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/a4914885-eeed-4b45-b25d-9a61e33633d7",
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
                "value": "={{$json.offSet-1}}"
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
        "id": "13f9e2c8-5fdb-4d3a-bbeb-95f9fad970f1",
        "name": "HTTP Request19",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -7460,
          6840
        ],
        "disabled": true
      },
      {
        "parameters": {
          "jsCode": "var outPut = [];\n\nvar processDate\n\nfor (const item of $input.all()) {\n  processDate = item.json.processDate;\n}\nvar processDate = \"2024-02-29\"  //cambiar por la variable de processDate\nvar processName = \"E1_Preprocesamiento_Diario\"\n\n\noutPut.push({ processName: processName, processDate: processDate, });\n\nreturn outPut;"
        },
        "id": "21787be5-b099-4517-aae5-b2d46b0e7b1d",
        "name": "Definición de parametros9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2540,
          3900
        ]
      },
      {
        "parameters": {
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.process=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "78abd5a0-b426-4b86-9134-3f3936dd4131",
        "name": "IF3",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          -2220,
          3900
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/b1626ee1-2156-4d7b-8894-91bd06a976a8",
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
        "id": "f6a79959-be04-4042-b656-f5cb6872a622",
        "name": "HTTP Request22",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -1980,
          3880
        ],
        "disabled": true
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "2c7a4125-496b-47dc-9c6c-c0c9ab0dfcfc",
          "options": {}
        },
        "id": "b333b5c5-5777-44dc-adad-35e02b03051b",
        "name": "Webhook20",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -2700,
          3900
        ],
        "webhookId": "2c7a4125-496b-47dc-9c6c-c0c9ab0dfcfc"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/2c7a4125-496b-47dc-9c6c-c0c9ab0dfcfc",
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "dcf22108-2497-45de-be9d-7b228205e3c1",
        "name": "HTTP Request23",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -2920,
          3900
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E1_Preprocesamiento_Diario\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"status\": 1\n    }\n  }\n]"
        },
        "id": "8bc176e6-dbb3-4e36-b28d-006100960859",
        "name": "CheckDailyOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -2380,
          3900
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
        "id": "68d5e1b5-d276-4668-a09e-51ea9967396b",
        "name": "Wait10",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -820,
          5000
        ],
        "webhookId": "e9427d1e-7f40-4602-a3bb-e7a6b51faebb"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Financialstatement",
          "query": "=[\n    {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            {\n              \"$dateAdd\": {\n                \"startDate\": {\n                  \"$dateAdd\": {\n                    \"startDate\": {\n                      \"$dateTrunc\": {\n                        \"date\": \"$fechaProceso\", \n                        \"unit\": \"month\"\n                      }\n                    }, \n                    \"unit\": \"month\", \n                    \"amount\": 1\n                  }\n                }, \n                \"unit\": \"day\", \n                \"amount\": -1\n              }\n            }, {\n              \"$toDate\": \"{{$json.processDate}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_Financialstatement\", \n        \"on\": [\n          \"fechaProceso\", \"name\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "ca768f43-fe30-4f5c-a4c0-762fe0a88d75",
        "name": "T06_0_formateoTransferenciaDataCrudaSidis",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          140,
          4860
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_1_clienteFormateoIntegracion_CBS",
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
        "id": "83d0c6a0-c901-4fa5-be67-43e58b95cebb",
        "name": "HTTP Request1",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -720,
          3140
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_2_segmentacionFormateoIntegracion_CBS",
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
        "id": "aa37a12b-3cea-4ecd-9cad-977e09c36613",
        "name": "HTTP Request3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -700,
          3500
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_3_baseClienteFormateoIntegracion_CBS",
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
        "id": "c53f4e6a-b18e-4a45-bc44-4be5a9da7b14",
        "name": "HTTP Request5",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -700,
          3860
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_4_beneficiarioFormateoSidisBeneficiario",
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
        "id": "80ce35a4-9179-49d8-bcdc-1dfcab46a6a9",
        "name": "HTTP Request6",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -700,
          4240
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_5_ordenanteFormateoSidisOrdenante",
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
        "id": "308aa9e9-b3d7-4bf4-b259-fa45fb9002f6",
        "name": "HTTP Request7",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -700,
          4620
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/d5082617-92da-4ef1-b670-1f5a91077689",
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
        "id": "7c8c3cac-108e-4b4c-ab31-4ae214da9546",
        "name": "HTTP Request16",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -680,
          5000
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_1_clienteFormateoIntegracion_CBS\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "6be24a67-ba6e-4050-915a-c695fe993219",
        "name": "Code Body2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -400,
          3140
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_2_segmentacionFormateoIntegracion_CBS\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "5622e57c-a733-47b5-aeea-db3dfb404f0d",
        "name": "Code Body3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -380,
          3500
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_3_baseClienteFormateoIntegracion_CBS\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "dcab37f4-b850-450b-aab6-b36f64d1db19",
        "name": "Code Body4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -380,
          3860
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_4_beneficiarioFormateoSidisBeneficiario\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "c875e37b-8bf0-45da-880f-6e58217c9fea",
        "name": "Code Body5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -380,
          4240
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcess = \"P_5_ordenanteFormateoSidisOrdenante\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "5cc05537-6df5-4ee2-9c81-c46bb57d102b",
        "name": "Code Body6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -380,
          4620
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"T06_0_formateoTransferenciaDataCrudaSidis\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;"
        },
        "id": "160ea6e2-14f1-46f4-b128-1e6412ea532e",
        "name": "Code Body7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -360,
          5000
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "997972ce-d5a8-4f34-99c7-76db77d2077f",
        "name": "StartOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -240,
          2700
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
        "id": "4ecca635-c25b-40a3-94e6-ebb66b8a71c3",
        "name": "StartOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -240,
          3040
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
        "id": "af994a13-881a-44e1-8c5a-f78ac14567c2",
        "name": "StartOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
          3400
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
        "id": "c324c89d-f588-4919-82b4-d00e107cdfe2",
        "name": "StartOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
          3760
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
        "id": "093fddde-8fb4-4070-89ce-ecbf7e4b2fea",
        "name": "StartOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
          4140
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
        "id": "6176302c-580a-4305-b8aa-aec82ec6fe35",
        "name": "StartOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
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
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2816b496-9419-43e5-b53e-30c59ddb2b1f",
        "name": "StartOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -200,
          4900
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
        "id": "c43e4e53-d161-4f16-abe6-76d0af71abb2",
        "name": "UpdatedOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          400,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bda5646e-95ce-4972-aa96-407b513765c9",
        "name": "UpdatedOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          420,
          3000
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
        "id": "100d2142-2ffb-4bdd-9288-e68d9246d0ac",
        "name": "UpdatedOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          440,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5f258de0-894f-48e4-90e9-9ad4f6870665",
        "name": "UpdatedOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          420,
          3720
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
        "id": "b9af9df5-edee-46f0-a2cc-168ae76c5299",
        "name": "UpdatedOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          440,
          4100
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
        "id": "820e3c2a-8fb8-47d0-9d48-fdffd5762031",
        "name": "UpdatedOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          420,
          4480
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
        "id": "4efeefe1-95af-4522-bab0-1fc0ccdd4fec",
        "name": "UpdatedOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          460,
          4860
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "460e87de-5fea-4172-9310-6d4d7b2cacf7",
        "name": "HTTP Request17",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          3080
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "572d2e8e-6daf-4951-9f5d-43c7bc46ba66",
        "name": "HTTP Request21",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          3440
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "f09d07e6-f7d0-4aa3-97bb-1daa3b7a0d8d",
        "name": "HTTP Request24",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          760,
          3800
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "ebbdc0c7-a455-415a-b891-d2db90ac3661",
        "name": "HTTP Request25",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          4180
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "91e9ecb2-a750-4484-8fbe-c5a84ccb8a9b",
        "name": "HTTP Request26",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          4560
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "373afc6f-c73f-4a07-bd70-57e55c9799a3",
        "name": "HTTP Request27",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          760,
          4940
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
              },
              {
                "name": "subProcessName",
                "value": "={{$json.subProcessName}}"
              },
              {
                "name": "parallelizationIndex",
                "value": "={{$json.parallelizationIndex}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "f688f2db-6094-47d2-a942-0cc9d0ea5dbd",
        "name": "HTTP Request28",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1660,
          2740
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "c475694e-d4d4-47b7-8f54-ac4da1def091",
        "name": "StartOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2160,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "9a25bb58-8995-486b-a12a-4ccc4cedb16a",
        "name": "UpdatedOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
          2580
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_0_1_margenLastDigRifMargen_val",
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
        "id": "4b69b2e7-3896-4e36-9be2-f9f2719c8dd8",
        "name": "HTTP Request4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3200,
          2680
        ]
      },
      {
        "parameters": {
          "content": "preprocesamiento mensual",
          "height": 2902.6787793631993,
          "width": 6436.245187718749
        },
        "id": "9bd4a3f1-cc6d-450c-8fec-708fbc077f3a",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -3000,
          2540
        ]
      }
    ],
    "connections": {
      "Webhook": {
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
      "Webhook3": {
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
      "Webhook1": {
        "main": [
          [
            {
              "node": "Digitos Rid Cedula5",
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
              "node": "1_created_operation",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge1",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge1": {
        "main": [
          [
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
            },
            {
              "node": "Wait10",
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
              "node": "Merge",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation3",
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
              "node": "UpdatedOperation3",
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
              "node": "HTTP Request2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "P_0_1_margenShardingMargenShad": {
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
      "Digitos Rid Cedula5": {
        "main": [
          [
            {
              "node": "Merge6",
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
      "Merge4": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation10",
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
              "node": "P_6_margenFormateoSidisMargen",
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
      "addlastDigRifs": {
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
      "P_6_margenFormateoSidisMargen": {
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
      "Webhook4": {
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
      "Merge5": {
        "main": [
          [
            {
              "node": "P_1_clienteFormateoIntegracion_CBS",
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
      "Merge7": {
        "main": [
          [
            {
              "node": "Merge9",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation4",
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
              "node": "HTTP Request17",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "P_1_clienteFormateoIntegracion_CBS": {
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
      "Webhook5": {
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
      "Merge11": {
        "main": [
          [
            {
              "node": "Merge12",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation5",
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
              "node": "HTTP Request21",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "P_2_segmentacionFormateoIntegracion_CBS": {
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
      "Merge13": {
        "main": [
          [
            {
              "node": "P_3_baseClienteFormateoIntegracion_CBS",
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
      "Webhook6": {
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
      "Merge14": {
        "main": [
          [
            {
              "node": "Merge15",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge15": {
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
      "P_3_baseClienteFormateoIntegracion_CBS": {
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
      "Webhook7": {
        "main": [
          [
            {
              "node": "Code Body5",
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
              "node": "Merge18",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation7",
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
              "node": "HTTP Request25",
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
              "node": "P_5_ordenanteFormateoSidisOrdenante",
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
      "Webhook8": {
        "main": [
          [
            {
              "node": "Code Body6",
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
              "node": "Merge21",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation8",
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
              "node": "HTTP Request26",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "P_4_beneficiarioFormateoSidisBeneficiario": {
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
      "P_5_ordenanteFormateoSidisOrdenante": {
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
      "Merge": {
        "main": [
          [
            {
              "node": "P_0_1_margenShardingMargenShad",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge2",
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
              "node": "P_2_segmentacionFormateoIntegracion_CBS",
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
      "Merge23": {
        "main": [
          [
            {
              "node": "P_4_beneficiarioFormateoSidisBeneficiario",
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
      "Merge10": {
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
      "1_created_operation": {
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
      "Wait": {
        "main": [
          [
            {
              "node": "HTTP Request28",
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
              "node": "HTTP Request3",
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
              "node": "HTTP Request5",
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
              "node": "HTTP Request6",
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
              "node": "HTTP Request7",
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
              "node": "StartOperation",
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
      "HTTP Request8": {
        "main": [
          [
            {
              "node": "Wait7",
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
              "node": "addlastDigRifs1",
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
              "node": "SplitInBatches2",
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
              "node": "HTTP Request8",
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
              "node": "Operation_subStage=1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge25",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge25": {
        "main": [
          [
            {
              "node": "UpdatedOperation",
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
      "Merge26": {
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
      "StartOperation": {
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
      "UpdatedOperation": {
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
      "Operation_subStage=1": {
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
      "Merge27": {
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
      "createOperation": {
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
      "Definición de parametros": {
        "main": [
          [
            {
              "node": "Merge27",
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
      "Webhook2": {
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
      "Webhook10": {
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
      "Definición de parametros1": {
        "main": [
          [
            {
              "node": "fechaProceso_Diario",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fechaProceso_Diario": {
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
      "addlastDigRifs2": {
        "main": [
          [
            {
              "node": "StartOperation1",
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
      "HTTP Request9": {
        "main": [
          [
            {
              "node": "Wait8",
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
              "node": "HTTP Request9",
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
              "node": "Operation_subStage=",
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
      "Merge29": {
        "main": [
          [
            {
              "node": "UpdatedOperation1",
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
      "Merge30": {
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
      "StartOperation1": {
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
      "UpdatedOperation1": {
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
      "Operation_subStage=": {
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
      "Definición de parametros2": {
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
              "node": "SplitInBatches3",
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
              "node": "Definición de parametros2",
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
              "node": "addlastDigRifs2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "addlastDigRifs3": {
        "main": [
          [
            {
              "node": "StartOperation2",
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
      "HTTP Request14": {
        "main": [
          [
            {
              "node": "Wait9",
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
              "node": "SplitInBatches4",
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
              "node": "HTTP Request14",
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
              "node": "Operation_subStage=2",
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
      "Merge32": {
        "main": [
          [
            {
              "node": "UpdatedOperation2",
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
      "StartOperation2": {
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
      "UpdatedOperation2": {
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
      "Operation_subStage=2": {
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
      "Merge34": {
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
      "createOperation1": {
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
      "Definición de parametros3": {
        "main": [
          [
            {
              "node": "Merge34",
              "type": "main",
              "index": 1
            },
            {
              "node": "createOperation1",
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
              "node": "SplitInBatches4",
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
              "node": "Definición de parametros3",
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
              "node": "addlastDigRifs3",
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
              "node": "Merge37",
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
      "Merge37": {
        "main": [
          [
            {
              "node": "HTTP Request37",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request27",
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
              "node": "Code Body7",
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
              "node": "T06_0_formateoTransferenciaDataCrudaSidis",
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
      "Webhook16": {
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
      "addlastDigRifs4": {
        "main": [
          [
            {
              "node": "Operation_subStage=3",
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
      "HTTP Request18": {
        "main": [
          [
            {
              "node": "Wait11",
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
              "node": "SplitInBatches5",
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
              "node": "HTTP Request18",
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
              "node": "IF",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=3": {
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
      "Definición de parametros7": {
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
      "Definición de parametros8": {
        "main": [
          [
            {
              "node": "IF5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "fechaProceso_Diario1": {
        "main": [
          [
            {
              "node": "Definición de parametros7",
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
              "node": "Definición de parametros8",
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
              "node": "addlastDigRifs4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "IF5": {
        "main": [
          [
            {
              "node": "fechaProceso_Diario1",
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
              "node": "HTTP Request19",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros9": {
        "main": [
          [
            {
              "node": "CheckDailyOperation",
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
              "node": "HTTP Request22",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Webhook20": {
        "main": [
          [
            {
              "node": "Definición de parametros9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "CheckDailyOperation": {
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
      "Wait10": {
        "main": [
          [
            {
              "node": "HTTP Request16",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "T06_0_formateoTransferenciaDataCrudaSidis": {
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
      "Code Body2": {
        "main": [
          [
            {
              "node": "StartOperation4",
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
      "Code Body3": {
        "main": [
          [
            {
              "node": "Merge22",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation5",
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
              "node": "Merge13",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code Body5": {
        "main": [
          [
            {
              "node": "Merge23",
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
      "Code Body6": {
        "main": [
          [
            {
              "node": "Merge19",
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
      "Code Body7": {
        "main": [
          [
            {
              "node": "Merge38",
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
      "StartOperation3": {
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
      "StartOperation4": {
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
      "StartOperation5": {
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
      "StartOperation6": {
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
      "StartOperation7": {
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
      "StartOperation8": {
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
      "StartOperation9": {
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
      "UpdatedOperation3": {
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
      "UpdatedOperation4": {
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
      "UpdatedOperation5": {
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
      "UpdatedOperation6": {
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
      "UpdatedOperation7": {
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
      "UpdatedOperation8": {
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
      "UpdatedOperation9": {
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
      "HTTP Request28": {
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
      "StartOperation10": {
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
      "UpdatedOperation10": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }