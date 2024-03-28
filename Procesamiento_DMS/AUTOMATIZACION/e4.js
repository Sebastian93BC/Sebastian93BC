{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "ecbd4f7a-bea6-468b-92e0-6c2ace032011",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -3460,
          1300
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "E4_RESEGMENTACION",
          "options": {}
        },
        "id": "6e8904d1-03ed-4076-a014-7177a6e2a086",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -3760,
          2280
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f",
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "03263c2a-65b7-46eb-8f73-c62c4c67bcca",
        "name": "SplitInBatches",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -2340,
          2000
        ]
      },
      {
        "parameters": {
          "jsCode": "var fechaProceso\nvar procesos\n  procesos=[\n           \"0\",\n           \"1\",\n           \"2\",\n           \"3\",\n           \"4\",\n           \"5\",\n           \"6\",\n           \"7\",\n           \"8\",\n           \"9\",\n          ];\nvar result = []\nvar i = 0\nfor (const item of $input.all()) {\n  for (const proceso of procesos) {\n     result.push({fechaProceso:item.json.fechaProceso,proceso:proceso})\n     i++\n  }\n}\nreturn result;"
        },
        "id": "21814527-cf9e-4ec3-8592-716971590b5b",
        "name": "Digitos Rid Cedula",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2520,
          2000
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/R1_Resegmentacion_Margenmetric",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.fechaProceso}}"
              },
              {
                "name": "proceso",
                "value": "={{$json.proceso}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "d0e9e6ad-a1bc-4f1d-b348-14636c297bb5",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -1700,
          1980
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "R1_Resegmentacion_Margenmetric",
          "options": {}
        },
        "id": "d53ce6ec-f27f-485d-83f1-33520c22fe6b",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -1540,
          2020
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d"
      },
      {
        "parameters": {
          "content": "R1_Resegmentacion_Margenmetric",
          "height": 522.6614917882523,
          "width": 3944.6493529665395
        },
        "id": "b9dc1d9c-230f-4254-a087-0e89c040f466",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2820,
          1680
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "b31eb27f-0ca3-499b-a357-a0a062b85c9b",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1020,
          2000
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "08f889aa-75c4-4741-9395-b1e7df553f04",
        "name": "Merge1",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -400,
          1980
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E4_RESEGMENTACION",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.fechaProceso}}"
              },
              {
                "name": "lastDigRif",
                "value": "={{$json.lastDigRif}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "4ad651d0-6d16-4fc1-bbd8-f2284497fb84",
        "name": "HTTP Request1",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          140,
          1960
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d60ee8bf-582c-42ed-9a60-12a0c12f17a9",
        "name": "Merge2",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          0,
          1960
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_1_actualizacionNatural",
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
        "id": "6b33c1c7-5e11-4536-aeee-0d1c4ead3301",
        "name": "HTTP Request2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -2820,
          2520
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_1_actualizacionNatural",
          "options": {}
        },
        "id": "c8dd95f9-a31d-49b2-83cd-52e7ddd884e2",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -2580,
          2520
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d"
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/A_2_actualizacionJuridica",
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
        "id": "324c8925-e168-4a98-9dbc-3081f4f43fb2",
        "name": "HTTP Request3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -2800,
          2980
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "A_2_actualizacionJuridica",
          "options": {}
        },
        "id": "118ddb06-32a4-406e-a5c1-3407258a623d",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -2600,
          3000
        ],
        "webhookId": "b41f5f81-2917-4bf1-aa17-a6a3127d3d1d"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "8946b9c3-d6ca-4f69-9c3d-458d61ec50c8",
        "name": "Merge4",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1700,
          2480
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "People",
          "query": "=[\n  {\n    \"$match\": {\n      \"clienteActivo\": true\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"vat\": 1, \n      \"name\": 1, \n      \"email\": 1, \n      \"city\": 1, \n      \"phone\": 1, \n      \"secondaryPhone\": 1, \n      \"sex\": 1, \n      \"clienteActivo\": 1, \n      \"nombresegmento\": 1, \n      \"codigosegmento\": 1, \n      \"persona\": \"Natural\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"dateOfBirth\": \"$dateOfBirth\", \n      \"birthdayDay\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$$NOW\"\n          }, \n          \"month\": {\n            \"$month\": \"$dateOfBirth\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$dateOfBirth\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"weekBirthday\": {\n        \"$week\": {\n          \"$dateFromParts\": {\n            \"year\": {\n              \"$year\": \"$$NOW\"\n            }, \n            \"month\": {\n              \"$month\": \"$dateOfBirth\"\n            }, \n            \"day\": {\n              \"$dayOfMonth\": \"$dateOfBirth\"\n            }\n          }\n        }\n      }, \n      \"age\": {\n        \"$subtract\": [\n          {\n            \"$year\": \"$$NOW\"\n          }, {\n            \"$year\": \"$dateOfBirth\"\n          }\n        ]\n      }, \n      \"campaignStatus\": 1, \n      \"emailResult\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Cumpleaños\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"replace\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "9442c776-998a-47d8-9b62-4747292e4fb9",
        "name": "A_1_1_cumpleaños_PeopletoCumpleaños",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -620,
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
          "content": "people1",
          "height": 473.215491479906,
          "width": 3218.113244322153
        },
        "id": "e723c644-47bd-45a8-8f26-73c6c4929702",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2860,
          2220
        ]
      },
      {
        "parameters": {
          "content": "company",
          "height": 468.8680044940552,
          "width": 3221.55598476016
        },
        "id": "b415d5bf-4744-4aad-b23d-01a704cee1e9",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2880,
          2700
        ]
      },
      {
        "parameters": {},
        "id": "06573c5e-8fee-4b40-beb2-5d7660e1b0b1",
        "name": "NoOp5",
        "type": "n8n-nodes-base.noOp",
        "typeVersion": 1,
        "position": [
          -2780,
          2000
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n  const fechaProceso = body.fechaProceso;\nconst proceso = \"A_1_actualizacionPeople\"  //enter process name\noutput.push({fechaProceso:fechaProceso,proceso:proceso});\n\nreturn output;"
        },
        "id": "936f6ff3-29a7-44ad-81a3-7f2ea2a73490",
        "name": "FechcaProceso2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2400,
          2520
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n  const fechaProceso = body.fechaProceso;\nconst proceso = \"A_2_actualizacionCompany\"  //enter process name\noutput.push({fechaProceso:fechaProceso,proceso:proceso});\n\nreturn output;"
        },
        "id": "c1d8162d-6bcc-43c0-9f18-7c2d09882048",
        "name": "FechcaProceso3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2420,
          3000
        ]
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "fdbdf732-282b-4b49-be34-1f3cd79970ad",
        "name": "FechcaProceso4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -1400,
          2020
        ]
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\nvar body\nfor (const item of $input.all()) {\n  fechaProceso=item.json.body;\n}\n\nreturn fechaProceso;"
        },
        "id": "6d71e274-abdd-40d8-91ce-c0d66090b2ab",
        "name": "FechcaProceso5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -3600,
          2280
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"persona\": \"Natural\", \n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"People\", \n      \"let\": {\n        \"rif\": \"$rifCedula\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$$rif\", \"$vat\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"integrationIds\": 1, \n            \"peopleIds\": 1, \n            \"createdAt\": 1, \n            \"email\": 1, \n            \"emailHist\": 1\n          }\n        }\n      ], \n      \"as\": \"result\"\n    }\n  }, {\n    \"$addFields\": {\n      \"integrationIds\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.integrationIds\"\n          }, {\n            \"Margenmetricnatural\": \"$rifCedula\"\n          }\n        ]\n      }, \n      \"peopleIds\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.peopleIds\"\n          }, {\n            \"Margenmetricnatural\": [\n              \"$_id\"\n            ]\n          }\n        ]\n      }, \n      \"_id\": \"$$REMOVE\", \n      \"vat\": \"$rifCedula\", \n      \"name\": \"$nombreCliente\", \n      \"stage\": \"client\", \n      \"nivelSocioEconomico\": \"$nombreNSE\", \n      \"updatedAt\": \"$$NOW\", \n      \"createdAt\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.createdAt\"\n          }, \"$$NOW\"\n        ]\n      }, \n      \"feve\": \"$sidisBaseCliente.mbc_feve\", \n      \"UAI\": \"$sidisBaseCliente.mbc_uai\", \n      \"address\": \"$sidisCliente.cli_direccion\", \n      \"billingAddress\": \"$sidisCliente.cli_direccion\", \n      \"billingName\": \"$sidisCliente.cli_nom_cliente\", \n      \"city\": \"$sidisCliente.cli_cdef_ciudad\", \n      \"codigoejecutivo\": \"$sidisCliente.cli_cod_ejecutivo\", \n      \"email\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$result.email\"\n                  }, null\n                ]\n              }, \n              \"then\": {\n                \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$result.email\"\n                  }, \"\"\n                ]\n              }, \n              \"then\": {\n                \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n              }\n            }\n          ], \n          \"default\": {\n            \"$first\": \"$result.email\"\n          }\n        }\n      }, \n      \"emailHist\": {\n        \"$setUnion\": [\n          [\n            {\n              \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n            }\n          ], {\n            \"$ifNull\": [\n              {\n                \"$first\": \"$result.emailHist\"\n              }, {\n                \"$first\": \"$result.emailHist\"\n              }, []\n            ]\n          }\n        ]\n      }, \n      \"externalCode\": \"$sidisCliente.cli_num_per\", \n      \"lastName\": \"$sidisCliente.cli_nom_cliente\", \n      \"maritalstatus\": \"$sidisCliente.cli_cdef_estadocivil\", \n      \"nombreejecutivo\": \"$sidisCliente.cli_nom_ejecut_cuenta\", \n      \"ocupation\": \"$sidisCliente.cli_desc_act_econ\", \n      \"ocupationId\": \"$sidisCliente.cli_actividad_econ\", \n      \"personNumber\": \"$sidisCliente.cli_num_per\", \n      \"phone\": \"$sidisCliente.cli_cdef_telefono1\", \n      \"secondaryPhone\": \"$sidisCliente.cli_cdef_telefono2\", \n      \"sex\": \"$sidisCliente.cli_cdef_sexo\", \n      \"state\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$sidisCliente.cli_estado\", \"DEPENDENCIAS FE\"\n                ]\n              }, \n              \"then\": \"DEPENDENCIAS FEDERALES\"\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$sidisCliente.cli_estado\", \"DISTRITO CAPITA\"\n                ]\n              }, \n              \"then\": \"DISTRITO CAPITAL\"\n            }\n          ], \n          \"default\": \"$sidisCliente.cli_estado\"\n        }\n      }, \n      \"age\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$fechaProceso\", \"$sidisCliente.cli_fec_nac\"\n                ]\n              }, 31536000000\n            ]\n          }, 0\n        ]\n      }, \n      \"dateOfBirth\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"month\": {\n            \"$month\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"fechaUltimaTransacPasivo\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"officeCode\": \"$sidisSegmentacion.seg_oficina_tutora\", \n      \"officeName\": \"$sidisSegmentacion.seg_nombre_oficina\", \n      \"regionCode\": \"$sidisSegmentacion.seg_territorio\", \n      \"regionName\": \"$sidisSegmentacion.seg_nombre_territorio\", \n      \"clientDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"month\": {\n            \"$month\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"country\": \"Venezuela\", \n      \"stage\": \"Client\", \n      \"credictCards\": \"$credictCards\", \n      \"codigobanca\": \"$codigoBanca\", \n      \"codigosegmento\": \"$codigoSegmento\", \n      \"codigosubSegmento\": \"$codigoSubsegmento\", \n      \"nivelSocioEconomico\": \"$nombreNSE\", \n      \"nombrebanca\": \"$nombreBanca\", \n      \"nombresegmento\": \"$nombreSegmento\", \n      \"nombresubSegmento\": \"$nombreSubsegmento\", \n      \"result\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"People\", \n      \"on\": [\n        \"lastDigRif\", \"vat\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "450787e7-2bda-4b99-9d6b-e5c76c1621f1",
        "name": "A_1_actualizacionPeople",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1880,
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
          "collection": "Margenmetric",
          "query": "=[\n  {\n    \"$match\": {\n      \"persona\": \"Jurídica\", \n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.fechaProceso}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Company\", \n      \"let\": {\n        \"rif\": \"$rifCedula\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$eq\": [\n                \"$$rif\", \"$vat\"\n              ]\n            }\n          }\n        }, {\n          \"$project\": {\n            \"integrationIds\": 1, \n            \"peopleIds\": 1, \n            \"createdAt\": 1\n          }\n        }\n      ], \n      \"as\": \"result\"\n    }\n  }, {\n    \"$addFields\": {\n      \"integrationIds\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.integrationIds\"\n          }, {\n            \"Margenmetricnatural\": \"$rifCedula\"\n          }\n        ]\n      }, \n      \"peopleIds\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.peopleIds\"\n          }, {\n            \"Margenmetricnatural\": [\n              \"$_id\"\n            ]\n          }\n        ]\n      }, \n      \"_id\": \"$$REMOVE\", \n      \"vat\": \"$rifCedula\", \n      \"name\": \"$nombreCliente\", \n      \"stage\": \"client\", \n      \"nivelSocioEconomico\": \"$nombreNSE\", \n      \"updatedAt\": \"$$NOW\", \n      \"createdAt\": {\n        \"$ifNull\": [\n          {\n            \"$first\": \"$result.createdAt\"\n          }, \"$$NOW\"\n        ]\n      }, \n      \"feve\": \"$sidisBaseCliente.mbc_feve\", \n      \"UAI\": \"$sidisBaseCliente.mbc_uai\", \n      \"address\": \"$sidisCliente.cli_direccion\", \n      \"billingAddress\": \"$sidisCliente.cli_direccion\", \n      \"billingName\": \"$sidisCliente.cli_nom_cliente\", \n      \"city\": \"$sidisCliente.cli_cdef_ciudad\", \n      \"codigoejecutivo\": \"$sidisCliente.cli_cod_ejecutivo\", \n      \"email\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$lte\": [\n                  {\n                    \"$first\": \"$result.email\"\n                  }, null\n                ]\n              }, \n              \"then\": {\n                \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  {\n                    \"$first\": \"$result.email\"\n                  }, \"\"\n                ]\n              }, \n              \"then\": {\n                \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n              }\n            }\n          ], \n          \"default\": {\n            \"$first\": \"$result.email\"\n          }\n        }\n      }, \n      \"emailHist\": {\n        \"$setUnion\": [\n          [\n            {\n              \"$toLower\": \"$sidisCliente.cli_cdef_email\"\n            }\n          ], {\n            \"$ifNull\": [\n              {\n                \"$first\": \"$result.emailHist\"\n              }, {\n                \"$first\": \"$result.emailHist\"\n              }, []\n            ]\n          }\n        ]\n      }, \n      \"externalCode\": \"$sidisCliente.cli_num_per\", \n      \"lastName\": \"$sidisCliente.cli_nom_cliente\", \n      \"maritalstatus\": \"$sidisCliente.cli_cdef_estadocivil\", \n      \"nombreejecutivo\": \"$sidisCliente.cli_nom_ejecut_cuenta\", \n      \"ocupation\": \"$sidisCliente.cli_desc_act_econ\", \n      \"ocupationId\": \"$sidisCliente.cli_actividad_econ\", \n      \"personNumber\": \"$sidisCliente.cli_num_per\", \n      \"phone\": \"$sidisCliente.cli_cdef_telefono1\", \n      \"secondaryPhone\": \"$sidisCliente.cli_cdef_telefono2\", \n      \"sex\": \"$sidisCliente.cli_cdef_sexo\", \n      \"state\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$sidisCliente.cli_estado\", \"DEPENDENCIAS FE\"\n                ]\n              }, \n              \"then\": \"DEPENDENCIAS FEDERALES\"\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$sidisCliente.cli_estado\", \"DISTRITO CAPITA\"\n                ]\n              }, \n              \"then\": \"DISTRITO CAPITAL\"\n            }\n          ], \n          \"default\": \"$sidisCliente.cli_estado\"\n        }\n      }, \n      \"dateOfBirth\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"month\": {\n            \"$month\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$sidisCliente.cli_fec_nac\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"fechaUltimaTransacPasivo\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"month\": {\n            \"$month\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$fechaUltimaTransacPasivo\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"officeCode\": \"$sidisSegmentacion.seg_oficina_tutora\", \n      \"officeName\": \"$sidisSegmentacion.seg_nombre_oficina\", \n      \"regionCode\": \"$sidisSegmentacion.seg_territorio\", \n      \"regionName\": \"$sidisSegmentacion.seg_nombre_territorio\", \n      \"clientDate\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"month\": {\n            \"$month\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$sidisSegmentacion.seg_fecha_alta\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"country\": \"Venezuela\", \n      \"stage\": \"Client\", \n      \"credictCards\": \"$credictCards\", \n      \"codigobanca\": \"$codigoBanca\", \n      \"codigosegmento\": \"$codigoSegmento\", \n      \"codigosubSegmento\": \"$codigoSubsegmento\", \n      \"nivelSocioEconomico\": \"$nombreNSE\", \n      \"nombrebanca\": \"$nombreBanca\", \n      \"nombresegmento\": \"$nombreSegmento\", \n      \"nombresubSegmento\": \"$nombreSubsegmento\", \n      \"result\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Company\", \n      \"on\": \"vat\", \n      \"whenNotMatched\": \"insert\", \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "b0854edb-32cc-45f5-81c7-0f25df669023",
        "name": "A_2_actualizacionCompany",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1900,
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
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/E4_RESEGMENTACION",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "=2024-02-29"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "632de871-6e5b-4428-aa38-172d94a926f9",
        "name": "HTTP Request4",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -3940,
          2280
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Company",
          "query": "=[\n  {\n    \"$match\": {\n      \"clienteActivo\": true\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"vat\": 1, \n      \"name\": 1, \n      \"email\": 1, \n      \"city\": 1, \n      \"phone\": 1, \n      \"secondaryPhone\": 1, \n      \"sex\": 1, \n      \"clienteActivo\": 1, \n      \"nombresegmento\": 1, \n      \"codigosegmento\": 1, \n      \"fechaUltimaTransacPasivo\": 1, \n      \"persona\": \"Jurídica\", \n      \"fechaProceso\": \"$fechaProceso\", \n      \"dateOfBirth\": \"$dateOfBirth\", \n      \"birthdayDay\": {\n        \"$dateFromParts\": {\n          \"year\": {\n            \"$year\": \"$$NOW\"\n          }, \n          \"month\": {\n            \"$month\": \"$dateOfBirth\"\n          }, \n          \"day\": {\n            \"$dayOfMonth\": \"$dateOfBirth\"\n          }, \n          \"hour\": 12\n        }\n      }, \n      \"weekBirthday\": {\n        \"$week\": {\n          \"$dateFromParts\": {\n            \"year\": {\n              \"$year\": \"$$NOW\"\n            }, \n            \"month\": {\n              \"$month\": \"$dateOfBirth\"\n            }, \n            \"day\": {\n              \"$dayOfMonth\": \"$dateOfBirth\"\n            }\n          }\n        }\n      }, \n      \"age\": {\n        \"$subtract\": [\n          {\n            \"$year\": \"$$NOW\"\n          }, {\n            \"$year\": \"$dateOfBirth\"\n          }\n        ]\n      }, \n      \"campaignStatus\": 1, \n      \"emailResult\": 1\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Cumpleaños\", \n      \"on\": \"vat\", \n      \"whenMatched\": \"replace\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "8dd1439d-ac34-4f18-94c4-4389d79d576a",
        "name": "A_2_1_cumpleaños_CompanytoCumpleaños",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -620,
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
        "id": "92df4d3a-4916-448d-8e7e-fa80ee61ad06",
        "name": "Merge6",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -3240,
          2260
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "01378eaf-516a-4230-8170-922243cf877d",
        "name": "Merge7",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -2060,
          2500
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "7bf82bae-e83c-4861-adf1-c948ec8c19c2",
        "name": "Merge8",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1320,
          2460
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "jsCode": "var fechaProceso\nvar output = [];\n\nfor (const item of $input.all()) {\n  fechaProceso=item.json.fechaProceso;\n}\n\nconst proceso = \"A_1_1_cumpleaños_PeopletoCumpleaños\"  //enter process name\noutput.push({fechaProceso:fechaProceso,proceso:proceso});\n\nreturn output;"
        },
        "id": "edc0fd6c-7765-49be-a7ea-03a265a892e8",
        "name": "Code11",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -1160,
          2460
        ]
      },
      {
        "parameters": {
          "jsCode": "var fechaProceso\nvar output = [];\n\nfor (const item of $input.all()) {\n  fechaProceso=item.json.fechaProceso;\n}\n\nconst proceso = \"A_2_1_cumpleaños_CompanytoCumpleaños\"  //enter process name\noutput.push({fechaProceso:fechaProceso,proceso:proceso});\n\nreturn output;"
        },
        "id": "eba48ee6-a4bb-4fcf-a7ac-c2b640993ff5",
        "name": "Code",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -1180,
          2940
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "3fc8ba25-2e76-4aa5-8174-2a64cf26ec28",
        "name": "Merge9",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -780,
          2440
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "416b55e6-77b2-4242-8d91-69421140b6f9",
        "name": "Merge10",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -400,
          2420
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "2d134e26-a404-4618-97ad-35c294b6245a",
        "name": "Merge11",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -20,
          2400
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E4_RESEGMENTACION",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.fechaProceso}}"
              },
              {
                "name": "lastDigRif",
                "value": "={{$json.lastDigRif}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "2557815d-9ae3-4329-9a14-82f131416539",
        "name": "HTTP Request5",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          160,
          2400
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "312f1fe1-0e31-4154-8843-8d7e658573bb",
        "name": "Merge5",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1720,
          2960
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "a014cdd2-ef99-4164-bca3-9d91c7e27d1c",
        "name": "Merge12",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -2080,
          2980
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "0b72f325-399b-4545-9de0-8dea3ecff2d4",
        "name": "Merge13",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1340,
          2940
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "8f4014fa-5236-46b2-827d-58def2db49a8",
        "name": "Merge14",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -800,
          2920
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4e83ba0a-794a-4d5e-96f1-4f46f1ed7742",
        "name": "Merge15",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -420,
          2900
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "dd4056bf-f741-4f7f-bee4-8c0717f6ed9a",
        "name": "Merge16",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -40,
          2880
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E4_RESEGMENTACION",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.fechaProceso}}"
              },
              {
                "name": "lastDigRif",
                "value": "={{$json.lastDigRif}}"
              }
            ]
          },
          "options": {
            "allowUnauthorizedCerts": true
          }
        },
        "id": "b76bae65-9f8e-450f-a955-b6b6eb68f528",
        "name": "HTTP Request6",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          140,
          2880
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"processName\": \"E4_RESEGMENTACION\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"Procesamiento resegmentación de clientes, actualización de People, Company y Cumpleaños\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"Margenmetric\", \n      \"toColletion\": \"Margenmetric, People, Company, Cumpleaños\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcess\": [\n        {\n          \"processName\": \"0\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"1\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"2\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"3\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"4\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"5\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"6\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"7\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"8\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"9\", \n          \"processDate\": \"nda\", \n          \"description\": \"Resegmentación de clientes histórica, parelizado por el último dígito del Rif\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Margenmetric\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_1_actualizacionPeople\", \n          \"processDate\": \"nda\", \n          \"description\": \"Actualiación de la colección People\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"People\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_2_actualizacionCompany\", \n          \"processDate\": \"nda\", \n          \"description\": \"Actualiación de la colección Company\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Company\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_1_1_cumpleaños_PeopletoCumpleaños\", \n          \"processDate\": \"nda\", \n          \"description\": \"Actualiación de la colección Cumpleaños con los clientes de People\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Cumpleaños\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"A_2_1_cumpleaños_CompanytoCumpleaños\", \n          \"processDate\": \"nda\", \n          \"description\": \"Actualiación de la colección Cumpleaños con los clientes de Company\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"Margenmetric\", \n          \"toColletion\": \"Cumpleaños\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }, {\n          \"processName\": \"E4_RESEGMENTACION_BENEFICIARIO\", \n          \"processDate\": \"nda\", \n          \"description\": \"RESEGMENTACION_BENEFICIARIO\", \n          \"processFrequency\": \"Mensual\", \n          \"fromColletion\": \"sidis_beneficiario\", \n          \"toColletion\": \"sidis_beneficiario\", \n          \"startDate\": \"nda\", \n          \"endDate\": \"nda\", \n          \"runtimeInMinutes\": \"nda\", \n          \"status\": \"En espera\"\n        }\n      ]\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "406e0e03-3cfd-4fb4-b84f-726ce6c53d78",
        "name": "create_operation_E4_Resegmentacion",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -3420,
          2120
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "f67dc534-aa94-4ccc-ad85-2435a4a2f1c1",
        "name": "start_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1220,
          1880
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "28702e10-438d-4018-802c-68a026cbc2f4",
        "name": "updated_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "09d008bb-7e20-49cd-a90c-b8fed1a76bc9",
        "name": "start_operation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -2220,
          2400
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "fa9a005d-d81f-46d5-8ade-ee8d6a28aed3",
        "name": "start_operation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -2260,
          2880
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "d3d7572e-5c97-4b4a-86c4-287a0e42e001",
        "name": "start_operation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -980,
          2360
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "15b49de4-fa7a-459e-a624-f517ac72076d",
        "name": "start_operation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1020,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "032df3b1-8635-4497-910d-fdd52f33e17d",
        "name": "updated_operation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
          2280
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "50ada3cf-7933-44bf-9380-12e287b641a8",
        "name": "updated_operation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -240,
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
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "6a9f0b55-b6c2-4bde-9312-4acecb80a805",
        "name": "updated_operation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1540,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7a9ad3ee-120a-4046-9e57-e0feedf64c40",
        "name": "updated_operation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1520,
          2320
        ],
        "alwaysOutputData": true,
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
          "query": "=  [\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$lastDigRif\", { \"$toString\": \"{{$json.lastDigRif}}\" }\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.fechaProceso}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$project\": {\n        \"rifCedula\": 1, \n        \"codigoBanca\": 1, \n        \"nombreBanca\": 1, \n        \"codigoSegmento\": 1, \n        \"nombreSegmento\": 1, \n        \"codigoSubsegmento\": 1, \n        \"nombreSubsegmento\": 1, \n        \"codigoGrupoeconomico\": 1, \n        \"nombreGrupoeconomico\": 1, \n        \"nombreNSE\": 1, \n        \"_id\": 0, \n        \"fechaProceso\": {\n          \"$split\": [\n            \"{{$json.fechas}}\", \",\"\n          ]\n        }, \n        \"updatedAt\": \"$$NOW\"\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$fechaProceso\"\n      }\n    }, {\n      \"$addFields\": {\n        \"fechaProceso\": {\n          \"$toDate\": \"$fechaProceso\"\n        }\n      }\n    }, {\n        \"$merge\": {\n          \"into\": \"Margenmetric\", \n          \"on\": [\n            \"rifCedula\", \"fechaProceso\"\n          ], \n          \"whenMatched\": \"merge\", \n          \"whenNotMatched\": \"discard\"\n        }\n      }\n  ]"
        },
        "id": "05949d83-1135-4424-b572-86e23cee9871",
        "name": "R2_Resegmentacion_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -620,
          1860
        ],
        "alwaysOutputData": true,
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
          "query": "=  [\n    {\n      \"$limit\": 1\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"rifCedula\": [\n          \"J00266443\", \"J30468971\", \"J00343994\", \"J00041312\", \"J50019975\", \"J00020200\", \"J00006372\", \"J00324454\", \"J41302282\", \"J30240664\", \"V12229669\", \"V12045759\", \"V10339024\", \"V10201389\", \"V19030100\", \"V24798174\", \"V17932801\", \"V13811301\", \"V18380504\", \"V16273096\", \"V10897401\", \"V16721253\", \"V17219608\", \"V21355144\"\n        ], \n        \"fechaMaxima\": {\n          \"$toDate\":\"{{$json.fechaProceso}}\"\n        }, \n        \"fechaMinima\": {\n          \"$dateAdd\": {\n            \"startDate\": {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }, \n            \"unit\": \"month\", \n            \"amount\": -24\n          }\n        }\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$rifCedula\"\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"Margenmetric\", \n        \"let\": {\n          \"rifCedula\": \"$rifCedula\"\n        }, \n        \"pipeline\": [\n          {\n            \"$match\": {\n              \"$expr\": {\n                \"$eq\": [\n                  \"$$rifCedula\", \"$rifCedula\"\n                ]\n              }\n            }\n          }, {\n            \"$project\": {\n              \"_id\": 0, \n              \"fechaProceso\": \"$fechaProceso\"\n            }\n          }\n        ], \n        \"as\": \"Margenmetric\"\n      }\n    }, {\n      \"$addFields\": {\n        \"rifCedula\": \"$$REMOVE\", \n        \"Margenmetric\": \"$$REMOVE\", \n        \"fechasProceso\": \"$Margenmetric.fechaProceso\"\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$fechasProceso\"\n      }\n    }, {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$gte\": [\n                \"$fechasProceso\", \"$fechaMinima\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$lte\": [\n                \"$fechasProceso\", \"$fechaMaxima\"\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"a\", \n        \"fechas\": {\n          \"$addToSet\": \"$fechasProceso\"\n        }\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"fechas\": {\n          \"$trim\": {\n            \"input\": {\n              \"$reduce\": {\n                \"input\": \"$fechas\", \n                \"initialValue\": \"\", \n                \"in\": {\n                  \"$concat\": [\n                    \"$$value\", {\n                      \"$dateToString\": {\n                        \"format\": \"%Y-%m-%d\", \n                        \"date\": \"$$this\"\n                      }\n                    }, \", \"\n                  ]\n                }\n              }\n            }, \n            \"chars\": \", \"\n          }\n        }, \n        \"lastDigRif\": { \"$toString\": \"{{$json.proceso}}\" },\n        \"fechaProceso\": {\n          \"$substrCP\": [\n            \"{{$json.fechaProceso}}\", 0, 10\n          ]\n        }\n      }\n    }\n  ]"
        },
        "id": "8bbf2f9b-7946-4b8a-a51c-403ac849bdad",
        "name": "R1_ResegmentacionFechas_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -820,
          1860
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "content": "R2_Resegmentacion_Beneficiario",
          "height": 589.4385382196186,
          "width": 4454.718288024324
        },
        "id": "f6b23d8e-8cd4-4fef-95b3-05f94f69dead",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2820,
          1040
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nvar output = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n  const fechaProceso = body.fechaProceso;\nconst proceso = \"E4_RESEGMENTACION_BENEFICIARIO\"  //enter process name\noutput.push({fechaProceso:fechaProceso,proceso:proceso});\n\nreturn output;"
        },
        "id": "6a315f8f-99bc-4e7a-bc2e-8a681975b5dd",
        "name": "FechcaProceso",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2440,
          1400
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/64c26c99-6c85-4886-81c2-c68ee46cbc79",
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
        "id": "f1a6cf3d-0116-4dcc-a330-078235a8577a",
        "name": "HTTP Request7",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -2760,
          1400
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fccf1d66-3c9b-49be-9787-df745ac51c84",
        "name": "Merge18",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -2040,
          1380
        ],
        "alwaysOutputData": true
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n    {\n      \"$match\": {\n        \"processName\": \"E4_RESEGMENTACION\", \n        \"$expr\": {\n          \"$eq\": [\n            \"$processDate\", {\n              \"$toDate\": \"{{$json.fechaProceso}}\"\n            }\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"subProcess\": {\n          \"$map\": {\n            \"input\": \"$subProcess\", \n            \"as\": \"input\", \n            \"in\": {\n              \"$cond\": [\n                {\n                  \"$and\": [\n                    {\n                      \"$eq\": [\n                        \"$$input.processName\", \"{{$json.proceso}}\"\n                      ]\n                    }\n                  ]\n                }, {\n                  \"$mergeObjects\": [\n                    {\n                      \"processName\": \"$$input.processName\"\n                    }, {\n                      \"processDate\": \"$processDate\"\n                    }, {\n                      \"description\": \"$$input.description\"\n                    }, {\n                      \"processFrequency\": \"$$input.processFrequency\"\n                    }, {\n                      \"fromColletion\": \"$$input.fromColletion\"\n                    }, {\n                      \"toColletion\": \"$$input.toColletion\"\n                    }, {\n                      \"startDate\": \"$$NOW\"\n                    }, {\n                      \"endDate\": \"$$input.endDate\"\n                    }, {\n                      \"runtimeInMinutes\": \"\"\n                    }, {\n                      \"status\": \"En Proceso\"\n                    }\n                  ]\n                }, \"$$input\"\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"sidis_statusProcesos\", \n        \"on\": [\n          \"processName\", \"processDate\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "b15a8970-3d53-4c81-ac67-367c931144d2",
        "name": "start_operation11",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -2260,
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
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"E4_RESEGMENTACION\", \n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.fechaProceso}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", \"{{$json.proceso}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "230789e8-dfab-4245-9bb1-83fe3a4aae5a",
        "name": "updated_operation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1160,
          1100
        ],
        "alwaysOutputData": true,
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
        "id": "d051e9f2-b256-4ed7-b956-a779a0ab55f5",
        "name": "SplitInBatches1",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          -1340,
          1360
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6c0b8f6c-6735-4e13-b2e8-f3a46e48fcb5",
        "name": "Merge3",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -60,
          1320
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$item.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2aa3d760-0b7a-43db-b587-1cba707eb323",
        "name": "start_operation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -220,
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
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_statusProcesos\", \n      \"let\": {\n        \"processName\": \"E4_RESEGMENTACION_BENEFICIARIO\", \n        \"processDate\": {\n          \"$toDate\": \"{{$json.fechaProceso}}\"\n        }\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$processName\", \"$$processName\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$processDate\", \"$$processDate\"\n                  ]\n                }\n              }\n            ]\n          }\n        }, {\n          \"$project\": {\n            \"processName\": 1, \n            \"processDate\": 1, \n            \"subProcessDate\": \"$subProcess.processDate\"\n          }\n        }\n      ], \n      \"as\": \"sidis_statusProcesos\"\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processName\": {\n        \"$first\": \"$sidis_statusProcesos.processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$sidis_statusProcesos.processDate\"\n      }, \n      \"subProcessDate\": {\n        \"$setUnion\": {\n          \"$first\": \"$sidis_statusProcesos.subProcessDate\"\n        }\n      }\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcessDate\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$substr\": [\n          {\n            \"$toDate\": \"$processDate\"\n          }, 0, 10\n        ]\n      }, \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toDate\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }\n    }\n  }\n]"
        },
        "id": "cb1ac1b4-530a-4278-ab58-c8e8fc69f38b",
        "name": "Bring_subProcess",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1520,
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
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"consultaProveerdor\": true, \n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.subProcessDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Margenmetric\", \n      \"let\": {\n        \"rifCedula\": \"$snb_rif_empresa\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$and\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"$$rifCedula\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$fechaProceso\", {\n                      \"$toDate\": \"{{$json.processDate}}\"\n                    }\n                  ]\n                }\n              }\n            ]\n          }\n        }, {\n          \"$project\": {\n            \"_id\": 0, \n            \"codigoBanca\": 1, \n            \"codigoGrupoeconomico\": 1, \n            \"codigoSegmento\": 1, \n            \"nombreNSE\": 1\n          }\n        }\n      ], \n      \"as\": \"Margenmetric\"\n    }\n  }, {\n    \"$project\": {\n      \"snb_ci_benefic\": 1, \n      \"snb_rif_empresa\": 1, \n      \"snb_id_debito\": 1, \n      \"codigoBanca\": {\n        \"$first\": \"$Margenmetric.codigoBanca\"\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$first\": \"$Margenmetric.codigoGrupoeconomico\"\n      }, \n      \"codigoSegmento\": {\n        \"$first\": \"$Margenmetric.codigoSegmento\"\n      }, \n      \"nombreNSE\": {\n        \"$first\": \"$Margenmetric.nombreNSE\"\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_beneficiario\", \n      \"on\": [\n        \"snb_ci_benefic\", \"snb_rif_empresa\", \"snb_id_debito\", \"_id\"\n      ], \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "7857c750-1395-4ee3-98e0-3b91e05e1114",
        "name": "R1_ResegmentacionBeneficiarios",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          120,
          1160
        ],
        "alwaysOutputData": true,
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
        "id": "63a0dedc-cf28-4891-af95-085d73bc502f",
        "name": "IF2",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          980,
          1280
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_E4_RESEGMENTACION",
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
        "id": "7c87e5c8-6aa8-4b3e-aa95-ee84a064e1e8",
        "name": "ACTIVA_E2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1520,
          1240
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"proceso\": \"$processName\", \n      \"fechaProceso\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$processDate\"\n          }, 0, 10\n        ]\n      }, \n      \"status\": 1\n    }\n  }\n]"
        },
        "id": "1dc2179b-2f41-4f15-ab65-b45dc13e91ce",
        "name": "4_check_operation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          820,
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
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/48760b6b-6c30-4f87-8926-b2b45a9712dc",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "fechaProceso",
                "value": "={{$json.processDate}}"
              },
              {
                "name": "subProcessDate",
                "value": "={{$json.subProcessDate}}"
              },
              {
                "name": "lastDigRif",
                "value": "={{$json.lastDigRif}}"
              },
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
        "id": "2fe2971d-c06d-4387-b0ea-5c6d854f11c3",
        "name": "HTTP Request8",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          -720,
          1340
        ]
      },
      {
        "parameters": {
          "jsCode": "// Loop over input items and add a new field\n// called 'myNewField' to the JSON of each one\n\nvar body\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nreturn body;"
        },
        "id": "cd9fb18d-9da3-4c12-9645-7ab4ade55f76",
        "name": "FechcaProceso1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -380,
          1340
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "48760b6b-6c30-4f87-8926-b2b45a9712dc",
          "options": {}
        },
        "id": "d71147d1-bab2-4eb9-8e1c-9cad25dbf76b",
        "name": "Webhook5",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -540,
          1340
        ],
        "webhookId": "48760b6b-6c30-4f87-8926-b2b45a9712dc"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6b95df99-bfa4-42a0-91c9-4b8f616ba32b",
        "name": "Merge17",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1700,
          1360
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "713f47a6-7a94-497c-a57a-57b9cc91ecf4",
        "name": "Merge19",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          300,
          1300
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "914b6538-4a66-4d1f-b61d-b661ae434044",
        "name": "Merge20",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          660,
          1280
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"$expr\": {\n        \"$eq\": [\n          \"$processDate\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"item\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$item.processName\", {\n                        \"$concat\": [\n                          \"{{$json.subProcessDate}}\"\n                        ]\n                      }\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"processName\": \"$$item.processName\"\n                  }, {\n                    \"processDate\": \"$$item.processDate\"\n                  }, {\n                    \"description\": \"$$item.description\"\n                  }, {\n                    \"processFrequency\": \"$$item.processFrequency\"\n                  }, {\n                    \"fromColletion\": \"$$item.fromColletion\"\n                  }, {\n                    \"toColletion\": \"$$item.toColletion\"\n                  }, {\n                    \"startDate\": \"$$item.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$item.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"lastDigRif\": \"$$item.lastDigRif\"\n                  }\n                ]\n              }, \"$$item\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "d5e45827-3532-42bc-919a-31adb8990d0a",
        "name": "updated_operation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          480,
          1140
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "content": "Proceso E4_RESEGMENTACIÓN_BENEFICIARIOS",
          "height": 667.7267547307472,
          "width": 3089.6394919435643
        },
        "id": "e3ea84da-56fe-4d57-ac9d-77509457e444",
        "name": "Note4",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          -2060,
          974.230197191616
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "64c26c99-6c85-4886-81c2-c68ee46cbc79",
          "options": {}
        },
        "id": "c06915d8-6065-4596-9e4c-4b5bcbfafb5a",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -2580,
          1400
        ],
        "webhookId": "64c26c99-6c85-4886-81c2-c68ee46cbc79"
      },
      {
        "parameters": {
          "jsCode": "//Función aleatoria\n\nfunction generarNumeroAleatorio(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n// Generar un número aleatorio entre 1 y 10\nconst numeroAleatorio = generarNumeroAleatorio(1, 30);\nvar outPut = [];\n\noutPut.push({offSet:numeroAleatorio});\n\nreturn outPut;\n"
        },
        "id": "cdffc2f0-e12b-445b-84a5-ab4cc8a4f19d",
        "name": "FechcaProceso6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -1180,
          1200
        ]
      },
      {
        "parameters": {
          "amount": "={{$json.offSet}}",
          "unit": "seconds"
        },
        "id": "eee1834c-f3f3-41a2-ad02-94750bbd6261",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -1020,
          1200
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "78dcfec8-3578-4f9a-9141-4686a6a81269",
        "name": "Merge21",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -860,
          1340
        ]
      },
      {
        "parameters": {
          "jsCode": "//Función aleatoria\n\nfunction generarNumeroAleatorio(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n// Generar un número aleatorio entre 1 y 10\nconst numeroAleatorio = generarNumeroAleatorio(1, 30);\nvar outPut = [];\n\noutPut.push({offSet:numeroAleatorio});\n\nreturn outPut;\n"
        },
        "id": "b1f072d4-1c46-4534-a722-313f62fb7d93",
        "name": "FechcaProceso7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -2160,
          1860
        ]
      },
      {
        "parameters": {
          "amount": "={{$json.offSet}}",
          "unit": "seconds"
        },
        "id": "9e200c96-c80b-47c9-b9b0-bb07af8fe33c",
        "name": "Wait1",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          -2020,
          1860
        ],
        "webhookId": "9c446ee5-8a6a-4c7a-a317-c574660cab01"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "640db6d4-2f1d-4aa1-8055-e4edae014adb",
        "name": "Merge22",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          -1860,
          1980
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$limit\": 1\n  }, {\n    \"$addFields\": {\n      \"_id\": \"$$REMOVE\", \n      \"lastUpdatedAt\": \"$$REMOVE\", \n      \"processName\": \"$$REMOVE\", \n      \"proceso\": \"$$REMOVE\", \n      \"processDate\": \"$$REMOVE\", \n      \"lastUpdatedDate\": \"$$REMOVE\", \n      \"currentUpdatedDate\": \"$$REMOVE\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"Margenmetric\", \n      \"let\": {\n        \"rifCedula\": \"$rifCedula\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$or\": [\n              {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J50019975\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20012611\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20012611\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20004076\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J00123072\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20009997\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J00124134\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J00076727\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20000107\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20008387\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20016315\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J00095036\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20016137\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J00041627\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20010014\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J50370526\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20011432\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20004236\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20002838\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J40180965\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"G20002414\"\n                  ]\n                }\n              }, {\n                \"$expr\": {\n                  \"$eq\": [\n                    \"$rifCedula\", \"J29535597\"\n                  ]\n                }\n              }\n            ]\n          }\n        }, {\n          \"$project\": {\n            \"fechaProceso\": 1, \n            \"_id\": 0\n          }\n        }\n      ], \n      \"as\": \"Margenmetric\"\n    }\n  }, {\n    \"$addFields\": {\n      \"Margenmetric\": \"$$REMOVE\", \n      \"fechaProceso\": {\n        \"$setUnion\": \"$Margenmetric.fechaProceso\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0, \n      \"processName\": \"E4_RESEGMENTACION_BENEFICIARIO\", \n      \"processDate\": {\n        \"$toDate\": \"{{$json.fechaProceso}}\"\n      }, \n      \"description\": \"RESEGMENTACION_BENEFICIARIO\", \n      \"processFrequency\": \"Mensual\", \n      \"fromColletion\": \"sidis_beneficiarios\", \n      \"toColletion\": \"sidis_beneficiarios\", \n      \"startDate\": \"$$NOW\", \n      \"endDate\": \"nda\", \n      \"runtimeInMinutes\": \"nda\", \n      \"status\": \"En Proceso\", \n      \"subProcessDate\": \"$fechaProceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcessDate\"\n    }\n  }, {\n    \"$addFields\": {\n      \"subProcessDate\": \"$$REMOVE\", \n      \"groupName\": \"$$REMOVE\", \n      \"subProcess\": {\n        \"processName\": {\n          \"$substr\": [\n            {\n              \"$toString\": \"$subProcessDate\"\n            }, 0, 10\n          ]\n        }, \n        \"processDate\": \"$subProcessDate\", \n        \"description\": {\n          \"$concat\": [\n            \"$description\", \"_\", {\n              \"$toString\": \"$subProcessDate\"\n            }\n          ]\n        }, \n        \"processFrequency\": \"Mensual\", \n        \"fromColletion\": \"sidis_beneficiario\", \n        \"toColletion\": \"sidis_beneficiario\", \n        \"startDate\": \"nda\", \n        \"endDate\": \"nda\", \n        \"runtimeInMinutes\": \"nda\", \n        \"status\": \"En espera\", \n        \"subProcessDate\": \"nda\"\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"processName\": \"$processName\", \n        \"processDate\": \"$processDate\"\n      }, \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"description\": {\n        \"$first\": \"$description\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "f2214e74-3be6-445c-b64e-b4dc5b64301a",
        "name": "1_Create_Operation Resegmentacion beneficiarios",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          -1860,
          1200
        ],
        "alwaysOutputData": true,
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
        "id": "c4fedfb5-52ec-4270-8b47-ab177206d110",
        "name": "Merge23",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1360,
          1240
        ]
      }
    ],
    "connections": {
      "Webhook4": {
        "main": [
          [
            {
              "node": "FechcaProceso5",
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
              "node": "FechcaProceso7",
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
      "Digitos Rid Cedula": {
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
      "Webhook": {
        "main": [
          [
            {
              "node": "FechcaProceso4",
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
              "node": "Merge1",
              "type": "main",
              "index": 1
            },
            {
              "node": "R1_ResegmentacionFechas_Margenmetric",
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
              "node": "updated_operation",
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
      "Merge2": {
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
      "Webhook1": {
        "main": [
          [
            {
              "node": "FechcaProceso2",
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
              "node": "FechcaProceso3",
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
              "node": "Merge8",
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
      "A_1_1_cumpleaños_PeopletoCumpleaños": {
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
      "NoOp5": {
        "main": [
          [
            {
              "node": "Digitos Rid Cedula",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FechcaProceso2": {
        "main": [
          [
            {
              "node": "Merge7",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FechcaProceso3": {
        "main": [
          [
            {
              "node": "Merge12",
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
      "FechcaProceso4": {
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
      "FechcaProceso5": {
        "main": [
          [
            {
              "node": "create_operation_E4_Resegmentacion",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge6",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "A_1_actualizacionPeople": {
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
      "A_2_actualizacionCompany": {
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
      "A_2_1_cumpleaños_CompanytoCumpleaños": {
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
      "Merge6": {
        "main": [
          [
            {
              "node": "NoOp5",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request2",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request3",
              "type": "main",
              "index": 0
            },
            {
              "node": "HTTP Request7",
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
              "node": "A_1_actualizacionPeople",
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
      "Merge8": {
        "main": [
          [
            {
              "node": "Code11",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Code11": {
        "main": [
          [
            {
              "node": "Merge9",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation3",
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
              "node": "Merge14",
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
      "Merge9": {
        "main": [
          [
            {
              "node": "A_1_1_cumpleaños_PeopletoCumpleaños",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge10",
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
              "node": "Merge11",
              "type": "main",
              "index": 1
            },
            {
              "node": "updated_operation1",
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
              "node": "HTTP Request5",
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
              "node": "Merge13",
              "type": "main",
              "index": 1
            },
            {
              "node": "updated_operation3",
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
              "node": "Merge5",
              "type": "main",
              "index": 1
            },
            {
              "node": "A_2_actualizacionCompany",
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
              "node": "Code",
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
              "node": "A_2_1_cumpleaños_CompanytoCumpleaños",
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
              "node": "Merge16",
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
      "Merge16": {
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
      "create_operation_E4_Resegmentacion": {
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
              "node": "Merge2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation1": {
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
      "start_operation2": {
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
      "start_operation3": {
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
      "start_operation4": {
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
      "updated_operation1": {
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
      "updated_operation2": {
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
      "updated_operation3": {
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
      "updated_operation4": {
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
      "R2_Resegmentacion_Margenmetric": {
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
      "R1_ResegmentacionFechas_Margenmetric": {
        "main": [
          [
            {
              "node": "R2_Resegmentacion_Margenmetric",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FechcaProceso": {
        "main": [
          [
            {
              "node": "Merge18",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation11",
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
              "node": "Merge17",
              "type": "main",
              "index": 1
            },
            {
              "node": "1_Create_Operation Resegmentacion beneficiarios",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "start_operation11": {
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
      "updated_operation5": {
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
      "SplitInBatches1": {
        "main": [
          [
            {
              "node": "FechcaProceso6",
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
      "Merge3": {
        "main": [
          [
            {
              "node": "R1_ResegmentacionBeneficiarios",
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
      "start_operation10": {
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
      "Bring_subProcess": {
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
      "R1_ResegmentacionBeneficiarios": {
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
      "IF2": {
        "main": [
          [
            {
              "node": "updated_operation5",
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
      "HTTP Request8": {
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
      "FechcaProceso1": {
        "main": [
          [
            {
              "node": "Merge3",
              "type": "main",
              "index": 1
            },
            {
              "node": "start_operation10",
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
              "node": "FechcaProceso1",
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
              "node": "Bring_subProcess",
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
              "node": "updated_operation6",
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
      "Merge20": {
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
      "Webhook3": {
        "main": [
          [
            {
              "node": "FechcaProceso",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "FechcaProceso6": {
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
      "Wait": {
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
      "Merge21": {
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
      "FechcaProceso7": {
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
      "Wait1": {
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
      "Merge22": {
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
      "1_Create_Operation Resegmentacion beneficiarios": {
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
      "Merge23": {
        "main": [
          [
            {
              "node": "ACTIVA_E2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }