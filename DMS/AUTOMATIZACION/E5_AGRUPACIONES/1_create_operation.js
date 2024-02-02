[
    {
      "$limit": 1
    }, {
      "$addFields": {
        "_id": "$$REMOVE", 
        "lastUpdatedAt": "$$REMOVE", 
        "proceso": "$$REMOVE", 
        "currentUpdatedDate": "$$REMOVE"
      }
    }, {
      "$lookup": {
        "from": "Margenmetric", 
        "let": {
          "rifCedula": "$rifCedula"
        }, 
        "pipeline": [
          {
            "$match": {
              "$or": [
                {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00266443"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J30468971"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00343994"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00041312"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J50019975"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00020200"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00006372"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J00324454"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J41302282"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "J30240664"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V12229669"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V12045759"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V10339024"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V10201389"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V19030100"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V24798174"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V17932801"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V13811301"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V18380504"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V16273096"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V10897401"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V16721253"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V17219608"
                    ]
                  }
                }, {
                  "$expr": {
                    "$eq": [
                      "$rifCedula", "V21355144"
                    ]
                  }
                }
              ]
            }
          }, {
            "$project": {
              "fechaProceso": 1, 
              "_id": 0
            }
          }
        ], 
        "as": "Margenmetric"
      }
    }, {
      "$addFields": {
        "processName": "$$REMOVE", 
        "processDate": "$$REMOVE", 
        "Margenmetric": "$$REMOVE", 
        "fechaProceso": {
          "$setUnion": "$Margenmetric.fechaProceso"
        }
      }
    }, {
      "$project": {
        "_id": 0, 
        "processName": "E5_Agrupaciones", 
        "processDate": {
          "$toDate": "{{$json.fechaProceso}}"
        }, 
        "description": "Agrupación por banca, grupo económico, segmento, nivel socio económico y cálculo de indicadores", 
        "processFrequency": "Mensual", 
        "fromColletion": "Margenmetric", 
        "toColletion": "Margenmetricbanca, Margenmetricgrupo, Margenmetricsegmento, Margenmetricnse", 
        "startDate": "$$NOW", 
        "endDate": "nda", 
        "runtimeInMinutes": "nda", 
        "status": "En Proceso", 
        "subProcessDate": "$fechaProceso", 
        "groupName": [
          "banca", "grupo", "segmento", "nse"
        ]
      }
    }, {
      "$unwind": {
        "path": "$subProcessDate"
      }
    }, {
      "$unwind": {
        "path": "$groupName"
      }
    }, {
      "$addFields": {
        "subProcessDate": "$$REMOVE", 
        "groupName": "$$REMOVE", 
        "subProcess": {
          "processName": {
            "$concat": [
              "Agrupacion_", "$groupName", "_", {
                "$substr": [
                  {
                    "$toString": "$subProcessDate"
                  }, 0, 10
                ]
              }
            ]
          }, 
          "processDate": "$subProcessDate", 
          "description": {
            "$concat": [
              "$description", " agrupacion ", "$groupName", " ", {
                "$toString": "$subProcessDate"
              }
            ]
          }, 
          "processFrequency": "Mensual", 
          "fromColletion": "Margenmetric", 
          "toColletion": {
            "$concat": [
              "Margenmetric", "$groupName"
            ]
          }, 
          "startDate": "nda", 
          "endDate": "nda", 
          "runtimeInMinutes": "nda", 
          "status": "En espera", 
          "subProcessDate": "nda", 
          "groupName": "$groupName"
        }
      }
    }, {
      "$group": {
        "_id": {
          "processName": "$processName", 
          "processDate": "$processDate"
        }, 
        "processName": {
          "$first": "$processName"
        }, 
        "processDate": {
          "$first": "$processDate"
        }, 
        "description": {
          "$first": "$description"
        }, 
        "processFrequency": {
          "$first": "$processFrequency"
        }, 
        "fromColletion": {
          "$first": "$fromColletion"
        }, 
        "toColletion": {
          "$first": "$toColletion"
        }, 
        "startDate": {
          "$first": "$startDate"
        }, 
        "endDate": {
          "$first": "$endDate"
        }, 
        "runtimeInMinutes": {
          "$first": "$runtimeInMinutes"
        }, 
        "status": {
          "$first": "$status"
        }, 
        "subProcess": {
          "$push": "$subProcess"
        }
      }
    }, {
      "$project": {
        "_id": 0
      }
    }, {
      "$merge": {
        "into": "sidis_statusProcesos", 
        "on": [
          "processName", "processDate"
        ]
      }
    }
  ]