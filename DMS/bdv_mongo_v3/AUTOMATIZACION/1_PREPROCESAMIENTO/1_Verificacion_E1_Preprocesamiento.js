[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $and: [
          {
            $expr: {
              $eq: [
                "$proceso",
                "E1_Preprocesamiento",
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
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
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
              "$proceso", "E1_Preprocesamiento"
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