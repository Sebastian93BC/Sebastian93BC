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
        -13160,
        3360
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
        -180,
        2920
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
        40,
        2920
      ],
      "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f"
    },
    {
      "parameters": {
        "content": "P_6_margenFormateoSidisMargen",
        "height": 356.50154227358325,
        "width": 2727.2091551713515
      },
      "id": "28c0207f-3b0a-4dbd-a781-0c9b87a47915",
      "name": "Note2",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -340,
        2740
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
        880,
        2920
      ],
      "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
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
        -1000,
        4020
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
        -680,
        4000
      ]
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
        360,
        2920
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
        1020,
        2920
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
        1720,
        2880
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
        1340,
        2900
      ]
    },
    {
      "parameters": {
        "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_6_margenFormateoSidisMargen\"\nvar parallelizationIndexs=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n           \"10\",\n          ];\n\n\nvar outPut = []\n\n  for (var parallelizationIndex of parallelizationIndexs) {\n    outPut.push({ processName: processName, processDate: processDate, subProcessName: subProcessName + \"_\" + parallelizationIndex, parallelizationIndex: parallelizationIndex})\n\n  }\n\nreturn outPut;"
      },
      "id": "3962c915-d0f1-411c-a4fc-3093537c2043",
      "name": "addlastDigRifs",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        180,
        2920
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
        1540,
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
        "httpMethod": "POST",
        "path": "P_1_clienteFormateoIntegracion_CBS",
        "options": {}
      },
      "id": "da9cdd30-c34b-4299-87c8-b298e37b5306",
      "name": "Webhook4",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        0,
        3280
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
        -340,
        3120
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
        460,
        3260
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
        800,
        3240
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
        1120,
        3220
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
        620,
        3120
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
        -340,
        3460
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
        20,
        3640
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
        820,
        3600
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
        1140,
        3580
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
        640,
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
        "content": "P_3_baseClienteFormateoIntegracion_CBS",
        "height": 349.6596043882523,
        "width": 1814.7443332796897
      },
      "id": "ce87201e-2414-456d-83f2-4706b8ce3298",
      "name": "Note4",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -340,
        3820
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
        480,
        3980
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
        20,
        4000
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
        820,
        3960
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
        1140,
        3940
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
        640,
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
        "content": "P_4_beneficiarioFormateoSidisBeneficiario",
        "height": 352.44074369714997,
        "width": 1811.1239099845334
      },
      "id": "a66bbce2-64c9-4e63-a5e8-fc8ba38f03ad",
      "name": "Note5",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -340,
        4200
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
        20,
        4380
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
        820,
        4340
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
        1140,
        4320
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
        -340,
        4580
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
        480,
        4740
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
        20,
        4760
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
        820,
        4720
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
        1120,
        4700
      ]
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
        660,
        4620
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
      "id": "c56ae541-0ea6-400c-bd3d-cef0ccf6be90",
      "name": "Merge22",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        480,
        3620
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
        480,
        4360
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
        2040,
        2860
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_process",
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromCollection\": {\n        \"$first\": \"$fromCollection\"\n      }, \n      \"toCollection\": {\n        \"$first\": \"$toCollection\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
      },
      "id": "4541832a-9d88-42be-89a3-859758ebd48c",
      "name": "1_created_operation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -840,
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
        "amount": 5,
        "unit": "seconds"
      },
      "id": "a3e83501-bf58-4f76-8ac9-2736a8be1e1a",
      "name": "Wait",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        520,
        2920
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
        -320,
        2920
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
        -320,
        3280
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
        -300,
        3640
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
        -300,
        4000
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
        -300,
        4380
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
        -300,
        4760
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
        -10140,
        3340
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
        -10640,
        3340
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
        -10280,
        3340
      ],
      "webhookId": "e0fc568b-bacc-4151-a1a6-48a10591cca2"
    },
    {
      "parameters": {
        "amount": 5,
        "unit": "seconds"
      },
      "id": "2e478de3-a5ae-4762-b713-ff75bfb0fbbe",
      "name": "Wait7",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        -10480,
        3340
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
        -10800,
        3340
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
        -11880,
        3360
      ]
    },
    {
      "parameters": {
        "content": "E1_PREPROCESAMIENTO_DIARIO tasas paso 1",
        "height": 1773.720648473336,
        "width": 5181.671318910214
      },
      "id": "aad5dbf1-4175-4c00-ab48-563f86588155",
      "name": "Note9",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -12480,
        2760
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
        -8700,
        3080
      ]
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
        -8860,
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
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "3cb57ae1-1601-4cae-a395-7143843f9967",
      "name": "Merge27",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -11160,
        3340
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_process",
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromCollection\": {\n        \"$first\": \"$fromCollection\"\n      }, \n      \"toCollection\": {\n        \"$first\": \"$toCollection\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
      },
      "id": "3988efd8-6668-4302-9c8e-11e743e60cf3",
      "name": "createOperation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -11320,
        3280
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
        -11480,
        3360
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$replaceRoot\": {\n        \"newRoot\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subStage\", \"{{$json.subStage}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": {\n          \"$toString\": \"{{$json.processDate}}\"\n        }, \n        \"offSet\": \"{{$json.offSet}}\",\n        \"subProcessName\": \"$subProcessName\", \n        \"subProcessDate\": {\n          \"$substr\": [\n            {\n              \"$toString\": \"$subProcessDate\"\n            }, 0, 10\n          ]\n        }, \n        \"fromCollection\": 1, \n        \"toCollection\": 1, \n        \"status\": 1, \n        \"aggregate\": 1, \n        \"parallelizationIndex\": 1, \n        \"subStage\": 1, \n        \"activeProcess\": 1\n      }\n    }\n  ]"
      },
      "id": "5d75e084-9851-41b7-a559-eaf271acf50d",
      "name": "Bring operations subStage=1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -10980,
        3340
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
        -11660,
        3360
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
        -12720,
        3360
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
        -12440,
        3360
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
        -12260,
        3360
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
        -12080,
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
        -7460,
        2820
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
        -10440,
        4260
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
        -10940,
        4260
      ]
    },
    {
      "parameters": {
        "amount": 5,
        "unit": "seconds"
      },
      "id": "5e734525-56c8-4d29-917e-88c42d757b46",
      "name": "Wait8",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        -10780,
        4260
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
        -11100,
        4260
      ]
    },
    {
      "parameters": {
        "content": "E1_PREPROCESAMIENTO_DIARIO tasas paso 2",
        "height": 739.1732580510376,
        "width": 4295.916695067617
      },
      "id": "4063f743-1121-487d-bd3a-14bb57a9dd59",
      "name": "Note10",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -11632.989808297867,
        3720
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
        -8900,
        4000
      ]
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
        -9060,
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
        "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Tasas\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"2\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
      },
      "id": "18aa8ff8-9f0e-46c2-91c8-22df49835ff8",
      "name": "Definición de parametros2",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -11440,
        4260
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$replaceRoot\": {\n        \"newRoot\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subStage\", \"{{$json.subStage}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": {\n          \"$toString\": \"{{$json.processDate}}\"\n        }, \n        \"offSet\": \"{{$json.offSet}}\",\n        \"subProcessName\": \"$subProcessName\", \n        \"subProcessDate\": {\n          \"$substr\": [\n            {\n              \"$toString\": \"$subProcessDate\"\n            }, 0, 10\n          ]\n        }, \n        \"fromCollection\": 1, \n        \"toCollection\": 1, \n        \"status\": 1, \n        \"aggregate\": 1, \n        \"parallelizationIndex\": 1, \n        \"subStage\": 1, \n        \"activeProcess\": 1\n      }\n    }\n  ]"
      },
      "id": "68b1591b-7903-4c6c-ad6e-0399979a7004",
      "name": "Bring operations subStage=",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -11280,
        4260
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
        -7500,
        3780
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
        -11600,
        4260
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
        -10580,
        4260
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
        -5700,
        3960
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
        -6020,
        3960
      ]
    },
    {
      "parameters": {
        "amount": 15,
        "unit": "seconds"
      },
      "id": "83097eab-e34a-4926-8fd8-2a923ebaa272",
      "name": "Wait9",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        -6160,
        3960
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
        -6300,
        3960
      ]
    },
    {
      "parameters": {
        "content": "E1_PREPROCESAMIENTO_DIARIO ",
        "height": 719.454321620241,
        "width": 4759.460555948138
      },
      "id": "234a6463-65f9-4d6a-9750-6591d8f669ab",
      "name": "Note12",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -7200,
        3460
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
        -4200,
        3680
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
        -3380,
        3660
      ]
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
        -3560,
        3580
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
        -4380,
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
      "id": "00fa1c74-3607-4f3f-b6be-0104f632d77d",
      "name": "Merge34",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -6660,
        3960
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_process",
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromCollection\": {\n        \"$first\": \"$fromCollection\"\n      }, \n      \"toCollection\": {\n        \"$first\": \"$toCollection\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
      },
      "id": "0e10e784-c654-4535-b683-b10b3ed057e9",
      "name": "createOperation1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -6820,
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
        "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Diario\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
      },
      "id": "51659063-c970-44d8-adae-a5c832cfc5a3",
      "name": "Definición de parametros3",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -6980,
        3980
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$replaceRoot\": {\n        \"newRoot\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subStage\", \"{{$json.subStage}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": {\n          \"$toString\": \"{{$json.processDate}}\"\n        }, \n        \"offSet\": \"{{$json.offSet}}\",\n        \"subProcessName\": \"$subProcessName\", \n        \"subProcessDate\": {\n          \"$substr\": [\n            {\n              \"$toString\": \"$subProcessDate\"\n            }, 0, 10\n          ]\n        }, \n        \"fromCollection\": 1, \n        \"toCollection\": 1, \n        \"status\": 1, \n        \"aggregate\": 1, \n        \"parallelizationIndex\": 1, \n        \"subStage\": 1, \n        \"activeProcess\": 1\n      }\n    }\n  ]"
      },
      "id": "3fc6a8da-0c66-48ca-ba2e-aaf49e5c4577",
      "name": "Bring operations subStage=2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -6480,
        3960
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
        -7140,
        3980
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
        -5840,
        3960
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
        -1180,
        3880
      ]
    },
    {
      "parameters": {
        "content": "control ingesta, de las colecciones raw que van a margen",
        "height": 294.94775115327155,
        "width": 1010.5145342037233
      },
      "id": "5434f264-a17a-4329-9b80-018fbaeda03e",
      "name": "Note14",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -2260,
        3900
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
        -1140,
        4020
      ],
      "webhookId": "90302f6b-20ca-4c26-a17e-81bbbc4c258f"
    },
    {
      "parameters": {
        "content": "Test operaciones con paralelización\n",
        "height": 331.9234539971138,
        "width": 2153.5835364025784
      },
      "id": "c50e7a87-6a87-4c18-906a-2545a0379adc",
      "name": "Note18",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -9500,
        7380
      ]
    },
    {
      "parameters": {
        "jsCode": "var body\nvar outPut = []\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar processDate = body.processDate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\n\n\n\n\noutPut.push({ processDate: processDate, offSet: offSet, parallelizationIndex: parallelizationIndex})\n\nreturn outPut;"
      },
      "id": "40509bd4-5588-41ba-a258-9c763ca20594",
      "name": "addlastDigRifs4",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -8240,
        7500
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
              "name": "offSet",
              "value": "={{$json.offSet}}"
            },
            {
              "name": "parallelizationIndex",
              "value": "={{$json.parallelizationIndex}}"
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
      "id": "daf05d40-b03c-4eb8-87fa-ec3bc8ddfe87",
      "name": "HTTP Request18",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -8740,
        7500
      ]
    },
    {
      "parameters": {
        "amount": 5,
        "unit": "seconds"
      },
      "id": "97a683f2-d5c3-4db1-8a69-6fa611e90736",
      "name": "Wait11",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        -8580,
        7500
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
        -8900,
        7500
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
        -7880,
        7480
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "rawTransaccionesComisiones",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              {\n                \"$substr\": [\n                  \"$tra_rif\", 8, -1\n                ]\n              }, \"{{$json.parallelizationIndex}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$file_date\", {\n                \"$subtract\": [\n                  {\n                    \"$toDate\": \"{{$json.processDate}}\"\n                  }, {\n                    \"$multiply\": [\n                      {\n                        \"$toInt\": \"{{$json.offSet}}\"\n                      }, 86400000\n                    ]\n                  }\n                ]\n              }\n            ]\n          }\n        }, {\n          \"tra_banca\": {\n            \"$nin\": [\n              \"5\", 5, \"4\", 4, \"0\", 0, \"1\", 1\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProceso\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$tra_fecha_operacion\"\n          }, \n          \"month\": {\n            \"$add\": [\n              {\n                \"$month\": \"$tra_fecha_operacion\"\n              }, 1\n            ]\n          }, \n          \"day\": {\n            \"$subtract\": [\n              {\n                \"$dayOfMonth\": {\n                  \"$dateFromParts\": {\n                    \"year\": {\n                      \"$year\": \"$tra_fecha_operacion\"\n                    }, \n                    \"month\": {\n                      \"$add\": [\n                        {\n                          \"$month\": \"$tra_fecha_operacion\"\n                        }, 1\n                      ]\n                    }, \n                    \"day\": 1\n                  }\n                }\n              }, 1\n            ]\n          }, \n          \"hour\": 0, \n          \"minute\": 0, \n          \"second\": 0, \n          \"millisecond\": 0\n        }\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$tra_rif\", 8, -1\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_transaccionesComisiones_hist\", \n      \"on\": [\n        \"tra_rif\", \"fechaProceso\", \"tra_cuenta_contable\", \"tra_cod_op\", \"_id\"\n      ], \n      \"whenMatched\": \"replace\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
      },
      "id": "a0d7c1fb-221c-48c9-b3f5-e384e98d95a9",
      "name": "Operation_subStage=3",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -8060,
        7380
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
        "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar processDate = body.processDate;\nvar offSet = body.offSet;\nvar parallelizationIndexs=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n          ];\n\n\nvar outPut = []\n\n  for (var parallelizationIndex of parallelizationIndexs) {\n    outPut.push({ processDate: processDate, offSet: offSet, parallelizationIndex: parallelizationIndex})\n\n  }\n\nreturn outPut;"
      },
      "id": "1e7247d8-619a-467f-97b3-5359b639b192",
      "name": "Definición de parametros7",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -9080,
        7500
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
              "value": "=30"
            },
            {
              "name": "processDate",
              "value": "=2023-12-31"
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
        -9460,
        7500
      ]
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
        -9220,
        7500
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
        -8400,
        7500
      ],
      "webhookId": "690576e8-2c30-47ab-a677-5e98f4014533"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/690576e8-2c30-47ab-a677-5e98f4014533",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "offSet",
              "value": "={{$json.offSet-1}}"
            },
            {
              "name": "parallelizationIndex",
              "value": "={{$json.parallelizationIndex}}"
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
      "id": "13f9e2c8-5fdb-4d3a-bbeb-95f9fad970f1",
      "name": "HTTP Request19",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -7520,
        7460
      ]
    },
    {
      "parameters": {
        "jsCode": "var outPut = [];\n\nvar processDate\n\nfor (const item of $input.all()) {\n  processDate = item.json.processDate;\n}\nvar processDate = \"2024-03-31\"  //cambiar por la variable de processDate\nvar processName = \"E1_Preprocesamiento_Diario\"\n\n\noutPut.push({ processName: processName, processDate: processDate, });\n\nreturn outPut;"
      },
      "id": "21787be5-b099-4517-aae5-b2d46b0e7b1d",
      "name": "Definición de parametros9",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -2000,
        4000
      ]
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.status=='Finalizado'}}",
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
        -1680,
        4000
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/90302f6b-20ca-4c26-a17e-81bbbc4c258f",
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
        -1440,
        3980
      ]
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
        -2160,
        4000
      ],
      "webhookId": "2c7a4125-496b-47dc-9c6c-c0c9ab0dfcfc",
      "disabled": true
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processDate\": {\n        \"$toString\": {\n          \"$substr\": [\n            \"$processDate\", 0, 10\n          ]\n        }\n      }, \n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }\n    }\n  }\n]"
      },
      "id": "8bc176e6-dbb3-4e36-b28d-006100960859",
      "name": "CheckDailyOperation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -1840,
        4000
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
        -180,
        3280
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
        -160,
        3640
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
        -160,
        4000
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
        -160,
        4380
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
        -160,
        4760
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
        140,
        3280
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
        160,
        3640
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
        160,
        4000
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
        160,
        4380
      ],
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "jsCode": "\nvar body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"P_5_ordenanteFormateoSidisOrdenante\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
      },
      "id": "5cc05537-6df5-4ee2-9c81-c46bb57d102b",
      "name": "Code Body6",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        160,
        4760
      ],
      "alwaysOutputData": true
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
        300,
        3180
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
        320,
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
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "c324c89d-f588-4919-82b4-d00e107cdfe2",
      "name": "StartOperation6",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        320,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "6176302c-580a-4305-b8aa-aec82ec6fe35",
      "name": "StartOperation8",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        320,
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
        "operation": "aggregate",
        "collection": "=sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "bda5646e-95ce-4972-aa96-407b513765c9",
      "name": "UpdatedOperation4",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        960,
        3120
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
        980,
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
        "collection": "=sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "5f258de0-894f-48e4-90e9-9ad4f6870665",
      "name": "UpdatedOperation6",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        960,
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
        "collection": "=sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "b9af9df5-edee-46f0-a2cc-168ae76c5299",
      "name": "UpdatedOperation7",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        980,
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
        "collection": "=sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "820e3c2a-8fb8-47d0-9d48-fdffd5762031",
      "name": "UpdatedOperation8",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        960,
        4620
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
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        1280,
        3220
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        1280,
        3580
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        1300,
        3940
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        1300,
        4200
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        1300,
        4580
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/P_6_margenFormateoSidisMargen",
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
        680,
        2920
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
        1180,
        2820
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
        1880,
        2760
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
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E1_Preprocesamiento",
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
        2220,
        2860
      ]
    },
    {
      "parameters": {
        "content": "preprocesamiento mensual",
        "height": 2260.9961841866343,
        "width": 4830.880270415184
      },
      "id": "9bd4a3f1-cc6d-450c-8fec-708fbc077f3a",
      "name": "Note1",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -2340,
        2740
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
      "id": "f27d7f25-3b87-49fe-a612-fa7d12145adf",
      "name": "IF4",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -7720,
        7480
      ]
    },
    {
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "hour": 8
            },
            {
              "hour": 12
            }
          ]
        }
      },
      "id": "36b42482-ac6b-450b-b865-bbf09a4cac08",
      "name": "Cron",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [
        -12900,
        3360
      ]
    },
    {
      "parameters": {
        "jsCode": "const numeroAleatorio = Math.floor(Math.random() * 61);\nconst outPut = []\n\noutPut.push({numeroAleatorio: numeroAleatorio});\n\n\nreturn outPut"
      },
      "id": "5d559416-f5d9-4478-acf3-0ea358171bef",
      "name": "Code",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -4040,
        3520
      ]
    },
    {
      "parameters": {
        "amount": "={{$json.numeroAleatorio}}",
        "unit": "seconds"
      },
      "id": "d3c13176-6191-4542-a7b5-2124f8672004",
      "name": "Wait12",
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1,
      "position": [
        -3880,
        3520
      ],
      "webhookId": "0ed0630a-0d0e-4731-b466-e632b1fdf95d"
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "b29976a3-6655-4f32-8070-cc910742bd90",
      "name": "Merge35",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -3700,
        3580
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
              "name": "processDate",
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "e5278195-efa4-4281-a2a9-6aa10c43b81b",
      "name": "HTTP Request2",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        60,
        2760
      ]
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
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "a02efb50-e72b-477c-ae43-1002255af9d4",
      "name": "HTTP Request15",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        0,
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
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "b586294a-6315-42a3-8cf2-516d843bc378",
      "name": "HTTP Request29",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        20,
        3480
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
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "51937433-fb69-45be-baa0-94d9e8f89514",
      "name": "HTTP Request30",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        20,
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
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "254a15fc-e59e-487d-b579-b4bdb6d294eb",
      "name": "HTTP Request31",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        20,
        4220
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
              "value": "=2024-03-31"
            },
            {
              "name": "processName",
              "value": "=E1_Preprocesamiento_Mensual"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "e8dce7b4-b707-41ea-ab05-76011298f99e",
      "name": "HTTP Request32",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        20,
        4620
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/90302f6b-20ca-4c26-a17e-81bbbc4c258f",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "processDate",
              "value": "=2024-01-31"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "f53a9e72-97fa-45aa-a0c9-266f37fbdc95",
      "name": "HTTP Request34",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -1140,
        4200
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "beneficiario",
        "query": "=[\n  {\n    \"$set\": {\n      \"snb_rif_empresa\": {\n        \"$trim\": {\n          \"input\": \"$snb_rif_empresa\"\n        }\n      }, \n      \"snb_ci_benefic\": {\n        \"$trim\": {\n          \"input\": \"$snb_ci_benefic\"\n        }\n      }, \n      \"snb_num_cuenta\": {\n        \"$trim\": {\n          \"input\": \"$snb_num_cuenta\"\n        }\n      }, \n      \"snb_id_reflote\": {\n        \"$trim\": {\n          \"input\": \"$snb_id_reflote\"\n        }\n      }, \n      \"snb_fec_valor\": {\n        \"$convert\": {\n          \"input\": \"$snb_fec_valor\", \n          \"to\": \"date\", \n          \"onError\": \"$snb_fec_valor\", \n          \"onNull\": \"$$REMOVE\"\n        }\n      }, \n      \"snb_ind_cobcomi\": {\n        \"$convert\": {\n          \"input\": \"$snb_ind_cobcomi\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobahoben\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobahoben\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobahoord\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobahoord\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobcteben\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobcteben\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_cobcteord\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_cobcteord\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mto_pcorrecto\": {\n        \"$convert\": {\n          \"input\": \"$snb_mto_pcorrecto\", \n          \"to\": \"decimal\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_ctaben\": {\n        \"$convert\": {\n          \"input\": \"$snb_tipo_ctaben\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_mecan_pago\": {\n        \"$trim\": {\n          \"input\": \"$snb_mecan_pago\"\n        }\n      }, \n      \"snb_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$snb_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$snb_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_registro\": {\n        \"$trim\": {\n          \"input\": \"$snb_tipo_registro\"\n        }\n      }, \n      \"snb_interfaz\": {\n        \"$trim\": {\n          \"input\": \"$snb_interfaz\"\n        }\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$snb_rif_empresa\", 8, -1\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"snb_id_debito\": {\n        \"$convert\": {\n          \"input\": \"$snb_id_debito\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_num_negoc\": {\n        \"$convert\": {\n          \"input\": \"$snb_num_negoc\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"snb_tipo_ctaben\": {\n        \"$convert\": {\n          \"input\": \"$snb_tipo_ctaben\", \n          \"to\": \"int\", \n          \"onError\": 0, \n          \"onNull\": 0\n        }\n      }, \n      \"fechaProceso\": {\n        \"$subtract\": [\n          {\n            \"$dateFromParts\": {\n              \"year\": {\n                \"$year\": \"$snb_fec_valor\"\n              }, \n              \"month\": {\n                \"$sum\": [\n                  {\n                    \"$month\": \"$snb_fec_valor\"\n                  }, 1\n                ]\n              }\n            }\n          }, 86400000\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_beneficiario\", \n      \"on\": [\n        \"snb_ci_benefic\", \"snb_rif_empresa\", \"snb_id_debito\", \"_id\"\n      ], \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
      },
      "id": "6d621f34-55f1-43af-ba53-28325467d0de",
      "name": "P_4_beneficiarioFormateoSidisBeneficiario",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        640,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "c91943d7-a7ea-42f0-befe-5f10c8fa88b8",
      "name": "StartOperation11",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        320,
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
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/populate-transaction-channel-proveedores",
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
              "name": "fechaProceso",
              "value": "={{$json.fechaProceso}}"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "d48b42c4-61e8-44d3-9ec0-e487da3f06d3",
      "name": "HTTP Request35",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        1320,
        4440
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/populate-transaction-channel-proveedores",
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
              "name": "fechaProceso",
              "value": "={{$json.fechaProceso}}"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "86e08020-688f-478d-b14c-65fea1478bca",
      "name": "HTTP Request36",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        1300,
        4780
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
              "name": "offSet",
              "value": "=43"
            },
            {
              "name": "parallelizationIndex",
              "value": "=9"
            },
            {
              "name": "processDate",
              "value": "=2024-03-31"
            }
          ]
        },
        "options": {
          "allowUnauthorizedCerts": true
        }
      },
      "id": "5b39fd90-ad92-4ce5-b1fb-80a43cc57999",
      "name": "HTTP Request38",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -8400,
        7320
      ]
    },
    {
      "parameters": {
        "content": "control Diario",
        "height": 255.22454288043667,
        "width": 642.967910580805
      },
      "id": "da93044c-dfcd-4191-a72b-e81ce430aae9",
      "name": "Note15",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -3200,
        3900
      ]
    },
    {
      "parameters": {
        "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E1_Preprocesamiento_Diario\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\"\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
      },
      "id": "8078cf04-f7a6-491f-8a2f-bf6d66125f00",
      "name": "Definición de parametros10",
      "type": "n8n-nodes-base.code",
      "typeVersion": 1,
      "position": [
        -2980,
        3980
      ]
    },
    {
      "parameters": {
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.status=='Finalizado'}}",
              "value2": "={{true}}"
            }
          ]
        }
      },
      "id": "62c4ef04-58ef-4baa-948b-49bd80b07b69",
      "name": "IF",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -3100,
        3560
      ]
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
      "id": "a3272ebd-37ba-4e3b-a32e-186ff6b27eb0",
      "name": "HTTP Request27",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -2780,
        3980
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processDate\": {\n        \"$toString\": {\n          \"$substr\": [\n            \"$processDate\", 0, 10\n          ]\n        }\n      }, \n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }\n    }\n  }\n]"
      },
      "id": "7c98d514-4254-419e-86df-782f43ec5c33",
      "name": "CheckDailyOperation1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -3240,
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
        "httpMethod": "POST",
        "path": "02114c0e-c477-4623-96c0-ff0ce28979e7",
        "options": {}
      },
      "id": "7897df8d-9d35-42a0-b290-e19bffaaf12e",
      "name": "Webhook15",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        -3160,
        3980
      ],
      "webhookId": "02114c0e-c477-4623-96c0-ff0ce28979e7"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/02114c0e-c477-4623-96c0-ff0ce28979e7",
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
      "id": "36537320-46da-43e3-84a0-d25e495fd2a7",
      "name": "HTTP Request16",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -2760,
        3640
      ]
    },
    {
      "parameters": {
        "content": "Activa Financialstatement",
        "height": 204.30665538123884,
        "width": 204.8602388355692
      },
      "id": "6abe8cac-e451-438c-894d-9ac756c09969",
      "name": "Note7",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -2840,
        3940
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "efdfcc34-f519-493c-85d4-a611c08bab22",
      "name": "Merge",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -2900,
        3640
      ]
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
              "value": "=2024-02-17"
            },
            {
              "name": "processName",
              "value": "=\"\""
            },
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
      "id": "4c71f21b-fdbb-4e74-8ebf-14a79d6a5ec4",
      "name": "HTTP Request23",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -7160,
        3780
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "f98c913a-4cdf-463f-be52-d4e76e8170c1",
      "name": "StartOperation3",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -9840,
        3080
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
              "value1": "={{$json.status=='En Proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='En proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en Proceso'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "c5873187-fa20-4951-bb74-99037d39fd91",
      "name": "IF1",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -9400,
        3100
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "258e09c1-9001-4af9-9962-2672eb1c64e9",
      "name": "Merge37",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9020,
        3100
      ]
    },
    {
      "parameters": {},
      "id": "67c3ace0-8ada-48eb-b08b-9b2fbfbe06a7",
      "name": "NoOp1",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -9160,
        3340
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "dafe47d5-29e3-4dce-b722-add11d44659e",
      "name": "Merge38",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9240,
        3140
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "de0181a5-c225-44d3-bad3-9606a712c546",
      "name": "Merge40",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9680,
        3100
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "84958b65-433e-41db-83e0-b4e6265cd797",
      "name": "checkStart",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -9540,
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
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.status=='Finalizado'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='finalizado'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "8b3b83ed-204a-4eeb-b589-18f84400437d",
      "name": "IF2",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -6380,
        1520
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "270854c5-e096-411d-b7b1-596fb15f8888",
      "name": "Merge41",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -5960,
        1520
      ]
    },
    {
      "parameters": {},
      "id": "bac0401f-fb9a-4f73-a0bc-a0ed63fb6c3a",
      "name": "NoOp",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -6160,
        1780
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "5824d968-3b5c-41a3-89e2-06f6906760c7",
      "name": "Merge42",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -6220,
        1560
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "9c2d9595-0445-42b9-8971-19887c483364",
      "name": "Merge43",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -6660,
        1520
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n{\n\"$match\": {\n\"$and\": [\n{\n\"$expr\": {\n\"$eq\": [\n\"$processName\", \"{{$json.processName}}\"\n]\n}\n}, {\n\"$expr\": {\n\"$eq\": [\n\"$processDate\", {\n\"$toDate\": \"{{$json.processDate}}\"\n}\n]\n}\n}\n]\n}\n}, {\n\"$set\": {\n\"subProcess\": {\n\"$map\": {\n\"input\": \"$subProcess\",\n\"as\": \"input\",\n\"in\": {\n\"$cond\": [\n{\n\"$and\": [\n{\n\"$eq\": [\n\"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n]\n}\n]\n}, {\n\"$mergeObjects\": [\n{\n\"subProcessName\": \"$$input.subProcessName\"\n}, {\n\"subProcessDate\": \"$subProcessDate\"\n}, {\n\"ProcessFrequency\": \"$$input.ProcessFrequency\"\n}, {\n\"fromCollection\": \"$$input.fromCollection\"\n}, {\n\"toCollecion\": \"$$input.toCollecion\"\n}, {\n\"description\": \"$$input.description\"\n}, {\n\"startDate\": \"$$input.startDate\"\n}, {\n\"endDate\": \"$$NOW\"\n}, {\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$$input.startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}, {\n\"status\": \"Finalizado\"\n}, {\n\"subStage\": \"$$input.subStage\"\n}, {\n\"activeProcess\": \"$$input.activeProcess\"\n}, {\n\"aggregate\": \"$$input.aggregate\"\n}\n]\n}, \"$$input\"\n]\n}\n}\n}\n}\n}, {\n\"$set\": {\n\"status\": {\n\"$cond\": [\n{\n\"$or\": [\n{\n\"$in\": [\n\"En Proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En espera\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En Espera\", \"$subProcess.status\"\n]\n}\n]\n}, \"En Proceso\", \"Finalizado\"\n]\n},\n\"endDate\": \"$$NOW\",\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}\n}, {\n\"$merge\": {\n\"into\": \"sidis_statusProcesos\",\n\"on\": [\n\"processName\", \"processDate\"\n]\n}\n}\n]"
      },
      "id": "2f95f455-9a88-4aaa-b54f-663fd943f3bd",
      "name": "UpdatedOperation3",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -6840,
        1500
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
              "value1": "={{$json.status=='Finalizado'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='finalizado'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "187ae206-60d6-47ee-b058-160893819177",
      "name": "IF5",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -8000,
        2820
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "5329a73a-f3eb-49ef-8ca1-4118caff16cc",
      "name": "Merge44",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -7600,
        2820
      ]
    },
    {
      "parameters": {},
      "id": "63c2e6bf-4688-4be4-b1db-8fcc13d820cf",
      "name": "NoOp2",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -7780,
        3080
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "693e7dc3-36a2-4122-8182-7af9693f47b7",
      "name": "Merge45",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -7840,
        2860
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "a11a04c9-e99f-44d5-b712-2c63183dd075",
      "name": "Merge46",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -8260,
        2820
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n{\n\"$match\": {\n\"$and\": [\n{\n\"$expr\": {\n\"$eq\": [\n\"$processName\", \"{{$json.processName}}\"\n]\n}\n}, {\n\"$expr\": {\n\"$eq\": [\n\"$processDate\", {\n\"$toDate\": \"{{$json.processDate}}\"\n}\n]\n}\n}\n]\n}\n}, {\n\"$set\": {\n\"subProcess\": {\n\"$map\": {\n\"input\": \"$subProcess\",\n\"as\": \"input\",\n\"in\": {\n\"$cond\": [\n{\n\"$and\": [\n{\n\"$eq\": [\n\"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n]\n}\n]\n}, {\n\"$mergeObjects\": [\n{\n\"subProcessName\": \"$$input.subProcessName\"\n}, {\n\"subProcessDate\": \"$subProcessDate\"\n}, {\n\"ProcessFrequency\": \"$$input.ProcessFrequency\"\n}, {\n\"fromCollection\": \"$$input.fromCollection\"\n}, {\n\"toCollecion\": \"$$input.toCollecion\"\n}, {\n\"description\": \"$$input.description\"\n}, {\n\"startDate\": \"$$input.startDate\"\n}, {\n\"endDate\": \"$$NOW\"\n}, {\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$$input.startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}, {\n\"status\": \"Finalizado\"\n}, {\n\"subStage\": \"$$input.subStage\"\n}, {\n\"activeProcess\": \"$$input.activeProcess\"\n}, {\n\"aggregate\": \"$$input.aggregate\"\n}\n]\n}, \"$$input\"\n]\n}\n}\n}\n}\n}, {\n\"$set\": {\n\"status\": {\n\"$cond\": [\n{\n\"$or\": [\n{\n\"$in\": [\n\"En Proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En espera\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En Espera\", \"$subProcess.status\"\n]\n}\n]\n}, \"En Proceso\", \"Finalizado\"\n]\n},\n\"endDate\": \"$$NOW\",\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}\n}, {\n\"$merge\": {\n\"into\": \"sidis_statusProcesos\",\n\"on\": [\n\"processName\", \"processDate\"\n]\n}\n}\n]"
      },
      "id": "7d1ae3e6-ee59-421f-bbe5-2a01ec717fc8",
      "name": "UpdatedOperation9",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -8420,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "53003490-db8e-4b0d-bad6-049b1c634499",
      "name": "checkUpdated2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -8120,
        2820
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
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "cb33dfb2-919a-481b-8d59-9be610a4e7ff",
      "name": "checkUpdated",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -6520,
        1520
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
      "id": "992ae506-b193-4b5a-9024-83a95e033f20",
      "name": "StartOperation1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -10040,
        4000
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
              "value1": "={{$json.status=='En Proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='En proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en Proceso'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "e550481c-362d-4db9-b268-4f9e3eeceb9c",
      "name": "IF7",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -9600,
        4020
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "13d8a0bb-b811-4ce7-8609-fe79d668300d",
      "name": "Merge50",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9220,
        4020
      ]
    },
    {
      "parameters": {},
      "id": "033c3e5e-2aa8-4111-8f27-476e7deb9f11",
      "name": "NoOp4",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -9360,
        4260
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "4a4badff-a718-4019-a0e6-cf541c0ff287",
      "name": "Merge51",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9440,
        4060
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "7a085a45-23c0-4e75-899a-a4736af5cb39",
      "name": "Merge52",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -9880,
        4020
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "763b961a-58e5-4eb6-a675-22a9890cb20a",
      "name": "checkStart2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -9740,
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
        "conditions": {
          "boolean": [
            {
              "value1": "={{$json.status=='Finalizado'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='finalizado'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "61109d5e-eb89-4f6e-8c11-0f0afed99f3c",
      "name": "IF8",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -8100,
        3780
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "539a7c3f-f762-4597-9a5e-e0a2ec935e55",
      "name": "Merge53",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -7720,
        3780
      ]
    },
    {
      "parameters": {},
      "id": "a8c1789a-a690-438d-a253-0ccde92108f8",
      "name": "NoOp5",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -7860,
        4000
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "d03e7367-a4d0-44b6-958a-d6a7fbdb9765",
      "name": "Merge54",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -7940,
        3820
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "e1889e6e-6c40-49de-a13d-a4f05af89e57",
      "name": "Merge55",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -8380,
        3780
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n{\n\"$match\": {\n\"$and\": [\n{\n\"$expr\": {\n\"$eq\": [\n\"$processName\", \"{{$json.processName}}\"\n]\n}\n}, {\n\"$expr\": {\n\"$eq\": [\n\"$processDate\", {\n\"$toDate\": \"{{$json.processDate}}\"\n}\n]\n}\n}\n]\n}\n}, {\n\"$set\": {\n\"subProcess\": {\n\"$map\": {\n\"input\": \"$subProcess\",\n\"as\": \"input\",\n\"in\": {\n\"$cond\": [\n{\n\"$and\": [\n{\n\"$eq\": [\n\"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n]\n}\n]\n}, {\n\"$mergeObjects\": [\n{\n\"subProcessName\": \"$$input.subProcessName\"\n}, {\n\"subProcessDate\": \"$subProcessDate\"\n}, {\n\"ProcessFrequency\": \"$$input.ProcessFrequency\"\n}, {\n\"fromCollection\": \"$$input.fromCollection\"\n}, {\n\"toCollecion\": \"$$input.toCollecion\"\n}, {\n\"description\": \"$$input.description\"\n}, {\n\"startDate\": \"$$input.startDate\"\n}, {\n\"endDate\": \"$$NOW\"\n}, {\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$$input.startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}, {\n\"status\": \"Finalizado\"\n}, {\n\"subStage\": \"$$input.subStage\"\n}, {\n\"activeProcess\": \"$$input.activeProcess\"\n}, {\n\"aggregate\": \"$$input.aggregate\"\n}\n]\n}, \"$$input\"\n]\n}\n}\n}\n}\n}, {\n\"$set\": {\n\"status\": {\n\"$cond\": [\n{\n\"$or\": [\n{\n\"$in\": [\n\"En Proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En proceso\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En espera\", \"$subProcess.status\"\n]\n}, {\n\"$in\": [\n\"En Espera\", \"$subProcess.status\"\n]\n}\n]\n}, \"En Proceso\", \"Finalizado\"\n]\n},\n\"endDate\": \"$$NOW\",\n\"runtimeInMinutes\": {\n\"$round\": [\n{\n\"$divide\": [\n{\n\"$subtract\": [\n\"$$NOW\", \"$startDate\"\n]\n}, 60000\n]\n}, 2\n]\n}\n}\n}, {\n\"$merge\": {\n\"into\": \"sidis_statusProcesos\",\n\"on\": [\n\"processName\", \"processDate\"\n]\n}\n}\n]"
      },
      "id": "c7626072-d9eb-4e68-97e6-5cb9f9182978",
      "name": "UpdatedOperation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -8560,
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
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "a57d0267-1122-4943-9d29-67861567b5f0",
      "name": "checkUpdated1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -8240,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "e19aba66-f902-40f5-9992-476a02032bed",
      "name": "StartOperation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -5380,
        3680
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
              "value1": "={{$json.status=='En Proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='En proceso'}}",
              "value2": "={{true}}"
            },
            {
              "value1": "={{$json.status=='en Proceso'}}",
              "value2": "={{true}}"
            }
          ]
        },
        "combineOperation": "any"
      },
      "id": "e5407a94-c9e8-40c1-96ff-1e43dca242c0",
      "name": "IF6",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        -4920,
        3700
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "eb643fb0-d342-41a9-ad77-ee0369de831a",
      "name": "Merge47",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -4540,
        3700
      ]
    },
    {
      "parameters": {},
      "id": "7aa801d2-1296-4e87-b081-bb2f1768f889",
      "name": "NoOp3",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -4680,
        3960
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "c9f1a8a4-cd0f-44bd-93ae-ff0dab605c57",
      "name": "Merge48",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -4760,
        3740
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "3d2966a3-0bf9-4949-8398-8f62eafe5eb5",
      "name": "Merge49",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -5200,
        3700
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$match\": {\n        \"$expr\": {\n          \"$eq\": [\n            \"$subProcess.subProcessName\", \"{{$json.subProcessName}}\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"status\": \"$subProcess.status\"\n      }\n    }\n  ]"
      },
      "id": "287ad676-68d4-40f6-bcaf-a7e6b5148890",
      "name": "checkStart1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -5060,
        3700
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
      "id": "d25ac80c-e66b-4ce4-a7a9-232db43f90d7",
      "name": "NoOp6",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -5520,
        3960
      ]
    },
    {
      "parameters": {},
      "id": "8cd19f43-aa40-423d-bc22-ccb62d0f0867",
      "name": "NoOp7",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -7060,
        1780
      ]
    },
    {
      "parameters": {},
      "id": "0bf3dd30-935f-4333-89a8-4f5f2625c47c",
      "name": "NoOp8",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -9980,
        3340
      ]
    },
    {
      "parameters": {},
      "id": "55ae0913-a9c7-4fbc-b483-8231a71afc01",
      "name": "NoOp9",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -8540,
        3080
      ]
    },
    {
      "parameters": {},
      "id": "19c57548-132c-4ea9-92af-29c19f2b9fa7",
      "name": "NoOp10",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -8740,
        4000
      ]
    },
    {
      "parameters": {},
      "id": "351aa4a2-bf73-4043-9de7-e49f113e9d51",
      "name": "NoOp11",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -10260,
        4260
      ]
    }
  ],
  "connections": {
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
          },
          {
            "node": "HTTP Request35",
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
          },
          {
            "node": "HTTP Request36",
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
            "node": "Merge17",
            "type": "main",
            "index": 1
          },
          {
            "node": "P_4_beneficiarioFormateoSidisBeneficiario",
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
            "node": "NoOp8",
            "type": "main",
            "index": 0
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
    "Merge25": {
      "main": [
        [
          {
            "node": "NoOp9",
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
            "node": "NoOp11",
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
    "Merge29": {
      "main": [
        [
          {
            "node": "NoOp10",
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
            "node": "NoOp6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request14": {
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
    "Wait9": {
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
    "SplitInBatches4": {
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
    "Merge32": {
      "main": [
        [
          {
            "node": "Merge33",
            "type": "main",
            "index": 1
          },
          {
            "node": "Merge35",
            "type": "main",
            "index": 1
          },
          {
            "node": "Code",
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
            "node": "CheckDailyOperation1",
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
            "node": "IF4",
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
    "Webhook18": {
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
            "node": "StartOperation11",
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
    },
    "IF4": {
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
    "Cron": {
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
    "Code": {
      "main": [
        [
          {
            "node": "Wait12",
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
            "node": "UpdatedOperation2",
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
    "StartOperation11": {
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
    "Definición de parametros10": {
      "main": [
        [
          {
            "node": "HTTP Request27",
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
            "node": "Merge",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "CheckDailyOperation1": {
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
    "Webhook15": {
      "main": [
        [
          {
            "node": "Definición de parametros10",
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
            "node": "HTTP Request16",
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
            "node": "Merge40",
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
            "node": "Merge37",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge38",
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
    "NoOp1": {
      "main": [
        [
          {
            "node": "Merge37",
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
            "node": "NoOp8",
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
            "node": "checkStart",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "checkStart": {
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
    "IF2": {
      "main": [
        [
          {
            "node": "Merge41",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge42",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "NoOp": {
      "main": [
        [
          {
            "node": "Merge41",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Merge42": {
      "main": [
        [
          {
            "node": "NoOp7",
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
            "node": "checkUpdated",
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
            "node": "Merge43",
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
            "node": "Merge44",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge45",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge44": {
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
    "NoOp2": {
      "main": [
        [
          {
            "node": "Merge44",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Merge45": {
      "main": [
        [
          {
            "node": "NoOp9",
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
            "node": "checkUpdated2",
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
            "node": "Merge46",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "checkUpdated2": {
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
    "checkUpdated": {
      "main": [
        [
          {
            "node": "IF2",
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
            "node": "Merge52",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF7": {
      "main": [
        [
          {
            "node": "Merge50",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge51",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge50": {
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
    "NoOp4": {
      "main": [
        [
          {
            "node": "Merge50",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Merge51": {
      "main": [
        [
          {
            "node": "NoOp11",
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
            "node": "checkStart2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "checkStart2": {
      "main": [
        [
          {
            "node": "IF7",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF8": {
      "main": [
        [
          {
            "node": "Merge53",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge54",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge53": {
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
    "NoOp5": {
      "main": [
        [
          {
            "node": "Merge53",
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
            "node": "NoOp10",
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
            "node": "checkUpdated1",
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
            "node": "Merge55",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "checkUpdated1": {
      "main": [
        [
          {
            "node": "IF8",
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
            "node": "Merge49",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF6": {
      "main": [
        [
          {
            "node": "Merge47",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Merge48",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge47": {
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
    "NoOp3": {
      "main": [
        [
          {
            "node": "Merge47",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Merge48": {
      "main": [
        [
          {
            "node": "NoOp6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Merge49": {
      "main": [
        [
          {
            "node": "checkStart1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "checkStart1": {
      "main": [
        [
          {
            "node": "IF6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "NoOp6": {
      "main": [
        [
          {
            "node": "StartOperation",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge49",
            "type": "main",
            "index": 1
          },
          {
            "node": "NoOp3",
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
    "NoOp7": {
      "main": [
        [
          {
            "node": "Merge42",
            "type": "main",
            "index": 1
          },
          {
            "node": "NoOp",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge43",
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
    "NoOp8": {
      "main": [
        [
          {
            "node": "StartOperation3",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge40",
            "type": "main",
            "index": 1
          },
          {
            "node": "Merge38",
            "type": "main",
            "index": 1
          },
          {
            "node": "NoOp1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "NoOp9": {
      "main": [
        [
          {
            "node": "UpdatedOperation9",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge46",
            "type": "main",
            "index": 1
          },
          {
            "node": "Merge45",
            "type": "main",
            "index": 1
          },
          {
            "node": "NoOp2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "NoOp10": {
      "main": [
        [
          {
            "node": "UpdatedOperation",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge55",
            "type": "main",
            "index": 1
          },
          {
            "node": "Merge54",
            "type": "main",
            "index": 1
          },
          {
            "node": "NoOp5",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "NoOp11": {
      "main": [
        [
          {
            "node": "NoOp4",
            "type": "main",
            "index": 0
          },
          {
            "node": "Merge51",
            "type": "main",
            "index": 1
          },
          {
            "node": "Merge52",
            "type": "main",
            "index": 1
          },
          {
            "node": "StartOperation1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}