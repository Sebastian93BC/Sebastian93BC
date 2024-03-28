{
    "meta": {
      "instanceId": "4d013cb9b9f3f11a95d998b63c089cd0dac18358633956000546ed033b0c26b8"
    },
    "nodes": [
      {
        "parameters": {},
        "id": "c7cb2364-9982-4272-b199-53eecd98182a",
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          -2820,
          -140
        ],
        "disabled": true
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "E2_Procesamiento",
          "options": {}
        },
        "id": "c7d71641-57c8-4166-a8de-6f2c59f879a6",
        "name": "Webhook4",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          -280,
          1040
        ],
        "webhookId": "85c04d5f-5c3a-45bb-a9a7-a6c142cd189f"
      },
      {
        "parameters": {
          "content": "PP_1_clienteIntegracion_Margenmetric",
          "height": 312.23516469843173,
          "width": 1952.13273306799
        },
        "id": "068a006e-5c37-480b-a5e3-4a3c1ef03364",
        "name": "Note1",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          860,
          0
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_cliente_base_segmentacion",
          "query": "=[\n  {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$fechaProceso\", {\n            \"$toDate\": \"{{$json.processDate}}\"\n          }\n        ]\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"nombreBanca\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_nombre_banca\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_nombre_banca\"\n        ]\n      }, \n      \"codigoBanca\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_banca\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_banca\"\n        ]\n      }, \n      \"nombreSegmento\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_nombre_segmento\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_nombre_segmento\"\n        ]\n      }, \n      \"codigoSegmento\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_segmento\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_segmento\"\n        ]\n      }, \n      \"nombreSubsegmento\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_nombre_subsegmento\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_nombre_subsegmento\"\n        ]\n      }, \n      \"codigoSubsegmento\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_subsegmento\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_subsegmento\"\n        ]\n      }, \n      \"nombreGrupoeconomico\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisCliente.cli_nom_grupo_econ\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisCliente.cli_nom_grupo_econ\"\n        ]\n      }, \n      \"codigoGrupoeconomico\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisCliente.cli_cod_grupo_econ\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisCliente.cli_cod_grupo_econ\"\n        ]\n      }, \n      \"nombreNSE\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion.seg_nivel_socioecon_real\", null\n            ]\n          }, \"$$REMOVE\", \"$sidisSegmentacion.seg_nivel_socioecon_real\"\n        ]\n      }, \n      \"_id\": \"$$REMOVE\", \n      \"origenSegmentacion\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisSegmentacion\", null\n            ]\n          }, false, true\n        ]\n      }, \n      \"origenCliente\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisCliente\", null\n            ]\n          }, false, true\n        ]\n      }, \n      \"origenBaseCliente\": {\n        \"$cond\": [\n          {\n            \"$lte\": [\n              \"$sidisBaseCliente\", null\n            ]\n          }, false, true\n        ]\n      }, \n      \"nombreCliente\": \"$sidisCliente.cli_nom_cliente\", \n      \"regionName\": \"$sidisSegmentacion.seg_nombre_territorio\", \n      \"regionCode\": \"$sidisSegmentacion.seg_territorio\", \n      \"state\": \"$sidisCliente.cli_estado\", \n      \"sexo\": \"$sidisCliente.cli_cdef_sexo\", \n      \"generacion\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$lt\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1928\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"nda\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1928\n                    ]\n                  }, {\n                    \"$lte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1945\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Generación Silenciosa\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1946\n                    ]\n                  }, {\n                    \"$lte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1964\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Baby Boomers\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1965\n                    ]\n                  }, {\n                    \"$lte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1980\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Generación X\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1981\n                    ]\n                  }, {\n                    \"$lte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1996\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Millennials\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 1997\n                    ]\n                  }, {\n                    \"$lte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 2012\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Generación Z\"\n            }, {\n              \"case\": {\n                \"$and\": [\n                  {\n                    \"$gte\": [\n                      {\n                        \"$year\": \"$sidisSegmentacion.seg_fecha_nac\"\n                      }, 2013\n                    ]\n                  }\n                ]\n              }, \n              \"then\": \"Generación Alpha\"\n            }\n          ], \n          \"default\": \"nda\"\n        }\n      }, \n      \"lastDigRif\": {\n        \"$substr\": [\n          \"$rifCedula\", 8, -1\n        ]\n      }, \n      \"tkNombreCliente\": {\n        \"$map\": {\n          \"input\": {\n            \"$filter\": {\n              \"input\": {\n                \"$setUnion\": [\n                  {\n                    \"$split\": [\n                      \"$sidisCliente.cli_nom_cliente\", \" \"\n                    ]\n                  }, []\n                ]\n              }, \n              \"as\": \"value\", \n              \"cond\": {\n                \"$ne\": [\n                  \"$$value\", \"\"\n                ]\n              }\n            }\n          }, \n          \"in\": {\n            \"$toUpper\": \"$$this\"\n          }\n        }\n      }, \n      \"tkRifCedula\": {\n        \"$toUpper\": \"$rifCedula\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"segmentacionOriginal.codigoBanca\": \"$sidisSegmentacion.seg_banca\", \n      \"segmentacionOriginal.nombreBanca\": \"$sidisSegmentacion.seg_nombre_banca\", \n      \"segmentacionOriginal.nombreSegmento\": \"$sidisSegmentacion.seg_nombre_segmento\", \n      \"segmentacionOriginal.codigoSegmento\": \"$sidisSegmentacion.seg_segmento\", \n      \"segmentacionOriginal.codigoSubsegmento\": \"$sidisSegmentacion.seg_subsegmento\", \n      \"segmentacionOriginal.nombreSubsegmento\": \"$sidisSegmentacion.seg_nombre_subsegmento\", \n      \"segmentacionOriginal.codigoGrupoeconomico\": \"$sidisSegmentacion.cli_cod_grupo_econ\", \n      \"segmentacionOriginal.nombreGrupoeconomico\": \"$sidisSegmentacion.cli_nom_grupo_econ\", \n      \"segmentacionOriginal.nombreNSE\": \"$sidisSegmentacion.seg_nivel_socioecon_real\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenNotMatched\": \"insert\", \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "d1044cb1-38b8-4c98-9046-6c673e4112c1",
        "name": "PP_1_clienteIntegracion_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1800,
          20
        ],
        "alwaysOutputData": true,
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
        "id": "3a39edd2-e4b2-449a-bf47-c59a5745b5fb",
        "name": "Merge",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          260,
          1020
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "057fefb0-8954-4aec-89ad-691c7d95a007",
        "name": "Merge1",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1640,
          140
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"PP_1_clienteIntegracion_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "7474b629-385c-4724-ab57-2d590cb11297",
        "name": "Code1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1340,
          160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6cdb1cbd-41a9-4b49-9d12-fb0548361f89",
        "name": "Merge2",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1980,
          120
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "7e87339d-2e9c-47bc-a0d2-d1e1ab9d1c2e",
        "name": "Merge3",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2300,
          100
        ]
      },
      {
        "parameters": {
          "content": "PP_2_sidisMargenActivos_Margenmetricactivo",
          "height": 319.430736831483,
          "width": 1957.69676636326
        },
        "id": "7356941d-66ee-49aa-aa2b-65818fd64c2d",
        "name": "Note",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          860,
          360
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "1ee8f1d6-55ba-4d1c-91b6-4e08c83936fb",
        "name": "Merge4",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1620,
          500
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c09a133f-5abe-4657-a8fc-e46a235dc22b",
        "name": "Merge5",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1980,
          480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "5e02e7ef-bf06-45fd-8134-683ed6c5afa7",
        "name": "Merge6",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2300,
          460
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "163918a4-43b5-4688-b166-f1f0490f1e05",
        "name": "Merge7",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1620,
          920
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "c2646549-177d-4967-b291-7ec4cc5a2657",
        "name": "Merge8",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1980,
          900
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "e96bc694-046f-421d-97a2-c08b9c4afe31",
        "name": "Merge9",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2300,
          880
        ]
      },
      {
        "parameters": {
          "content": "PP_3_sidisMargenPasivos_Margenmetricpasivo",
          "height": 666.5367109827046,
          "width": 1961.1122339900935
        },
        "id": "e76b179a-2cdc-40de-aacc-94549b108ace",
        "name": "Note2",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          860,
          720
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_margen",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$mcl_fecha_proceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"tipoConsulta\": 2\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$mcl_fecha_proceso\", \n        \"rifCedula\": \"$mcl_rif_cedula\", \n        \"mcl_naturaleza_producto\": \"$mcl_naturaleza_producto\", \n        \"mcl_producto\": \"$mcl_producto\", \n        \"mcl_producto_altair\": \"$mcl_producto_altair\", \n        \"mcl_subproducto_altair\": \"$mcl_subproducto_altair\", \n        \"mcl_cuenta_contable1\": \"$mcl_cuenta_contable1\"\n      }, \n      \"mcl_banca\": {\n        \"$first\": \"$mcl_banca\"\n      }, \n      \"mcl_segmento\": {\n        \"$first\": \"$mcl_segmento\"\n      }, \n      \"mcl_subsegmento\": {\n        \"$first\": \"$mcl_subsegmento\"\n      }, \n      \"mcl_grupo_economico\": {\n        \"$first\": \"$mcl_grupo_economico\"\n      }, \n      \"mcl_nivel_socioecon\": {\n        \"$first\": \"$mcl_nivel_socioecon\"\n      }, \n      \"estatus\": {\n        \"$first\": \"$mcl_estatus\"\n      }, \n      \"prd_nombre_producto\": {\n        \"$first\": \"$prd_nombre_producto\"\n      }, \n      \"resultSize\": {\n        \"$first\": \"$resultSize\"\n      }, \n      \"sidisLibreconvertibilidadConvenio20\": {\n        \"$first\": \"$sidisLibreconvertibilidadConvenio20\"\n      }, \n      \"sidisProducto\": {\n        \"$first\": \"$sidisProducto\"\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }, \n      \"tasa_dolar\": {\n        \"$first\": \"$tasa_dolar\"\n      }, \n      \"relacion_eur\": {\n        \"$first\": \"$relacion_eur\"\n      }, \n      \"fechaUltimaTransacPasivos\": {\n        \"$max\": \"$mcl_fecha_ult_tran_d\"\n      }, \n      \"numeroContrato\": {\n        \"$sum\": 1\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": \"$mcl_saldo\"\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": \"$mcl_promedio\"\n      }, \n      \"numDebitoPasivo\": {\n        \"$sum\": \"$mcl_numero_debitos\"\n      }, \n      \"montoDebitoPasivo\": {\n        \"$sum\": \"$mcl_monto_debitos\"\n      }, \n      \"numCreditoPasivo\": {\n        \"$sum\": \"$mcl_numero_creditos\"\n      }, \n      \"montoCreditoPasivo\": {\n        \"$sum\": \"$mcl_monto_creditos\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sidisMargen.codigoBanca\": \"$mcl_banca\", \n      \"sidisMargen.codigoSegmento\": \"$mcl_segmento\", \n      \"sidisMargen.codigoSubsegmento\": \"$mcl_subsegmento\", \n      \"sidisMargen.codigoGrupoeconomico\": \"$mcl_grupo_economico\", \n      \"sidisMargen.nombreNSE\": \"$mcl_nivel_socioecon\", \n      \"denominacion\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"BOLIVARES\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"$sidisLibreconvertibilidadConvenio20.denominacion\"\n            }\n          ]\n        }\n      }, \n      \"moneda_base\": \"BOLIVARES\", \n      \"saldoPasivoDivisaOrigen\": \"$saldoPasivo\", \n      \"promedioPasivoDivisaOrigen\": \"$promedioPasivo\", \n      \"montoDebitoPasivoDivisaOrigen\": \"$montoDebitoPasivo\", \n      \"montoCreditoPasivoDivisaOrigen\": \"$montoCreditoPasivo\"\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"rifCedula\": \"$_id.rifCedula\", \n      \"name\": \"$_id.name\", \n      \"naturalezaProducto\": \"$_id.mcl_naturaleza_producto\", \n      \"codigoProducto\": \"$_id.mcl_producto\", \n      \"codigoProductoaAltair\": \"$_id.mcl_producto_altair\", \n      \"codigoSubProductoAltair\": \"$_id.mcl_subproducto_altair\", \n      \"cuentaContable1\": \"$_id.mcl_cuenta_contable1\", \n      \"condicion\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"$sidisLibreconvertibilidadConvenio20.condicion\"\n            }\n          ]\n        }\n      }, \n      \"saldoPasivo\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"$moneda_base\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$saldoPasivo\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"EUROS\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$multiply\": [\n                      \"$saldoPasivo\", 1\n                    ]\n                  }, 4\n                ]\n              }\n            }\n          ], \n          \"default\": \"$saldoPasivo\"\n        }\n      }, \n      \"promedioPasivo\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"$moneda_base\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$promedioPasivo\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"EUROS\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$multiply\": [\n                      \"$promedioPasivo\", 1\n                    ]\n                  }, 4\n                ]\n              }\n            }\n          ], \n          \"default\": \"$promedioPasivo\"\n        }\n      }, \n      \"montoDebitoPasivo\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"$moneda_base\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$montoDebitoPasivo\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"EUROS\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$multiply\": [\n                      \"$montoDebitoPasivo\", 1\n                    ]\n                  }, 4\n                ]\n              }\n            }\n          ], \n          \"default\": \"$montoDebitoPasivo\"\n        }\n      }, \n      \"montoCreditoPasivo\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"$moneda_base\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$montoCreditoPasivo\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }\n            }, {\n              \"case\": {\n                \"$eq\": [\n                  \"$denominacion\", \"EUROS\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$multiply\": [\n                      \"$montoCreditoPasivo\", 1\n                    ]\n                  }, 4\n                ]\n              }\n            }\n          ], \n          \"default\": \"$montoCreditoPasivo\"\n        }\n      }, \n      \"origenMargen\": true, \n      \"_id\": \"$$REMOVE\", \n      \"moneda_base\": \"$$REMOVE\", \n      \"resultSize\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenpasivo\", \n      \"on\": [\n        \"rifCedula\", \"naturalezaProducto\", \"codigoProducto\", \"codigoProductoaAltair\", \"codigoSubProductoAltair\", \"cuentaContable1\", \"condicion\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "5cacbb2b-89a1-4e9c-9a19-eae81cd5032e",
        "name": "PP_3_sidisMargenPasivos_Margenmetricpasivo",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1800,
          800
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$mcl_fecha_proceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"tipoConsulta\": 1\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"fechaProceso\": \"$mcl_fecha_proceso\", \n        \"rifCedula\": \"$mcl_rif_cedula\", \n        \"mcl_naturaleza_producto\": \"$mcl_naturaleza_producto\", \n        \"mcl_producto\": \"$mcl_producto\", \n        \"mcl_producto_altair\": \"$mcl_producto_altair\", \n        \"mcl_subproducto_altair\": \"$mcl_subproducto_altair\", \n        \"mcl_cuenta_contable1\": \"$mcl_cuenta_contable1\"\n      }, \n      \"mcl_banca\": {\n        \"$first\": \"$mcl_banca\"\n      }, \n      \"mcl_segmento\": {\n        \"$first\": \"$mcl_segmento\"\n      }, \n      \"mcl_subsegmento\": {\n        \"$first\": \"$mcl_subsegmento\"\n      }, \n      \"mcl_grupo_economico\": {\n        \"$first\": \"$mcl_grupo_economico\"\n      }, \n      \"mcl_nivel_socioecon\": {\n        \"$first\": \"$mcl_nivel_socioecon\"\n      }, \n      \"estatus\": {\n        \"$first\": \"$mcl_estatus\"\n      }, \n      \"cuentaContable1Indicador\": {\n        \"$first\": \"$mcl_cuenta_contable1_indicador\"\n      }, \n      \"prd_nombre_producto\": {\n        \"$first\": \"$prd_nombre_producto\"\n      }, \n      \"resultSize\": {\n        \"$first\": \"$resultSize\"\n      }, \n      \"sidisLibreconvertibilidadConvenio20\": {\n        \"$first\": \"$sidisLibreconvertibilidadConvenio20\"\n      }, \n      \"sidisProducto\": {\n        \"$first\": \"$sidisProducto\"\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }, \n      \"tasa_dolar\": {\n        \"$first\": \"$tasa_dolar\"\n      }, \n      \"numeroContratosActivo\": {\n        \"$sum\": 1\n      }, \n      \"saldoActivoDivisaOrigen\": {\n        \"$sum\": \"$mcl_saldo\"\n      }, \n      \"promedioActivoDivisaOrigen\": {\n        \"$sum\": \"$mcl_promedio\"\n      }, \n      \"numDebitosActivo\": {\n        \"$sum\": \"$mcl_numero_debitos\"\n      }, \n      \"montoDebitosActivoDivisaOrigen\": {\n        \"$sum\": \"$mcl_monto_debitos\"\n      }, \n      \"numCreditosActivo\": {\n        \"$sum\": \"$mcl_numero_creditos\"\n      }, \n      \"montoCreditosActivoDivisaOrigen\": {\n        \"$sum\": \"$mcl_monto_creditos\"\n      }, \n      \"interesesActivoDivisaOrigen\": {\n        \"$sum\": \"$mcl_intereses\"\n      }, \n      \"abonoLiqActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": [\n            {\n              \"$and\": [\n                {\n                  \"$gte\": [\n                    \"$mcl_fecha_liq_operacion\", {\n                      \"$dateTrunc\": {\n                        \"date\": \"$mcl_fecha_proceso\", \n                        \"unit\": \"month\"\n                      }\n                    }\n                  ]\n                }, {\n                  \"$lte\": [\n                    \"$mcl_fecha_liq_operacion\", \"$mcl_fecha_proceso\"\n                  ]\n                }\n              ]\n            }, \"$mcl_monto_apertura\", 0\n          ]\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"sidisMargen.codigoBanca\": \"$mcl_banca\", \n      \"sidisMargen.codigoSegmento\": \"$mcl_segmento\", \n      \"sidisMargen.codigoSubsegmento\": \"$mcl_subsegmento\", \n      \"sidisMargen.codigoGrupoeconomico\": \"$mcl_grupo_economico\", \n      \"sidisMargen.nombreNSE\": \"$mcl_nivel_socioecon\", \n      \"denominacion\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"BOLIVARES\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"$sidisLibreconvertibilidadConvenio20.denominacion\"\n            }\n          ]\n        }\n      }, \n      \"condicion\": {\n        \"$switch\": {\n          \"branches\": [\n            {\n              \"case\": {\n                \"$eq\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"\"\n            }, {\n              \"case\": {\n                \"$gt\": [\n                  \"$resultSize\", 0\n                ]\n              }, \n              \"then\": \"$sidisLibreconvertibilidadConvenio20.condicion\"\n            }\n          ]\n        }\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"rifCedula\": \"$_id.rifCedula\", \n      \"naturalezaProducto\": \"$_id.mcl_naturaleza_producto\", \n      \"codigoProducto\": \"$_id.mcl_producto\", \n      \"codigoProductoaAltair\": \"$_id.mcl_producto_altair\", \n      \"codigoSubProductoAltair\": \"$_id.mcl_subproducto_altair\", \n      \"cuentaContable1\": \"$_id.mcl_cuenta_contable1\", \n      \"saldoActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$saldoActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$saldoActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"promedioActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$promedioActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$promedioActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"montoDebitosActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$montoDebitosActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$montoDebitosActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"montoCreditosActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$montoCreditosActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$montoCreditosActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"abonoLiqActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$abonoLiqActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$abonoLiqActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"interesesActivo\": {\n        \"$cond\": {\n          \"if\": {\n            \"$eq\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$eq\": [\n                      \"$condicion\", \"\"\n                    ]\n                  }, \n                  \"then\": {\n                    \"$round\": [\n                      {\n                        \"$divide\": [\n                          \"$interesesActivoDivisaOrigen\", \"$tasa_dolar\"\n                        ]\n                      }, 4\n                    ]\n                  }, \n                  \"else\": null\n                }\n              }, null\n            ]\n          }, \n          \"then\": \"$$REMOVE\", \n          \"else\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$condicion\", \"\"\n                ]\n              }, \n              \"then\": {\n                \"$round\": [\n                  {\n                    \"$divide\": [\n                      \"$interesesActivoDivisaOrigen\", \"$tasa_dolar\"\n                    ]\n                  }, 4\n                ]\n              }, \n              \"else\": null\n            }\n          }\n        }\n      }, \n      \"origenMargen\": true, \n      \"_id\": \"$$REMOVE\", \n      \"resultSize\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenactivo\", \n      \"on\": [\n        \"rifCedula\", \"naturalezaProducto\", \"codigoProducto\", \"codigoProductoaAltair\", \"codigoSubProductoAltair\", \"cuentaContable1\", \"fechaProceso\"\n      ], \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "7c385faa-fd22-49c4-8435-f9c588e89ee6",
        "name": "PP_2_sidisMargenActivos_Margenmetricactivo",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1800,
          380
        ],
        "alwaysOutputData": true,
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
        "id": "e7af23eb-de05-44e0-9062-3955c87d1e04",
        "name": "Merge10",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1640,
          1600
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f8ef021f-7fdf-44b3-8d6a-cfd2136b538b",
        "name": "Merge11",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2360,
          1560
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "9f54bb75-183b-4737-a7c9-f85b109b3cbf",
        "name": "Merge12",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2680,
          1540
        ]
      },
      {
        "parameters": {
          "content": "PP_4_sidisBeneficiarioIndicador_Margenmetric",
          "height": 347.08200406816206,
          "width": 2157.926437366471
        },
        "id": "3bc80391-4840-4c75-84be-fd250714cc37",
        "name": "Note3",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          860,
          1420
        ]
      },
      {
        "parameters": {
          "content": "I_1_margenMetricActivoIndicador_Margenmetric",
          "height": 311.1690387502272,
          "width": 1563.7742498884354
        },
        "id": "6bcf6a7d-8154-4c5d-be83-c94b15207e2d",
        "name": "Note5",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          2860,
          380
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "I_1_margenMetricActivoIndicador_Margenmetric",
          "options": {}
        },
        "id": "c7695445-dcb5-4ec0-92e3-9fb22cff1d69",
        "name": "Webhook5",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2880,
          460
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f91799fe-bfd2-4d08-92f2-e9d77798260b",
        "name": "Merge13",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3380,
          520
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"I_1_margenMetricActivoIndicador_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n\n"
        },
        "id": "31fd6566-621a-4313-a1c9-7098ab793dcd",
        "name": "Code5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          3040,
          540
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "4d77ca54-3019-4362-aa20-2842a30f8f19",
        "name": "Merge14",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3740,
          500
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "348c756b-e84f-450e-afcc-3a5e91e9efef",
        "name": "Merge15",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4080,
          480
        ]
      },
      {
        "parameters": {
          "content": "I_2_margenMetricPaivosIndicador_Margenmetric",
          "height": 302.5542901270395,
          "width": 1629.962545673157
        },
        "id": "d7f0bc99-d6fa-421d-8166-c8c869ddb285",
        "name": "Note6",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          2860,
          731.4754123976262
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "I_2_margenMetricPaivosIndicador_Margenmetric",
          "options": {}
        },
        "id": "aa2367ea-d50d-4b3f-8b42-70336bbdbe96",
        "name": "Webhook6",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2880,
          880
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "fde36132-8c79-4c49-a386-db26f71cacd7",
        "name": "Merge16",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3380,
          860
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"I_2_margenMetricPaivosIndicador_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n\n"
        },
        "id": "3561bc4c-4074-43c8-baa3-b92c3b23e581",
        "name": "Code6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          3020,
          880
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "9d6b616b-0c09-4487-9a34-1f69f6fb56aa",
        "name": "Merge17",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3720,
          840
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "3947ea18-434c-466a-9a87-5a486b8eb9c4",
        "name": "Merge18",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4080,
          820
        ]
      },
      {
        "parameters": {
          "content": "I_3_margenMetricPasivoConv20_Margenmetric",
          "height": 312.2196152290763,
          "width": 1632.276196530804
        },
        "id": "b9ccd2f5-7849-45e9-ba50-d4018ade7c29",
        "name": "Note7",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          2860,
          1060
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "I_3_margenMetricPasivoConv20_Margenmetric",
          "options": {}
        },
        "id": "dfd87273-a5e0-4100-b407-282d476d20f0",
        "name": "Webhook7",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2880,
          1220
        ],
        "webhookId": "9810ff11-e9e8-4e44-bf3f-4119077654c9"
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "65870725-fed3-4479-842e-c38eb9682083",
        "name": "Merge19",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3380,
          1200
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"I_3_margenMetricPasivoConv20_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n\n"
        },
        "id": "86523260-cbac-4376-8e04-5f6582e2b186",
        "name": "Code7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          3020,
          1220
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "df0ed283-3dea-4ff5-996d-4dbc9be942e0",
        "name": "Merge20",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3760,
          1180
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "8fcfd336-4d6b-4f2a-96ad-81e5cce48d9d",
        "name": "Merge21",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          4120,
          1160
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "Margenactivo",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"sidisMargen\": {\n        \"$first\": \"$sidisMargen\"\n      }, \n      \"saldoActivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$saldoActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"saldoActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$saldoActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"promedioActivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$promedioActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"promedioActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$promedioActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoDebitosActivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoDebitosActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoDebitosActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoDebitosActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditosActivos\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoCreditosActivos\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditosActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoCreditosActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"abonoLiqActivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$and\": [\n                {\n                  \"$eq\": [\n                    \"$denominacion\", \"BOLIVARES\"\n                  ]\n                }, {\n                  \"$eq\": [\n                    \"$cuentaContable1Indicador\", \"131\"\n                  ]\n                }\n              ]\n            }, \n            \"then\": \"$abonoLiqActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"abonoLiqActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$and\": [\n                {\n                  \"$eq\": [\n                    \"$denominacion\", \"BOLIVARES\"\n                  ]\n                }, {\n                  \"$eq\": [\n                    \"$cuentaContable1Indicador\", \"131\"\n                  ]\n                }\n              ]\n            }, \n            \"then\": \"$abonoLiqActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"interesesActivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$interesesActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"interesesActivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$interesesActivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numeroContratosActivoBolivar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numeroContratosActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numeroContratosActivo\": {\n        \"$sum\": \"$numeroContratosActivo\"\n      }, \n      \"numDebitosActivoBolivar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numDebitosActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numDebitosActivo\": {\n        \"$sum\": \"$numDebitosActivo\"\n      }, \n      \"numCreditosActivoBolivar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numCreditosActivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numCreditosActivo\": {\n        \"$sum\": \"$numCreditosActivo\"\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"origenMargen\": true, \n      \"origenMargenActivos\": true, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"rifCedula\", \"fechaProceso\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "ba919ef3-207b-4bba-8edf-2564568f671d",
        "name": "I_1_margenMetricActivoIndicador_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3560,
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
          "collection": "Margenpasivo",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"condicion\": {\n            \"$nin\": [\n              \"NO_MOVIBLE\", \"Conv20\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$addFields\": {\n      \"movimientosMesPasivo\": {\n        \"$sum\": [\n          \"$numCreditoPasivo\", \"$numDebitoPasivo\"\n        ]\n      }, \n      \"saldosMesPasivo\": {\n        \"$sum\": [\n          \"$montoCreditoPasivo\", \"$promedioPasivo\"\n        ]\n      }\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"sidisMargen\": {\n        \"$first\": \"$sidisMargen\"\n      }, \n      \"fechaUltimaTransacPasivo\": {\n        \"$first\": \"$fechaUltimaTransacPasivos\"\n      }, \n      \"saldoPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$saldoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"saldoPasivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$saldoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"promedioPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$promedioPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"promedioPasivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$promedioPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditoPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoCreditoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditoPasivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoCreditoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditoPasivoDolar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"DOLARES\"\n              ]\n            }, \n            \"then\": \"$montoCreditoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoCreditoPasivoEuro\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"EUROS\"\n              ]\n            }, \n            \"then\": \"$montoCreditoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoDebitoPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoDebitoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"montoDebitoPasivoDivisaOrigen\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$montoDebitoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numCreditoPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numCreditoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numDebitoPasivo\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numDebitoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numeroContrato\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$numeroContrato\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"numCreditoPasivoTodasDivisa\": {\n        \"$sum\": \"$numCreditoPasivo\"\n      }, \n      \"numDebitoPasivoTodasDivisa\": {\n        \"$sum\": \"$numDebitoPasivo\"\n      }, \n      \"numeroContratoTodasDivisa\": {\n        \"$sum\": \"$numeroContrato\"\n      }, \n      \"saldoDolar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"DOLARES\"\n              ]\n            }, \n            \"then\": \"$saldoPasivo\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"saldoEuro\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"EUROS\"\n              ]\n            }, \n            \"then\": \"$saldoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"movimientosMesPasivo\": {\n        \"$sum\": \"$movimientosMesPasivo\"\n      }, \n      \"saldosMesPasivo\": {\n        \"$sum\": \"$saldosMesPasivo\"\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"montoCreditoPasivoEuro\": {\n        \"$round\": [\n          {\n            \"$multiply\": [\n              {\n                \"$cond\": {\n                  \"if\": {\n                    \"$lte\": [\n                      \"$montoCreditoPasivoEuro\", null\n                    ]\n                  }, \n                  \"then\": 0, \n                  \"else\": \"$montoCreditoPasivoEuro\"\n                }\n              }, \"$sidisTasaconversion.Conversion\"\n            ]\n          }, 4\n        ]\n      }, \n      \"clienteActivo\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$ne\": [\n                  \"$movimientosMesPasivo\", 0\n                ]\n              }, {\n                \"$ne\": [\n                  \"$saldosMesPasivo\", 0\n                ]\n              }\n            ]\n          }, true, false\n        ]\n      }, \n      \"origenMargen\": true, \n      \"origenMargenPasivos\": true, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "6dc7d25e-61ac-4b90-95cb-401b607ee504",
        "name": "I_2_margenMetricPaivosIndicador_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3540,
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
          "collection": "Margenpasivo",
          "query": "=\n[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }, {\n          \"condicion\": {\n            \"$in\": [\n              \"NO_MOVIBLE\", \"Conv20\"\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$group\": {\n      \"_id\": {\n        \"rifCedula\": \"$rifCedula\", \n        \"fechaProceso\": \"$fechaProceso\"\n      }, \n      \"sidisMargen\": {\n        \"$first\": \"$sidisMargen\"\n      }, \n      \"saldoConv20\": {\n        \"$sum\": \"$saldoPasivo\"\n      }, \n      \"saldoConv20Bolivar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"BOLIVARES\"\n              ]\n            }, \n            \"then\": \"$saldoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"saldoConv20Dolar\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"DOLARES\"\n              ]\n            }, \n            \"then\": \"$saldoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"saldoConv20Euro\": {\n        \"$sum\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$denominacion\", \"EUROS\"\n              ]\n            }, \n            \"then\": \"$saldoPasivoDivisaOrigen\", \n            \"else\": 0\n          }\n        }\n      }, \n      \"sidisTasaconversion\": {\n        \"$first\": \"$sidisTasaconversion\"\n      }\n    }\n  }, {\n    \"$addFields\": {\n      \"rifCedula\": \"$_id.rifCedula\", \n      \"fechaProceso\": \"$_id.fechaProceso\", \n      \"origenMargen\": true, \n      \"origenMargenPasivos\": true, \n      \"_id\": \"$$REMOVE\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"Margenmetric\", \n      \"on\": [\n        \"fechaProceso\", \"rifCedula\"\n      ], \n      \"whenMatched\": \"merge\", \n      \"whenNotMatched\": \"insert\"\n    }\n  }\n]"
        },
        "id": "74704b3f-ba96-489d-8848-f6ebb8c7fb24",
        "name": "I_3_margenMetricPasivoConv20_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3580,
          1080
        ],
        "alwaysOutputData": true,
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_2_PROCESAMIENTO",
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
        "id": "a91a7cb4-a715-490b-9b65-108e56e325c0",
        "name": "HTTP Request9",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4280,
          820
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_2_PROCESAMIENTO",
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
        "id": "7535d197-9337-4fcd-b1f7-b6b1f9842a7c",
        "name": "HTTP Request10",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4320,
          1160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "1fe83f4b-5a88-4cbc-a015-7e261a06e8e8",
        "name": "Merge22",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2000,
          1580
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_beneficiario",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$fechaProceso\", {\n                \"$toDate\":  \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_ordenante\", \n      \"let\": {\n        \"fechaProceso\": \"$fechaProceso\", \n        \"rif_empresa\": \"$snb_rif_empresa\", \n        \"id_debito\": \"$snb_id_debito\"\n      }, \n      \"pipeline\": [\n        {\n          \"$match\": {\n            \"$expr\": {\n              \"$and\": [\n                {\n                  \"$eq\": [\n                    \"$fechaProceso\", \"$$fechaProceso\"\n                  ]\n                }, {\n                  \"$eq\": [\n                    \"$sno_rif_empresa\", \"$$rif_empresa\"\n                  ]\n                }, {\n                  \"$eq\": [\n                    \"$sno_id_debito\", \"$$id_debito\"\n                  ]\n                }, {\n                  \"$eq\": [\n                    \"$sno_tipo_pago\", \"PROVEEDORE\"\n                  ]\n                }\n              ]\n            }\n          }\n        }\n      ], \n      \"as\": \"ordenante\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$ordenante\"\n    }\n  }, {\n    \"$lookup\": {\n      \"from\": \"sidis_tasaconversion\", \n      \"localField\": \"fechaProceso\", \n      \"foreignField\": \"Fecha\", \n      \"as\": \"sidis_tasaconversion\"\n    }\n  }, {\n    \"$project\": {\n      \"fechaProceso\": 1, \n      \"snb_ci_benefic\": 1, \n      \"snb_rif_empresa\": 1, \n      \"snb_id_debito\": 1, \n      \"tipoBanco\": {\n        \"$cond\": [\n          {\n            \"$eq\": [\n              {\n                \"$substr\": [\n                  \"$snb_num_cuenta\", 0, 4\n                ]\n              }, \"0102\"\n            ]\n          }, \"BDV\", \"OTROS\"\n        ]\n      }, \n      \"USDConvertRte\": {\n        \"$first\": \"$sidis_tasaconversion.Tasa_DOL\"\n      }, \n      \"consultaProveerdor\": {\n        \"$toBool\": 1\n      }, \n      \"updatedAt\": \"$$NOW\"\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_beneficiario\", \n      \"on\": [\n        \"snb_ci_benefic\", \"snb_rif_empresa\", \"snb_id_debito\", \"_id\"\n      ], \n      \"whenMatched\": \"merge\"\n    }\n  }\n]"
        },
        "id": "16e3d988-2eb0-404b-86d7-197d09d319a7",
        "name": "PP_4.1_sidisBeneficiarioIndicador_sidisBeneficiario",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1820,
          1480
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$consultaProveerdor\", true\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$fechaProceso\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$snb_rif_empresa\", \n          \"rifBenefic\": \"$snb_ci_benefic\"\n        }, \n        \"volumenPagosProveedor\": {\n          \"$sum\": \"$snb_mto_pcorrecto\"\n        }, \n        \"volumenPagosProveedorBDV\": {\n          \"$sum\": {\n            \"$cond\": {\n              \"if\": {\n                \"$eq\": [\n                  \"$tipoBanco\", \"BDV\"\n                ]\n              }, \n              \"then\": \"$snb_mto_pcorrecto\", \n              \"else\": 0\n            }\n          }\n        }, \n        \"volumenPagosProveedorOTRO\": {\n          \"$sum\": {\n            \"$cond\": {\n              \"if\": {\n                \"$ne\": [\n                  \"$tipoBanco\", \"BDV\"\n                ]\n              }, \n              \"then\": \"$snb_mto_pcorrecto\", \n              \"else\": 0\n            }\n          }\n        }, \n        \"fechaProceso\": {\n          \"$first\": \"$fechaProceso\"\n        }\n      }\n    }, {\n      \"$group\": {\n        \"_id\": {\n          \"rifCedula\": \"$_id.rifCedula\"\n        }, \n        \"beneficiarios\": {\n          \"$sum\": 1\n        }, \n        \"volumenPagosProveedor\": {\n          \"$sum\": \"$volumenPagosProveedor\"\n        }, \n        \"volumenPagosProveedorBDV\": {\n          \"$sum\": \"$volumenPagosProveedorBDV\"\n        }, \n        \"volumenPagosProveedorOTRO\": {\n          \"$sum\": \"$volumenPagosProveedorOTRO\"\n        }, \n        \"fechaProceso\": {\n          \"$first\": \"$fechaProceso\"\n        }\n      }\n    }, {\n      \"$lookup\": {\n        \"from\": \"sidis_tasaconversion\", \n        \"localField\": \"fechaProceso\", \n        \"foreignField\": \"Fecha\", \n        \"as\": \"result\"\n      }\n    }, {\n      \"$project\": {\n        \"_id\": 0, \n        \"rifCedula\": \"$_id.rifCedula\", \n        \"fechaProceso\": 1, \n        \"cantidadBeneficiario\": \"$beneficiarios\", \n        \"volumenPagosProveedor\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$volumenPagosProveedor\", {\n                  \"$first\": \"$result.Tasa_DOL\"\n                }\n              ]\n            }, 2\n          ]\n        }, \n        \"volumenPagosProveedorOTRO\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$volumenPagosProveedorOTRO\", {\n                  \"$first\": \"$result.Tasa_DOL\"\n                }\n              ]\n            }, 2\n          ]\n        }, \n        \"volumenPagosProveedorBDV\": {\n          \"$round\": [\n            {\n              \"$divide\": [\n                \"$volumenPagosProveedorBDV\", {\n                  \"$first\": \"$result.Tasa_DOL\"\n                }\n              ]\n            }, 2\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"reciprocidadBeneficiario\": {\n          \"$cond\": {\n            \"if\": {\n              \"$eq\": [\n                \"$volumenPagosProveedor\", 0\n              ]\n            }, \n            \"then\": 0, \n            \"else\": {\n              \"$round\": [\n                {\n                  \"$multiply\": [\n                    {\n                      \"$divide\": [\n                        \"$volumenPagosProveedorBDV\", \"$volumenPagosProveedor\"\n                      ]\n                    }, 100\n                  ]\n                }, 2\n              ]\n            }\n          }\n        }\n      }\n    }, {\n      \"$merge\": {\n        \"into\": \"Margenmetric\", \n        \"on\": [\n          \"fechaProceso\", \"rifCedula\"\n        ]\n      }\n    }\n  ]"
        },
        "id": "a410649d-450a-4245-a1d9-5d51da813c59",
        "name": "PP_4.2_sidisBeneficiarioIndicador_Margenmetric",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2180,
          1460
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "content": "E2_Procesamiento_Financialstatement",
          "height": 1238.4782778197527,
          "width": 2947.328743448489
        },
        "id": "d61fd365-3c76-4532-a45d-6fc39b61211b",
        "name": "Note8",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          900,
          4280
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "f8dc3433-e1f6-4e3d-a621-3ab1e0347fd3",
        "name": "addlastDigRifs3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2460,
          4460
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/e75bc412-e985-4bc9-8e1f-b62593fc2584",
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
        "id": "0ef51b3b-9c46-494f-9b41-985f3382d1de",
        "name": "HTTP Request14",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1960,
          4460
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "8a9fb66e-903b-4ea7-acb8-73d34b0d52d3",
        "name": "Wait9",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          2120,
          4460
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "006bb1cd-d1c0-4079-9aa2-848a30264015",
        "name": "SplitInBatches4",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1800,
          4460
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "0d8ddb58-ee30-45f8-bbfb-b9bcf1a4887a",
        "name": "Merge31",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2780,
          4440
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "8e9acb6f-3d03-4781-89f1-fe9883ab1db9",
        "name": "Merge32",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3100,
          4420
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "479d9df4-0d20-4cde-a63b-656f1f141644",
        "name": "Merge33",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3400,
          4400
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "6ccb5328-689e-46bc-b722-7fc0b4b96f3e",
        "name": "StartOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2620,
          4360
        ],
        "alwaysOutputData": true,
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
        "id": "04c72d26-bb92-493f-851c-04ebbe41bce7",
        "name": "UpdatedOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3260,
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
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "f10a5348-d289-4f33-a2eb-5fa7fe8b9a53",
        "name": "Merge34",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          1440,
          4460
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "faf995da-a912-4e2f-9dc2-bafd2a2cf374",
        "name": "createOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1280,
          4400
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E2_Procesamiento_Financialstatement\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "4aa7f6c7-5b45-4834-9f75-1f6871721a0b",
        "name": "Definición de parametros3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1120,
          4480
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/c790261c-c3ed-490e-b21a-7f9b92c48710",
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
        "id": "3645fa24-51a8-43f0-a07b-66ac1acafab9",
        "name": "HTTP Request15",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3620,
          4400
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "d2611937-e5cf-4c96-96f6-33653962a876",
          "options": {}
        },
        "id": "b012b4f7-dbb1-4e6d-a911-7c4bea530342",
        "name": "Webhook8",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          960,
          4480
        ],
        "webhookId": "d2611937-e5cf-4c96-96f6-33653962a876"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "e75bc412-e985-4bc9-8e1f-b62593fc2584",
          "options": {}
        },
        "id": "cdfa5db4-1079-4670-a674-fdc30d7b40e6",
        "name": "Webhook9",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2320,
          4460
        ],
        "webhookId": "e75bc412-e985-4bc9-8e1f-b62593fc2584"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "2de45919-7786-40bc-b1a4-ecd13efca2b2",
        "name": "Bring operations subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1620,
          4460
        ],
        "alwaysOutputData": true,
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
        "id": "9cf06231-2e3c-4945-aabd-cc208f46d05d",
        "name": "Operation_subStage=1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2940,
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
        "id": "73e3613d-1998-48d5-bc8f-78d3c204949f",
        "name": "addlastDigRifs",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2160,
          4920
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/1a9a26e8-3cc7-482a-b685-94762361d71f",
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
        "id": "9500e518-d078-4a06-a92b-c9b4431d0360",
        "name": "HTTP Request16",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1640,
          4920
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "1e126358-85b1-4f49-8084-43baba3ec8e8",
        "name": "Wait",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1800,
          4920
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "1c772261-7739-4336-84de-5c6841609003",
        "name": "SplitInBatches",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1480,
          4920
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "e787309a-71f0-4f3a-bfda-9eebb01a19cf",
        "name": "Merge35",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2480,
          4900
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "232a30b9-6cee-460d-a5e1-82fc6455bd57",
        "name": "Merge36",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2800,
          4880
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "3e482455-339e-4fe6-9927-4188a10b65d3",
        "name": "Merge37",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3140,
          4860
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "3b9e639a-9b78-41b5-ae84-4dc1d6f8891e",
        "name": "StartOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2320,
          4820
        ],
        "alwaysOutputData": true,
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
        "id": "5c6bbe09-e278-4143-8d83-61c3a88a72d8",
        "name": "UpdatedOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2960,
          4780
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E2_Procesamiento_Financialstatement\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"2\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "b0f3d342-49a5-40ae-a576-8bf4ec711496",
        "name": "Definición de parametros",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1120,
          4920
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/5a4c4677-d258-46e6-ba3d-6417e85e3fc8",
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
        "id": "473a6f6c-c45b-45db-a265-26ce86639b40",
        "name": "HTTP Request17",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3660,
          4840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "96973051-075f-4af9-bc06-ebc1fd007c7d",
        "name": "Bring operations subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1300,
          4920
        ],
        "alwaysOutputData": true,
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
        "id": "4ae5ddd5-e6a0-4296-bbbc-7d0b35270896",
        "name": "Operation_subStage=2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2640,
          4780
        ],
        "alwaysOutputData": true,
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
          "path": "c790261c-c3ed-490e-b21a-7f9b92c48710",
          "options": {}
        },
        "id": "cb69b4b0-3164-4df2-b5d3-b13802491ef2",
        "name": "Webhook10",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          960,
          4920
        ],
        "webhookId": "c790261c-c3ed-490e-b21a-7f9b92c48710"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "1a9a26e8-3cc7-482a-b685-94762361d71f",
          "options": {}
        },
        "id": "15e00739-cd6e-401a-8fbe-ac2679b119cc",
        "name": "Webhook11",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          2020,
          4920
        ],
        "webhookId": "1a9a26e8-3cc7-482a-b685-94762361d71f"
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "b1c4c9da-a731-4bf9-94a1-ed73780813db",
        "name": "addlastDigRifs1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2140,
          5320
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/537fd21d-b65f-4ab2-a1fe-5046a42ac645",
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
        "id": "af3223c8-9baf-4574-9ba6-918f5e0f211e",
        "name": "HTTP Request18",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1640,
          5320
        ]
      },
      {
        "parameters": {
          "unit": "seconds"
        },
        "id": "571d2900-6275-4520-bb96-e87d7da69f4a",
        "name": "Wait1",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1800,
          5320
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "d91a179a-86e1-4f1b-a9a2-d74f4d13842f",
        "name": "SplitInBatches1",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1480,
          5320
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "09c885f1-aa54-447f-9d9a-3b497fae0557",
        "name": "Merge38",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2460,
          5300
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "34d7a941-4277-40db-a709-b2d38a43873f",
        "name": "Merge39",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2780,
          5280
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "31d7a2de-7688-44f0-aa8c-48804a973ece",
        "name": "Merge40",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3120,
          5260
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "7bcbfb82-feb3-47ec-9f7e-be8eae171a83",
        "name": "StartOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2300,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "6601b659-28e6-4341-a52e-fe3dee401ea4",
        "name": "UpdatedOperation1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2960,
          5180
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E2_Procesamiento_Financialstatement\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"3\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "8423123a-1e96-418f-aa77-82133fc05d10",
        "name": "Definición de parametros1",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1120,
          5320
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=",
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
        "id": "18dcbc8d-c99d-4e75-92e9-6a7b0fb4972b",
        "name": "HTTP Request19",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3300,
          5260
        ],
        "disabled": true
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "499d9b2f-e249-4505-b7d0-e832aa0d2630",
        "name": "Bring operations subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1300,
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
          "operation": "aggregate",
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "a28488b9-a0ba-4077-9371-715e43acb642",
        "name": "Operation_subStage=",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2620,
          5200
        ],
        "alwaysOutputData": true,
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
          "path": "5a4c4677-d258-46e6-ba3d-6417e85e3fc8",
          "options": {}
        },
        "id": "99b2ac1b-31b2-4fdc-9d9d-ec1d4ce31127",
        "name": "Webhook12",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          940,
          5320
        ],
        "webhookId": "5a4c4677-d258-46e6-ba3d-6417e85e3fc8"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "537fd21d-b65f-4ab2-a1fe-5046a42ac645",
          "options": {}
        },
        "id": "731b28f3-0ae4-4e3c-a81e-d2790486c3cb",
        "name": "Webhook13",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1980,
          5320
        ],
        "webhookId": "537fd21d-b65f-4ab2-a1fe-5046a42ac645"
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
                "value": "=2024-03-31"
              }
            ]
          },
          "options": {}
        },
        "id": "a073c3bf-b489-4680-870e-9e4424ff2e16",
        "name": "HTTP Request13",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          740,
          4480
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "6f4d6b30-088e-4309-a9db-edfd7d4dab5b",
        "name": "check_subStageStatus",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3300,
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "62621104-faf3-4651-8d05-ebd8790d7773",
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3460,
          4860
        ]
      },
      {
        "parameters": {
          "content": "E2_Transacciones",
          "height": 2241.810339854905,
          "width": 2820.2656418090605
        },
        "id": "a2e7f367-1a77-4df0-a9f3-6466be8f62a9",
        "name": "Note10",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          900,
          1960
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "f31e968a-506a-4a90-920f-d6c9cc27b1a0",
        "name": "addlastDigRifs4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2080,
          2120
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/74d37984-5184-4530-bc45-c2dfbd46c520",
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
        "id": "bc49849e-e406-4747-ab43-b9d4dfb7db9c",
        "name": "HTTP Request20",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          2120
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "ee4c6ad9-b041-4c72-aca3-b462568b0bf0",
        "name": "Wait10",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          2120
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "c8ad2af1-f449-4643-8b45-089e716c9c2c",
        "name": "SplitInBatches5",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          2120
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "6bc3e15b-ce50-470e-bdc8-422bd43fdee8",
        "name": "Merge41",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2400,
          2100
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "1bbf4156-e9c1-4165-86b5-8d3f48032387",
        "name": "Merge42",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2720,
          2080
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "56a3349f-34d4-4c48-b64d-f6ecae4fd3be",
        "name": "Merge43",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3060,
          2060
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "48b7d943-44bb-4137-ac87-ade74293ff34",
        "name": "StartOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2240,
          2020
        ],
        "alwaysOutputData": true,
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
        "id": "05a3d826-49cb-4d4e-8b86-806f14e37feb",
        "name": "UpdatedOperation3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2880,
          1980
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "c53f1882-d0db-4227-bf86-8a086b536626",
        "name": "Definición de parametros4",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          2120
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "d0b5b15e-5fac-415a-82a8-ae30c0737b48",
        "name": "Bring operations subStage=3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "12086c4d-9539-49f1-ab6c-75e78596d00e",
        "name": "Operation_subStage=3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2560,
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
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/40bb76ee-3932-40f9-a8e6-f0a164e0b162",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "processDate",
                "value": "=2024-03-31"
              }
            ]
          },
          "options": {}
        },
        "id": "babcf915-e1a8-476d-aba4-d919eb52480b",
        "name": "HTTP Request22",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          140,
          3020
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "1f2805db-2ab9-4b16-b6cf-4eacb53741d8",
        "name": "addlastDigRifs5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2060,
          2500
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/c06e21c5-eedd-4ef4-9727-c64a2236315e",
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
        "id": "8ff30089-6070-4de3-8ead-fe8d3a1d283f",
        "name": "HTTP Request21",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          2500
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "86394e82-1c16-41e9-ace5-287e53da75e7",
        "name": "Wait11",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          2500
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "1d53d063-f703-4ed8-bfac-6adf32d0ae22",
        "name": "SplitInBatches6",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          2500
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "08eca2c7-e1e1-4772-b776-8c815b8fad34",
        "name": "Merge45",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2380,
          2480
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "cc7cd6a7-0f6d-423c-8d5b-f23ce3990cef",
        "name": "Merge46",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          2460
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "b0638e70-8566-4d4c-b64d-0767a85ad5e4",
        "name": "Merge47",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3040,
          2440
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "256a29f6-8b3d-4ee6-8560-a343e1dd7b61",
        "name": "StartOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2220,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "98ba87c2-513a-428c-b48f-ec77d232e075",
        "name": "UpdatedOperation4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
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
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"2\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "f3043864-e666-42b0-9bae-c37981c77769",
        "name": "Definición de parametros5",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          2500
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "b877c010-649a-4625-877a-8f72276d6298",
        "name": "Bring operations subStage=4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "8c4b4d42-bef8-457c-bcad-418b4b93b591",
        "name": "Operation_subStage=4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
          2380
        ],
        "alwaysOutputData": true,
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
        "id": "8d78bdce-4356-4d19-bf8c-9473c02ca7f9",
        "name": "addlastDigRifs6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2060,
          2840
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/47e4b50a-bf4f-4426-acc5-ff4db3fe380c",
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
        "id": "a50c5625-1de8-4fc6-b6e6-08d9d4f58e4f",
        "name": "HTTP Request23",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          2840
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "bd71f328-2c05-43a7-aafb-d5e5e080fb86",
        "name": "Wait12",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          2840
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "c5396d6c-7708-45d0-bbad-5daef7769b67",
        "name": "SplitInBatches7",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          2840
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "52403ef1-5145-4982-b06c-0fda9e2d2d29",
        "name": "Merge48",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2380,
          2820
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "259eb34c-dd78-466b-970f-86936a00004b",
        "name": "Merge49",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          2800
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "32275830-6493-49f7-8c0e-4a506899174b",
        "name": "Merge50",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3040,
          2780
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "bd73ba3e-3606-4981-abe2-922955bbafc3",
        "name": "StartOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2220,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "79e63550-ac60-4ea3-b52b-16587fbceb36",
        "name": "UpdatedOperation5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
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
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"3\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "30c022a6-f6a1-4fed-9d6b-650ac3758cf1",
        "name": "Definición de parametros6",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          2840
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "8bbb0d12-3876-46ba-b5ac-2cdf1cba64dd",
        "name": "Bring operations subStage=5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
        "parameters": {
          "operation": "aggregate",
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "432ca62e-ed7f-49f4-b420-e96de8a39b81",
        "name": "Operation_subStage=5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
          2720
        ],
        "alwaysOutputData": true,
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
        "id": "c949677b-993d-4df0-bbe9-ebda9143fdb5",
        "name": "addlastDigRifs7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2060,
          3200
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/f21e0ab8-579b-46cb-894b-8858effa60a2",
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
        "id": "9ef42cbe-b7a4-464d-bee0-85c99a8914f5",
        "name": "HTTP Request24",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          3200
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "da69508f-7188-44be-acc1-9dab31ecff08",
        "name": "Wait13",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          3200
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "99d2733a-0efd-486f-874f-29246181618c",
        "name": "SplitInBatches8",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          3200
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "dfec2b27-c427-4b48-a48c-4fb2b5870162",
        "name": "Merge51",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2380,
          3180
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "79300b9d-8dbe-48c9-80e7-7b4ccdcc5561",
        "name": "Merge52",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          3160
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "76cea5da-3961-4fc8-9cac-8eb3c326ba35",
        "name": "Merge53",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3040,
          3140
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "2c236f35-232c-4539-aa48-5a72210f232f",
        "name": "StartOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2220,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5081f278-2aeb-41fa-9729-adfd92d6121f",
        "name": "UpdatedOperation6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
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
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"4\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "4214d57b-43d4-46ab-8de8-256ff7501011",
        "name": "Definición de parametros7",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          3200
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "b95d4a90-d255-4596-963e-515fe76b5fa0",
        "name": "Bring operations subStage=6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "31e35c64-f4e8-4557-8fa4-65acf1c54934",
        "name": "Operation_subStage=6",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
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
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "73e5a3ec-ba89-493d-abbe-2b5b6c8e37ff",
        "name": "addlastDigRifs8",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2060,
          3600
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/a5c76998-0217-48bf-9d4a-a9282fe33f14",
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
        "id": "20ffa8e4-7dd5-455b-94c5-7032957c8666",
        "name": "HTTP Request25",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          3600
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "9f5f67b0-f74f-4918-a8e7-b75bff09db63",
        "name": "Wait14",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          3600
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "e47241d0-4c88-44d3-b6dd-8c351f58fcf8",
        "name": "SplitInBatches9",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          3600
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "241dec24-fdbe-4b32-8ecd-838da932cf94",
        "name": "Merge54",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2380,
          3580
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "18ff25e5-f471-4bc5-a3c1-eab8bf975690",
        "name": "Merge55",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          3560
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "78f1240c-2b6f-4bc1-8075-a6ac3ad9c317",
        "name": "Merge56",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3040,
          3540
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "032c54c3-6f0f-4d03-b14c-cedf7ce81247",
        "name": "StartOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2220,
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
        "id": "f709c98c-ef27-4025-b06d-f1938991dc8f",
        "name": "UpdatedOperation7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
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
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"5\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "bfc92e3b-d0b9-402f-9db1-b0db3affe35e",
        "name": "Definición de parametros8",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          3600
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "c1369d0f-99d9-41ee-8eba-bef213ef8d4b",
        "name": "Bring operations subStage=7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "a3a207be-5e06-4aa1-8826-ec3abe40976b",
        "name": "Operation_subStage=7",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
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
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nvar outPut = [];\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = body.subProcessName;\nvar subProcessDate = body.subProcessDate;\nvar fromCollection = body.fromCollection;\nvar aggregate = body.aggregate;\nvar offSet = body.offSet;\nvar parallelizationIndex = body.parallelizationIndex;\nvar subStage = body.subStage\n\naggregate =  aggregate.replace(new RegExp(\"@processName\", \"g\"), processName);\naggregate =  aggregate.replace(new RegExp(\"@processDate\", \"g\"), processDate);\naggregate =  aggregate.replace(new RegExp(\"@subProcessName\", \"g\"), subProcessName);\naggregate =  aggregate.replace(new RegExp(\"@subProcessDate\", \"g\"), subProcessDate);\naggregate =  aggregate.replace(new RegExp(\"@fromCollection\", \"g\"), fromCollection);\naggregate =  aggregate.replace(new RegExp(\"@offSet\", \"g\"), offSet);\naggregate =  aggregate.replace(new RegExp(\"@parallelizationIndex\", \"g\"), parallelizationIndex);\naggregate =  aggregate.replace(new RegExp(\"@subStage\", \"g\"), subStage);\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName, subProcessDate: subProcessDate, fromCollection: fromCollection, aggregate: aggregate, offSet: offSet, parallelizationIndex: parallelizationIndex, subStage: subStage});\n\nreturn outPut;"
        },
        "id": "56729cfa-ad13-4dde-b8ca-0f4f23c05841",
        "name": "addlastDigRifs9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          2060,
          4000
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/8dda202f-2665-445c-ad83-2e1ae2fcadae",
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
        "id": "045a0dd7-8965-4b2c-96e9-bb60663d0e58",
        "name": "HTTP Request26",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1560,
          4000
        ]
      },
      {
        "parameters": {
          "amount": 5,
          "unit": "seconds"
        },
        "id": "48e45e00-bece-4b36-a13f-55081cf36931",
        "name": "Wait15",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          1720,
          4000
        ],
        "webhookId": "9450f6ad-5ef9-4034-a542-1d900c946b2d"
      },
      {
        "parameters": {
          "batchSize": "=1",
          "options": {}
        },
        "id": "aa7e541b-8f91-4287-bd72-2b8d64aa719e",
        "name": "SplitInBatches10",
        "type": "n8n-nodes-base.splitInBatches",
        "typeVersion": 1,
        "position": [
          1400,
          4000
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "21de3237-d91f-42fc-88e1-84afb5425414",
        "name": "Merge57",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2380,
          3980
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "b3778d69-e4aa-49a2-84cc-6395ea7686d4",
        "name": "Merge58",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          2700,
          3960
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "d2f11940-de4f-440b-89d2-8db414e93a09",
        "name": "Merge59",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          3040,
          3940
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "4a06ff01-cb9d-4604-b32a-6df6128baa93",
        "name": "StartOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2220,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "90508664-7760-4a46-abf4-2e21a363ecdc",
        "name": "UpdatedOperation8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2860,
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
          "jsCode": "for (const item of $input.all()) {\n  var processName = item.json.processName;\n  var processDate = item.json.processDate;\n  var offSet = item.json.offSet;\n  var subStage = item.json.subStage;\n}\n\nprocessName = \"E2_Procesamiento_Transacciones\";  //process name\nprocessDate = body.processDate\noffSet = body.offSet;\nsubStage = \"6\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "3d37556f-15cc-4247-8409-57ae00c6b4af",
        "name": "Definición de parametros9",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1080,
          4000
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$replaceRoot\": {\n      \"newRoot\": \"$subProcess\"\n    }\n  }, {\n    \"$match\": {\n      \"$expr\": {\n        \"$eq\": [\n          \"$subStage\", \"{{$json.subStage}}\"\n        ]\n      }\n    }\n  }, {\n    \"$project\": {\n      \"processName\": \"{{$json.processName}}\",\n      \"processDate\": {\n        \"$toString\": \"{{$json.processDate}}\"\n      }, \n      \"offSet\": \"{{$json.offSet}}\",\n      \"subProcessName\": \"$subProcessName\", \n      \"subProcessDate\": {\n        \"$substr\": [\n          {\n            \"$toString\": \"$subProcessDate\"\n          }, 0, 10\n        ]\n      }, \n      \"fromCollection\": 1, \n      \"toCollecion\": 1, \n      \"status\": 1, \n      \"aggregate\": 1, \n      \"parallelizationIndex\": 1, \n      \"subStage\": 1, \n      \"activeProcess\": 1\n    }\n  }\n]"
        },
        "id": "5b125757-6463-4ef4-a6c0-d9d736a86521",
        "name": "Bring operations subStage=8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1220,
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
          "operation": "aggregate",
          "collection": "={{$json.fromCollection}}",
          "query": "={{$json.aggregate}}"
        },
        "id": "b303ae6e-5c57-4d47-aa20-f6a567118bfa",
        "name": "Operation_subStage=8",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2540,
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
          "amount": 10,
          "unit": "seconds"
        },
        "id": "d5f8cea6-42fc-44fb-a540-789d7bd089d1",
        "name": "Wait16",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          880,
          1620
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "6a28e3b7-86ce-4e00-9ff9-d453d64c2b29",
        "name": "Wait17",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          880,
          940
        ],
        "webhookId": "66d8e14c-79f1-4d4c-b3f4-b9de9e9d109d"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "6e7ebc5f-59f9-4807-9554-00f4d619d5f4",
        "name": "Wait18",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          880,
          520
        ],
        "webhookId": "92332015-87bb-4dd5-a2a8-53f504fe5955"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "3e07307a-2510-4c8a-aa13-ab72e246a3f5",
        "name": "Wait19",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          880,
          160
        ],
        "webhookId": "a76e53b6-58fa-48cf-b5d0-5f505cd9975a"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "df213582-229c-42d6-b837-37a06e232367",
        "name": "Wait20",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          2480,
          460
        ],
        "webhookId": "76df7dc1-8f0f-4766-8e21-3d4a993faaa0"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "64404a26-9742-49c4-8c79-7eb345b4ecb2",
        "name": "Wait21",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          2500,
          880
        ],
        "webhookId": "a8661002-530c-4c0b-a716-d04027f83ed5"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "5b95e159-6363-4d49-8319-66644a82638a",
        "name": "Wait22",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          2540,
          1220
        ],
        "webhookId": "ca8e2ee3-d4cc-4ef7-b753-58fe20eaa6c0"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "0b028fb8-4f63-451f-b403-c1b621a31ec2",
        "name": "createOperation2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          440,
          2920
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E2_Procesamiento_Transacciones\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet:offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "667e4e5f-ce1c-4c0b-a686-bd18ec559da8",
        "name": "Definición de parametros10",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          300,
          3020
        ]
      },
      {
        "parameters": {
          "mode": "chooseBranch",
          "output": "input2"
        },
        "id": "56ba5c33-0048-4ff3-a905-04b22f318454",
        "name": "Merge44",
        "type": "n8n-nodes-base.merge",
        "typeVersion": 2,
        "position": [
          580,
          3000
        ]
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "de13284d-cbb1-41ae-87a6-a87f13e1a4e9",
        "name": "Wait23",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          2120
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "ed3c1b4e-3786-452a-968b-1460769416d0",
        "name": "Wait24",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          2500
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "c7504630-d5be-4453-9444-981aebd7b139",
        "name": "Wait25",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          2840
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "14023981-2666-4882-b491-1d839cdb2d8f",
        "name": "Wait26",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          3200
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "77ba78ce-35ac-443b-8400-ff3859d5ff1f",
        "name": "Wait27",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          3600
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "amount": 10,
          "unit": "seconds"
        },
        "id": "753d15d4-17ad-4499-87b9-54621a2eb12b",
        "name": "Wait28",
        "type": "n8n-nodes-base.wait",
        "typeVersion": 1,
        "position": [
          940,
          4000
        ],
        "webhookId": "77070375-bce9-460d-897b-ce8621fd11bf"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "61d17550-6800-44dd-879d-cfca6aefeae2",
          "options": {}
        },
        "id": "47343ef6-9bb4-421b-a7e7-0f609d890f50",
        "name": "Webhook14",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1920,
          2120
        ],
        "webhookId": "61d17550-6800-44dd-879d-cfca6aefeae2"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "c06e21c5-eedd-4ef4-9727-c64a2236315e",
          "options": {}
        },
        "id": "00fc7ddf-0641-4d60-b586-1532e5a9e210",
        "name": "Webhook15",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1900,
          2500
        ],
        "webhookId": "c06e21c5-eedd-4ef4-9727-c64a2236315e"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "47e4b50a-bf4f-4426-acc5-ff4db3fe380c",
          "options": {}
        },
        "id": "036c76ec-d809-438b-9b95-bb983cc3d72b",
        "name": "Webhook16",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1920,
          2840
        ],
        "webhookId": "47e4b50a-bf4f-4426-acc5-ff4db3fe380c"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "f21e0ab8-579b-46cb-894b-8858effa60a2",
          "options": {}
        },
        "id": "c1141cf6-73dc-44e7-880f-6a5344f7a9d9",
        "name": "Webhook17",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1920,
          3200
        ],
        "webhookId": "f21e0ab8-579b-46cb-894b-8858effa60a2"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "a5c76998-0217-48bf-9d4a-a9282fe33f14",
          "options": {}
        },
        "id": "9b1ce211-cd74-44b0-a073-c9103190fba5",
        "name": "Webhook18",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1900,
          3600
        ],
        "webhookId": "a5c76998-0217-48bf-9d4a-a9282fe33f14"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "8dda202f-2665-445c-ad83-2e1ae2fcadae",
          "options": {}
        },
        "id": "35937608-4011-4d7f-926a-76a0c85ef0f8",
        "name": "Webhook19",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1900,
          4000
        ],
        "webhookId": "8dda202f-2665-445c-ad83-2e1ae2fcadae"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_process",
          "query": "=[\n  {\n    \"$match\": {\n      \"processName\": \"{{$json.processName}}\"\n    }\n  }, {\n    \"$set\": {\n      \"processDate\": {\n        \"$toDate\": \"{{$json.processDate}}\"\n      }, \n      \"startDate\": \"$$NOW\", \n      \"status\": \"En Proceso\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess\"\n    }\n  }, {\n    \"$unwind\": {\n      \"path\": \"$subProcess.parallelizationIndex\", \n      \"preserveNullAndEmptyArrays\": true\n    }\n  }, {\n    \"$match\": {\n      \"subProcess.activeProcess\": true\n    }\n  }, {\n    \"$set\": {\n      \"subProcess.subProcessName\": {\n        \"$cond\": [\n          {\n            \"$ifNull\": [\n              \"$subProcess.parallelizationIndex\", false\n            ]\n          }, {\n            \"$concat\": [\n              \"$subProcess.subProcessName\", \"_\", \"$subProcess.parallelizationIndex\"\n            ]\n          }, \"$subProcess.subProcessName\"\n        ]\n      }, \n      \"subProcess.subProcessDate\": \"$processDate\", \n      \"subProcess.status\": \"En Espera\"\n    }\n  }, {\n    \"$group\": {\n      \"_id\": \"$processName\", \n      \"processName\": {\n        \"$first\": \"$processName\"\n      }, \n      \"processDate\": {\n        \"$first\": \"$processDate\"\n      }, \n      \"processFrequency\": {\n        \"$first\": \"$processFrequency\"\n      }, \n      \"fromColletion\": {\n        \"$first\": \"$fromColletion\"\n      }, \n      \"toColletion\": {\n        \"$first\": \"$toColletion\"\n      }, \n      \"startDate\": {\n        \"$first\": \"$startDate\"\n      }, \n      \"endDate\": {\n        \"$first\": \"$endDate\"\n      }, \n      \"runtimeInMinutes\": {\n        \"$first\": \"$runtimeInMinutes\"\n      }, \n      \"status\": {\n        \"$first\": \"$status\"\n      }, \n      \"subProcess\": {\n        \"$push\": \"$subProcess\"\n      }\n    }\n  }, {\n    \"$project\": {\n      \"_id\": 0\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ], \n      \"whenMatched\": \"replace\"\n    }\n  }\n]"
        },
        "id": "2f94485e-ffa9-4711-b13e-8f77dfa03daf",
        "name": "createOperation",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          100,
          940
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "jsCode": "var body\nvar outPut = [];\n\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\n\nconst processName = \"E2_Procesamiento_Margen\";  //process name\nconst processDate = body.processDate\nconst offSet = body.offSet;\nconst subStage = \"1\";\n\noutPut.push({ processName: processName, processDate: processDate, offSet: offSet, subStage: subStage});\n\n\nreturn outPut;"
        },
        "id": "a076aaed-26fa-4497-bc38-64dc113e58e9",
        "name": "Definición de parametros11",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          -60,
          1040
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/ff10360b-8549-4fbe-af45-14c3676fc540",
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
        "id": "a53e4b9f-a3ca-493c-af9b-e72923452ec0",
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1020,
          160
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/834af48a-a10c-458f-aeb1-1a273afab54c",
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
        "id": "8b9baefc-4765-407f-81e1-c108b892c163",
        "name": "HTTP Request1",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1020,
          520
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/2b44248e-4918-484b-816a-245952ca6fbf",
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
        "id": "97cfd1c8-3616-40d3-abb1-64aa90e58671",
        "name": "HTTP Request2",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1020,
          940
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=",
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
        "id": "da306092-f446-45b1-aff1-3ebd42c21049",
        "name": "HTTP Request3",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          1020,
          1620
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"PP_2_sidisMargenActivos_Margenmetricactivo\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n\n"
        },
        "id": "411e233a-f0aa-49a2-87f7-1ad7fbbffecf",
        "name": "Code",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1340,
          520
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"PP_3_sidisMargenPasivos_Margenmetricpasivo\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n\n"
        },
        "id": "924a5272-5c93-4e8c-9ae9-32c2589ce4e2",
        "name": "Code2",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1340,
          940
        ]
      },
      {
        "parameters": {
          "jsCode": "var body\nfor (const item of $input.all()) {\n  body=item.json.body;\n}\nvar processName = body.processName;\nvar processDate = body.processDate;\nvar subProcessName = \"PP_4_sidisBeneficiarioIndicador_Margenmetric\"  //enter process name\nvar outPut = [];\n\noutPut.push({processName: processName, processDate: processDate, subProcessName: subProcessName});\n\nreturn outPut;\n"
        },
        "id": "a1c8bd4d-0f64-4c39-9884-46d08dc3f921",
        "name": "Code3",
        "type": "n8n-nodes-base.code",
        "typeVersion": 1,
        "position": [
          1340,
          1620
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "5cb80d35-9f97-41cf-8062-e1c6e649cf60",
        "name": "StartOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1480,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "e64ae426-beb9-47d0-a968-8f673b28356e",
        "name": "UpdatedOperation9",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2120,
          20
        ],
        "alwaysOutputData": true,
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
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_2_PROCESAMIENTO",
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
        "id": "cd42a112-afeb-4f89-ba7b-17d54ccbb6d8",
        "name": "HTTP Request7",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2640,
          100
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/I_1_margenMetricActivoIndicador_Margenmetric",
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
        "id": "9394e8fa-6c74-409a-893a-e774681d9f6e",
        "name": "HTTP Request27",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2640,
          460
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/I_2_margenMetricPaivosIndicador_Margenmetric",
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
        "id": "58681e51-3f65-4f8a-84ba-37932751d9a8",
        "name": "HTTP Request28",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2660,
          880
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/I_3_margenMetricPasivoConv20_Margenmetric",
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
        "id": "68a322a1-a71e-4390-ae64-9e21510bf143",
        "name": "HTTP Request29",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2680,
          1220
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_2_PROCESAMIENTO",
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
        "id": "4f03ebc7-ea67-4732-997b-7d7b0f4ef24a",
        "name": "HTTP Request30",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          2840,
          1540
        ]
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "ff10360b-8549-4fbe-af45-14c3676fc540",
          "options": {}
        },
        "id": "e2fd5a0a-e8d3-49f6-b0f2-8ea2081f697d",
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1200,
          160
        ],
        "webhookId": "ff10360b-8549-4fbe-af45-14c3676fc540"
      },
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "834af48a-a10c-458f-aeb1-1a273afab54c",
          "options": {}
        },
        "id": "816ca88c-3f80-4997-be60-c00d1e92a74a",
        "name": "Webhook1",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1200,
          520
        ],
        "webhookId": "834af48a-a10c-458f-aeb1-1a273afab54c"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "cd4f8888-61f7-4add-97f4-c3504d5e3495",
        "name": "StartOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1480,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "b401d460-28b9-44b7-9f9d-ba75c130b2e9",
        "name": "UpdatedOperation10",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2140,
          380
        ],
        "alwaysOutputData": true,
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
          "path": "2b44248e-4918-484b-816a-245952ca6fbf",
          "options": {}
        },
        "id": "21d92400-3819-4cc3-86fe-8e7c972b7e15",
        "name": "Webhook2",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1200,
          940
        ],
        "webhookId": "2b44248e-4918-484b-816a-245952ca6fbf"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "319f3f7c-f761-4ccd-b29b-32a50efa0514",
        "name": "StartOperation11",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1480,
          840
        ],
        "alwaysOutputData": true,
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
        "id": "c488b156-2f34-431d-8a16-278bc6c09739",
        "name": "UpdatedOperation11",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2120,
          800
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "path": "3e39d7a6-8639-4288-a319-d13380f50a80",
          "options": {}
        },
        "id": "6741c665-11fc-4445-8422-d7b0d3f4a47f",
        "name": "Webhook3",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          1200,
          1620
        ],
        "webhookId": "3e39d7a6-8639-4288-a319-d13380f50a80"
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "f8977b09-8855-4ae4-a6de-fedb0b62ad42",
        "name": "StartOperation12",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          1500,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "0a7580ef-e5d0-4a6a-89f3-d9aa416b4276",
        "name": "UpdatedOperation12",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          2500,
          1460
        ],
        "alwaysOutputData": true,
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
        "id": "5f0532d6-5e34-4ab6-b6b0-9aaf33ea3e01",
        "name": "StartOperation13",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3200,
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
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$input.startDate\"\n                  }, {\n                    \"endDate\": \"$$NOW\"\n                  }, {\n                    \"runtimeInMinutes\": {\n                      \"$round\": [\n                        {\n                          \"$divide\": [\n                            {\n                              \"$subtract\": [\n                                \"$$NOW\", \"$$input.startDate\"\n                              ]\n                            }, 60000\n                          ]\n                        }, 2\n                      ]\n                    }\n                  }, {\n                    \"status\": \"Finalizado\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$set\": {\n      \"status\": {\n        \"$cond\": [\n          {\n            \"$or\": [\n              {\n                \"$in\": [\n                  \"En Proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En proceso\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En espera\", \"$subProcess.status\"\n                ]\n              }, {\n                \"$in\": [\n                  \"En Espera\", \"$subProcess.status\"\n                ]\n              }\n            ]\n          }, \"En Proceso\", \"Finalizado\"\n        ]\n      }, \n      \"endDate\": \"$$NOW\", \n      \"runtimeInMinutes\": {\n        \"$round\": [\n          {\n            \"$divide\": [\n              {\n                \"$subtract\": [\n                  \"$$NOW\", \"$startDate\"\n                ]\n              }, 60000\n            ]\n          }, 2\n        ]\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "775c3d86-ef00-47fa-af72-002d5cee1f44",
        "name": "UpdatedOperation13",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3900,
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
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/verificacion_2_PROCESAMIENTO",
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
        "id": "62b3ed6b-28c1-4698-83f1-24bc467c7915",
        "name": "HTTP Request11",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          4240,
          480
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "sidis_statusProcesos",
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "9f83b4e8-0238-4ba4-9ef2-000d31f8fdaa",
        "name": "StartOperation14",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3180,
          780
        ],
        "alwaysOutputData": true,
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
        "id": "7b1218e2-7e30-4c53-a500-b1bf92be006a",
        "name": "UpdatedOperation14",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3880,
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
          "query": "=[\n  {\n    \"$match\": {\n      \"$and\": [\n        {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processName\", \"{{$json.processName}}\"\n            ]\n          }\n        }, {\n          \"$expr\": {\n            \"$eq\": [\n              \"$processDate\", {\n                \"$toDate\": \"{{$json.processDate}}\"\n              }\n            ]\n          }\n        }\n      ]\n    }\n  }, {\n    \"$set\": {\n      \"subProcess\": {\n        \"$map\": {\n          \"input\": \"$subProcess\", \n          \"as\": \"input\", \n          \"in\": {\n            \"$cond\": [\n              {\n                \"$and\": [\n                  {\n                    \"$eq\": [\n                      \"$$input.subProcessName\", \"{{$json.subProcessName}}\"\n                    ]\n                  }\n                ]\n              }, {\n                \"$mergeObjects\": [\n                  {\n                    \"subProcessName\": \"$$input.subProcessName\"\n                  }, {\n                    \"subProcessDate\": \"$subProcessDate\"\n                  }, {\n                    \"ProcessFrequency\": \"$$input.ProcessFrequency\"\n                  }, {\n                    \"fromCollection\": \"$$input.fromCollection\"\n                  }, {\n                    \"toCollecion\": \"$$input.toCollecion\"\n                  }, {\n                    \"description\": \"$$input.description\"\n                  }, {\n                    \"startDate\": \"$$NOW\"\n                  }, {\n                    \"endDate\": \"$$input.endDate\"\n                  }, {\n                    \"runtimeInMinutes\": \"\"\n                  }, {\n                    \"status\": \"En Proceso\"\n                  }, {\n                    \"subStage\": \"$$input.subStage\"\n                  }, {\n                    \"activeProcess\": \"$$input.activeProcess\"\n                  }, {\n                    \"aggregate\": \"$$input.aggregate\"\n                  }\n                ]\n              }, \"$$input\"\n            ]\n          }\n        }\n      }\n    }\n  }, {\n    \"$merge\": {\n      \"into\": \"sidis_statusProcesos\", \n      \"on\": [\n        \"processName\", \"processDate\"\n      ]\n    }\n  }\n]"
        },
        "id": "4897cd92-6403-4111-9d40-b29e857f4743",
        "name": "StartOperation15",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3180,
          1120
        ],
        "alwaysOutputData": true,
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
        "id": "d51c0943-1a0d-45e6-8568-982e944296c4",
        "name": "UpdatedOperation15",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3920,
          1080
        ],
        "alwaysOutputData": true,
        "credentials": {
          "mongoDb": {
            "id": "2",
            "name": "MongoDB account"
          }
        }
      },
      {
        "parameters": {
          "content": "E2_PROCESAMIENTO_MARGEN\n",
          "height": 1857.2344048636196,
          "width": 3706.1298179325895
        },
        "id": "a07f8fa9-dced-467a-b215-dfdd635278b2",
        "name": "Note4",
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": [
          820,
          -59.06846915543599
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/eee0b013-b5c0-4b03-b2c7-4f3914492922",
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
        "id": "bb5157f6-8782-4b58-b665-4e666ad2ed8d",
        "name": "HTTP Request31",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3540,
          2760
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/deae21a1-51ce-4b6a-a7be-60cd14b941ac",
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
        "id": "710a6193-96b0-49c2-824c-aba40ad9ea27",
        "name": "HTTP Request32",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          3120
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/75963093-7b6e-47e9-b4a6-7bd2b7ce2f4d",
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
        "id": "923761da-289e-4120-96ee-88c4c2f2633a",
        "name": "HTTP Request33",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          2040
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/9449fe1b-01c5-409b-9828-bbcb053faa0e",
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
        "id": "d5bb2a4b-9ea3-4cc1-8f06-d12b21d19ca2",
        "name": "HTTP Request34",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3540,
          2420
        ]
      },
      {
        "parameters": {
          "method": "POST",
          "url": "=http://workflowsidis.banvenez.corp:30991/webhook/0699bc02-8f1f-49d9-a116-205e00200472",
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
        "id": "df80215c-51d3-4e2e-8cc1-b00f15bfc10e",
        "name": "HTTP Request35",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          3560,
          3520
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "d4ae35f3-7ee4-44bc-b29b-4fda38381449",
        "name": "check_subStageStatus1",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3200,
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "714f4410-27f8-4945-9b53-e5975c0bca0a",
        "name": "IF1",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3360,
          3540
        ]
      },
      {
        "parameters": {
          "operation": "aggregate",
          "collection": "=sidis_statusProcesos",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "6bcac0f4-368d-43fb-85c2-c447c7adebf4",
        "name": "check_subStageStatus2",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3200,
          3140
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "46e9c38a-bdb9-4d18-a30c-4d30f8ee2b4b",
        "name": "check_subStageStatus3",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3200,
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
          "collection": "=sidis_statusProcesos",
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "93a43e62-de6e-4eb2-8851-845fc2495494",
        "name": "check_subStageStatus4",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3200,
          2440
        ],
        "alwaysOutputData": true,
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
          "query": "=[\n    {\n      \"$match\": {\n        \"$and\": [\n          {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processName\", \"{{$json.processName}}\"\n              ]\n            }\n          }, {\n            \"$expr\": {\n              \"$eq\": [\n                \"$processDate\", {\n                  \"$toDate\": \"{{$json.processDate}}\"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }, {\n      \"$unwind\": {\n        \"path\": \"$subProcess\"\n      }\n    }, {\n      \"$project\": {\n        \"subStage\": \"$subProcess.subStage\", \n        \"status\": \"$subProcess.status\"\n      }\n    }, {\n      \"$match\": {\n        \"subStage\": \"{{$json.subStage}}\"\n      }\n    }, {\n      \"$group\": {\n        \"_id\": \"$subStage\", \n        \"status\": {\n          \"$addToSet\": \"$status\"\n        }\n      }\n    }, {\n      \"$set\": {\n        \"subStageStatus\": {\n          \"$cond\": [\n            {\n              \"$or\": [\n                {\n                  \"$in\": [\n                    \"En Proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En proceso\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En espera\", \"$status\"\n                  ]\n                }, {\n                  \"$in\": [\n                    \"En Espera\", \"$status\"\n                  ]\n                }\n              ]\n            }, \"En Proceso\", \"Finalizado\"\n          ]\n        }\n      }\n    }, {\n      \"$addFields\": {\n        \"_id\": \"$$REMOVE\", \n        \"status\": \"$$REMOVE\", \n        \"processName\": \"{{$json.processName}}\",\n        \"processDate\": \"{{$json.processDate}}\",\n        \"offSet\": \"{{$json.offSet}}\"\n      }\n    }\n  ]"
        },
        "id": "60e8866a-e461-46c2-92a5-a325aa9195ef",
        "name": "check_subStageStatus5",
        "type": "n8n-nodes-base.mongoDb",
        "typeVersion": 1,
        "position": [
          3220,
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
          "conditions": {
            "boolean": [
              {
                "value1": "={{$json.subStageStatus=='Finalizado'}}",
                "value2": "={{true}}"
              }
            ]
          }
        },
        "id": "51db1c43-c220-429e-8ebe-70cbf00e269d",
        "name": "IF2",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3360,
          3140
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
        "id": "8f5e0f75-a94c-4351-8e41-cc50a7b6c0f9",
        "name": "IF3",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3360,
          2780
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
        "id": "09ec01c1-cc4e-478b-ad81-9a8ba27d350c",
        "name": "IF4",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3360,
          2440
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
        "id": "5bb60fcf-a048-4d5a-982d-b88850d9e5ec",
        "name": "IF5",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          3380,
          2060
        ]
      }
    ],
    "connections": {
      "Webhook4": {
        "main": [
          [
            {
              "node": "HTTP Request22",
              "type": "main",
              "index": 0
            },
            {
              "node": "Definición de parametros11",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "PP_1_clienteIntegracion_Margenmetric": {
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
      "Merge": {
        "main": [
          [
            {
              "node": "Wait16",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait17",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait18",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait19",
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
              "node": "PP_1_clienteIntegracion_Margenmetric",
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
      "Code1": {
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
              "node": "HTTP Request7",
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
              "node": "PP_2_sidisMargenActivos_Margenmetricactivo",
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
              "node": "Merge6",
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
              "node": "Wait20",
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
              "node": "PP_3_sidisMargenPasivos_Margenmetricpasivo",
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
      "Merge8": {
        "main": [
          [
            {
              "node": "Merge9",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation11",
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
      "PP_3_sidisMargenPasivos_Margenmetricpasivo": {
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
      "PP_2_sidisMargenActivos_Margenmetricactivo": {
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
      "Merge10": {
        "main": [
          [
            {
              "node": "PP_4.1_sidisBeneficiarioIndicador_sidisBeneficiario",
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
      "Merge11": {
        "main": [
          [
            {
              "node": "Merge12",
              "type": "main",
              "index": 1
            },
            {
              "node": "UpdatedOperation12",
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
              "node": "HTTP Request30",
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
              "node": "Code5",
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
              "node": "I_1_margenMetricActivoIndicador_Margenmetric",
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
      "Code5": {
        "main": [
          [
            {
              "node": "Merge13",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation13",
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
              "node": "UpdatedOperation13",
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
              "node": "HTTP Request11",
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
              "node": "Code6",
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
              "node": "I_2_margenMetricPaivosIndicador_Margenmetric",
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
      "Code6": {
        "main": [
          [
            {
              "node": "Merge16",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation14",
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
              "node": "UpdatedOperation14",
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
              "node": "HTTP Request9",
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
              "node": "Code7",
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
              "node": "I_3_margenMetricPasivoConv20_Margenmetric",
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
      "Code7": {
        "main": [
          [
            {
              "node": "Merge19",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation15",
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
              "node": "UpdatedOperation15",
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
              "node": "HTTP Request10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "I_1_margenMetricActivoIndicador_Margenmetric": {
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
      "I_2_margenMetricPaivosIndicador_Margenmetric": {
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
      "I_3_margenMetricPasivoConv20_Margenmetric": {
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
              "node": "PP_4.2_sidisBeneficiarioIndicador_Margenmetric",
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
      "PP_4.1_sidisBeneficiarioIndicador_sidisBeneficiario": {
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
      "PP_4.2_sidisBeneficiarioIndicador_Margenmetric": {
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
              "node": "Operation_subStage=1",
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
      "Merge33": {
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
      "Merge34": {
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
      "Webhook8": {
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
      "Webhook9": {
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
      "Bring operations subStage=1": {
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
      "Operation_subStage=1": {
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
      "addlastDigRifs": {
        "main": [
          [
            {
              "node": "StartOperation",
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
      "HTTP Request16": {
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
              "node": "HTTP Request16",
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
              "node": "Operation_subStage=2",
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
      "Merge36": {
        "main": [
          [
            {
              "node": "UpdatedOperation",
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
      "Merge37": {
        "main": [
          [
            {
              "node": "check_subStageStatus",
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
              "node": "Merge35",
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
              "node": "Merge37",
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
              "node": "SplitInBatches",
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
              "node": "Merge36",
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
              "node": "Definición de parametros",
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
              "node": "addlastDigRifs",
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
              "node": "StartOperation1",
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
      "HTTP Request18": {
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
              "node": "SplitInBatches1",
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
              "node": "HTTP Request18",
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
              "node": "Operation_subStage=",
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
      "Merge39": {
        "main": [
          [
            {
              "node": "UpdatedOperation1",
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
              "node": "HTTP Request19",
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
              "node": "Merge38",
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
              "node": "Merge40",
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
              "node": "SplitInBatches1",
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
              "node": "Merge39",
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
              "node": "Definición de parametros1",
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
              "node": "addlastDigRifs1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "check_subStageStatus": {
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
              "node": "HTTP Request17",
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
              "node": "StartOperation3",
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
      "HTTP Request20": {
        "main": [
          [
            {
              "node": "Wait10",
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
              "node": "HTTP Request20",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Merge41": {
        "main": [
          [
            {
              "node": "Operation_subStage=3",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge42",
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
              "node": "UpdatedOperation3",
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
      "Merge43": {
        "main": [
          [
            {
              "node": "check_subStageStatus5",
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
              "node": "Merge41",
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
      "Definición de parametros4": {
        "main": [
          [
            {
              "node": "Bring operations subStage=3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=3": {
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
      "Operation_subStage=3": {
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
      "HTTP Request22": {
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
      "addlastDigRifs5": {
        "main": [
          [
            {
              "node": "StartOperation4",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge45",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "HTTP Request21": {
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
              "node": "SplitInBatches6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches6": {
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
      "Merge45": {
        "main": [
          [
            {
              "node": "Operation_subStage=4",
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
      "Merge46": {
        "main": [
          [
            {
              "node": "UpdatedOperation4",
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
              "node": "check_subStageStatus4",
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
              "node": "Merge45",
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
              "node": "Merge47",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros5": {
        "main": [
          [
            {
              "node": "Bring operations subStage=4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=4": {
        "main": [
          [
            {
              "node": "SplitInBatches6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=4": {
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
      "addlastDigRifs6": {
        "main": [
          [
            {
              "node": "StartOperation5",
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
      "HTTP Request23": {
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
              "node": "SplitInBatches7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches7": {
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
      "Merge48": {
        "main": [
          [
            {
              "node": "Operation_subStage=5",
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
              "node": "UpdatedOperation5",
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
              "node": "check_subStageStatus3",
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
              "node": "Merge48",
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
              "node": "Merge50",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros6": {
        "main": [
          [
            {
              "node": "Bring operations subStage=5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=5": {
        "main": [
          [
            {
              "node": "SplitInBatches7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=5": {
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
      "addlastDigRifs7": {
        "main": [
          [
            {
              "node": "StartOperation6",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge51",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "HTTP Request24": {
        "main": [
          [
            {
              "node": "Wait13",
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
              "node": "SplitInBatches8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches8": {
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
      "Merge51": {
        "main": [
          [
            {
              "node": "Operation_subStage=6",
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
      "Merge52": {
        "main": [
          [
            {
              "node": "UpdatedOperation6",
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
              "node": "check_subStageStatus2",
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
              "node": "Merge51",
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
              "node": "Merge53",
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
              "node": "Bring operations subStage=6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=6": {
        "main": [
          [
            {
              "node": "SplitInBatches8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=6": {
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
      "addlastDigRifs8": {
        "main": [
          [
            {
              "node": "StartOperation7",
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
      "HTTP Request25": {
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
              "node": "SplitInBatches9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches9": {
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
      "Merge54": {
        "main": [
          [
            {
              "node": "Operation_subStage=7",
              "type": "main",
              "index": 0
            },
            {
              "node": "Merge55",
              "type": "main",
              "index": 1
            }
          ]
        ]
      },
      "Merge55": {
        "main": [
          [
            {
              "node": "UpdatedOperation7",
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
      "Merge56": {
        "main": [
          [
            {
              "node": "check_subStageStatus1",
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
              "node": "Merge54",
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
              "node": "Merge56",
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
              "node": "Bring operations subStage=7",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=7": {
        "main": [
          [
            {
              "node": "SplitInBatches9",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=7": {
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
      "addlastDigRifs9": {
        "main": [
          [
            {
              "node": "StartOperation8",
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
      "HTTP Request26": {
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
              "node": "SplitInBatches10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "SplitInBatches10": {
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
      "Merge57": {
        "main": [
          [
            {
              "node": "Operation_subStage=8",
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
              "node": "UpdatedOperation8",
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
      "StartOperation8": {
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
      "UpdatedOperation8": {
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
      "Definición de parametros9": {
        "main": [
          [
            {
              "node": "Bring operations subStage=8",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Bring operations subStage=8": {
        "main": [
          [
            {
              "node": "SplitInBatches10",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Operation_subStage=8": {
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
      "Wait16": {
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
      "Wait17": {
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
      "Wait18": {
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
      "Wait19": {
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
      "Wait20": {
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
      "Wait21": {
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
      "Wait22": {
        "main": [
          [
            {
              "node": "HTTP Request29",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "createOperation2": {
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
      "Definición de parametros10": {
        "main": [
          [
            {
              "node": "createOperation2",
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
              "node": "Wait23",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait24",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait25",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait26",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait27",
              "type": "main",
              "index": 0
            },
            {
              "node": "Wait28",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait23": {
        "main": [
          [
            {
              "node": "Definición de parametros4",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait24": {
        "main": [
          [
            {
              "node": "Definición de parametros5",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait25": {
        "main": [
          [
            {
              "node": "Definición de parametros6",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Wait26": {
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
      "Wait27": {
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
      "Wait28": {
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
      "Webhook14": {
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
      "Webhook15": {
        "main": [
          [
            {
              "node": "addlastDigRifs5",
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
              "node": "addlastDigRifs6",
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
              "node": "addlastDigRifs7",
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
              "node": "addlastDigRifs8",
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
              "node": "addlastDigRifs9",
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
              "node": "Merge",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Definición de parametros11": {
        "main": [
          [
            {
              "node": "Merge",
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
      "Code": {
        "main": [
          [
            {
              "node": "Merge4",
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
      "Code2": {
        "main": [
          [
            {
              "node": "StartOperation11",
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
      "Code3": {
        "main": [
          [
            {
              "node": "Merge10",
              "type": "main",
              "index": 1
            },
            {
              "node": "StartOperation12",
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
      "Webhook": {
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
      "Webhook1": {
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
      "StartOperation10": {
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
      "UpdatedOperation10": {
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
      "Webhook2": {
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
      "StartOperation11": {
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
      "UpdatedOperation11": {
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
      "Webhook3": {
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
      "StartOperation12": {
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
      "UpdatedOperation12": {
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
      "StartOperation13": {
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
      "UpdatedOperation13": {
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
      "StartOperation14": {
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
      "UpdatedOperation14": {
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
      "StartOperation15": {
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
      "UpdatedOperation15": {
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
      "check_subStageStatus1": {
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
      "IF1": {
        "main": [
          [
            {
              "node": "HTTP Request35",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "check_subStageStatus2": {
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
      "check_subStageStatus3": {
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
      "check_subStageStatus4": {
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
      "check_subStageStatus5": {
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
      "IF2": {
        "main": [
          [
            {
              "node": "HTTP Request32",
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
              "node": "HTTP Request31",
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
              "node": "HTTP Request34",
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
              "node": "HTTP Request33",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }