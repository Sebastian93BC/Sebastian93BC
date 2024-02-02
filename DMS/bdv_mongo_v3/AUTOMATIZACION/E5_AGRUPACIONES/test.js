[
  {
    $addFields: {
      periodoActual: {
        $year: {
          $toDate: "2023-06-30",
          //"$toDate": "{{$json.offSet}}"
        },
      },

      mesAnterior: {
        $subtract: [
          {
            $month: {
              $toDate: "2023-06-30",
              //"$toDate": "{{$json.offSet}}"
            },
          },
          1,
        ],
      },
    },
  },
  {
    $addFields: {
      dateStringDic: {
        $concat: [
          "31-12-",
          {
            $toString: {
              $subtract: ["$periodoActual", 1],
            },
          },
        ],
      },
    },
  },
  {
    $addFields: {
      fechaProcesoDic: {
        $dateFromString: {
          dateString: "$dateStringDic",
          format: "%d-%m-%Y",
        },
      },
    },
  },
  {
    $lookup: {
      from: "Margenmetricbanca",
      localField: "banca",
      foreignField: "banca",
      as: "result",
    },
  },
  {
    $addFields: {
      periodoDic: {
        $filter: {
          input: "$result",
          as: "list",
          cond: {
            $eq: [
              "$$list.fechaProceso",
              "$fechaProcesoDic",
            ],
          }, //<-- filter sub-array based on condition
        },
      },
    },
  },
  {
    $unwind: {
      path: "$periodoDic",
    },
  },
  {
    $project: {
      result: 0,
      dateStringDic: 0,
      fechaProcesoDic: 0,
    },
  },
  {
    $match: {
      $expr: {
        $and: [
          {
            $eq: [
              "$periodoActual",
              {
                $year: "$fechaProceso",
              },
            ],
          },
          {
            $eq: [
              "$mesAnterior",
              {
                $month: "$fechaProceso",
              },
            ],
          },
        ],
      },
    },
  },
  {
    $addFields: {
      crecimientoAnualSaldoActivo13m: {
        $cond: [
          {
            $or: [
              {
                $eq: [
                  "$periodoDic.saldoActivo",
                  0,
                ],
              },
              {
                $lte: [
                  "$periodoDic.saldoActivo",
                  null,
                ],
              },
            ],
          },
          0,
          {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          "$saldoActivo",
                          "$periodoDic.saldoActivo",
                        ],
                      },
                      "$periodoDic.saldoActivo",
                    ],
                  },
                  100,
                ],
              },
              4,
            ],
          },
        ],
      },
      crecimientoAnualAbonoLiqActivo13m: {
        $cond: [
          {
            $or: [
              {
                $eq: [
                  "$periodoDic.abonoLiqActivo",
                  0,
                ],
              },
              {
                $lte: [
                  "$periodoDic.abonoLiqActivo",
                  null,
                ],
              },
            ],
          },
          0,
          {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          "$abonoLiqActivo",
                          "$periodoDic.abonoLiqActivo",
                        ],
                      },
                      "$periodoDic.abonoLiqActivo",
                    ],
                  },
                  100,
                ],
              },
              4,
            ],
          },
        ],
      },
      crecimientoAnualMontoAbonado13m: {
        $cond: [
          {
            $or: [
              {
                $eq: [
                  "$periodoDic.montoAbonado",
                  0,
                ],
              },
              {
                $lte: [
                  "$periodoDic.montoAbonado",
                  null,
                ],
              },
            ],
          },
          0,
          {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          "$montoAbonado",
                          "$periodoDic.montoAbonado",
                        ],
                      },
                      "$periodoDic.montoAbonado",
                    ],
                  },
                  100,
                ],
              },
              4,
            ],
          },
        ],
      },
      crecimientoAnualSaldoPasivo13m: {
        $cond: [
          {
            $or: [
              {
                $eq: [
                  "$periodoDic.saldoPasivo",
                  0,
                ],
              },
              {
                $lte: [
                  "$periodoDic.saldoPasivo",
                  null,
                ],
              },
            ],
          },
          0,
          {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      {
                        $subtract: [
                          "$saldoPasivo",
                          "$periodoDic.saldoPasivo",
                        ],
                      },
                      "$periodoDic.saldoPasivo",
                    ],
                  },
                  100,
                ],
              },
              4,
            ],
          },
        ],
      },
      periodoActual: "$$REMOVE",
      mesAnterior: "$$REMOVE",
      periodoDic: "$$REMOVE",
    },
  },
  {
    $merge: {
      into: "Margenmetricbanca",
      on: ["banca", "fechaProceso"],
    },
  },
]