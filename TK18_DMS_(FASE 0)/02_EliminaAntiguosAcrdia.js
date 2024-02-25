[
  {
    $match: {
      $expr: {
        $gte: [
          "$file_date",
          {
            $subtract: [
              {
                $toDate: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        format:
                          "%Y-%m-%dT00:00:00%z",
                        date: {
                          $toDate: "$$NOW",
                        },
                      },
                    },
                  },
                },
              },
              {
                $multiply: [
                  {
                    // "$toInt": "{{$json.offSet}}"
                    $toInt: "90",
                  },
                  86400000,
                ],
              },
            ],
          },
        ],
      },
    },
  },
  {
    $out: "acr_dia_sidis",
  },
]

//

[
  {
    "$match": {
      "$expr": {
        "$gte": [
          "$file_date", {
            "$subtract": [
              {
                "$toDate": {
                  "$dateFromString": {
                    "dateString": {
                      "$dateToString": {
                        "format": "%Y-%m-%dT00:00:00%z", 
                        "date": {
                          "$toDate": "$$NOW"
                        }
                      }
                    }
                  }
                }
              }, {
                "$multiply": [
                  {
                    "$toInt": "90"
                  }, 86400000
                ]
              }
            ]
          }
        ]
      }
    }
  }, {
    "$out": "acr_dia_sidis"
  }
]