{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "b8661ad8-4ac1-41b8-9acb-91e473115263",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -300,
          60
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "verificacion_E1_Preprocesamiento",
          "options": {}
        },
        "id": "1a04bc3d-f03f-4f61-a9d9-9497116c321f",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -120,
          460
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f"
      },
      {
        "parameters": {
          "content": "1_PREPROCESAMIENTO",
          "height": 250.90303556817545,
          "width": 1114.3021898376091
        },
        "id": "87e6e1b6-c13b-4851-b871-a106a0d154b9",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -361.111358816054,
          400
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
        "id": "ca8d979b-934d-4d89-a4fc-c6dddba117da",
        "name": "IF2",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          340,
          460
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "8a186d2e-c2fc-49ce-be36-2b7a247b8fd6",
        "name": "Digitos Rid Cedula5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          40,
          460
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "verificacion_2_PROCESAMIENTO",
          "options": {}
        },
        "id": "92114957-7aa1-4420-82b1-221bec9e121b",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -100,
          740
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f"
      },
      {
        "parameters": {
          "content": "2_PROCESAMIENTO",
          "height": 234.75257639433175,
          "width": 1112.7623342536265
        },
        "id": "10591ea0-3af1-4c93-9c11-b3e8c16d642f",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -360,
          700
        ]
      },
      {
        "parameters": {
          "content": "E3_PROCESAMIENTO_INDICADORES",
          "height": 274.0150260131721,
          "width": 1116.3268144308427
        },
        "id": "e751fbd9-6e25-45ef-9cd7-fced943a98f8",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -360,
          960
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "verificacion_E3_PROCESAMIENTO_INDICADORES",
          "options": {}
        },
        "id": "3fc22a25-fc56-4c95-bcf7-7909b3a0b299",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -120,
          1060
        ],
        "webhookId": "2ddc2702-8607-4fc1-a2fd-edffd92b703e"
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "2fbb8b16-2da0-49db-8f3a-8c764c4d1d3b",
        "name": "Digitos Rid Cedula1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          20,
          1060
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E3_PROCESAMIENTO_INDICADORES",
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
        "id": "b7ed264e-6eb6-4815-b4ca-3bcdf6491222",
        "name": "ACTIVA_E3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          540,
          720
        ]
      },
      {
        "parameters": {
          "content": "E4_RESEGMENTACION",
          "height": 255.0897392394938,
          "width": 1118.76634648781
        },
        "id": "e65d469f-6724-41b1-a31b-0268b643c1c2",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -360,
          1280
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "verificacion_E4_RESEGMENTACION",
          "options": {}
        },
        "id": "7955f3b1-7ebe-4df4-9f28-4b870b35c142",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -120,
          1360
        ],
        "webhookId": "2ddc2702-8607-4fc1-a2fd-edffd92b703e"
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "c00655bf-79cd-47ec-ae77-13344f26d73f",
        "name": "Digitos Rid Cedula2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          20,
          1360
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
        "id": "fbfefa2a-220b-4265-ae53-aea71164afb8",
        "name": "IF3",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          340,
          1360
        ]
      },
      {
        "parameters": {
          "triggerTimes": {
            "item": [
              {
                "mode": "everyX",
                "value": 6
              }
            ]
          }
        },
        "id": "3eb04171-fc5c-47e4-a922-ca80668c805b",
        "name": "Cron",
        "type": "n8n-nodes-base.cron",
        "typeVersion": 1,
        "position": [
          -80,
          60
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
                "value": "={{$json.fechaProceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "9963c09b-c7d9-4fef-9aca-7f24619f7506",
        "name": "ACTIVA_E5_AGRUPACIONES",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          560,
          1340
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/Formateo_Datos_BDV",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "=2024-02-29"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "dd038702-dda0-4562-99b4-4b33ad5bad16",
        "name": "E1_ACTIVA",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -300,
          460
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E2_Procesamiento",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "2024-01-31"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "311801b4-e827-4c30-b488-6ce46b4255d4",
        "name": "E2_ACTIVA",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -300,
          740
        ]
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
                "value": "2024-01-31"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "f814e350-52f8-402e-84d8-cdcbfdb7cc2a",
        "name": "E3_ACTIVA",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -300,
          1060
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
                "value": "2024-01-31"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "a38d0e1a-85d1-473c-8859-0f7eed0e0b26",
        "name": "E5_",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -300,
          1660
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
        "id": "c7f9f947-db47-4945-87c2-7c38b5383405",
        "name": "IF4",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          320,
          740
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "verificacion_E5_AGRUPACIONES",
          "options": {}
        },
        "id": "6ef137c4-0601-454e-b3dd-3ab0f8bc61a3",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -100,
          1660
        ],
        "webhookId": "a6b3e2c6-e159-482c-80aa-18ec8caf3d4d"
      },
      {
        "parameters": {
          "content": "E5_AGRUPACIONES",
          "height": 331.15127088383525,
          "width": 1132.687648057414
        },
        "id": "e88da509-28df-4274-9592-6334117efc25",
        "name": "Note9",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -360,
          1560
        ]
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "bea8550b-474b-4caf-aab2-be29c25a27e7",
        "name": "Digitos Rid Cedula3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          40,
          1660
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
        "id": "0685c2e2-c19e-4dae-a298-99cf4cd529b4",
        "name": "IF5",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          380,
          1660
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E2_Procesamiento",
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
        "id": "e165649c-d484-4a7f-9b62-fae874fe01b7",
        "name": "ACTIVA_E2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          540,
          440
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E4_RESEGMENTACION",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "2024-01-31"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "792754f8-52ef-478d-85cb-75670ae6a0e3",
        "name": "E4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -320,
          1360
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$merge\": {\n      \"into\": \"Statustransformation\", \n      \"on\": \"_id\"\n    }\n  }\n]"
        },
        "id": "0e4aada0-d398-4219-bd54-8e1fa572f08d",
        "name": "actualizacion status operaciones",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          240,
          -140
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
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processDate\": {\n          \"$toString\": {\n            \"$substr\": [\n              \"$processDate\", 0, 10\n            ]\n          }\n        }, \n        \"status\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$subProcess.status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "230d936f-84e3-498d-ac33-ef95be16a7f5",
        "name": "4_check_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          200,
          460
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
          "jsCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "b51ce786-8381-40c9-91ac-3b8bb4b35904",
        "name": "code body",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          40,
          740
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_processDataLog",
          "query": "=[\n  {\n    \"$match\": {\n      \"$or\": [\n        {\n          \"fechaProceso\": {\n            \"$type\": 2\n          }\n        }, {\n          \"completedAt\": {\n            \"$type\": 2\n          }\n        }, {\n          \"runningAt\": {\n            \"$type\": 2\n          }\n        }\n      ]\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProceso\": {\n        \"$toDate\": \"$fechaProceso\"\n      }, \n      \"runningAt\": {\n        \"$toDate\": \"$runningAt\"\n      }, \n      \"completedAt\": {\n        \"$toDate\": \"$completedAt\"\n      }, \n      \"timeProcessedMinutes\": {\n        \"$divide\": [\n          {\n            \"$subtract\": [\n              {\n                \"$toDate\": \"$completedAt\"\n              }, {\n                \"$toDate\": \"$runningAt\"\n              }\n            ]\n          }, 60000\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"runningAt\": 1, \n      \"completedAt\": 1, \n      \"fechaProceso\": 1, \n      \"timeProcessedMinutes\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_processDataLog\", \n      \"on\": \"_id\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
        },
        "id": "d724f867-42fe-40da-89a2-f1534201bb2e",
        "name": "actualizacion status operaciones Transacciones",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          240,
          60
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
          "collection": "sidis_processDataLog",
          "query": "=[\n  {\n    \"$project\": {\n      \"into\": {\n        \"$regexFind\": {\n          \"input\": {\n            \"$toString\": \"$aggregate\"\n          }, \n          \"regex\": \"into\\\":\\\"([^\\\"]+)\\\"\",\n          \"options\": \"i\"\n        }\n      }, \n      \"description\": \"$kpi\", \n      \"endDate\": \"$completedAt\", \n      \"fromColletion\": \"$baseCollection\", \n      \"processDate\": \"$fechaProceso\", \n      \"processName\": \"$description\", \n      \"runtimeInMinutes\": \"$timeProcessedMinutes\", \n      \"startDate\": \"$runningAt\", \n      \"stage\": 1\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$into.captures\"\n    }\n  }, {\n    \"$addFields\": {\n      \"toColletion\": \"$into.captures\", \n      \"into\": \"$$REMOVE\", \n      \"status\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$stage\", \"idle\"\n                ]\n              }, \n              \"then\": \"Espera\"\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$stage\", \"running\"\n                ]\n              }, \n              \"then\": \"Ejecucion\"\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$stage\", \"completed\"\n                ]\n              }, \n              \"then\": \"Finalizado\"\n            }\n          ]\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Statustransformation\", \n      \"on\": \"_id\"\n    }\n  }\n]"
        },
        "id": "87c199ba-eba6-4ea2-a6fb-37c14febfd7b",
        "name": "actualizacion status operaciones Transacciones1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          480,
          60
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
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processDate\": {\n          \"$toString\": {\n            \"$substr\": [\n              \"$processDate\", 0, 10\n            ]\n          }\n        }, \n        \"status\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$subProcess.status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$subProcess.status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "d7928fc5-81c5-4352-9800-0b4c4293cb3e",
        "name": "4_check_operation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          180,
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.status=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "1c5eed5d-96bc-497f-bc1a-a767fc606d84",
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          360,
          1060
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E3_PROCESAMIENTO_INDICADORES",
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
        "id": "d996dfdf-de96-4ca6-b7d2-8a37fb68e64a",
        "name": "ACTIVA_E4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          540,
          1040
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n    {\n      \"$limit\": 1\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processDate\": {\n          \"$toDate\": \"{{$json.processDate}}\"\n        }\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Procesamiento_Indicadores_Margen\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_1\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_ProductosVinculados\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_2\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_IngresosCarteraCredito\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_3\"\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": {\n          \"$toString\": {\n            \"$substr\": [\n              \"$processDate\", 0, 10\n            ]\n          }\n        }, \n        \"status_1\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_1\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_1.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_2\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_2\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_2.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_3\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_3\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_3.status\"\n            }, \"En Espera\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": 1, \n        \"status\": [\n          \"$status_1\", \"$status_2\", \"$status_3\"\n        ]\n      }\n    }, {\n      \"$set\": {\n        \"status\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "7474ac97-0f81-4d4b-9f52-8a2fc1130674",
        "name": "4_check_operationes1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          180,
          1360
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
          "query": "=[\n    {\n      \"$limit\": 1\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processDate\": {\n          \"$toDate\": \"{{$json.processDate}}\"\n        }\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Procesamiento_Indicadores_Margen\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_1\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_ProductosVinculados\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_2\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_IngresosCarteraCredito\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_3\"\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": {\n          \"$toString\": {\n            \"$substr\": [\n              \"$processDate\", 0, 10\n            ]\n          }\n        }, \n        \"status_1\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_1\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_1.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_2\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_2\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_2.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_3\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_3\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_3.status\"\n            }, \"En Espera\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": 1, \n        \"status\": [\n          \"$status_1\", \"$status_2\", \"$status_3\"\n        ]\n      }\n    }, {\n      \"$set\": {\n        \"status\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "7cd0e5c6-1298-4c55-a14d-20b0ff129c55",
        "name": "4_check_operationes2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          200,
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
          "collection": "sidis_statusProcesos",
          "query": "=[\n    {\n      \"$limit\": 1\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"processDate\": {\n          \"$toDate\": \"{{$json.processDate}}\"\n        }\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Procesamiento_Indicadores_Margen\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_1\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_ProductosVinculados\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_2\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_statusProcesos\", \n        \"let\": {\n          \"processName\": \"E3_Transacciones_IngresosCarteraCredito\", \n          \"processDate\": \"$processDate\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$and\": [\n                {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processName\", \"$$processName\"\n                    ]\n                  }\n                }, {\n                  \"$expr\": {\n                    \"$eq\": [\n                      \"$processDate\", \"$$processDate\"\n                    ]\n                  }\n                }\n              ]\n            }\n          }, {\n            \"$project\": {\n              \"status\": 1\n            }\n          }\n        ], \n        \"as\": \"result_3\"\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": {\n          \"$toString\": {\n            \"$substr\": [\n              \"$processDate\", 0, 10\n            ]\n          }\n        }, \n        \"status_1\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_1\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_1.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_2\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_2\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_2.status\"\n            }, \"En Espera\"\n          ]\n        }, \n        \"status_3\": {\n          \"$cond\": [\n            {\n              \"$gt\": [\n                {\n                  \"$size\": \"$result_3\"\n                }, 0\n              ]\n            }, {\n              \"$first\": \"$result_3.status\"\n            }, \"En Espera\"\n          ]\n        }\n      }\n    }, {\n      \"$project\": {\n        \"processDate\": 1, \n        \"status\": [\n          \"$status_1\", \"$status_2\", \"$status_3\"\n        ]\n      }\n    }, {\n      \"$set\": {\n        \"status\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "68e54ced-d6f7-41ea-89e9-26e8b91e1994",
        "name": "checkMultipleOperations",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          200,
          1060
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      }
    ],
    "connections": {
      "Webhook4": {
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
      "IF2": {
        "main": [
          [
            {
              "node": "ACTIVA_E2",
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
              "node": "4_check_operation",
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
              "node": "code body",
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
              "node": "Digitos Rid Cedula1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Digitos Rid Cedula1": {
        "main": [
          [
            {
              "node": "checkMultipleOperations",
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
              "node": "Digitos Rid Cedula2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Digitos Rid Cedula2": {
        "main": [
          [
            {
              "node": "4_check_operationes1",
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
              "node": "ACTIVA_E5_AGRUPACIONES",
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
              "node": "actualizacion status operaciones",
              "type": "main",
              "index": 0
            },
            {
              "node": "actualizacion status operaciones Transacciones",
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
              "node": "ACTIVA_E3",
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
              "node": "Digitos Rid Cedula3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Digitos Rid Cedula3": {
        "main": [
          [
            {
              "node": "4_check_operationes2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "4_check_operation": {
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
      "code body": {
        "main": [
          [
            {
              "node": "4_check_operation1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "actualizacion status operaciones Transacciones": {
        "main": [
          [
            {
              "node": "actualizacion status operaciones Transacciones1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "4_check_operation1": {
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
      "IF": {
        "main": [
          [
            {
              "node": "ACTIVA_E4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "4_check_operationes1": {
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
      "4_check_operationes2": {
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
      "checkMultipleOperations": {
        "main": [
          [
            {
              "node": "IF",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }