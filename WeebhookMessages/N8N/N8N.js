{
  "meta": {
    "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
  },
  "nodes": [
    {
      "parameters": {},
      "id": "4fcd763e-e88e-4358-86e6-14bd53911bf5",
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [
        -1200,
        2280
      ],
      "disabled": true
    },
    {
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "mode": "everyX",
              "value": 4
            }
          ]
        }
      },
      "id": "a5a5dc08-0c58-45fe-9be3-bd51b39426ed",
      "name": "Cron1",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [
        -920,
        3760
      ]
    },
    {
      "parameters": {
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\nconst proceso = body.proceso;\n// Nombre del proceso/etapa\nconst subProceso = \"AcutalizacionPeopleMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\n  currentUpdatedDate: currentUpdatedDate,\n  subProceso: subProceso,\n};\n\nreturn jsonOutput;\n"
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
              "value": "={{$json.processDate}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            },
            {
              "name": "proceso",
              "value": "={{$json.processName}}"
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
        "height": 374.40403442701376,
        "width": 1807.181200131529
      },
      "id": "facbd92b-9ade-4807-97dd-3fdd14cd5cc8",
      "name": "Note3",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -540,
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
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\nconst proceso = body.proceso;\n// Nombre del proceso/etapa\nconst subProceso = \"AcutalizacionCompanyMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\n  currentUpdatedDate: currentUpdatedDate,\n  subProceso: subProceso,\n};\n\nreturn jsonOutput;\n"
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
        "functionCode": "var body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\n\nconst fechaProceso = body.fechaProceso;\nconst batchNumber = body.batchNumber;\nconst lastUpdatedAt = body.lastUpdatedAt;\nconst currentUpdatedDate = body.currentUpdatedDate;\nconst proceso = body.proceso;\n// Nombre del proceso/etapa\nconst subProceso = \"AcutalizacionExternalpotentialMessages\"\n\nconst jsonOutput = {\n  fechaProceso: fechaProceso,\n  proceso: proceso,\n  batchNumber: batchNumber,\n  lastUpdatedAt : lastUpdatedAt,\n  currentUpdatedDate: currentUpdatedDate,\n  subProceso: subProceso,\n};\n\nreturn jsonOutput;\n"
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
        "url": "=http://workflowsidis.banvenez.corp:30991/webhook/dacbe5f6-524c-488e-b1fc-b6fc1e0163d7",
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
        -740,
        3760
      ]
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
        -40,
        3740
      ]
    },
    {
      "parameters": {
        "mode": "chooseBranch",
        "output": "input2"
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
        "functionCode": "for (const item of $input.all()) {\n  proceso = item.json.proceso;\n  fechaProceso = item.json.fechaProceso;\n}\n//enter process name\nconst subProceso = \"AcutalizacionPeopleMessages\" \n\n// Nombre del campo y valor deseado\nconst jsonOutput = {\n   proceso: proceso, fechaProceso: fechaProceso, subProceso: subProceso\n};\n\nreturn jsonOutput"
      },
      "name": "FunctionItem13",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        920,
        2900
      ],
      "id": "e6d1fb34-824d-42e9-8cd1-795c026d4ef1",
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
              "value": "={{$json.processDate}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            },
            {
              "name": "proceso",
              "value": "={{$json.processName}}"
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
              "value": "={{$json.processDate}}"
            },
            {
              "name": "lastUpdatedAt",
              "value": "={{$json.lastUpdatedAt}}"
            },
            {
              "name": "currentUpdatedDate",
              "value": "={{$json.currentUpdatedDate}}"
            },
            {
              "name": "proceso",
              "value": "={{$json.processName}}"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"People\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipientId\", \n      \"name\": \"$name\", \n      \"email\": \"$email\", \n      \"delivered\": \"$delivered\", \n      \"failed\": \"$failed\", \n      \"opened\": \"$opened\", \n      \"clicked\": \"$clicked\", \n      \"unsubscribed\": \"$unsubscribed\", \n      \"complained\": \"$complained\", \n      \"stored\": \"$stored\", \n      \"event-opened\": \"$event-opened\", \n      \"event-delivered\": \"$event-delivered\", \n      \"event-clicked\": \"$event-clicked\", \n      \"event-complained\": \"$event-complained\", \n      \"event-failed\": \"$event-failed\", \n      \"event-unsubscribed\": \"$event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"People\", \n      \"on\": [\n        \"vat\", \"lastDigRif\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\":\"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$event-opened\", \n      \"delivered\": \"$event-delivered\", \n      \"clicked\": \"$event-clicked\", \n      \"complained\": \"$event-complained\", \n      \"failed\": \"$event-failed\", \n      \"unsubscribed\": \"$event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"People\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"People\", \n      \"on\": [\n        \"vat\", \"lastDigRif\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Company\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipientId\", \n      \"name\": \"$name\", \n      \"email\": \"$email\", \n      \"delivered\": \"$delivered\", \n      \"failed\": \"$failed\", \n      \"opened\": \"$opened\", \n      \"clicked\": \"$clicked\", \n      \"unsubscribed\": \"$unsubscribed\", \n      \"complained\": \"$complained\", \n      \"stored\": \"$stored\", \n      \"event-opened\": \"$event-opened\", \n      \"event-delivered\": \"$event-delivered\", \n      \"event-clicked\": \"$event-clicked\", \n      \"event-complained\": \"$event-complained\", \n      \"event-failed\": \"$event-failed\", \n      \"event-unsubscribed\": \"$event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Company\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\":\"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$event-opened\", \n      \"delivered\": \"$event-delivered\", \n      \"clicked\": \"$event-clicked\", \n      \"complained\": \"$event-complained\", \n      \"failed\": \"$event-failed\", \n      \"unsubscribed\": \"$event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Company\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Company\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Externalpotential\", \n      \"let\": {\n        \"email\": \"$email\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"campaignStatus\": 1, \n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$gt\": [\n          {\n            \"$size\": \"$People\"\n          }, 0\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"campaignId\": \"$campaignId\", \n      \"mailgun\": \"$integrationIds.mailgun\", \n      \"communicationId\": \"$communicationId\", \n      \"recipientId\": \"$recipientId\", \n      \"name\": \"$name\", \n      \"email\": \"$email\", \n      \"delivered\": \"$delivered\", \n      \"failed\": \"$failed\", \n      \"opened\": \"$opened\", \n      \"clicked\": \"$clicked\", \n      \"unsubscribed\": \"$unsubscribed\", \n      \"complained\": \"$complained\", \n      \"stored\": \"$stored\", \n      \"event-opened\": \"$event-opened\", \n      \"event-delivered\": \"$event-delivered\", \n      \"event-clicked\": \"$event-clicked\", \n      \"event-complained\": \"$event-complained\", \n      \"event-failed\": \"$event-failed\", \n      \"event-unsubscribed\": \"$event-unsubscribed\", \n      \"People\": \"$People\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"campaignId\": \"$campaignId\", \n        \"email\": \"$email\"\n      }, \n      \"doc\": {\n        \"$first\": \"$$ROOT\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"email\": \"$_id.email\"\n      }, \n      \"campaignStatusMessage\": {\n        \"$push\": \"$doc\"\n      }, \n      \"People\": {\n        \"$first\": \"$People\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"campaignStatusMessage.People\": \"$$REMOVE\", \n      \"campaignStatusPeople\": {\n        \"$first\": \"$People.campaignStatus\"\n      }, \n      \"email\": \"$_id.email\"\n    }\n  }, {\n    \"$project\": {\n      \"vat\": {\n        \"$first\": \"$People.vat\"\n      }, \n      \"People\": \"$$REMOVE\", \n      \"email\": 1, \n      \"lastDigRif\": {\n        \"$first\": \"$People.lastDigRif\"\n      }, \n      \"campaignStatus\": {\n        \"$setUnion\": [\n          {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$in\": [\n                              \"$$message.campaignId\", {\n                                \"$ifNull\": [\n                                  \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                ]\n                              }\n                            ]\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusMessage\", \n                      \"as\": \"message\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$message.campaignId\", {\n                                  \"$ifNull\": [\n                                    \"$campaignStatusPeople.campaignId\", \"$campaignStatusPeople.campaignId\", []\n                                  ]\n                                }\n                              ]\n                            }\n                          }, \"$$message\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }, {\n            \"$ifNull\": [\n              {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, {\n                \"$filter\": {\n                  \"input\": {\n                    \"$map\": {\n                      \"input\": \"$campaignStatusPeople\", \n                      \"as\": \"people\", \n                      \"in\": {\n                        \"$cond\": [\n                          {\n                            \"$not\": {\n                              \"$in\": [\n                                \"$$people.campaignId\", \"$campaignStatusMessage.campaignId\"\n                              ]\n                            }\n                          }, \"$$people\", null\n                        ]\n                      }\n                    }\n                  }, \n                  \"as\": \"item\", \n                  \"cond\": {\n                    \"$ne\": [\n                      \"$$item\", null\n                    ]\n                  }\n                }\n              }, []\n            ]\n          }\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Externalpotential\", \n      \"on\": \"email\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$gt\": [\n              \"$updatedAt\", {\n                \"$toDate\":\"{{$json.lastUpdatedAt}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$lte\": [\n              \"$updatedAt\", {\n                \"$toDate\": \"{{$json.currentUpdatedDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$batchNumber\", \"{{$json.batchNumber}}\"\n            ]\n          }\n        }, {\n          \"campaignId\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$project\": {\n      \"email\": \"$email\", \n      \"updatedAt\": 1, \n      \"opened\": \"$event-opened\", \n      \"delivered\": \"$event-delivered\", \n      \"clicked\": \"$event-clicked\", \n      \"complained\": \"$event-complained\", \n      \"failed\": \"$event-failed\", \n      \"unsubscribed\": \"$event-unsubscribed\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$email\", \n      \"docs\": {\n        \"$addToSet\": \"$$ROOT\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"doc\": {\n        \"$filter\": {\n          \"input\": \"$docs\", \n          \"as\": \"value\", \n          \"cond\": {\n            \"$eq\": [\n              \"$$value.updatedAt\", \"$updatedAt\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$mergeObjects\": [\n          \"$doc\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"updatedAt\": \"$$REMOVE\", \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$opened\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$delivered\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$clicked\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$complained\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$failed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$first\": \"$unsubscribed\"\n              }, null\n            ]\n          }, true, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"emailResult.result\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"deliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"undeliverable\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"emailResult.reason\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"opened\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"delivered\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"clicked\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"unsubscribed\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"complained\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"failed\"\n            }\n          ], \n          \"default\": \"$$REMOVE\"\n        }\n      }, \n      \"emailResult.risk\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$gt\": [\n                  \"$opened\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$delivered\", null\n                ]\n              }, \n              \"then\": \"unknown\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$clicked\", null\n                ]\n              }, \n              \"then\": \"low\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$unsubscribed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$complained\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$failed\", null\n                ]\n              }, \n              \"then\": \"high\"\n            }\n          ], \n          \"default\": \"unknown\"\n        }\n      }, \n      \"opened\": \"$$REMOVE\", \n      \"delivered\": \"$$REMOVE\", \n      \"clicked\": \"$$REMOVE\", \n      \"complained\": \"$$REMOVE\", \n      \"failed\": \"$$REMOVE\", \n      \"unsubscribed\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Externalpotential\", \n      \"let\": {\n        \"email\": {\n          \"$toLower\": \"$email\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$email\", \"$$email\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"vat\": 1, \n            \"lastDigRif\": 1\n          }\n        }, {\n          \"$limit\": 1\n        }\n      ], \n      \"as\": \"People\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$People\", \n      \"preserveNullAndEmptyArrays\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"email\": {\n        \"$toLower\": \"$email\"\n      }, \n      \"vat\": \"$People.vat\", \n      \"lastDigRif\": \"$People.lastDigRif\", \n      \"People\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Externalpotential\", \n      \"on\": \"email\", \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"discard\"\n    }\n  }\n]"
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
        -520,
        3760
      ],
      "webhookId": "dacbe5f6-524c-488e-b1fc-b6fc1e0163d7"
    },
    {
      "parameters": {
        "content": "cambiar message_1 por message",
        "height": 562.3116176861731,
        "width": 571.9281928388928
      },
      "id": "eb11e2d4-c56e-4e85-bb6c-3ea18cc7fab2",
      "name": "Note6",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        80,
        3460
      ]
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
    },
    {
      "parameters": {
        "functionCode": "for (const item of $input.all()) {\n  body=item.json.body;\n}\nvar offSet = body.offSet;\nvar offSetInt = parseInt(offSet)\n\nconst proceso = \"webhook_messages_marketing\"  //enter process name\nvar fechaProceso = new Date()\n\n// Resta el offSet (número de días) a la fecha de hoy\nfechaProceso.setDate(fechaProceso.getDate() - offSetInt);\n\n//Formatea fechaProceso a formato string\nfechaProceso = fechaProceso.toISOString().split('T')[0];\n\nconst jsonOutput = {\n  offSet: offSet, proceso: proceso, fechaProceso: fechaProceso// Nombre del campo y valor deseado\n};\n\nreturn jsonOutput"
      },
      "name": "FunctionItem",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        -360,
        3760
      ],
      "id": "589f2f10-2975-4aad-b016-c8ac19d31a8e",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "Webhook",
        "query": "=[\n  {\n    \"$match\": {\n      \"processedWeb\": {\n        \"$exists\": false\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"processedWeb\": false, \n      \"updatedAtDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$updatedAt\"\n          }, \n          \"month\": {\n            \"$month\": \"$updatedAt\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$updatedAt\"\n          }\n        }\n      }, \n      \"timestamp\": {\n        \"$dateTrunc\": {\n          \"date\": {\n            \"$max\": {\n              \"$toDate\": {\n                \"$multiply\": [\n                  {\n                    \"$toDecimal\": \"$event-data.timestamp\"\n                  }, 1000\n                ]\n              }\n            }\n          }, \n          \"unit\": \"second\"\n        }\n      }, \n      \"updatedAtSec\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Webhook\", \n      \"on\": \"_id\", \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
      },
      "id": "c747bdd7-084b-44cd-8ef1-9df705063d8e",
      "name": "1_addProcessedFiled",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        140,
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
        "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processedWeb\", false\n            ]\n          }\n        }, {\n          \"event-data.message.headers.message-id\": {\n            \"$exists\": true\n          }\n        }, {\n          \"event-data.recipient\": {\n            \"$exists\": true\n          }\n        }, {\n          \"event-data.event\": {\n            \"$exists\": true\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"messasge\": \"$event-data.message.headers.message-id\", \n        \"recipient\": \"$event-data.recipient\", \n        \"evento\": \"$event-data.event\", \n        \"timestamp\": \"$timestamp\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }, \n      \"url\": {\n        \"$addToSet\": \"$event-data.url\"\n      }, \n      \"cant\": {\n        \"$sum\": 1\n      }, \n      \"evento\": {\n        \"$first\": \"$event-data.event\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"timestamp\": \"$_id.timestamp\", \n      \"url\": {\n        \"$cond\": [\n          {\n            \"$gt\": [\n              {\n                \"$size\": {\n                  \"$filter\": {\n                    \"input\": \"$url\", \n                    \"as\": \"item\", \n                    \"cond\": {\n                      \"$gt\": [\n                        \"$$item\", null\n                      ]\n                    }\n                  }\n                }\n              }, 0\n            ]\n          }, {\n            \"$first\": \"$url\"\n          }, \"$$REMOVE\"\n        ]\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"messasge\": \"$_id.messasge\", \n        \"recipient\": \"$_id.recipient\"\n      }, \n      \"cant\": {\n        \"$sum\": \"$cant\"\n      }, \n      \"updatedAt\": {\n        \"$max\": \"$updatedAt\"\n      }, \n      \"openedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"openedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"openedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"opened\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"deliveredCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"delivered\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"clickedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"clicked\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"complainedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"complained\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"failedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"failed\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedURL\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$url\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedTimestamp\": {\n        \"$addToSet\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$timestamp\", \"$$REMOVE\"\n          ]\n        }\n      }, \n      \"unsubscribedCant\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$eq\": [\n                \"$_id.evento\", \"unsubscribed\"\n              ]\n            }, \"$cant\", \"$$REMOVE\"\n          ]\n        }\n      }\n    }\n  }, {\n    \"$project\": {\n      \"recipient\": \"$_id.recipient\", \n      \"messasge\": \"$_id.messasge\", \n      \"updatedAt\": \"$updatedAt\", \n      \"updatedAtDate\": {\n        \"$dateTrunc\": {\n          \"date\": \"$updatedAt\", \n          \"unit\": \"day\"\n        }\n      }, \n      \"_id\": \"$$REMOVE\", \n      \"event-opened.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$openedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$openedURL\"\n          }\n        ]\n      }, \n      \"event-opened.markedOpenedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$openedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$openedTimestamp\"\n          }\n        ]\n      }, \n      \"event-opened.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$openedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$openedCant\"\n        ]\n      }, \n      \"event-delivered.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$deliveredURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$deliveredURL\"\n          }\n        ]\n      }, \n      \"event-delivered.markedDeliveredAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$deliveredTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$deliveredTimestamp\"\n          }\n        ]\n      }, \n      \"event-delivered.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$deliveredCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$deliveredCant\"\n        ]\n      }, \n      \"event-clicked.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$clickedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$clickedURL\"\n          }\n        ]\n      }, \n      \"event-clicked.markedClicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$clickedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$clickedTimestamp\"\n          }\n        ]\n      }, \n      \"event-clicked.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$clickedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$clickedCant\"\n        ]\n      }, \n      \"event-complained.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$complainedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$complainedURL\"\n          }\n        ]\n      }, \n      \"event-complained.markedComplainedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$complainedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$complainedTimestamp\"\n          }\n        ]\n      }, \n      \"event-complained.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$complainedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$complainedCant\"\n        ]\n      }, \n      \"event-failed.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$failedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$failedURL\"\n          }\n        ]\n      }, \n      \"event-failed.markedFailedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$failedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$failedTimestamp\"\n          }\n        ]\n      }, \n      \"event-failed.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$failedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$failedCant\"\n        ]\n      }, \n      \"event-unsubscribed.url\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$unsubscribedURL\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$unsubscribedURL\"\n          }\n        ]\n      }, \n      \"event-unsubscribed.markedUnsubscribedAt\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$size\": \"$unsubscribedTimestamp\"\n              }, 0\n            ]\n          }, \"$$REMOVE\", {\n            \"$first\": \"$unsubscribedTimestamp\"\n          }\n        ]\n      }, \n      \"event-unsubscribed.cant\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$unsubscribedCant\", 0\n            ]\n          }, \"$$REMOVE\", \"$unsubscribedCant\"\n        ]\n      }, \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"opened\"\n            ]\n          }, 1, \"$opened\"\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"delivered\"\n            ]\n          }, 1, \"$delivered\"\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"clicked\"\n            ]\n          }, 1, \"$clicked\"\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"complained\"\n            ]\n          }, 1, \"$complained\"\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"failed\"\n            ]\n          }, 1, \"$failed\"\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$_id.evento\", \"unsubscribed\"\n            ]\n          }, 1, \"$unsubscribed\"\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"event-opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-opened\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-opened\"\n        ]\n      }, \n      \"event-delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-delivered\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-delivered\"\n        ]\n      }, \n      \"event-clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-clicked\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-clicked\"\n        ]\n      }, \n      \"event-complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-complained\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-complained\"\n        ]\n      }, \n      \"event-failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-failed\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-failed\"\n        ]\n      }, \n      \"event-unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-unsubscribed\", {}\n            ]\n          }, \"$$REMOVE\", \"$event-unsubscribed\"\n        ]\n      }, \n      \"opened\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-opened\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"delivered\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-delivered\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"clicked\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-clicked\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"complained\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-complained\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"failed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-failed\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }, \n      \"unsubscribed\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              \"$event-unsubscribed\", {}\n            ]\n          }, \"$$REMOVE\", 1\n        ]\n      }\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Message\", \n      \"let\": {\n        \"messageid\": \"$messasge\", \n        \"email\": \"$recipient\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$messageid\", \"$$messageid\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$email\", \"$$email\"\n                  ]\n                }\n              }\n            ]\n          }\n        }\n      ], \n      \"as\": \"Messagerecipient\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$Messagerecipient\"\n    }\n  }, {\n    \"$project\": {\n      \"messageid\": \"$messasge\", \n      \"email\": \"$recipient\", \n      \"updatedAt\": 1, \n      \"updatedAtDate\": 1, \n      \"event-opened\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-opened\", null\n                ]\n              }, [], [\n                \"$event-opened\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-opened\", null\n                ]\n              }, [], \"$Messagerecipient.event-opened\"\n            ]\n          }\n        ]\n      }, \n      \"event-delivered\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-delivered\", null\n                ]\n              }, [], [\n                \"$event-delivered\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-delivered\", null\n                ]\n              }, [], \"$Messagerecipient.event-delivered\"\n            ]\n          }\n        ]\n      }, \n      \"event-clicked\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-clicked\", null\n                ]\n              }, [], [\n                \"$event-clicked\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-clicked\", null\n                ]\n              }, [], \"$Messagerecipient.event-clicked\"\n            ]\n          }\n        ]\n      }, \n      \"event-complained\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-complained\", null\n                ]\n              }, [], [\n                \"$event-complained\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-complained\", null\n                ]\n              }, [], \"$Messagerecipient.event-complained\"\n            ]\n          }\n        ]\n      }, \n      \"event-failed\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-failed\", null\n                ]\n              }, [], [\n                \"$event-failed\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-failed\", null\n                ]\n              }, [], \"$Messagerecipient.event-failed\"\n            ]\n          }\n        ]\n      }, \n      \"event-unsubscribed\": {\n        \"$concatArrays\": [\n          {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$event-unsubscribed\", null\n                ]\n              }, [], [\n                \"$event-unsubscribed\"\n              ]\n            ]\n          }, {\n            \"$cond\": [\n              {\n                \"$lte\": [\n                  \"$Messagerecipient.event-unsubscribed\", null\n                ]\n              }, [], \"$Messagerecipient.event-unsubscribed\"\n            ]\n          }\n        ]\n      }, \n      \"opened\": 1, \n      \"delivered\": 1, \n      \"clicked\": 1, \n      \"complained\": 1, \n      \"failed\": 1, \n      \"unsubscribed\": 1, \n      \"batchNumber\": {\n        \"$toString\": {\n          \"$floor\": {\n            \"$multiply\": [\n              {\n                \"$rand\": {}\n              }, 10\n            ]\n          }\n        }\n      }, \n      \"updatedAt\": \"$$NOW\", \n      \"updatedAtDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$$NOW\"\n          }, \n          \"month\": {\n            \"$month\": \"$$NOW\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$$NOW\"\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Message\", \n      \"on\": [\n        \"messageid\", \"email\"\n      ]\n    }\n  }\n]"
      },
      "id": "d2c18fb0-fb3a-4366-9082-02bcf6d1abc4",
      "name": "2_WebhookRecipient",
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
        "query": "=[\n  {\n    \"$match\": {\n      \"processedWeb\": false\n    }\n  }, {\n    \"$addFields\": {\n      \"processedWeb\": true, \n      \"processedWebDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$$NOW\"\n          }, \n          \"month\": {\n            \"$month\": \"$$NOW\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$$NOW\"\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Webhook\", \n      \"on\": \"_id\"\n    }\n  }\n]"
      },
      "id": "42502819-b4ad-4926-b994-da2a9b02e2dd",
      "name": "3_markProcessed",
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
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\", \n      \"processName\": \"{{$json.proceso}}\",\n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"processName\": \"$processName\", \n      \"processDate\": \"$processDate\", \n      \"description\": \"Preprocesamiento webhook Messages\", \n      \"fromColletion\": \"webhook\", \n      \"toColletion\": \"message\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"AcutalizacionWebhookMessageRecipients\", \n          \"processDate\": \"$processDate\", \n          \"description\": \"Actualización message, webhook\", \n          \"processFrequency\": \"Diaria\", \n          \"fromColletion\": \"Webhook\", \n          \"toColletion\": \"Message\", \n          \"startDate\": \"$$NOW\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En Proceso\"\n        }, {\n          \"processName\": \"AcutalizacionPeopleMessages\", \n          \"processDate\": \"$processDate\", \n          \"description\": \"Actualización campaingStatus y emailResult\", \n          \"processFrequency\": \"Diaria\", \n          \"fromColletion\": \"Message\", \n          \"toColletion\": \"People\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"AcutalizacionCompanyMessages\", \n          \"processDate\": \"$processDate\", \n          \"description\": \"Actualización campaingStatus y emailResult\", \n          \"processFrequency\": \"Diaria\", \n          \"fromColletion\": \"Message\", \n          \"toColletion\": \"Company\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"AcutalizacionExternalpotentialMessages\", \n          \"processDate\": \"$processDate\", \n          \"description\": \"Actualización campaingStatus y emailResult\", \n          \"processFrequency\": \"Diaria\", \n          \"fromColletion\": \"Message\", \n          \"toColletion\": \"Externalpotential\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "516e7d6d-60c6-4178-a63b-371b2a27e134",
      "name": "CreateOperarion",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        -200,
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"{{$json.proceso}}\",\n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.subProceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
      },
      "id": "a2b73d8b-f5d5-4363-a572-c02aedc45b91",
      "name": "start_operation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1100,
        2900
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
        "functionCode": "for (const item of $input.all()) {\n  proceso = item.json.proceso;\n  fechaProceso = item.json.fechaProceso;\n}\n//enter process name\nconst subProceso = \"AcutalizacionWebhookMessageRecipients\" \n\n// Nombre del campo y valor deseado\nconst jsonOutput = {\n   proceso: proceso, fechaProceso: fechaProceso, subProceso: subProceso\n};\n\nreturn jsonOutput"
      },
      "name": "FunctionItem16",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        920,
        3420
      ],
      "id": "3f796baa-1c96-46b1-88e4-02aa2b4d94e1",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\":\"{{$json.proceso}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.subProceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "abaf8378-c463-44e2-af6d-e46ce93fe14d",
      "name": "updated_operation",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1100,
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
        "functionCode": "for (const item of $input.all()) {\n  proceso = item.json.proceso;\n  fechaProceso = item.json.fechaProceso;\n}\n//enter process name\nconst subProceso = \"AcutalizacionCompanyMessages\" \n\n// Nombre del campo y valor deseado\nconst jsonOutput = {\n   proceso: proceso, fechaProceso: fechaProceso, subProceso: subProceso\n};\n\nreturn jsonOutput"
      },
      "name": "FunctionItem14",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        920,
        3060
      ],
      "id": "8117ba92-192e-402e-b532-c94cc6642134",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"{{$json.proceso}}\",\n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.subProceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
      },
      "id": "ec30a543-904a-4a69-981a-6306d93fce8d",
      "name": "start_operation1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1100,
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
        "functionCode": "for (const item of $input.all()) {\n  proceso = item.json.proceso;\n  fechaProceso = item.json.fechaProceso;\n}\n//enter process name\nconst subProceso = \"AcutalizacionExternalpotentialMessages\" \n\n// Nombre del campo y valor deseado\nconst jsonOutput = {\n   proceso: proceso, fechaProceso: fechaProceso, subProceso: subProceso\n};\n\nreturn jsonOutput"
      },
      "name": "FunctionItem15",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        920,
        3240
      ],
      "id": "62ef1a24-a863-4762-aaec-019401c1b7f6",
      "alwaysOutputData": true
    },
    {
      "parameters": {
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"{{$json.proceso}}\",\n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.subProceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
      },
      "id": "a7f045e5-6b14-4fd7-b03e-6f19a17c22c8",
      "name": "start_operation2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1100,
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_statusProcesos\", \n      \"let\": {\n        \"proceso\": \"messageDateLastAct\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$$proceso\", \"$proceso\"\n              ]\n            }\n          }\n        }\n      ], \n      \"as\": \"sidis_statusProcesos\"\n    }\n  }, {\n    \"$project\": {\n      \"_id\": {\n        \"$first\": \"$sidis_statusProcesos._id\"\n      }, \n      \"currentUpdatedDate\": {\n        \"$toString\": \"$$NOW\"\n      }, \n      \"lastUpdatedDate\": {\n        \"$toString\": {\n          \"$first\": \"$sidis_statusProcesos.currentUpdatedDate\"\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": \"_id\"\n    }\n  }\n]"
      },
      "id": "b2ea00aa-0b7b-42ef-901d-5c5bb5a9bb40",
      "name": "4_currentDateMessages",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        1420,
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
        "collection": "Message",
        "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processName\": \"messageDateLastAct\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_statusProcesos\", \n      \"localField\": \"processName\", \n      \"foreignField\": \"processName\", \n      \"as\": \"sidis_statusProcesos\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": {\n        \"$first\": \"$sidis_statusProcesos\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"lastUpdatedAt\": {\n        \"$toString\": \"$lastUpdatedAt\"\n      }, \n      \"currentUpdatedDate\": {\n        \"$toString\": \"$currentUpdatedDate\"\n      }, \n      \"processName\": \"{{$json.proceso}}\",\n      \"processDate\": {\n        \"$toString\": {\n          \"$toDate\":  \"{{$json.fechaProceso}}\"\n        }\n      }, \n      \"batchNumber\": [\n        \"0\", \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", \"9\"\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$batchNumber\"\n    }\n  }\n]"
      },
      "id": "a52591e0-3696-428b-a280-dee4690fef30",
      "name": "5_datesProcess",
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
        "operation": "aggregate",
        "collection": "sidis_statusProcesos",
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\":\"{{$json.proceso}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.subProceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "49187a9c-e8e0-4497-aa39-1315cf19f646",
      "name": "updated_operation1",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3420,
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
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\":\"{{$json.proceso}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.subProceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "31503d0b-5631-4080-9463-44fd74267ca5",
      "name": "updated_operation2",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3420,
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
        "query": "=[\n  {\n    \"$match\": {\n      \"processName\":\"{{$json.proceso}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.subProceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
      },
      "id": "5019cd18-4a89-41ae-9282-a3983002bf4f",
      "name": "updated_operation3",
      "type": "n8n-nodes-base.mongoDb",
      "typeVersion": 1,
      "position": [
        3420,
        4280
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
            "node": "FunctionItem13",
            "type": "main",
            "index": 0
          },
          {
            "node": "FunctionItem14",
            "type": "main",
            "index": 0
          },
          {
            "node": "FunctionItem15",
            "type": "main",
            "index": 0
          },
          {
            "node": "FunctionItem16",
            "type": "main",
            "index": 0
          },
          {
            "node": "4_currentDateMessages",
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
            "node": "updated_operation1",
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
            "node": "updated_operation2",
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
            "node": "updated_operation3",
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
            "node": "Merge18",
            "type": "main",
            "index": 1
          },
          {
            "node": "1_addProcessedFiled",
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
            "node": "5_datesProcess",
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
            "node": "start_operation",
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
            "node": "FunctionItem",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "FunctionItem": {
      "main": [
        [
          {
            "node": "CreateOperarion",
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
    "1_addProcessedFiled": {
      "main": [
        [
          {
            "node": "2_WebhookRecipient",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "2_WebhookRecipient": {
      "main": [
        [
          {
            "node": "3_markProcessed",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "3_markProcessed": {
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
    "CreateOperarion": {
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
    "FunctionItem16": {
      "main": [
        [
          {
            "node": "updated_operation",
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
            "node": "start_operation1",
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
            "node": "start_operation2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "4_currentDateMessages": {
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
    "5_datesProcess": {
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
    }
  }
}