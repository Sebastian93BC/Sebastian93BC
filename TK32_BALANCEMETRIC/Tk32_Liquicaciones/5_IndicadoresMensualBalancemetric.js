[
  {
    $addFields: {
      today: {
        $subtract: [
          {
            $toDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT00:00:00%z",
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
                $toInt: "464",
                //"{{$json.offSet}}"
              },
              86400000,
            ],
          },
        ],
      },
    },
  },
  {
    $addFields: {
      firstDayMonth: {
        $dateFromParts: {
          year: {
            $year: "$today",
          },
          month: {
            $month: "$today",
          },
        },
      },
    },
  },
  {
    $match: {
      $and: [
        {
          $expr: {
            $gte: [
              "$fecha_valor",
              "$firstDayMonth",
            ],
          },
        },
        {
          $expr: {
            $lte: ["$fecha_valor", "$today"],
          },
        },
      ],
    },
  },
  {
    $lookup: {
      from: "Balancemetric",
      localField: "fecha_valor",
      foreignField: "fecha_valor",
      as: "result",
    },
  },
  {
    $addFields: {
      liquidaciones: {
        $first: "$result.liquidaciones",
      },
      liquidacionesBs: {
        $first: "$result.liquidacionesBs",
      },
      //result: "$$REMOVE",
      firstDayMonth: "$$REMOVE",
    },
  },
  {
    $sort: {
      fecha_valor: -1,
    },
  },
  {
    $group: {
      _id: "$today",
      fecha_valor: {
        $first: "$today",
      },
      liquidaciones: {
        $first: "$liquidaciones",
      },
      liquidacionesBs: {
        $first: "$liquidacionesBs",
      },
      montoLiqProdVigente: {
        $sum: "$montoLiqProdVigente",
      },
      numLiqProdVigente: {
        $sum: "$numLiqProdVigente",
      },
      montoLiqProdVigente45d: {
        $sum: "$montoLiqProdVigente45d",
      },
      montoLiqProdVigente6m: {
        $sum: "$montoLiqProdVigente6m",
      },
      montoLiqProdVigente9m: {
        $sum: "$montoLiqProdVigente9m",
      },
      montoLiqProdVigente1a: {
        $sum: "$montoLiqProdVigente1a",
      },
      montoLiqProdVigenteMas1a: {
        $sum: "$montoLiqProdVigenteMas1a",
      },
      comercialmontoLiqProdVigente: {
        $sum: "$comercialmontoLiqProdVigente",
      },
      comercialnumLiqProdVigente: {
        $sum: "$comercialnumLiqProdVigente",
      },
      comercialmontoLiqProdVigente45d: {
        $sum: "$comercialmontoLiqProdVigente45d",
      },
      comercialmontoLiqProdVigente6m: {
        $sum: "$comercialmontoLiqProdVigente6m",
      },
      comercialmontoLiqProdVigente9m: {
        $sum: "$comercialmontoLiqProdVigente9m",
      },
      comercialmontoLiqProdVigente1a: {
        $sum: "$comercialmontoLiqProdVigente1a",
      },
      comercialmontoLiqProdVigenteMas1a: {
        $sum: "$comercialmontoLiqProdVigenteMas1a",
      },
      productivomontoLiqProdVigente: {
        $sum: "$productivomontoLiqProdVigente",
      },
      productivonumLiqProdVigente: {
        $sum: "$productivonumLiqProdVigente",
      },
      productivomontoLiqProdVigente45d: {
        $sum: "$productivomontoLiqProdVigente45d",
      },
      productivomontoLiqProdVigente6m: {
        $sum: "$productivomontoLiqProdVigente6m",
      },
      productivomontoLiqProdVigente9m: {
        $sum: "$productivomontoLiqProdVigente9m",
      },
      productivomontoLiqProdVigente1a: {
        $sum: "$productivomontoLiqProdVigente1a",
      },
      productivomontoLiqProdVigenteMas1a: {
        $sum: "$productivomontoLiqProdVigenteMas1a",
      },
      hipotecariomontoLiqProdVigente: {
        $sum: "$hipotecariomontoLiqProdVigente",
      },
      hipotecarionumLiqProdVigente: {
        $sum: "$hipotecarionumLiqProdVigente",
      },
      hipotecariomontoLiqProdVigente45d: {
        $sum: "$hipotecariomontoLiqProdVigente45d",
      },
      hipotecariomontoLiqProdVigente6m: {
        $sum: "$hipotecariomontoLiqProdVigente6m",
      },
      hipotecariomontoLiqProdVigente9m: {
        $sum: "$hipotecariomontoLiqProdVigente9m",
      },
      hipotecariomontoLiqProdVigente1a: {
        $sum: "$hipotecariomontoLiqProdVigente1a",
      },
      hipotecariomontoLiqProdVigenteMas1a: {
        $sum: "$hipotecariomontoLiqProdVigenteMas1a",
      },
      emprendeBdvmontoLiqProdVigente: {
        $sum: "$emprendeBdvmontoLiqProdVigente",
      },
      emprendeBdvnumLiqProdVigente: {
        $sum: "$emprendeBdvnumLiqProdVigente",
      },
      emprendeBdvmontoLiqProdVigente45d: {
        $sum: "$emprendeBdvmontoLiqProdVigente45d",
      },
      emprendeBdvmontoLiqProdVigente6m: {
        $sum: "$emprendeBdvmontoLiqProdVigente6m",
      },
      emprendeBdvmontoLiqProdVigente9m: {
        $sum: "$emprendeBdvmontoLiqProdVigente9m",
      },
      emprendeBdvmontoLiqProdVigente1a: {
        $sum: "$emprendeBdvmontoLiqProdVigente1a",
      },
      emprendeBdvmontoLiqProdVigenteMas1a: {
        $sum: "$emprendeBdvmontoLiqProdVigenteMas1a",
      },
      microCredmontoLiqProdVigente: {
        $sum: "$microCredmontoLiqProdVigente",
      },
      microCrednumLiqProdVigente: {
        $sum: "$microCrednumLiqProdVigente",
      },
      microCredmontoLiqProdVigente45d: {
        $sum: "$microCredmontoLiqProdVigente45d",
      },
      microCredmontoLiqProdVigente6m: {
        $sum: "$microCredmontoLiqProdVigente6m",
      },
      microCredmontoLiqProdVigente9m: {
        $sum: "$microCredmontoLiqProdVigente9m",
      },
      microCredmontoLiqProdVigente1a: {
        $sum: "$microCredmontoLiqProdVigente1a",
      },
      microCredmontoLiqProdVigenteMas1a: {
        $sum: "$microCredmontoLiqProdVigenteMas1a",
      },
    },
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      montoLiqProdVigente: "$$REMOVE",
      numLiqProdVigente: "$$REMOVE",
      montoLiqProdVigente45d: "$$REMOVE",
      montoLiqProdVigente6m: "$$REMOVE",
      montoLiqProdVigente9m: "$$REMOVE",
      montoLiqProdVigente1a: "$$REMOVE",
      montoLiqProdVigenteMas1a: "$$REMOVE",
      comercialmontoLiqProdVigente: "$$REMOVE",
      comercialnumLiqProdVigente: "$$REMOVE",
      comercialmontoLiqProdVigente45d: "$$REMOVE",
      comercialmontoLiqProdVigente6m: "$$REMOVE",
      comercialmontoLiqProdVigente9m: "$$REMOVE",
      comercialmontoLiqProdVigente1a: "$$REMOVE",
      comercialmontoLiqProdVigenteMas1a:
        "$$REMOVE",
      productivomontoLiqProdVigente: "$$REMOVE",
      productivonumLiqProdVigente: "$$REMOVE",
      productivomontoLiqProdVigente45d:
        "$$REMOVE",
      productivomontoLiqProdVigente6m: "$$REMOVE",
      productivomontoLiqProdVigente9m: "$$REMOVE",
      productivomontoLiqProdVigente1a: "$$REMOVE",
      productivomontoLiqProdVigenteMas1a:
        "$$REMOVE",
      hipotecariomontoLiqProdVigente: "$$REMOVE",
      hipotecarionumLiqProdVigente: "$$REMOVE",
      hipotecariomontoLiqProdVigente45d:
        "$$REMOVE",
      hipotecariomontoLiqProdVigente6m:
        "$$REMOVE",
      hipotecariomontoLiqProdVigente9m:
        "$$REMOVE",
      hipotecariomontoLiqProdVigente1a:
        "$$REMOVE",
      hipotecariomontoLiqProdVigenteMas1a:
        "$$REMOVE",
      emprendeBdvmontoLiqProdVigente: "$$REMOVE",
      emprendeBdvnumLiqProdVigente: "$$REMOVE",
      emprendeBdvmontoLiqProdVigente45d:
        "$$REMOVE",
      emprendeBdvmontoLiqProdVigente6m:
        "$$REMOVE",
      emprendeBdvmontoLiqProdVigente9m:
        "$$REMOVE",
      emprendeBdvmontoLiqProdVigente1a:
        "$$REMOVE",
      emprendeBdvmontoLiqProdVigenteMas1a:
        "$$REMOVE",
      microCredmontoLiqProdVigente: "$$REMOVE",
      microCrednumLiqProdVigente: "$$REMOVE",
      microCredmontoLiqProdVigente45d: "$$REMOVE",
      microCredmontoLiqProdVigente6m: "$$REMOVE",
      microCredmontoLiqProdVigente9m: "$$REMOVE",
      microCredmontoLiqProdVigente1a: "$$REMOVE",
      microCredmontoLiqProdVigenteMas1a:
        "$$REMOVE",
      "liquidaciones.montoLiqProd.totalBdv.acMensual":
        "$montoLiqProdVigente",
      "liquidaciones.numLiqProd.totalBdv.acMensual":
        "$numLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm45d":
        "$montoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm6m":
        "$montoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm9m":
        "$montoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm1a":
        "$montoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acmMas":
        "$montoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.comercial.acMensual":
        "$comercialmontoLiqProdVigente",
      "liquidaciones.numLiqProd.comercial.acMensual":
        "$comercialnumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.comercial.acm45d":
        "$comercialmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.comercial.acm6m":
        "$comercialmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.comercial.acm9m":
        "$comercialmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.comercial.acm1a":
        "$comercialmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.comercial.acmMas":
        "$comercialmontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.productivo.acMensual":
        "$productivomontoLiqProdVigente",
      "liquidaciones.numLiqProd.productivo.acMensual":
        "$productivonumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.productivo.acm45d":
        "$productivomontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.productivo.acm6m":
        "$productivomontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.productivo.acm9m":
        "$productivomontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.productivo.acm1a":
        "$productivomontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.productivo.acmMas":
        "$productivomontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.hipotecario.acMensual":
        "$hipotecariomontoLiqProdVigente",
      "liquidaciones.numLiqProd.hipotecario.acMensual":
        "$hipotecarionumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm45d":
        "$hipotecariomontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm6m":
        "$hipotecariomontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm9m":
        "$hipotecariomontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm1a":
        "$hipotecariomontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acmMas":
        "$hipotecariomontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.emprendeBdv.acMensual":
        "$emprendeBdvmontoLiqProdVigente",
      "liquidaciones.numLiqProd.emprendeBdv.acMensual":
        "$emprendeBdvnumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d":
        "$emprendeBdvmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m":
        "$emprendeBdvmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m":
        "$emprendeBdvmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a":
        "$emprendeBdvmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas":
        "$emprendeBdvmontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.microCred.acMensual":
        "$microCredmontoLiqProdVigente",
      "liquidaciones.numLiqProd.microCred.acMensual":
        "$microCrednumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.microCred.acm45d":
        "$microCredmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.microCred.acm6m":
        "$microCredmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.microCred.acm9m":
        "$microCredmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.microCred.acm1a":
        "$microCredmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.microCred.acmMas":
        "$microCredmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.totalBdv.acMensual":
        "$montoLiqProdVigente",
      "liquidacionesBs.numLiqProd.totalBdv.acMensual":
        "$numLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm45d":
        "$montoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm6m":
        "$montoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm9m":
        "$montoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm1a":
        "$montoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acmMas":
        "$montoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.comercial.acMensual":
        "$comercialmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.comercial.acMensual":
        "$comercialnumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm45d":
        "$comercialmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm6m":
        "$comercialmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm9m":
        "$comercialmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm1a":
        "$comercialmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acmMas":
        "$comercialmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.productivo.acMensual":
        "$productivomontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.productivo.acMensual":
        "$productivonumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm45d":
        "$productivomontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm6m":
        "$productivomontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm9m":
        "$productivomontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm1a":
        "$productivomontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acmMas":
        "$productivomontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.hipotecario.acMensual":
        "$hipotecariomontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.hipotecario.acMensual":
        "$hipotecarionumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm45d":
        "$hipotecariomontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm6m":
        "$hipotecariomontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm9m":
        "$hipotecariomontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm1a":
        "$hipotecariomontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acmMas":
        "$hipotecariomontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.emprendeBdv.acMensual":
        "$emprendeBdvmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.emprendeBdv.acMensual":
        "$emprendeBdvnumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm45d":
        "$emprendeBdvmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm6m":
        "$emprendeBdvmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm9m":
        "$emprendeBdvmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm1a":
        "$emprendeBdvmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acmMas":
        "$emprendeBdvmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.microCred.acMensual":
        "$microCredmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.microCred.acMensual":
        "$microCrednumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm45d":
        "$microCredmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm6m":
        "$microCredmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm9m":
        "$microCredmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm1a":
        "$microCredmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acmMas":
        "$microCredmontoLiqProdVigenteMas1a",
    },
  },
  {
    $lookup: {
      from: "sidis_tasaconversion",
      localField: "fecha_valor",
      foreignField: "Fecha",
      as: "result",
    },
  },
  {
    $addFields: {
      result: "$$REMOVE",
      "liquidaciones.montoLiqProd.totalBdv.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.totalBdv.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.comercial.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.comercial.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.productivo.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.productivo.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.hipotecario.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.hipotecario.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.emprendeBdv.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.emprendeBdv.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.microCred.acMensual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.microCred.acMensual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acm45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acm45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acm6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acm6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acm9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acm9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acm1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acm1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acmMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acmMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
    },
  },
  {
    $merge: {
      into: "Balancemetric",
      on: "fecha_valor",
      whenMatched: "merge",
      whenNotMatched: "insert",
    },
  },
]

//n8n

[
  {
    "$addFields": {
      "today": {
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
                "$toInt": "{{$json.offSet}}"
              }, 86400000
            ]
          }
        ]
      }
    }
  }, {
    "$addFields": {
      "firstDayMonth": {
        "$dateFromParts": {
          "year": {
            "$year": "$today"
          }, 
          "month": {
            "$month": "$today"
          }
        }
      }
    }
  }, {
    "$match": {
      "$and": [
        {
          "$expr": {
            "$gte": [
              "$fecha_valor", "$firstDayMonth"
            ]
          }
        }, {
          "$expr": {
            "$lte": [
              "$fecha_valor", "$today"
            ]
          }
        }
      ]
    }
  }, {
    "$lookup": {
      "from": "Balancemetric", 
      "localField": "fecha_valor", 
      "foreignField": "fecha_valor", 
      "as": "result"
    }
  }, {
    "$addFields": {
      "liquidaciones": {
        "$first": "$result.liquidaciones"
      }, 
      "liquidacionesBs": {
        "$first": "$result.liquidacionesBs"
      }, 
      "firstDayMonth": "$$REMOVE"
    }
  }, {
    "$sort": {
      "fecha_valor": -1
    }
  }, {
    "$group": {
      "_id": "$today", 
      "fecha_valor": {
        "$first": "$today"
      }, 
      "liquidaciones": {
        "$first": "$liquidaciones"
      }, 
      "liquidacionesBs": {
        "$first": "$liquidacionesBs"
      }, 
      "montoLiqProdVigente": {
        "$sum": "$montoLiqProdVigente"
      }, 
      "numLiqProdVigente": {
        "$sum": "$numLiqProdVigente"
      }, 
      "montoLiqProdVigente45d": {
        "$sum": "$montoLiqProdVigente45d"
      }, 
      "montoLiqProdVigente6m": {
        "$sum": "$montoLiqProdVigente6m"
      }, 
      "montoLiqProdVigente9m": {
        "$sum": "$montoLiqProdVigente9m"
      }, 
      "montoLiqProdVigente1a": {
        "$sum": "$montoLiqProdVigente1a"
      }, 
      "montoLiqProdVigenteMas1a": {
        "$sum": "$montoLiqProdVigenteMas1a"
      }, 
      "comercialmontoLiqProdVigente": {
        "$sum": "$comercialmontoLiqProdVigente"
      }, 
      "comercialnumLiqProdVigente": {
        "$sum": "$comercialnumLiqProdVigente"
      }, 
      "comercialmontoLiqProdVigente45d": {
        "$sum": "$comercialmontoLiqProdVigente45d"
      }, 
      "comercialmontoLiqProdVigente6m": {
        "$sum": "$comercialmontoLiqProdVigente6m"
      }, 
      "comercialmontoLiqProdVigente9m": {
        "$sum": "$comercialmontoLiqProdVigente9m"
      }, 
      "comercialmontoLiqProdVigente1a": {
        "$sum": "$comercialmontoLiqProdVigente1a"
      }, 
      "comercialmontoLiqProdVigenteMas1a": {
        "$sum": "$comercialmontoLiqProdVigenteMas1a"
      }, 
      "productivomontoLiqProdVigente": {
        "$sum": "$productivomontoLiqProdVigente"
      }, 
      "productivonumLiqProdVigente": {
        "$sum": "$productivonumLiqProdVigente"
      }, 
      "productivomontoLiqProdVigente45d": {
        "$sum": "$productivomontoLiqProdVigente45d"
      }, 
      "productivomontoLiqProdVigente6m": {
        "$sum": "$productivomontoLiqProdVigente6m"
      }, 
      "productivomontoLiqProdVigente9m": {
        "$sum": "$productivomontoLiqProdVigente9m"
      }, 
      "productivomontoLiqProdVigente1a": {
        "$sum": "$productivomontoLiqProdVigente1a"
      }, 
      "productivomontoLiqProdVigenteMas1a": {
        "$sum": "$productivomontoLiqProdVigenteMas1a"
      }, 
      "hipotecariomontoLiqProdVigente": {
        "$sum": "$hipotecariomontoLiqProdVigente"
      }, 
      "hipotecarionumLiqProdVigente": {
        "$sum": "$hipotecarionumLiqProdVigente"
      }, 
      "hipotecariomontoLiqProdVigente45d": {
        "$sum": "$hipotecariomontoLiqProdVigente45d"
      }, 
      "hipotecariomontoLiqProdVigente6m": {
        "$sum": "$hipotecariomontoLiqProdVigente6m"
      }, 
      "hipotecariomontoLiqProdVigente9m": {
        "$sum": "$hipotecariomontoLiqProdVigente9m"
      }, 
      "hipotecariomontoLiqProdVigente1a": {
        "$sum": "$hipotecariomontoLiqProdVigente1a"
      }, 
      "hipotecariomontoLiqProdVigenteMas1a": {
        "$sum": "$hipotecariomontoLiqProdVigenteMas1a"
      }, 
      "emprendeBdvmontoLiqProdVigente": {
        "$sum": "$emprendeBdvmontoLiqProdVigente"
      }, 
      "emprendeBdvnumLiqProdVigente": {
        "$sum": "$emprendeBdvnumLiqProdVigente"
      }, 
      "emprendeBdvmontoLiqProdVigente45d": {
        "$sum": "$emprendeBdvmontoLiqProdVigente45d"
      }, 
      "emprendeBdvmontoLiqProdVigente6m": {
        "$sum": "$emprendeBdvmontoLiqProdVigente6m"
      }, 
      "emprendeBdvmontoLiqProdVigente9m": {
        "$sum": "$emprendeBdvmontoLiqProdVigente9m"
      }, 
      "emprendeBdvmontoLiqProdVigente1a": {
        "$sum": "$emprendeBdvmontoLiqProdVigente1a"
      }, 
      "emprendeBdvmontoLiqProdVigenteMas1a": {
        "$sum": "$emprendeBdvmontoLiqProdVigenteMas1a"
      }, 
      "microCredmontoLiqProdVigente": {
        "$sum": "$microCredmontoLiqProdVigente"
      }, 
      "microCrednumLiqProdVigente": {
        "$sum": "$microCrednumLiqProdVigente"
      }, 
      "microCredmontoLiqProdVigente45d": {
        "$sum": "$microCredmontoLiqProdVigente45d"
      }, 
      "microCredmontoLiqProdVigente6m": {
        "$sum": "$microCredmontoLiqProdVigente6m"
      }, 
      "microCredmontoLiqProdVigente9m": {
        "$sum": "$microCredmontoLiqProdVigente9m"
      }, 
      "microCredmontoLiqProdVigente1a": {
        "$sum": "$microCredmontoLiqProdVigente1a"
      }, 
      "microCredmontoLiqProdVigenteMas1a": {
        "$sum": "$microCredmontoLiqProdVigenteMas1a"
      }
    }
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "montoLiqProdVigente": "$$REMOVE", 
      "numLiqProdVigente": "$$REMOVE", 
      "montoLiqProdVigente45d": "$$REMOVE", 
      "montoLiqProdVigente6m": "$$REMOVE", 
      "montoLiqProdVigente9m": "$$REMOVE", 
      "montoLiqProdVigente1a": "$$REMOVE", 
      "montoLiqProdVigenteMas1a": "$$REMOVE", 
      "comercialmontoLiqProdVigente": "$$REMOVE", 
      "comercialnumLiqProdVigente": "$$REMOVE", 
      "comercialmontoLiqProdVigente45d": "$$REMOVE", 
      "comercialmontoLiqProdVigente6m": "$$REMOVE", 
      "comercialmontoLiqProdVigente9m": "$$REMOVE", 
      "comercialmontoLiqProdVigente1a": "$$REMOVE", 
      "comercialmontoLiqProdVigenteMas1a": "$$REMOVE", 
      "productivomontoLiqProdVigente": "$$REMOVE", 
      "productivonumLiqProdVigente": "$$REMOVE", 
      "productivomontoLiqProdVigente45d": "$$REMOVE", 
      "productivomontoLiqProdVigente6m": "$$REMOVE", 
      "productivomontoLiqProdVigente9m": "$$REMOVE", 
      "productivomontoLiqProdVigente1a": "$$REMOVE", 
      "productivomontoLiqProdVigenteMas1a": "$$REMOVE", 
      "hipotecariomontoLiqProdVigente": "$$REMOVE", 
      "hipotecarionumLiqProdVigente": "$$REMOVE", 
      "hipotecariomontoLiqProdVigente45d": "$$REMOVE", 
      "hipotecariomontoLiqProdVigente6m": "$$REMOVE", 
      "hipotecariomontoLiqProdVigente9m": "$$REMOVE", 
      "hipotecariomontoLiqProdVigente1a": "$$REMOVE", 
      "hipotecariomontoLiqProdVigenteMas1a": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigente": "$$REMOVE", 
      "emprendeBdvnumLiqProdVigente": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigente45d": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigente6m": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigente9m": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigente1a": "$$REMOVE", 
      "emprendeBdvmontoLiqProdVigenteMas1a": "$$REMOVE", 
      "microCredmontoLiqProdVigente": "$$REMOVE", 
      "microCrednumLiqProdVigente": "$$REMOVE", 
      "microCredmontoLiqProdVigente45d": "$$REMOVE", 
      "microCredmontoLiqProdVigente6m": "$$REMOVE", 
      "microCredmontoLiqProdVigente9m": "$$REMOVE", 
      "microCredmontoLiqProdVigente1a": "$$REMOVE", 
      "microCredmontoLiqProdVigenteMas1a": "$$REMOVE", 
      "liquidaciones.montoLiqProd.totalBdv.acMensual": "$montoLiqProdVigente", 
      "liquidaciones.numLiqProd.totalBdv.acMensual": "$numLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm45d": "$montoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm6m": "$montoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm9m": "$montoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm1a": "$montoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acmMas": "$montoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.comercial.acMensual": "$comercialmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.comercial.acMensual": "$comercialnumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.comercial.acm45d": "$comercialmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.comercial.acm6m": "$comercialmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.comercial.acm9m": "$comercialmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.comercial.acm1a": "$comercialmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.comercial.acmMas": "$comercialmontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.productivo.acMensual": "$productivomontoLiqProdVigente", 
      "liquidaciones.numLiqProd.productivo.acMensual": "$productivonumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.productivo.acm45d": "$productivomontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.productivo.acm6m": "$productivomontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.productivo.acm9m": "$productivomontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.productivo.acm1a": "$productivomontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.productivo.acmMas": "$productivomontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.hipotecario.acMensual": "$hipotecariomontoLiqProdVigente", 
      "liquidaciones.numLiqProd.hipotecario.acMensual": "$hipotecarionumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm45d": "$hipotecariomontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm6m": "$hipotecariomontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm9m": "$hipotecariomontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm1a": "$hipotecariomontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acmMas": "$hipotecariomontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.emprendeBdv.acMensual": "$emprendeBdvmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.emprendeBdv.acMensual": "$emprendeBdvnumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d": "$emprendeBdvmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m": "$emprendeBdvmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m": "$emprendeBdvmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a": "$emprendeBdvmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas": "$emprendeBdvmontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.microCred.acMensual": "$microCredmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.microCred.acMensual": "$microCrednumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.microCred.acm45d": "$microCredmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.microCred.acm6m": "$microCredmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.microCred.acm9m": "$microCredmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.microCred.acm1a": "$microCredmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.microCred.acmMas": "$microCredmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.totalBdv.acMensual": "$montoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.totalBdv.acMensual": "$numLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm45d": "$montoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm6m": "$montoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm9m": "$montoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acm1a": "$montoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acmMas": "$montoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.comercial.acMensual": "$comercialmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.comercial.acMensual": "$comercialnumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm45d": "$comercialmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm6m": "$comercialmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm9m": "$comercialmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acm1a": "$comercialmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acmMas": "$comercialmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.productivo.acMensual": "$productivomontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.productivo.acMensual": "$productivonumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm45d": "$productivomontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm6m": "$productivomontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm9m": "$productivomontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acm1a": "$productivomontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acmMas": "$productivomontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.hipotecario.acMensual": "$hipotecariomontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.hipotecario.acMensual": "$hipotecarionumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm45d": "$hipotecariomontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm6m": "$hipotecariomontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm9m": "$hipotecariomontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acm1a": "$hipotecariomontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acmMas": "$hipotecariomontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.emprendeBdv.acMensual": "$emprendeBdvmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.emprendeBdv.acMensual": "$emprendeBdvnumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm45d": "$emprendeBdvmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm6m": "$emprendeBdvmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm9m": "$emprendeBdvmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acm1a": "$emprendeBdvmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acmMas": "$emprendeBdvmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.microCred.acMensual": "$microCredmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.microCred.acMensual": "$microCrednumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm45d": "$microCredmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm6m": "$microCredmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm9m": "$microCredmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acm1a": "$microCredmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acmMas": "$microCredmontoLiqProdVigenteMas1a"
    }
  }, {
    "$lookup": {
      "from": "sidis_tasaconversion", 
      "localField": "fecha_valor", 
      "foreignField": "Fecha", 
      "as": "result"
    }
  }, {
    "$addFields": {
      "result": "$$REMOVE", 
      "liquidaciones.montoLiqProd.totalBdv.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.totalBdv.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.comercial.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.comercial.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.productivo.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.productivo.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.hipotecario.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.hipotecario.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.emprendeBdv.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.emprendeBdv.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.microCred.acMensual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.microCred.acMensual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acm45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acm45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acm6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acm6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acm9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acm9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acm1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acm1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acmMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acmMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }
    }
  }, {
    "$merge": {
      "into": "Balancemetric", 
      "on": "fecha_valor", 
      "whenMatched": "merge", 
      "whenNotMatched": "insert"
    }
  }
]