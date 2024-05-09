[
  {
    "$addFields": {
      "fecha": {
        "$toDate": "$fecha"
      }, 
      "_id": "$$REMOVE"
    }
  }, {
    "$merge": {
      "into": "sidis_castigos", 
      "on": "fecha"
    }
  }
]