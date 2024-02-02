[
  {
    "$limit": 1
  }, {
    "$lookup": {
      "from": "sidis_statusProcesos", 
      "let": {
        "processName": "E5_Agrupaciones", 
        "processDate": {
          "$toDate": "{{$json.fechaProceso}}"
        }
      }, 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$eq": [
                    "$processName", "$$processName"
                  ]
                }
              }, {
                "$expr": {
                  "$eq": [
                    "$processDate", "$$processDate"
                  ]
                }
              }
            ]
          }
        }, {
          "$project": {
            "processDate": 1, 
            "subProcessDate": "$subProcess.processDate"
          }
        }
      ], 
      "as": "sidis_statusProcesos"
    }
  }, {
    "$project": {
      "_id": 0, 
      "processDate": {
        "$first": "$sidis_statusProcesos.processDate"
      }, 
      "subProcessDate": {
        "$setUnion": {
          "$first": "$sidis_statusProcesos.subProcessDate"
        }
      }
    }
  }, {
    "$unwind": {
      "path": "$subProcessDate"
    }
  }, {
    "$addFields": {
      "processDate": {
        "$substr": [
          {
            "$toDate": "$processDate"
          }, 0, 10
        ]
      }, 
      "subProcessDate": {
        "$substr": [
          {
            "$toDate": "$subProcessDate"
          }, 0, 10
        ]
      }
    }
  }
]