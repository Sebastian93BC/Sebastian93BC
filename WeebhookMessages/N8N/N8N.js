{
  "meta": {
    "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
  },
  "nodes": [
    {
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "mode": "everyX"
            }
          ]
        }
      },
      "id": "a5a5dc08-0c58-45fe-9be3-bd51b39426ed",
      "name": "Cron1",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [
        -1300,
        3760
      ]
    },
    {
      "parameters": {
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\n// Nombre del proceso/etapa\nconst proceso = \"AcutalizacionPeopleMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\ncurrentUpdatedDate: currentUpdatedDate,\n   // Nombre del campo y valor deseado\n};\n\nreturn jsonOutput;\n"
      },
      "name": "FunctionItem9",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        2580,
        3120
      ],
      "id": "690406a1-510e-41cc-a5f3-b857d467b10b",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "4_operacionMetricsRes_People",
        "options": {}
      },
      "id": "f4d5d2ad-0185-4836-bd69-35aefc57e96d",
      "name": "Webhook4",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        2420,
        3120
      ],
      "webhookId": "2877aea9-78a1-48cf-a83a-2f801c41c449"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/4_operacionMetricsRes_People",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "batchNumber",
              "value": "={{$json.batchNumber}}"
            },
            {
              "name": "fechaProceso",
              "value": "={{$json.fechaProceso}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            }
          ]
        },
        "options": {}
      },
      "id": "85c478dd-d814-48df-a9d5-0d56fe58dab0",
      "name": "HTTP Request14",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        2200,
        3120
      ]
    },
    {
      "parameters": {
        "batchSize": "1",
        "options": {}
      },
      "id": "4f5cbc7c-d2b3-45b2-acb6-78ecdfdfd068",
      "name": "SplitInBatches3",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 1,
      "position": [
        2040,
        3120
      ]
    },
    {
      "parameters": {
        "batchSize": "1",
        "options": {}
      },
      "id": "3bec2b33-f99b-408d-aee4-7718e5d59b89",
      "name": "SplitInBatches4",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 1,
      "position": [
        2040,
        4300
      ]
    },
    {
      "parameters": {
        "batchSize": "1",
        "options": {}
      },
      "id": "b45d5cc2-f2dd-4653-8713-2d65ee0e914d",
      "name": "SplitInBatches5",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 1,
      "position": [
        2040,
        3700
      ]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "a68e6fd8-da45-4f0f-a8c5-788030530e4a",
        "options": {}
      },
      "id": "046b20fa-492c-4ea8-b8cf-1fd1e8f9bb5c",
      "name": "Webhook5",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        2420,
        3700
      ],
      "webhookId": "a68e6fd8-da45-4f0f-a8c5-788030530e4a"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "fb511325-95f5-43ed-9085-edef279384fe",
        "options": {}
      },
      "id": "9a88ed6a-d803-4ff9-bc73-636ea36aea96",
      "name": "Webhook6",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        2420,
        4300
      ],
      "webhookId": "fb511325-95f5-43ed-9085-edef279384fe"
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "c5181d78-521c-449e-8396-4fa781b7b369",
      "name": "Merge18",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        700,
        3720
      ]
    },
    {
      "parameters": {
        "height": 374.4040344270136,
        "width": 2193.8699503045177
      },
      "id": "facbd92b-9ade-4807-97dd-3fdd14cd5cc8",
      "name": "Note3",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -940,
        3580
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "empty"
      },
      "id": "b30c965f-697d-4b9a-80cc-8b4bae247738",
      "name": "Merge3",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3080,
        2880
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "empty"
      },
      "id": "ee896039-c456-4246-af34-df171dcbc1ba",
      "name": "Merge9",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3080,
        3480
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "empty"
      },
      "id": "6e12cf4b-38a3-4cfe-a2e6-26fffc2f46c9",
      "name": "Merge10",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3080,
        4080
      ]
    },
    {
      "parameters": {
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\n// Nombre del proceso/etapa\nconst proceso = \"AcutalizacionCompanyMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\ncurrentUpdatedDate: currentUpdatedDate,\n   // Nombre del campo y valor deseado\n};\n\nreturn jsonOutput;\n\n"
      },
      "name": "FunctionItem3",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        2580,
        3700
      ],
      "id": "2d38be19-b8ca-4ae8-989b-56f8f2e79919",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\n// Nombre del proceso/etapa\nconst proceso = \"AcutalizacionExternalpotentialMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\ncurrentUpdatedDate: currentUpdatedDate,\n   // Nombre del campo y valor deseado\n};\n\nreturn jsonOutput;\n\n"
      },
      "name": "FunctionItem10",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        2580,
        4300
      ],
      "id": "ffc3da54-3913-432c-8130-ca6c66367c0c",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "32ffb2f6-d984-47cf-9266-1f30c9c75c2d",
      "name": "Merge11",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3260,
        3100
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "8c3985b2-ad79-44d7-9c02-f61044706035",
      "name": "Merge12",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3260,
        3680
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "c5a81fa3-313f-48db-906b-5348aecd4c29",
      "name": "Merge13",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        3260,
        4280
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/2f6ff5a3-897b-49dc-a2c8-62a1fc0647f2",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "offSet",
              "value": "=0"
            }
          ]
        },
        "options": {}
      },
      "id": "d0a01402-40cb-4f33-98d7-cab10f7dd074",
      "name": "HTTP Request15",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        -1120,
        3760
      ]
    },
    {
      "parameters": {
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
      },
      "name": "FunctionItem11",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        -720,
        3760
      ],
      "id": "6775d0bf-7d38-423a-82d2-4f87b01dccc2",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
      },
      "id": "dcd247a9-b677-4d49-88af-78a2eff22967",
      "name": "Merge14",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        -220,
        3740
      ]
    },
    {
      "parameters": {
        "functionCode": "var output = [];\nvar fechaProceso = $json.fechaProceso\nvar proceso = 'AcutalizacionWebhookMessageRecipients'\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso\n   // Nombre del campo y valor deseado\n};\nreturn jsonOutput;\n"
      },
      "name": "FunctionItem12",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        -60,
        3740
      ],
      "id": "ec756f8c-3dbb-4568-8b0c-87bc964a43a5",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "mode": "chooseBranch"
      },
      "id": "3c01def4-7412-49db-b931-76046beca7f8",
      "name": "Merge15",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 2,
      "position": [
        1620,
        3700
      ]
    },
    {
      "parameters": {
        "height": 1742.1794871794891,
        "width": 2305.2158418365507
      },
      "id": "b18d063d-ae2d-4cfa-86a2-7590b636efd7",
      "name": "Note4",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        1360,
        2760
      ]
    },
    {
      "parameters": {
        "functionCode": "var output = [];\nvar fechaProceso = $json.fechaProceso\nvar proceso = 'AcutalizacionPeopleMessages'\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso\n   // Nombre del campo y valor deseado\n};\nreturn jsonOutput;\n"
      },
      "name": "FunctionItem13",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        880,
        3020
      ],
      "id": "e6d1fb34-824d-42e9-8cd1-795c026d4ef1",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "functionCode": "var output = [];\nvar fechaProceso = $json.fechaProceso\nvar proceso = 'AcutalizacionCompanyMessages'\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso\n   // Nombre del campo y valor deseado\n};\nreturn jsonOutput;\n\n"
      },
      "name": "FunctionItem14",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        880,
        3200
      ],
      "id": "863fae90-34d5-4e88-b688-4421dd6d1f24",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "functionCode": "var output = [];\nvar fechaProceso = $json.fechaProceso\nvar proceso = 'AcutalizacionExternalpotentialMessages'\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso\n   // Nombre del campo y valor deseado\n};\nreturn jsonOutput;\n\n"
      },
      "name": "FunctionItem15",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        880,
        3380
      ],
      "id": "7053d115-e07d-41e3-bd33-0b9b31133a74",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "content": "operaciones",
        "height": 2052.478814177276
      },
      "id": "6da4f23b-feff-4a86-8043-2db6fd09bf07",
      "name": "Note5",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        2780,
        2620
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "Webhook",
        "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"fechaProceso\": {\n        \"$toString\": {\n          \"$subtract\": [\n            {\n              \"$toDate\": {\n                \"$dateFromString\": {\n                  \"dateString\": {\n                    \"$dateToString\": {\n                      \"format\": \"%Y-%m-%dT00:00:00%z\", \n                      \"date\": {\n                        \"$toDate\": \"$$NOW\"\n                      }\n                    }\n                  }\n                }\n              }\n            }, {\n              \"$multiply\": [\n                {\n                  \"$toInt\": \"{{$json.offSet}}\"\n                }, 86400000\n              ]\n            }\n          ]\n        }\n      }, \n      \"proceso\": \"webhook_messages_marketing\"\n    }\n  }\n]"
      },
      "id": "d6d2d4ab-7706-4ea2-bf2d-5717751d6943",
      "name": "1_IniciadorProcesoFecha1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -560,
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
        "collection": "Webhook",
        "query": "=[\n  {\n    \"$match\": {\n      \"processedWeb\": {\n        \"$exists\": false\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"processedWeb\": false, \n      \"updatedAtDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$updatedAt\"\n          }, \n          \"month\": {\n            \"$month\": \"$updatedAt\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$updatedAt\"\n          }\n        }\n      }, \n      \"timestamp\": {\n        \"$dateTrunc\": {\n          \"date\": {\n            \"$max\": {\n              \"$toDate\": {\n                \"$multiply\": [\n                  {\n                    \"$toDecimal\": \"$event-data.timestamp\"\n                  }, 1000\n                ]\n              }\n            }\n          }, \n          \"unit\": \"second\"\n        }\n      }, \n      \"updatedAtSec\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Webhook\", \n      \"on\": \"_id\", \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
      },
      "id": "c747bdd7-084b-44cd-8ef1-9df705063d8e",
      "name": "2_addProcessedFiled1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        120,
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
        "collection": "Webhook",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processedWeb\", false\n            ]\n          }\n        }, {\n          \"event-data.message.headers.message-id\": {\n            \"$exists\": true\n          }\n        }, {\n          \"event-data.recipient\": {\n            \"$exists\": true\n          }\n        }, {\n          \"event-data.event\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"messasge\": \"$event-data.message.headers.message-id\", \n        \"recipient\": \"$event-data.recipient\", \n        \"evento\": \"$event-data.event\", \n        \"timestamp\": \"$timestamp\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }, \n      \"url\": {\n        \"$addToSet\": \"$event-data.url\"\n      }, \n      \"cant\": {\n        \"$sum\": 1\n      }, \n      \"evento\": {\n        \"$first\": \"$event-data.event\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"timestamp\": \"$_id.timestamp\", \n      \"url\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$size\": {\n                  \"$filter\": {\n                    \"input\": \"$url\", \n                    \"as\": \"item\", \n                    \"cond\": {\n                      \"$gt\": [\n                        \"$$item\", null\n                      ]\n                    }\n                  }\n                }\n              }, 0\n            ]\n          }, {\n            \"$first\": \"$url\"\n          }, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"messasge\": \"$_id.messasge\", \n        \"recipient\": \"$_id.recipient\"\n      }, \n      \"cant\": {\n        \"$sum\": \"$cant\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }, \n      \"openedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"openedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"openedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"recipient\": \"$_id.recipient\", \n      \"messasge\": \"$_id.messasge\", \n      \"updatedAt\": \"$updatedAt\", \n      \"updatedAtDate\": {\n        \"$dateTrunc\": {\n          \"date\": \"$updatedAt\", \n          \"unit\": \"day\"\n        }\n      }, \n      \"_id\": \"$$REMOVE\", \n      \"event-opened.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$openedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$openedURL\"\n          }\n        ]\n      }, \n      \"event-opened.markedOpenedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$openedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$openedTimestamp\"\n          }\n        ]\n      }, \n      \"event-opened.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$openedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$openedCant\"\n        ]\n      }, \n      \"event-delivered.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$deliveredURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$deliveredURL\"\n          }\n        ]\n      }, \n      \"event-delivered.markedDeliveredAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$deliveredTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$deliveredTimestamp\"\n          }\n        ]\n      }, \n      \"event-delivered.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$deliveredCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$deliveredCant\"\n        ]\n      }, \n      \"event-clicked.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$clickedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$clickedURL\"\n          }\n        ]\n      }, \n      \"event-clicked.markedClicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$clickedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$clickedTimestamp\"\n          }\n        ]\n      }, \n      \"event-clicked.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$clickedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$clickedCant\"\n        ]\n      }, \n      \"event-complained.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$complainedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$complainedURL\"\n          }\n        ]\n      }, \n      \"event-complained.markedComplainedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$complainedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$complainedTimestamp\"\n          }\n        ]\n      }, \n      \"event-complained.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$complainedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$complainedCant\"\n        ]\n      }, \n      \"event-failed.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$failedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$failedURL\"\n          }\n        ]\n      }, \n      \"event-failed.markedFailedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$failedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$failedTimestamp\"\n          }\n        ]\n      }, \n      \"event-failed.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$failedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$failedCant\"\n        ]\n      }, \n      \"event-unsubscribed.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$unsubscribedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$unsubscribedURL\"\n          }\n        ]\n      }, \n      \"event-unsubscribed.markedUnsubscribedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$unsubscribedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$unsubscribedTimestamp\"\n          }\n        ]\n      }, \n      \"event-unsubscribed.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$unsubscribedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$unsubscribedCant\"\n        ]\n      }, \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"opened\"\n            ]\n          }, 1, \"$opened\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"delivered\"\n            ]\n          }, 1, \"$delivered\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"clicked\"\n            ]\n          }, 1, \"$clicked\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"complained\"\n            ]\n          }, 1, \"$complained\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"failed\"\n            ]\n          }, 1, \"$failed\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"unsubscribed\"\n            ]\n          }, 1, \"$unsubscribed\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"event-opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-opened\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-opened\"\n        ]\n      }, \n      \"event-delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-delivered\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-delivered\"\n        ]\n      }, \n      \"event-clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-clicked\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-clicked\"\n        ]\n      }, \n      \"event-complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-complained\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-complained\"\n        ]\n      }, \n      \"event-failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-failed\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-failed\"\n        ]\n      }, \n      \"event-unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-unsubscribed\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-unsubscribed\"\n        ]\n      }, \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-opened\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-delivered\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-clicked\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-complained\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-failed\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-unsubscribed\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Message_1\", \n      \"let\": {\n        \"messageid\": \"$messasge\", \n        \"email\": \"$recipient\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$messageid\", \"$$messageid\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$email\", \"$$email\"\n                  ]\n                }\n              }\n            ]\n          }\n        }\n      ], \n      \"as\": \"Messagerecipient\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$Messagerecipient\"\n    }\n  }, {\n    \"$project\": {\n      \"messageid\": \"$messasge\", \n      \"email\": \"$recipient\", \n      \"updatedAt\": 1, \n      \"updatedAtDate\": 1, \n      \"Messagerecipient.recipients\": 1, \n      \"event-opened\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-opened\", null\n                ]\n              }, [], [\n                \"$event-opened\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-opened\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-opened\"\n            ]\n          }\n        ]\n      }, \n      \"event-delivered\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-delivered\", null\n                ]\n              }, [], [\n                \"$event-delivered\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-delivered\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-delivered\"\n            ]\n          }\n        ]\n      }, \n      \"event-clicked\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-clicked\", null\n                ]\n              }, [], [\n                \"$event-clicked\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-clicked\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-clicked\"\n            ]\n          }\n        ]\n      }, \n      \"event-complained\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-complained\", null\n                ]\n              }, [], [\n                \"$event-complained\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-complained\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-complained\"\n            ]\n          }\n        ]\n      }, \n      \"event-failed\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-failed\", null\n                ]\n              }, [], [\n                \"$event-failed\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-failed\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-failed\"\n            ]\n          }\n        ]\n      }, \n      \"event-unsubscribed\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-unsubscribed\", null\n                ]\n              }, [], [\n                \"$event-unsubscribed\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.recipients.event-unsubscribed\", null\n                ]\n              }, [], \"$Messagerecipient.recipients.event-unsubscribed\"\n            ]\n          }\n        ]\n      }, \n      \"opened\": 1, \n      \"delivered\": 1, \n      \"clicked\": 1, \n      \"complained\": 1, \n      \"failed\": 1, \n      \"unsubscribed\": 1\n    }\n  }, {\n    \"$project\": {\n      \"messageid\": 1, \n      \"email\": 1, \n      \"updatedAt\": 1, \n      \"updatedAtDate\": 1, \n      \"batchNumber\": {\n        \"$toString\": {\n          \"$floor\": {\n            \"$multiply\": [\n              {\n                \"$rand\": {}\n              }, 10\n            ]\n          }\n        }\n      }, \n      \"recipients.recipientId\": \"$Messagerecipient.recipients.recipientId\", \n      \"recipients.name\": \"$Messagerecipient.recipients.name\", \n      \"recipients.email\": \"$Messagerecipient.recipients.email\", \n      \"recipients.event-opened\": \"$event-opened\", \n      \"recipients.event-delivered\": \"$event-delivered\", \n      \"recipients.event-clicked\": \"$event-clicked\", \n      \"recipients.event-complained\": \"$event-complained\", \n      \"recipients.event-failed\": \"$event-failed\", \n      \"recipients.event-unsubscribed\": \"$event-unsubscribed\", \n      \"recipients.opened\": \"$opened\", \n      \"recipients.delivered\": \"$delivered\", \n      \"recipients.clicked\": \"$clicked\", \n      \"recipients.complained\": \"$complained\", \n      \"recipients.failed\": \"$failed\", \n      \"recipients.unsubscribed\": \"$unsubscribed\", \n      \"updatedAt\": \"$$NOW\", \n      \"updatedAtDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$$NOW\"\n          }, \n          \"month\": {\n            \"$month\": \"$$NOW\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$$NOW\"\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Message_1\", \n      \"on\": [\n        \"messageid\", \"email\"\n      ]\n    }\n  }\n]"
      },
      "id": "d2c18fb0-fb3a-4366-9082-02bcf6d1abc4",
      "name": "3_WebhookRecipient1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        320,
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
        "collection": "Webhook",
        "query": "=  [\n    {\n      \"$match\": {\n        \"processedWeb\": false\n      }\n    }, {\n      \"$addFields\": {\n        \"processedWeb\": true, \n        \"processedWebDate\": {\n          \"$dateFromParts\": {\n            \"year\": {\n              \"$year\": \"$$NOW\"\n            }, \n            \"month\": {\n              \"$month\": \"$$NOW\"\n            }, \n            \"day\": {\n              \"$dayOfMonth\": \"$$NOW\"\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"Webhook\", \n        \"on\": \"_id\"\n      }\n    }\n  ]"
      },
      "id": "42502819-b4ad-4926-b994-da2a9b02e2dd",
      "name": "4_markProcessed1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        500,
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
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_statusProcesos\", \n      \"let\": {\n        \"proceso\": \"messageDateLastAct\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$$proceso\", \"$proceso\"\n              ]\n            }\n          }\n        }\n      ], \n      \"as\": \"sidis_statusProcesos\"\n    }\n  }, {\n    \"$project\": {\n      \"_id\": {\n        \"$first\": \"$sidis_statusProcesos._id\"\n      }, \n      \"currentUpdatedDate\": {\n        \"$toString\": \"$$NOW\"\n      }, \n      \"lastUpdatedDate\": {\n        \"$toString\": {\n          \"$first\": \"$sidis_statusProcesos.currentUpdatedDate\"\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": \"_id\"\n    }\n  }\n]"
      },
      "id": "b2ea00aa-0b7b-42ef-901d-5c5bb5a9bb40",
      "name": "5_currentDateMessages1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1400,
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
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"messageDateLastAct\"\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"lastUpdatedAt\": {\n        \"$toString\": \"$lastUpdatedAt\"\n      }, \n      \"currentUpdatedDate\": {\n        \"$toString\": \"$currentUpdatedDate\"\n      }, \n      \"fechaProceso\": {\n        \"$toString\": {\n          \"$toDate\": \"{{$json.fechaProceso}}\"\n        }\n      }, \n      \"batchNumber\": [\n        \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\"\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$batchNumber\"\n    }\n  }\n]"
      },
      "id": "a52591e0-3696-428b-a280-dee4690fef30",
      "name": "6_datesProcess1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1800,
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
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/a68e6fd8-da45-4f0f-a8c5-788030530e4a",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "batchNumber",
              "value": "={{$json.batchNumber}}"
            },
            {
              "name": "fechaProceso",
              "value": "={{$json.fechaProceso}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            }
          ]
        },
        "options": {}
      },
      "id": "0023f1df-254d-494c-b9cd-5ce7078aa4fa",
      "name": "HTTP Request16",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        2200,
        3700
      ]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/fb511325-95f5-43ed-9085-edef279384fe",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "batchNumber",
              "value": "={{$json.batchNumber}}"
            },
            {
              "name": "fechaProceso",
              "value": "={{$json.fechaProceso}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            }
          ]
        },
        "options": {}
      },
      "id": "7f697c04-38a3-4d4f-9385-d8dd306b9c11",
      "name": "HTTP Request1",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [
        2200,
        4300
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"People\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipients.recipientId\", \n      \"name\": \"$recipients.name\", \n      \"email\": \"$recipients.email\", \n      \"delivered\": \"$recipients.delivered\", \n      \"failed\": \"$recipients.failed\", \n      \"opened\": \"$recipients.opened\", \n      \"clicked\": \"$recipients.clicked\", \n      \"unsubscribed\": \"$recipients.unsubscribed\", \n      \"complained\": \"$recipients.complained\", \n      \"stored\": \"$recipients.stored\", \n      \"event-opened\": \"$recipients.event-opened\", \n      \"event-delivered\": \"$recipients.event-delivered\", \n      \"event-clicked\": \"$recipients.event-clicked\", \n      \"event-complained\": \"$recipients.event-complained\", \n      \"event-failed\": \"$recipients.event-failed\", \n      \"event-unsubscribed\": \"$recipients.event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"People\", \n      \"on\": [\n        \"vat\", \"lastDigRif\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "c5e23b37-2b57-43dc-bf52-ec27c745bb55",
      "name": "7_campaignStatusMessage1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
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
        "operation": "aggregate",
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$recipients.email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$recipients.event-opened\", \n      \"delivered\": \"$recipients.event-delivered\", \n      \"clicked\": \"$recipients.event-clicked\", \n      \"complained\": \"$recipients.event-complained\", \n      \"failed\": \"$recipients.event-failed\", \n      \"unsubscribed\": \"$recipients.event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"People\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"People\", \n      \"on\": [\n        \"vat\", \"lastDigRif\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "eea79476-c669-4200-8809-ca1a7671086f",
      "name": "8_emailResultMessage1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
        2960
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
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Company\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipients.recipientId\", \n      \"name\": \"$recipients.name\", \n      \"email\": \"$recipients.email\", \n      \"delivered\": \"$recipients.delivered\", \n      \"failed\": \"$recipients.failed\", \n      \"opened\": \"$recipients.opened\", \n      \"clicked\": \"$recipients.clicked\", \n      \"unsubscribed\": \"$recipients.unsubscribed\", \n      \"complained\": \"$recipients.complained\", \n      \"stored\": \"$recipients.stored\", \n      \"event-opened\": \"$recipients.event-opened\", \n      \"event-delivered\": \"$recipients.event-delivered\", \n      \"event-clicked\": \"$recipients.event-clicked\", \n      \"event-complained\": \"$recipients.event-complained\", \n      \"event-failed\": \"$recipients.event-failed\", \n      \"event-unsubscribed\": \"$recipients.event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Company\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "b47bf1e0-254a-4de9-96ce-08d91d809535",
      "name": "7_campaignStatusMessageCompany1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
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
        "operation": "aggregate",
        "collection": "Message_1",
        "query": "=\n[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\",\"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$recipients.email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$recipients.event-opened\", \n      \"delivered\": \"$recipients.event-delivered\", \n      \"clicked\": \"$recipients.event-clicked\", \n      \"complained\": \"$recipients.event-complained\", \n      \"failed\": \"$recipients.event-failed\", \n      \"unsubscribed\": \"$recipients.event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Company\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Company\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "0fac87b5-8246-46ae-9309-adde7615704b",
      "name": "8_emailResultMessageCompany1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
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
        "operation": "aggregate",
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Externalpotential\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipients.recipientId\", \n      \"name\": \"$recipients.name\", \n      \"email\": \"$recipients.email\", \n      \"delivered\": \"$recipients.delivered\", \n      \"failed\": \"$recipients.failed\", \n      \"opened\": \"$recipients.opened\", \n      \"clicked\": \"$recipients.clicked\", \n      \"unsubscribed\": \"$recipients.unsubscribed\", \n      \"complained\": \"$recipients.complained\", \n      \"stored\": \"$recipients.stored\", \n      \"event-opened\": \"$recipients.event-opened\", \n      \"event-delivered\": \"$recipients.event-delivered\", \n      \"event-clicked\": \"$recipients.event-clicked\", \n      \"event-complained\": \"$recipients.event-complained\", \n      \"event-failed\": \"$recipients.event-failed\", \n      \"event-unsubscribed\": \"$recipients.event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Externalpotential\", \n      \"on\": \"email\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "83201adf-8a54-4419-9913-840a087d3486",
      "name": "7_campaignStatusMessageExternalPoetential1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
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
        "operation": "aggregate",
        "collection": "Message_1",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$recipients.email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$recipients.event-opened\", \n      \"delivered\": \"$recipients.event-delivered\", \n      \"clicked\": \"$recipients.event-clicked\", \n      \"complained\": \"$recipients.event-complained\", \n      \"failed\": \"$recipients.event-failed\", \n      \"unsubscribed\": \"$recipients.event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Externalpotential\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Externalpotential\", \n      \"on\": \"email\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
      },
      "id": "1d561129-f915-4254-b814-d986bc704c8a",
      "name": "8_emailResultMessageExternalPotential1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        2860,
        4180
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
        "path": "dacbe5f6-524c-488e-b1fc-b6fc1e0163d7",
        "options": {}
      },
      "id": "f1b53b6c-e84d-4491-9d89-8170b541450e",
      "name": "Webhook8",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [
        -880,
        3760
      ],
      "webhookId": "dacbe5f6-524c-488e-b1fc-b6fc1e0163d7"
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=  [\n    {\n      \"$limit\": 1\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"proceso\": \"{{$json.proceso}}\",\n        \"fechaProceso\": {\n          \"$toDate\": \"{{$json.fechaProceso}}\"\n        }, \n        \"descripcion\": \"Preprocesamiento webhook Messages\", \n        \"status\": \"En Proceso\", \n        \"fechaInicio\": \"$$NOW\", \n        \"fechaFin\": \"nda\", \n        \"tiempoEjecucion\": \"nda\", \n        \"tipoOperación\": \"4 sub-procesos\", \n        \"frecuencia\": \"Cada 2 horas\", \n        \"updatedAt\": \"$$NOW\", \n        \"procesos\": [\n          {\n            \"subProceso\": \"AcutalizacionWebhookMessageRecipients\", \n            \"descripcion\": \"Actualización message, webhook\", \n            \"fechaProceso\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }, \n            \"fuenteEntrada\": \"webhook\", \n            \"fuenteSalida\": \"message\", \n            \"frecuencia\": \"Diaria\", \n            \"fechaInicio\": \"$$NOW\", \n            \"fechaFin\": \"nda\", \n            \"tiempoEjecucion\": \"nda\", \n            \"status\": \"En Proceso\"\n          }, {\n            \"subProceso\": \"AcutalizacionPeopleMessages\", \n            \"descripcion\": \"Actualización campaingStatus y emailResult\", \n            \"fechaProceso\": \"$fechaProceso\", \n            \"fuenteEntrada\": \"messages\", \n            \"fuenteSalida\": \"People\", \n            \"frecuencia\": \"Diaria\", \n            \"fechaInicio\": \"nda\", \n            \"fechaFin\": \"nda\", \n            \"tiempoEjecucion\": \"nda\", \n            \"status\": \"En espera\"\n          }, {\n            \"subProceso\": \"AcutalizacionCompanyMessages\", \n            \"descripcion\": \"Actualización campaingStatus y emailResult\", \n            \"fechaProceso\": \"$fechaProceso\", \n            \"fuenteEntrada\": \"messages\", \n            \"fuenteSalida\": \"Company\", \n            \"frecuencia\": \"Diaria\", \n            \"fechaInicio\": \"nda\", \n            \"fechaFin\": \"nda\", \n            \"tiempoEjecucion\": \"nda\", \n            \"status\": \"En espera\"\n          }, {\n            \"subProceso\": \"AcutalizacionExternalpotentialMessages\", \n            \"descripcion\": \"Actualización campaingStatus y emailResult\", \n            \"fechaProceso\": \"$fechaProceso\", \n            \"fuenteEntrada\": \"messages\", \n            \"fuenteSalida\": \"Externalpotential\", \n            \"frecuencia\": \"Diaria\", \n            \"fechaInicio\": \"nda\", \n            \"fechaFin\": \"nda\", \n            \"tiempoEjecucion\": \"nda\", \n            \"status\": \"En espera\"\n          }\n        ]\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"proceso\", \"fechaProceso\"\n        ]\n      }\n    }\n  ]"
      },
      "id": "516e7d6d-60c6-4178-a63b-371b2a27e134",
      "name": "status_paso_1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -400,
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
        "content": "cambiar message_1 por message",
        "height": 278.77587209843733,
        "width": 150
      },
      "id": "eb11e2d4-c56e-4e85-bb6c-3ea18cc7fab2",
      "name": "Note6",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        300,
        3460
      ]
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$procesos.fechaInicio\"\n                  }, {\n                    \"fechaFin\": \"$$NOW\"\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"tiempoEjecucion\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$procesos.fechaInicio\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$procesos.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$procesos.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"fechaFin\": \"$$NOW\", \n      \"tiempoEjecucion\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$fechaInicio\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "ba20e552-d316-4b26-b614-c3cffbea08fe",
      "name": "status_paso_3",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1060,
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
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$NOW\"\n                  }, {\n                    \"fechaFin\": \"$$procesos.fechaFin\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"tiempoEjecucion\": \"$$procesos.tiempoEjecucion\"\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "a2b73d8b-f5d5-4363-a572-c02aedc45b91",
      "name": "status_paso_2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1060,
        3020
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
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$NOW\"\n                  }, {\n                    \"fechaFin\": \"$$procesos.fechaFin\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"tiempoEjecucion\": \"$$procesos.tiempoEjecucion\"\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "2e13bd7b-a9c3-4b6d-bc06-cd0450b83189",
      "name": "status_paso_2_1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1060,
        3200
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
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$NOW\"\n                  }, {\n                    \"fechaFin\": \"$$procesos.fechaFin\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"tiempoEjecucion\": \"$$procesos.tiempoEjecucion\"\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "46272108-01fc-41ce-9f73-7b03fcedf851",
      "name": "status_paso_2_",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1060,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$procesos.fechaInicio\"\n                  }, {\n                    \"fechaFin\": \"$$NOW\"\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"tiempoEjecucion\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$procesos.fechaInicio\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$procesos.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$procesos.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"fechaFin\": \"$$NOW\", \n      \"tiempoEjecucion\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$fechaInicio\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "31606817-d6d9-4310-91f2-ea32514c88b7",
      "name": "status_paso_3_",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3440,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$procesos.fechaInicio\"\n                  }, {\n                    \"fechaFin\": \"$$NOW\"\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"tiempoEjecucion\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$procesos.fechaInicio\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$procesos.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$procesos.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"fechaFin\": \"$$NOW\", \n      \"tiempoEjecucion\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$fechaInicio\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "ba47abfd-8d1b-4f15-a0cf-50f6acab29c0",
      "name": "status_paso_3_1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3440,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"proceso\": \"webhook_messages_marketing\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"procesos\": {\n        \"$map\": {\n          \"input\": \"$procesos\", \n          \"as\": \"procesos\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$procesos.subProceso\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProceso\": \"{{$json.proceso}}\"\n                  }, {\n                    \"descripcion\": \"$$procesos.descripcion\"\n                  }, {\n                    \"fechaProceso\": \"$fechaProceso\"\n                  }, {\n                    \"fuenteEntrada\": \"$$procesos.fuenteEntrada\"\n                  }, {\n                    \"fuenteSalida\": \"$$procesos.fuenteSalida\"\n                  }, {\n                    \"frecuencia\": \"$$procesos.frecuencia\"\n                  }, {\n                    \"fechaInicio\": \"$$procesos.fechaInicio\"\n                  }, {\n                    \"fechaFin\": \"$$NOW\"\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"tiempoEjecucion\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$procesos.fechaInicio\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }\n                ]\n              }, \"$$procesos\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$procesos.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$procesos.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"fechaFin\": \"$$NOW\", \n      \"tiempoEjecucion\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$fechaInicio\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"proceso\", \"fechaProceso\"\n      ]\n    }\n  }\n]"
      },
      "id": "c5cab6dc-6ef4-463b-944a-9dc0c07f4097",
      "name": "status_paso_3_2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3440,
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
        "content": "cambiar message_1 por message",
        "height": 278.77587209843733,
        "width": 150
      },
      "id": "5121504e-d5e5-4597-8ffa-8c87bd877f03",
      "name": "Note7",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        1380,
        3480
      ]
    }
  ],
  "connections": {
    "Cron1": {
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
    "FunctionItem9": {
      "main": [
        [
          {
            "node": "Merge11",
            "type": "main",
            "index": 1
          },
          {
            "node": "8_emailResultMessage1",
            "type": "main",
            "index": 0
          },
          {
            "node": "7_campaignStatusMessage1",
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
            "node": "FunctionItem9",
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
            "node": "HTTP Request1",
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
            "node": "HTTP Request16",
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
            "node": "FunctionItem3",
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
            "node": "FunctionItem10",
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
            "node": "Merge15",
            "type": "main",
            "index": 1
          },
          {
            "node": "FunctionItem15",
            "type": "main",
            "index": 0
          },
          {
            "node": "FunctionItem14",
            "type": "main",
            "index": 0
          },
          {
            "node": "FunctionItem13",
            "type": "main",
            "index": 0
          },
          {
            "node": "status_paso_3",
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
            "node": "Merge11",
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
            "node": "Merge12",
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
            "node": "Merge13",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem3": {
      "main": [
        [
          {
            "node": "Merge12",
            "type": "main",
            "index": 1
          },
          {
            "node": "8_emailResultMessageCompany1",
            "type": "main",
            "index": 0
          },
          {
            "node": "7_campaignStatusMessageCompany1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem10": {
      "main": [
        [
          {
            "node": "Merge13",
            "type": "main",
            "index": 1
          },
          {
            "node": "8_emailResultMessageExternalPotential1",
            "type": "main",
            "index": 0
          },
          {
            "node": "7_campaignStatusMessageExternalPoetential1",
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
            "node": "status_paso_3_",
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
            "node": "status_paso_3_1",
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
            "node": "status_paso_3_2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem11": {
      "main": [
        [
          {
            "node": "1_IniciadorProcesoFecha1",
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
            "node": "FunctionItem12",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem12": {
      "main": [
        [
          {
            "node": "2_addProcessedFiled1",
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
    "Merge15": {
      "main": [
        [
          {
            "node": "6_datesProcess1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem13": {
      "main": [
        [
          {
            "node": "status_paso_2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem14": {
      "main": [
        [
          {
            "node": "status_paso_2_1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem15": {
      "main": [
        [
          {
            "node": "status_paso_2_",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "1_IniciadorProcesoFecha1": {
      "main": [
        [
          {
            "node": "Merge14",
            "type": "main",
            "index": 1
          },
          {
            "node": "status_paso_1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "2_addProcessedFiled1": {
      "main": [
        [
          {
            "node": "3_WebhookRecipient1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "3_WebhookRecipient1": {
      "main": [
        [
          {
            "node": "4_markProcessed1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "4_markProcessed1": {
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
    "5_currentDateMessages1": {
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
    "6_datesProcess1": {
      "main": [
        [
          {
            "node": "SplitInBatches3",
            "type": "main",
            "index": 0
          },
          {
            "node": "SplitInBatches5",
            "type": "main",
            "index": 0
          },
          {
            "node": "SplitInBatches4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request16": {
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
    "HTTP Request1": {
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
    "7_campaignStatusMessage1": {
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
    "8_emailResultMessage1": {
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
    "7_campaignStatusMessageCompany1": {
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
    "8_emailResultMessageCompany1": {
      "main": [
        [
          {
            "node": "Merge9",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "7_campaignStatusMessageExternalPoetential1": {
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
    "8_emailResultMessageExternalPotential1": {
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
    "Webhook8": {
      "main": [
        [
          {
            "node": "FunctionItem11",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "status_paso_1": {
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
    "status_paso_3": {
      "main": [
        [
          {
            "node": "5_currentDateMessages1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}