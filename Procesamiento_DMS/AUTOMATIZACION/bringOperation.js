[
  {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$eq": [
              "$processName", "{{$json.processName}}"
            ]
          }
        }, {
          "$expr": {
            "$eq": [
              "$processDate", {
                "$toDate": "{{$json.processDate}}"
              }
            ]
          }
        }
      ]
    }
  }, {
    "$unwind": {
      "path": "$subProcess"
    }
  }, {
    "$replaceRoot": {
      "newRoot": "$subProcess"
    }
  }, {
    "$match": {
      "$expr": {
        "$eq": [
          "$subStage", "{{$json.subStage}}"
        ]
      }
    }
  }, {
    "$project": {
      "processName": "{{$json.processName}}",
      "processDate": {
        "$toString": "{{$json.processDate}}"
      }, 
      "offSet": "{{$json.offSet}}",
      "subProcessName": "$subProcessName", 
      "subProcessDate": {
        "$substr": [
          {
            "$toString": "$subProcessDate"
          }, 0, 10
        ]
      }, 
      "fromCollection": 1, 
      "toCollection": 1, 
      "status": 1, 
      "aggregate": 1, 
      "parallelizationIndex": 1, 
      "subStage": 1, 
      "activeProcess": 1, 
      "numeroAleatorio": {
        "$toInt": "{{$json.numeroAleatorio}}"
      }
    }
  }
]