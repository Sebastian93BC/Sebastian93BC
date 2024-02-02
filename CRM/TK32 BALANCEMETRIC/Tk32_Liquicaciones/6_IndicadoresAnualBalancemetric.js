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
                $toInt: "43",
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
    $addFields:
      //valor del primer día del año
      {
        firstDayYear: {
          $dateFromParts: {
            year: {
              $year: "$today",
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
              "$firstDayYear",
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
      result: "$$REMOVE",
      firstDayYear: "$$REMOVE",
    },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
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
      "liquidaciones.montoLiqProd.totalBdv.acAnual":
        "$montoLiqProdVigente",
      "liquidaciones.numLiqProd.totalBdv.acAnual":
        "$numLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca45d":
        "$montoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca6m":
        "$montoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca9m":
        "$montoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca1a":
        "$montoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.totalBdv.acaMas":
        "$montoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.comercial.acAnual":
        "$comercialmontoLiqProdVigente",
      "liquidaciones.numLiqProd.comercial.acAnual":
        "$comercialnumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.comercial.aca45d":
        "$comercialmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.comercial.aca6m":
        "$comercialmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.comercial.aca9m":
        "$comercialmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.comercial.aca1a":
        "$comercialmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.comercial.acaMas":
        "$comercialmontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.productivo.acAnual":
        "$productivomontoLiqProdVigente",
      "liquidaciones.numLiqProd.productivo.acAnual":
        "$productivonumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.productivo.aca45d":
        "$productivomontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.productivo.aca6m":
        "$productivomontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.productivo.aca9m":
        "$productivomontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.productivo.aca1a":
        "$productivomontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.productivo.acaMas":
        "$productivomontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.hipotecario.acAnual":
        "$hipotecariomontoLiqProdVigente",
      "liquidaciones.numLiqProd.hipotecario.acAnual":
        "$hipotecarionumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca45d":
        "$hipotecariomontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca6m":
        "$hipotecariomontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca9m":
        "$hipotecariomontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca1a":
        "$hipotecariomontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.hipotecario.acaMas":
        "$hipotecariomontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.emprendeBdv.acAnual":
        "$emprendeBdvmontoLiqProdVigente",
      "liquidaciones.numLiqProd.emprendeBdv.acAnual":
        "$emprendeBdvnumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d":
        "$emprendeBdvmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m":
        "$emprendeBdvmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m":
        "$emprendeBdvmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a":
        "$emprendeBdvmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas":
        "$emprendeBdvmontoLiqProdVigenteMas1a",
      "liquidaciones.montoLiqProd.microCred.acAnual":
        "$microCredmontoLiqProdVigente",
      "liquidaciones.numLiqProd.microCred.acAnual":
        "$microCrednumLiqProdVigente",
      "liquidaciones.montLiquidadoPlazo.microCred.aca45d":
        "$microCredmontoLiqProdVigente45d",
      "liquidaciones.montLiquidadoPlazo.microCred.aca6m":
        "$microCredmontoLiqProdVigente6m",
      "liquidaciones.montLiquidadoPlazo.microCred.aca9m":
        "$microCredmontoLiqProdVigente9m",
      "liquidaciones.montLiquidadoPlazo.microCred.aca1a":
        "$microCredmontoLiqProdVigente1a",
      "liquidaciones.montLiquidadoPlazo.microCred.acaMas":
        "$microCredmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.totalBdv.acAnual":
        "$montoLiqProdVigente",
      "liquidacionesBs.numLiqProd.totalBdv.acAnual":
        "$numLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca45d":
        "$montoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca6m":
        "$montoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca9m":
        "$montoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca1a":
        "$montoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acaMas":
        "$montoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.comercial.acAnual":
        "$comercialmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.comercial.acAnual":
        "$comercialnumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca45d":
        "$comercialmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca6m":
        "$comercialmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca9m":
        "$comercialmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca1a":
        "$comercialmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.comercial.acaMas":
        "$comercialmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.productivo.acAnual":
        "$productivomontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.productivo.acAnual":
        "$productivonumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca45d":
        "$productivomontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca6m":
        "$productivomontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca9m":
        "$productivomontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca1a":
        "$productivomontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.productivo.acaMas":
        "$productivomontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.hipotecario.acAnual":
        "$hipotecariomontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.hipotecario.acAnual":
        "$hipotecarionumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca45d":
        "$hipotecariomontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca6m":
        "$hipotecariomontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca9m":
        "$hipotecariomontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca1a":
        "$hipotecariomontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acaMas":
        "$hipotecariomontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.emprendeBdv.acAnual":
        "$emprendeBdvmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.emprendeBdv.acAnual":
        "$emprendeBdvnumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca45d":
        "$emprendeBdvmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca6m":
        "$emprendeBdvmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca9m":
        "$emprendeBdvmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca1a":
        "$emprendeBdvmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acaMas":
        "$emprendeBdvmontoLiqProdVigenteMas1a",
      "liquidacionesBs.montoLiqProd.microCred.acAnual":
        "$microCredmontoLiqProdVigente",
      "liquidacionesBs.numLiqProd.microCred.acAnual":
        "$microCrednumLiqProdVigente",
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca45d":
        "$microCredmontoLiqProdVigente45d",
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca6m":
        "$microCredmontoLiqProdVigente6m",
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca9m":
        "$microCredmontoLiqProdVigente9m",
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca1a":
        "$microCredmontoLiqProdVigente1a",
      "liquidacionesBs.montLiquidadoPlazo.microCred.acaMas":
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
      "liquidaciones.montoLiqProd.totalBdv.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.totalBdv.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.totalBdv.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.totalBdv.acaMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.comercial.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.comercial.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.comercial.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.comercial.acaMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.productivo.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.productivo.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.productivo.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.productivo.acaMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.hipotecario.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.hipotecario.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.hipotecario.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.hipotecario.acaMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.emprendeBdv.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.emprendeBdv.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montoLiqProd.microCred.acAnual":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montoLiqProd.microCred.acAnual",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.aca45d":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.aca45d",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.aca6m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.aca6m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.aca9m":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.aca9m",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.aca1a":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.aca1a",
                {
                  $first: "$result.Tasa_DOL",
                },
              ],
            },
            4,
          ],
        },
      "liquidaciones.montLiquidadoPlazo.microCred.acaMas":
        {
          $round: [
            {
              $divide: [
                "$liquidaciones.montLiquidadoPlazo.microCred.acaMas",
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

//N8N

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
      "firstDayYear": {
        "$dateFromParts": {
          "year": {
            "$year": "$today"
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
              "$fecha_valor", "$firstDayYear"
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
      "result": "$$REMOVE", 
      "firstDayYear": "$$REMOVE"
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
      "liquidaciones.montoLiqProd.totalBdv.acAnual": "$montoLiqProdVigente", 
      "liquidaciones.numLiqProd.totalBdv.acAnual": "$numLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca45d": "$montoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca6m": "$montoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca9m": "$montoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca1a": "$montoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acaMas": "$montoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.comercial.acAnual": "$comercialmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.comercial.acAnual": "$comercialnumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.comercial.aca45d": "$comercialmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.comercial.aca6m": "$comercialmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.comercial.aca9m": "$comercialmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.comercial.aca1a": "$comercialmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.comercial.acaMas": "$comercialmontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.productivo.acAnual": "$productivomontoLiqProdVigente", 
      "liquidaciones.numLiqProd.productivo.acAnual": "$productivonumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.productivo.aca45d": "$productivomontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.productivo.aca6m": "$productivomontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.productivo.aca9m": "$productivomontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.productivo.aca1a": "$productivomontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.productivo.acaMas": "$productivomontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.hipotecario.acAnual": "$hipotecariomontoLiqProdVigente", 
      "liquidaciones.numLiqProd.hipotecario.acAnual": "$hipotecarionumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca45d": "$hipotecariomontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca6m": "$hipotecariomontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca9m": "$hipotecariomontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca1a": "$hipotecariomontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acaMas": "$hipotecariomontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.emprendeBdv.acAnual": "$emprendeBdvmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.emprendeBdv.acAnual": "$emprendeBdvnumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d": "$emprendeBdvmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m": "$emprendeBdvmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m": "$emprendeBdvmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a": "$emprendeBdvmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas": "$emprendeBdvmontoLiqProdVigenteMas1a", 
      "liquidaciones.montoLiqProd.microCred.acAnual": "$microCredmontoLiqProdVigente", 
      "liquidaciones.numLiqProd.microCred.acAnual": "$microCrednumLiqProdVigente", 
      "liquidaciones.montLiquidadoPlazo.microCred.aca45d": "$microCredmontoLiqProdVigente45d", 
      "liquidaciones.montLiquidadoPlazo.microCred.aca6m": "$microCredmontoLiqProdVigente6m", 
      "liquidaciones.montLiquidadoPlazo.microCred.aca9m": "$microCredmontoLiqProdVigente9m", 
      "liquidaciones.montLiquidadoPlazo.microCred.aca1a": "$microCredmontoLiqProdVigente1a", 
      "liquidaciones.montLiquidadoPlazo.microCred.acaMas": "$microCredmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.totalBdv.acAnual": "$montoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.totalBdv.acAnual": "$numLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca45d": "$montoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca6m": "$montoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca9m": "$montoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.aca1a": "$montoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.totalBdv.acaMas": "$montoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.comercial.acAnual": "$comercialmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.comercial.acAnual": "$comercialnumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca45d": "$comercialmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca6m": "$comercialmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca9m": "$comercialmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.aca1a": "$comercialmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.comercial.acaMas": "$comercialmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.productivo.acAnual": "$productivomontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.productivo.acAnual": "$productivonumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca45d": "$productivomontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca6m": "$productivomontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca9m": "$productivomontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.aca1a": "$productivomontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.productivo.acaMas": "$productivomontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.hipotecario.acAnual": "$hipotecariomontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.hipotecario.acAnual": "$hipotecarionumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca45d": "$hipotecariomontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca6m": "$hipotecariomontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca9m": "$hipotecariomontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.aca1a": "$hipotecariomontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.hipotecario.acaMas": "$hipotecariomontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.emprendeBdv.acAnual": "$emprendeBdvmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.emprendeBdv.acAnual": "$emprendeBdvnumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca45d": "$emprendeBdvmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca6m": "$emprendeBdvmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca9m": "$emprendeBdvmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.aca1a": "$emprendeBdvmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.emprendeBdv.acaMas": "$emprendeBdvmontoLiqProdVigenteMas1a", 
      "liquidacionesBs.montoLiqProd.microCred.acAnual": "$microCredmontoLiqProdVigente", 
      "liquidacionesBs.numLiqProd.microCred.acAnual": "$microCrednumLiqProdVigente", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca45d": "$microCredmontoLiqProdVigente45d", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca6m": "$microCredmontoLiqProdVigente6m", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca9m": "$microCredmontoLiqProdVigente9m", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.aca1a": "$microCredmontoLiqProdVigente1a", 
      "liquidacionesBs.montLiquidadoPlazo.microCred.acaMas": "$microCredmontoLiqProdVigenteMas1a"
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
      "liquidaciones.montoLiqProd.totalBdv.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.totalBdv.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.totalBdv.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.totalBdv.acaMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.comercial.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.comercial.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.comercial.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.comercial.acaMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.productivo.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.productivo.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.productivo.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.productivo.acaMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.hipotecario.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.hipotecario.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.hipotecario.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.hipotecario.acaMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.emprendeBdv.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.emprendeBdv.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.emprendeBdv.acaMas", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montoLiqProd.microCred.acAnual": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montoLiqProd.microCred.acAnual", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.aca45d": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.aca45d", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.aca6m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.aca6m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.aca9m": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.aca9m", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.aca1a": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.aca1a", {
                "$first": "$result.Tasa_DOL"
              }
            ]
          }, 4
        ]
      }, 
      "liquidaciones.montLiquidadoPlazo.microCred.acaMas": {
        "$round": [
          {
            "$divide": [
              "$liquidaciones.montLiquidadoPlazo.microCred.acaMas", {
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