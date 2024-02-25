[
  {
    $addFields: {
      fecha: {
        $toDate: "$fecha",
      },
    },
  },
  {
    $merge: {
      into: "Sidis_Castigos",
      on: "fecha",
    },
  },
]

//N8N

[
  {
    "$addFields": {
      "fecha": {
        "$toDate": "$fecha"
      }
    }
  }, {
    "$merge": {
      "into": "Sidis_Castigos", 
      "on": "fecha"
    }
  }
]