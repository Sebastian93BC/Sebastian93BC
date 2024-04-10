[
    {
      "$match": {
        "processName": "{{$json.processName}}"
      }
    }, {
      "$set": {
        "processDate": {
          "$toDate": "{{$json.processDate}}"
        }, 
        "startDate": "$$NOW", 
        "status": "En Proceso"
      }
    }, {
      "$unwind": {
        "path": "$subProcess"
      }
    }, {
      "$unwind": {
        "path": "$subProcess.parallelizationIndex", 
        "preserveNullAndEmptyArrays": true
      }
    }, {
      "$match": {
        "subProcess.activeProcess": true
      }
    }, {
      "$set": {
        "subProcess.subProcessName": {
          "$cond": [
            {
              "$ifNull": [
                "$subProcess.parallelizationIndex", false
              ]
            }, {
              "$concat": [
                "$subProcess.subProcessName", "_", "$subProcess.parallelizationIndex"
              ]
            }, "$subProcess.subProcessName"
          ]
        }, 
        "subProcess.subProcessDate": "$processDate", 
        "subProcess.status": "En Espera"
      }
    }, {
      "$group": {
        "_id": "$processName", 
        "processName": {
          "$first": "$processName"
        }, 
        "processDate": {
          "$first": "$processDate"
        }, 
        "processFrequency": {
          "$first": "$processFrequency"
        }, 
        "fromCollection": {
          "$first": "$fromCollection"
        }, 
        "toCollection": {
          "$first": "$toCollection"
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
        ], 
        "whenMatched": "replace"
      }
    }
  ]