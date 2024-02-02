[
  {
    $match: {
      $and: [
        {
          $expr: {
            $eq: [
              "$proceso",
              "1_Planificacion_E2_Procesamiento",
            ],
          },
        },
        {
          $expr: {
            $eq: [
              "$fechaProceso",
              {
                $toDate: "2023-06-30",
                //"$toDate": "{{$json.fechaProceso}}"
              },
            ],
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      status: 1,
    },
  },
]

//N8N

[
  {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$eq": [
              "$proceso", "1_Planificacion_E2_Procesamiento"
            ]
          }
        }, {
          "$expr": {
            "$eq": [
              "$fechaProceso", {
                "$toDate": "{{$json.fechaProceso}}"
              }
            ]
          }
        }
      ]
    }
  }, {
    "$project": {
      "_id": 0, 
      "status": 1
    }
  }
]