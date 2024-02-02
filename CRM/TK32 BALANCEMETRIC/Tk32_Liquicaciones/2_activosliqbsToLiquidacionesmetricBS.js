[
  {
    $limit: 1,
  },
  {
    $lookup: {
      from: "Parametricliquidacion",
      pipeline: [
        {
          $match: {
            $and: [
              {
                $expr: {
                  $eq: ["$condicion", "VIGENTE"],
                },
              },
              {
                $or: [
                  {
                    $expr: {
                      $eq: [
                        "$productoControlGestion",
                        "COMERCIAL",
                      ],
                    },
                  },
                  {
                    $expr: {
                      $eq: [
                        "$productoControlGestion",
                        "PRODUCTIVO",
                      ],
                    },
                  },
                  {
                    $expr: {
                      $eq: [
                        "$productoControlGestion",
                        "EMPRENDEBDV",
                      ],
                    },
                  },
                  {
                    $expr: {
                      $eq: [
                        "$productoControlGestion",
                        "MICROCREDITO",
                      ],
                    },
                  },
                  {
                    $expr: {
                      $eq: [
                        "$productoControlGestion",
                        "HIPOTECARIO",
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ],
      as: "Parametricliquidacion",
    },
  },
  {
    $project: {
      todayDate: {
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
                $toInt: "4",
                //"{{$json.offSet}}"
              },
              86400000,
            ],
          },
        ],
      },
      cuentasContable:
        "$Parametricliquidacion.cuentaContable",
      Parametricliquidacion: 1,
    },
  },
  {
    $lookup: {
      from: "sidis_activos_liq_bs",
      let: {
        todayDate: "$todayDate",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                "$$todayDate",
                "$fecha_valor",
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            cuenta_contable: 1,
            mto_credito: "$monto_credito",
            fecha_vencimiento: 1,
            formalizacion: "$fecha_formalizacion",
          },
        },
      ],
      as: "sidis_activos_liq_bs",
    },
  },
  {
    $addFields: {
      avaiableData: {
        $cond: [
          {
            $gt: [
              {
                $size: "$sidis_activos_liq_bs",
              },
              0,
            ],
          },
          true,
          false,
        ],
      },
      firstDayMonth: {
        $eq: [
          {
            $dayOfMonth: "$todayDate",
          },
          1,
        ],
      },
      firstDayYear: {
        $and: [
          {
            $eq: [
              {
                $dayOfMonth: "$todayDate",
              },
              1,
            ],
          },
          {
            $eq: [
              {
                $month: "$todayDate",
              },
              1,
            ],
          },
        ],
      },
      yesterdayDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "day",
          amount: -1,
        },
      },
      tomorrowDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "day",
          amount: 1,
        },
      },
      previusMonthDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "month",
          amount: -1,
        },
      },
      previusMonthlastDate: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$todayDate",
              },
              month: {
                $month: "$todayDate",
              },
            },
          },
          86400000,
        ],
      },
      previusYearDate: {
        $dateAdd: {
          startDate: "$todayDate",
          unit: "year",
          amount: -1,
        },
      },
      previusYearlastDate: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$todayDate",
              },
            },
          },
          86400000,
        ],
      },
      //Filtra los documentos correspondientes a ingresos por comisión
      sidis_activos_liq_bs: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $in: [
              "$$item.cuenta_contable",
              "$cuentasContable",
            ],
          },
        },
      },
      cuentasContable: "$$REMOVE",
    },
  },
  {
    $addFields: {
      sidis_activos_liq_bs: {
        $map: {
          input: "$sidis_activos_liq_bs",
          as: "items",
          in: {
            $mergeObjects: [
              "$$items",
              {
                $first: {
                  $filter: {
                    input:
                      "$Parametricliquidacion",
                    as: "item",
                    cond: {
                      $eq: [
                        "$$item.cuentaContable",
                        "$$items.cuenta_contable",
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      sidis_activos_liq_bs: {
        $map: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          in: {
            $mergeObjects: [
              "$$item",
              {
                plazo: {
                  $divide: [
                    {
                      $subtract: [
                        "$$item.fecha_vencimiento",
                        "$$item.formalizacion",
                      ],
                    },
                    86400000,
                  ],
                },
              },
              {
                condicion: "VIGENTE",
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      montoLiqProdVigente: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $eq: ["$$item.condicion", "VIGENTE"],
          },
        },
      },
      numLiqProdVigente: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $eq: ["$$item.condicion", "VIGENTE"],
          },
        },
      },
      montoLiqProdVigente45d: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $and: [
              {
                $eq: [
                  "$$item.condicion",
                  "VIGENTE",
                ],
              },
              {
                $lte: ["$$item.plazo", 46],
              },
            ],
          },
        },
      },
      montoLiqProdVigente6m: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $and: [
              {
                $eq: [
                  "$$item.condicion",
                  "VIGENTE",
                ],
              },
              {
                $gt: ["$$item.plazo", 46],
              },
              {
                $lte: ["$$item.plazo", 186],
              },
            ],
          },
        },
      },
      montoLiqProdVigente9m: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $and: [
              {
                $eq: [
                  "$$item.condicion",
                  "VIGENTE",
                ],
              },
              {
                $gt: ["$$item.plazo", 186],
              },
              {
                $lte: ["$$item.plazo", 280],
              },
            ],
          },
        },
      },
      montoLiqProdVigente1a: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $and: [
              {
                $eq: [
                  "$$item.condicion",
                  "VIGENTE",
                ],
              },
              {
                $gt: ["$$item.plazo", 280],
              },
              {
                $lte: ["$$item.plazo", 360],
              },
            ],
          },
        },
      },
      montoLiqProdVigenteMas1a: {
        $filter: {
          input: "$sidis_activos_liq_bs",
          as: "item",
          cond: {
            $and: [
              {
                $eq: [
                  "$$item.condicion",
                  "VIGENTE",
                ],
              },
              {
                $gt: ["$$item.plazo", 360],
              },
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      montoLiqProdVigente: {
        $sum: "$montoLiqProdVigente.mto_credito",
      },
      numLiqProdVigente: {
        $size: "$numLiqProdVigente",
      },
      montoLiqProdVigente45d: {
        $sum: "$montoLiqProdVigente45d.mto_credito",
      },
      montoLiqProdVigente6m: {
        $sum: "$montoLiqProdVigente6m.mto_credito",
      },
      montoLiqProdVigente9m: {
        $sum: "$montoLiqProdVigente9m.mto_credito",
      },
      montoLiqProdVigente1a: {
        $sum: "$montoLiqProdVigente1a.mto_credito",
      },
      montoLiqProdVigenteMas1a: {
        $sum: "$montoLiqProdVigenteMas1a.mto_credito",
      },
      comercialmontoLiqProdVigente: {
        $filter: {
          input: "$montoLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialnumLiqProdVigente: {
        $filter: {
          input: "$numLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialmontoLiqProdVigente45d: {
        $filter: {
          input: "$montoLiqProdVigente45d",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialmontoLiqProdVigente6m: {
        $filter: {
          input: "$montoLiqProdVigente6m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialmontoLiqProdVigente9m: {
        $filter: {
          input: "$montoLiqProdVigente9m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialmontoLiqProdVigente1a: {
        $filter: {
          input: "$montoLiqProdVigente1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      comercialmontoLiqProdVigenteMas1a: {
        $filter: {
          input: "$montoLiqProdVigenteMas1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "COMERCIAL",
            ],
          },
        },
      },
      productivomontoLiqProdVigente: {
        $filter: {
          input: "$montoLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivonumLiqProdVigente: {
        $filter: {
          input: "$numLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivomontoLiqProdVigente45d: {
        $filter: {
          input: "$montoLiqProdVigente45d",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivomontoLiqProdVigente6m: {
        $filter: {
          input: "$montoLiqProdVigente6m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivomontoLiqProdVigente9m: {
        $filter: {
          input: "$montoLiqProdVigente9m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivomontoLiqProdVigente1a: {
        $filter: {
          input: "$montoLiqProdVigente1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      productivomontoLiqProdVigenteMas1a: {
        $filter: {
          input: "$montoLiqProdVigenteMas1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "PRODUCTIVO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigente: {
        $filter: {
          input: "$montoLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecarionumLiqProdVigente: {
        $filter: {
          input: "$numLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigente45d: {
        $filter: {
          input: "$montoLiqProdVigente45d",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigente6m: {
        $filter: {
          input: "$montoLiqProdVigente6m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigente9m: {
        $filter: {
          input: "$montoLiqProdVigente9m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigente1a: {
        $filter: {
          input: "$montoLiqProdVigente1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      hipotecariomontoLiqProdVigenteMas1a: {
        $filter: {
          input: "$montoLiqProdVigenteMas1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "HIPOTECARIO",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigente: {
        $filter: {
          input: "$montoLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvnumLiqProdVigente: {
        $filter: {
          input: "$numLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigente45d: {
        $filter: {
          input: "$montoLiqProdVigente45d",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigente6m: {
        $filter: {
          input: "$montoLiqProdVigente6m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigente9m: {
        $filter: {
          input: "$montoLiqProdVigente9m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigente1a: {
        $filter: {
          input: "$montoLiqProdVigente1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      emprendeBdvmontoLiqProdVigenteMas1a: {
        $filter: {
          input: "$montoLiqProdVigenteMas1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "EMPRENDEBDV",
            ],
          },
        },
      },
      microCredmontoLiqProdVigente: {
        $filter: {
          input: "$montoLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCrednumLiqProdVigente: {
        $filter: {
          input: "$numLiqProdVigente",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCredmontoLiqProdVigente45d: {
        $filter: {
          input: "$montoLiqProdVigente45d",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCredmontoLiqProdVigente6m: {
        $filter: {
          input: "$montoLiqProdVigente6m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCredmontoLiqProdVigente9m: {
        $filter: {
          input: "$montoLiqProdVigente9m",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCredmontoLiqProdVigente1a: {
        $filter: {
          input: "$montoLiqProdVigente1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
      microCredmontoLiqProdVigenteMas1a: {
        $filter: {
          input: "$montoLiqProdVigenteMas1a",
          as: "item",
          cond: {
            $eq: [
              "$$item.productoControlGestion",
              "MICROCREDITO",
            ],
          },
        },
      },
    },
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      Parametricliquidacion: "$$REMOVE",
      sidis_activos_liq_bs: "$$REMOVE",
      todayDate: "$$REMOVE",
      fecha_valor: "$todayDate",
      comercialmontoLiqProdVigente: {
        $sum: "$comercialmontoLiqProdVigente.mto_credito",
      },
      comercialnumLiqProdVigente: {
        $size:
          "$comercialnumLiqProdVigente.mto_credito",
      },
      comercialmontoLiqProdVigente45d: {
        $sum: "$comercialmontoLiqProdVigente45d.mto_credito",
      },
      comercialmontoLiqProdVigente6m: {
        $sum: "$comercialmontoLiqProdVigente6m.mto_credito",
      },
      comercialmontoLiqProdVigente9m: {
        $sum: "$comercialmontoLiqProdVigente9m.mto_credito",
      },
      comercialmontoLiqProdVigente1a: {
        $sum: "$comercialmontoLiqProdVigente1a.mto_credito",
      },
      comercialmontoLiqProdVigenteMas1a: {
        $sum: "$comercialmontoLiqProdVigenteMas1a.mto_credito",
      },
      productivomontoLiqProdVigente: {
        $sum: "$productivomontoLiqProdVigente.mto_credito",
      },
      productivonumLiqProdVigente: {
        $size:
          "$productivonumLiqProdVigente.mto_credito",
      },
      productivomontoLiqProdVigente45d: {
        $sum: "$productivomontoLiqProdVigente45d.mto_credito",
      },
      productivomontoLiqProdVigente6m: {
        $sum: "$productivomontoLiqProdVigente6m.mto_credito",
      },
      productivomontoLiqProdVigente9m: {
        $sum: "$productivomontoLiqProdVigente9m.mto_credito",
      },
      productivomontoLiqProdVigente1a: {
        $sum: "$productivomontoLiqProdVigente1a.mto_credito",
      },
      productivomontoLiqProdVigenteMas1a: {
        $sum: "$productivomontoLiqProdVigenteMas1a.mto_credito",
      },
      hipotecariomontoLiqProdVigente: {
        $sum: "$hipotecariomontoLiqProdVigente.mto_credito",
      },
      hipotecarionumLiqProdVigente: {
        $size:
          "$hipotecarionumLiqProdVigente.mto_credito",
      },
      hipotecariomontoLiqProdVigente45d: {
        $sum: "$hipotecariomontoLiqProdVigente45d.mto_credito",
      },
      hipotecariomontoLiqProdVigente6m: {
        $sum: "$hipotecariomontoLiqProdVigente6m.mto_credito",
      },
      hipotecariomontoLiqProdVigente9m: {
        $sum: "$hipotecariomontoLiqProdVigente9m.mto_credito",
      },
      hipotecariomontoLiqProdVigente1a: {
        $sum: "$hipotecariomontoLiqProdVigente1a.mto_credito",
      },
      hipotecariomontoLiqProdVigenteMas1a: {
        $sum: "$hipotecariomontoLiqProdVigenteMas1a.mto_credito",
      },
      emprendeBdvmontoLiqProdVigente: {
        $sum: "$emprendeBdvmontoLiqProdVigente.mto_credito",
      },
      emprendeBdvnumLiqProdVigente: {
        $size:
          "$emprendeBdvnumLiqProdVigente.mto_credito",
      },
      emprendeBdvmontoLiqProdVigente45d: {
        $sum: "$emprendeBdvmontoLiqProdVigente45d.mto_credito",
      },
      emprendeBdvmontoLiqProdVigente6m: {
        $sum: "$emprendeBdvmontoLiqProdVigente6m.mto_credito",
      },
      emprendeBdvmontoLiqProdVigente9m: {
        $sum: "$emprendeBdvmontoLiqProdVigente9m.mto_credito",
      },
      emprendeBdvmontoLiqProdVigente1a: {
        $sum: "$emprendeBdvmontoLiqProdVigente1a.mto_credito",
      },
      emprendeBdvmontoLiqProdVigenteMas1a: {
        $sum: "$emprendeBdvmontoLiqProdVigenteMas1a.mto_credito",
      },
      microCredmontoLiqProdVigente: {
        $sum: "$microCredmontoLiqProdVigente.mto_credito",
      },
      microCrednumLiqProdVigente: {
        $size:
          "$microCrednumLiqProdVigente.mto_credito",
      },
      microCredmontoLiqProdVigente45d: {
        $sum: "$microCredmontoLiqProdVigente45d.mto_credito",
      },
      microCredmontoLiqProdVigente6m: {
        $sum: "$microCredmontoLiqProdVigente6m.mto_credito",
      },
      microCredmontoLiqProdVigente9m: {
        $sum: "$microCredmontoLiqProdVigente9m.mto_credito",
      },
      microCredmontoLiqProdVigente1a: {
        $sum: "$microCredmontoLiqProdVigente1a.mto_credito",
      },
      microCredmontoLiqProdVigenteMas1a: {
        $sum: "$microCredmontoLiqProdVigenteMas1a.mto_credito",
      },
    },
  },
  {
    $lookup: {
      from: "Liquidacionmetric",
      localField: "fecha_valor",
      foreignField: "fecha_valor",
      as: "Liquidacionmetric",
    },
  },
  {
    $addFields: {
      Liquidacionmetric: "$$REMOVE",
      montoLiqProdVigente: {
        $sum: [
          "$montoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigente",
          },
        ],
      },
      numLiqProdVigente: {
        $sum: [
          "$numLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.numLiqProdVigente",
          },
        ],
      },
      montoLiqProdVigente45d: {
        $sum: [
          "$montoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigente45d",
          },
        ],
      },
      montoLiqProdVigente6m: {
        $sum: [
          "$montoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigente6m",
          },
        ],
      },
      montoLiqProdVigente9m: {
        $sum: [
          "$montoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigente9m",
          },
        ],
      },
      montoLiqProdVigente1a: {
        $sum: [
          "$montoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigente1a",
          },
        ],
      },
      montoLiqProdVigenteMas1a: {
        $sum: [
          "$montoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.montoLiqProdVigenteMas1a",
          },
        ],
      },
      comercialmontoLiqProdVigente: {
        $sum: [
          "$comercialmontoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigente",
          },
        ],
      },
      comercialnumLiqProdVigente: {
        $sum: [
          "$comercialnumLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.comercialnumLiqProdVigente",
          },
        ],
      },
      comercialmontoLiqProdVigente45d: {
        $sum: [
          "$comercialmontoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigente45d",
          },
        ],
      },
      comercialmontoLiqProdVigente6m: {
        $sum: [
          "$comercialmontoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigente6m",
          },
        ],
      },
      comercialmontoLiqProdVigente9m: {
        $sum: [
          "$comercialmontoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigente9m",
          },
        ],
      },
      comercialmontoLiqProdVigente1a: {
        $sum: [
          "$comercialmontoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigente1a",
          },
        ],
      },
      comercialmontoLiqProdVigenteMas1a: {
        $sum: [
          "$comercialmontoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.comercialmontoLiqProdVigenteMas1a",
          },
        ],
      },
      productivomontoLiqProdVigente: {
        $sum: [
          "$productivomontoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigente",
          },
        ],
      },
      productivonumLiqProdVigente: {
        $sum: [
          "$productivonumLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.productivonumLiqProdVigente",
          },
        ],
      },
      productivomontoLiqProdVigente45d: {
        $sum: [
          "$productivomontoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigente45d",
          },
        ],
      },
      productivomontoLiqProdVigente6m: {
        $sum: [
          "$productivomontoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigente6m",
          },
        ],
      },
      productivomontoLiqProdVigente9m: {
        $sum: [
          "$productivomontoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigente9m",
          },
        ],
      },
      productivomontoLiqProdVigente1a: {
        $sum: [
          "$productivomontoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigente1a",
          },
        ],
      },
      productivomontoLiqProdVigenteMas1a: {
        $sum: [
          "$productivomontoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.productivomontoLiqProdVigenteMas1a",
          },
        ],
      },
      hipotecariomontoLiqProdVigente: {
        $sum: [
          "$hipotecariomontoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigente",
          },
        ],
      },
      hipotecarionumLiqProdVigente: {
        $sum: [
          "$hipotecarionumLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.hipotecarionumLiqProdVigente",
          },
        ],
      },
      hipotecariomontoLiqProdVigente45d: {
        $sum: [
          "$hipotecariomontoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigente45d",
          },
        ],
      },
      hipotecariomontoLiqProdVigente6m: {
        $sum: [
          "$hipotecariomontoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigente6m",
          },
        ],
      },
      hipotecariomontoLiqProdVigente9m: {
        $sum: [
          "$hipotecariomontoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigente9m",
          },
        ],
      },
      hipotecariomontoLiqProdVigente1a: {
        $sum: [
          "$hipotecariomontoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigente1a",
          },
        ],
      },
      hipotecariomontoLiqProdVigenteMas1a: {
        $sum: [
          "$hipotecariomontoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.hipotecariomontoLiqProdVigenteMas1a",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigente: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente",
          },
        ],
      },
      emprendeBdvnumLiqProdVigente: {
        $sum: [
          "$emprendeBdvnumLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvnumLiqProdVigente",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigente45d: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente45d",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigente6m: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente6m",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigente9m: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente9m",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigente1a: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente1a",
          },
        ],
      },
      emprendeBdvmontoLiqProdVigenteMas1a: {
        $sum: [
          "$emprendeBdvmontoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.emprendeBdvmontoLiqProdVigenteMas1a",
          },
        ],
      },
      microCredmontoLiqProdVigente: {
        $sum: [
          "$microCredmontoLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigente",
          },
        ],
      },
      microCrednumLiqProdVigente: {
        $sum: [
          "$microCrednumLiqProdVigente",
          {
            $first:
              "$Liquidacionmetric.microCrednumLiqProdVigente",
          },
        ],
      },
      microCredmontoLiqProdVigente45d: {
        $sum: [
          "$microCredmontoLiqProdVigente45d",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigente45d",
          },
        ],
      },
      microCredmontoLiqProdVigente6m: {
        $sum: [
          "$microCredmontoLiqProdVigente6m",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigente6m",
          },
        ],
      },
      microCredmontoLiqProdVigente9m: {
        $sum: [
          "$microCredmontoLiqProdVigente9m",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigente9m",
          },
        ],
      },
      microCredmontoLiqProdVigente1a: {
        $sum: [
          "$microCredmontoLiqProdVigente1a",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigente1a",
          },
        ],
      },
      microCredmontoLiqProdVigenteMas1a: {
        $sum: [
          "$microCredmontoLiqProdVigenteMas1a",
          {
            $first:
              "$Liquidacionmetric.microCredmontoLiqProdVigenteMas1a",
          },
        ],
      },
    },
  },
  {
    $merge: {
      into: "Liquidacionmetric",
      on: "fecha_valor",
      whenMatched: "merge",
      whenNotMatched: "insert",
    },
  },
]

//n8n

[
  {
    "$limit": 1
  }, {
    "$lookup": {
      "from": "Parametricliquidacion", 
      "pipeline": [
        {
          "$match": {
            "$and": [
              {
                "$expr": {
                  "$eq": [
                    "$condicion", "VIGENTE"
                  ]
                }
              }, {
                "$or": [
                  {
                    "$expr": {
                      "$eq": [
                        "$productoControlGestion", "COMERCIAL"
                      ]
                    }
                  }, {
                    "$expr": {
                      "$eq": [
                        "$productoControlGestion", "PRODUCTIVO"
                      ]
                    }
                  }, {
                    "$expr": {
                      "$eq": [
                        "$productoControlGestion", "EMPRENDEBDV"
                      ]
                    }
                  }, {
                    "$expr": {
                      "$eq": [
                        "$productoControlGestion", "MICROCREDITO"
                      ]
                    }
                  }, {
                    "$expr": {
                      "$eq": [
                        "$productoControlGestion", "HIPOTECARIO"
                      ]
                    }
                  }
                ]
              }
            ]
          }
        }, {
          "$project": {
            "_id": 0
          }
        }
      ], 
      "as": "Parametricliquidacion"
    }
  }, {
    "$project": {
      "todayDate": {
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
      }, 
      "cuentasContable": "$Parametricliquidacion.cuentaContable", 
      "Parametricliquidacion": 1
    }
  }, {
    "$lookup": {
      "from": "sidis_activos_liq_bs", 
      "let": {
        "todayDate": "$todayDate"
      }, 
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$$todayDate", "$fecha_valor"
              ]
            }
          }
        }, {
          "$project": {
            "_id": 0, 
            "cuenta_contable": 1, 
            "mto_credito": "$monto_credito", 
            "fecha_vencimiento": 1, 
            "formalizacion": "$fecha_formalizacion"
          }
        }
      ], 
      "as": "sidis_activos_liq_bs"
    }
  }, {
    "$addFields": {
      "avaiableData": {
        "$cond": [
          {
            "$gt": [
              {
                "$size": "$sidis_activos_liq_bs"
              }, 0
            ]
          }, true, false
        ]
      }, 
      "firstDayMonth": {
        "$eq": [
          {
            "$dayOfMonth": "$todayDate"
          }, 1
        ]
      }, 
      "firstDayYear": {
        "$and": [
          {
            "$eq": [
              {
                "$dayOfMonth": "$todayDate"
              }, 1
            ]
          }, {
            "$eq": [
              {
                "$month": "$todayDate"
              }, 1
            ]
          }
        ]
      }, 
      "yesterdayDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "day", 
          "amount": -1
        }
      }, 
      "tomorrowDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "day", 
          "amount": 1
        }
      }, 
      "previusMonthDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "month", 
          "amount": -1
        }
      }, 
      "previusMonthlastDate": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$todayDate"
              }, 
              "month": {
                "$month": "$todayDate"
              }
            }
          }, 86400000
        ]
      }, 
      "previusYearDate": {
        "$dateAdd": {
          "startDate": "$todayDate", 
          "unit": "year", 
          "amount": -1
        }
      }, 
      "previusYearlastDate": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$todayDate"
              }
            }
          }, 86400000
        ]
      }, 
      "sidis_activos_liq_bs": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$in": [
              "$$item.cuenta_contable", "$cuentasContable"
            ]
          }
        }
      }, 
      "cuentasContable": "$$REMOVE"
    }
  }, {
    "$addFields": {
      "sidis_activos_liq_bs": {
        "$map": {
          "input": "$sidis_activos_liq_bs", 
          "as": "items", 
          "in": {
            "$mergeObjects": [
              "$$items", {
                "$first": {
                  "$filter": {
                    "input": "$Parametricliquidacion", 
                    "as": "item", 
                    "cond": {
                      "$eq": [
                        "$$item.cuentaContable", "$$items.cuenta_contable"
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }
  }, {
    "$addFields": {
      "sidis_activos_liq_bs": {
        "$map": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "in": {
            "$mergeObjects": [
              "$$item", {
                "plazo": {
                  "$divide": [
                    {
                      "$subtract": [
                        "$$item.fecha_vencimiento", "$$item.formalizacion"
                      ]
                    }, 86400000
                  ]
                }
              }, {
                "condicion": "VIGENTE"
              }
            ]
          }
        }
      }
    }
  }, {
    "$addFields": {
      "montoLiqProdVigente": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.condicion", "VIGENTE"
            ]
          }
        }
      }, 
      "numLiqProdVigente": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.condicion", "VIGENTE"
            ]
          }
        }
      }, 
      "montoLiqProdVigente45d": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$and": [
              {
                "$eq": [
                  "$$item.condicion", "VIGENTE"
                ]
              }, {
                "$lte": [
                  "$$item.plazo", 46
                ]
              }
            ]
          }
        }
      }, 
      "montoLiqProdVigente6m": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$and": [
              {
                "$eq": [
                  "$$item.condicion", "VIGENTE"
                ]
              }, {
                "$gt": [
                  "$$item.plazo", 46
                ]
              }, {
                "$lte": [
                  "$$item.plazo", 186
                ]
              }
            ]
          }
        }
      }, 
      "montoLiqProdVigente9m": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$and": [
              {
                "$eq": [
                  "$$item.condicion", "VIGENTE"
                ]
              }, {
                "$gt": [
                  "$$item.plazo", 186
                ]
              }, {
                "$lte": [
                  "$$item.plazo", 280
                ]
              }
            ]
          }
        }
      }, 
      "montoLiqProdVigente1a": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$and": [
              {
                "$eq": [
                  "$$item.condicion", "VIGENTE"
                ]
              }, {
                "$gt": [
                  "$$item.plazo", 280
                ]
              }, {
                "$lte": [
                  "$$item.plazo", 360
                ]
              }
            ]
          }
        }
      }, 
      "montoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$sidis_activos_liq_bs", 
          "as": "item", 
          "cond": {
            "$and": [
              {
                "$eq": [
                  "$$item.condicion", "VIGENTE"
                ]
              }, {
                "$gt": [
                  "$$item.plazo", 360
                ]
              }
            ]
          }
        }
      }
    }
  }, {
    "$addFields": {
      "montoLiqProdVigente": {
        "$sum": "$montoLiqProdVigente.mto_credito"
      }, 
      "numLiqProdVigente": {
        "$size": "$numLiqProdVigente"
      }, 
      "montoLiqProdVigente45d": {
        "$sum": "$montoLiqProdVigente45d.mto_credito"
      }, 
      "montoLiqProdVigente6m": {
        "$sum": "$montoLiqProdVigente6m.mto_credito"
      }, 
      "montoLiqProdVigente9m": {
        "$sum": "$montoLiqProdVigente9m.mto_credito"
      }, 
      "montoLiqProdVigente1a": {
        "$sum": "$montoLiqProdVigente1a.mto_credito"
      }, 
      "montoLiqProdVigenteMas1a": {
        "$sum": "$montoLiqProdVigenteMas1a.mto_credito"
      }, 
      "comercialmontoLiqProdVigente": {
        "$filter": {
          "input": "$montoLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialnumLiqProdVigente": {
        "$filter": {
          "input": "$numLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialmontoLiqProdVigente45d": {
        "$filter": {
          "input": "$montoLiqProdVigente45d", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialmontoLiqProdVigente6m": {
        "$filter": {
          "input": "$montoLiqProdVigente6m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialmontoLiqProdVigente9m": {
        "$filter": {
          "input": "$montoLiqProdVigente9m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialmontoLiqProdVigente1a": {
        "$filter": {
          "input": "$montoLiqProdVigente1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "comercialmontoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$montoLiqProdVigenteMas1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "COMERCIAL"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigente": {
        "$filter": {
          "input": "$montoLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivonumLiqProdVigente": {
        "$filter": {
          "input": "$numLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigente45d": {
        "$filter": {
          "input": "$montoLiqProdVigente45d", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigente6m": {
        "$filter": {
          "input": "$montoLiqProdVigente6m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigente9m": {
        "$filter": {
          "input": "$montoLiqProdVigente9m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigente1a": {
        "$filter": {
          "input": "$montoLiqProdVigente1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "productivomontoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$montoLiqProdVigenteMas1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "PRODUCTIVO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigente": {
        "$filter": {
          "input": "$montoLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecarionumLiqProdVigente": {
        "$filter": {
          "input": "$numLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigente45d": {
        "$filter": {
          "input": "$montoLiqProdVigente45d", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigente6m": {
        "$filter": {
          "input": "$montoLiqProdVigente6m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigente9m": {
        "$filter": {
          "input": "$montoLiqProdVigente9m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigente1a": {
        "$filter": {
          "input": "$montoLiqProdVigente1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "hipotecariomontoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$montoLiqProdVigenteMas1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "HIPOTECARIO"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigente": {
        "$filter": {
          "input": "$montoLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvnumLiqProdVigente": {
        "$filter": {
          "input": "$numLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigente45d": {
        "$filter": {
          "input": "$montoLiqProdVigente45d", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigente6m": {
        "$filter": {
          "input": "$montoLiqProdVigente6m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigente9m": {
        "$filter": {
          "input": "$montoLiqProdVigente9m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigente1a": {
        "$filter": {
          "input": "$montoLiqProdVigente1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "emprendeBdvmontoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$montoLiqProdVigenteMas1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "EMPRENDEBDV"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigente": {
        "$filter": {
          "input": "$montoLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCrednumLiqProdVigente": {
        "$filter": {
          "input": "$numLiqProdVigente", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigente45d": {
        "$filter": {
          "input": "$montoLiqProdVigente45d", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigente6m": {
        "$filter": {
          "input": "$montoLiqProdVigente6m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigente9m": {
        "$filter": {
          "input": "$montoLiqProdVigente9m", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigente1a": {
        "$filter": {
          "input": "$montoLiqProdVigente1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }, 
      "microCredmontoLiqProdVigenteMas1a": {
        "$filter": {
          "input": "$montoLiqProdVigenteMas1a", 
          "as": "item", 
          "cond": {
            "$eq": [
              "$$item.productoControlGestion", "MICROCREDITO"
            ]
          }
        }
      }
    }
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "Parametricliquidacion": "$$REMOVE", 
      "sidis_activos_liq_bs": "$$REMOVE", 
      "todayDate": "$$REMOVE", 
      "fecha_valor": "$todayDate", 
      "comercialmontoLiqProdVigente": {
        "$sum": "$comercialmontoLiqProdVigente.mto_credito"
      }, 
      "comercialnumLiqProdVigente": {
        "$size": "$comercialnumLiqProdVigente.mto_credito"
      }, 
      "comercialmontoLiqProdVigente45d": {
        "$sum": "$comercialmontoLiqProdVigente45d.mto_credito"
      }, 
      "comercialmontoLiqProdVigente6m": {
        "$sum": "$comercialmontoLiqProdVigente6m.mto_credito"
      }, 
      "comercialmontoLiqProdVigente9m": {
        "$sum": "$comercialmontoLiqProdVigente9m.mto_credito"
      }, 
      "comercialmontoLiqProdVigente1a": {
        "$sum": "$comercialmontoLiqProdVigente1a.mto_credito"
      }, 
      "comercialmontoLiqProdVigenteMas1a": {
        "$sum": "$comercialmontoLiqProdVigenteMas1a.mto_credito"
      }, 
      "productivomontoLiqProdVigente": {
        "$sum": "$productivomontoLiqProdVigente.mto_credito"
      }, 
      "productivonumLiqProdVigente": {
        "$size": "$productivonumLiqProdVigente.mto_credito"
      }, 
      "productivomontoLiqProdVigente45d": {
        "$sum": "$productivomontoLiqProdVigente45d.mto_credito"
      }, 
      "productivomontoLiqProdVigente6m": {
        "$sum": "$productivomontoLiqProdVigente6m.mto_credito"
      }, 
      "productivomontoLiqProdVigente9m": {
        "$sum": "$productivomontoLiqProdVigente9m.mto_credito"
      }, 
      "productivomontoLiqProdVigente1a": {
        "$sum": "$productivomontoLiqProdVigente1a.mto_credito"
      }, 
      "productivomontoLiqProdVigenteMas1a": {
        "$sum": "$productivomontoLiqProdVigenteMas1a.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigente": {
        "$sum": "$hipotecariomontoLiqProdVigente.mto_credito"
      }, 
      "hipotecarionumLiqProdVigente": {
        "$size": "$hipotecarionumLiqProdVigente.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigente45d": {
        "$sum": "$hipotecariomontoLiqProdVigente45d.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigente6m": {
        "$sum": "$hipotecariomontoLiqProdVigente6m.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigente9m": {
        "$sum": "$hipotecariomontoLiqProdVigente9m.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigente1a": {
        "$sum": "$hipotecariomontoLiqProdVigente1a.mto_credito"
      }, 
      "hipotecariomontoLiqProdVigenteMas1a": {
        "$sum": "$hipotecariomontoLiqProdVigenteMas1a.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigente": {
        "$sum": "$emprendeBdvmontoLiqProdVigente.mto_credito"
      }, 
      "emprendeBdvnumLiqProdVigente": {
        "$size": "$emprendeBdvnumLiqProdVigente.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigente45d": {
        "$sum": "$emprendeBdvmontoLiqProdVigente45d.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigente6m": {
        "$sum": "$emprendeBdvmontoLiqProdVigente6m.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigente9m": {
        "$sum": "$emprendeBdvmontoLiqProdVigente9m.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigente1a": {
        "$sum": "$emprendeBdvmontoLiqProdVigente1a.mto_credito"
      }, 
      "emprendeBdvmontoLiqProdVigenteMas1a": {
        "$sum": "$emprendeBdvmontoLiqProdVigenteMas1a.mto_credito"
      }, 
      "microCredmontoLiqProdVigente": {
        "$sum": "$microCredmontoLiqProdVigente.mto_credito"
      }, 
      "microCrednumLiqProdVigente": {
        "$size": "$microCrednumLiqProdVigente.mto_credito"
      }, 
      "microCredmontoLiqProdVigente45d": {
        "$sum": "$microCredmontoLiqProdVigente45d.mto_credito"
      }, 
      "microCredmontoLiqProdVigente6m": {
        "$sum": "$microCredmontoLiqProdVigente6m.mto_credito"
      }, 
      "microCredmontoLiqProdVigente9m": {
        "$sum": "$microCredmontoLiqProdVigente9m.mto_credito"
      }, 
      "microCredmontoLiqProdVigente1a": {
        "$sum": "$microCredmontoLiqProdVigente1a.mto_credito"
      }, 
      "microCredmontoLiqProdVigenteMas1a": {
        "$sum": "$microCredmontoLiqProdVigenteMas1a.mto_credito"
      }
    }
  }, {
    "$lookup": {
      "from": "Liquidacionmetric", 
      "localField": "fecha_valor", 
      "foreignField": "fecha_valor", 
      "as": "Liquidacionmetric"
    }
  }, {
    "$addFields": {
      "Liquidacionmetric": "$$REMOVE", 
      "montoLiqProdVigente": {
        "$sum": [
          "$montoLiqProdVigente", {
            "$first": "$Liquidacionmetric.montoLiqProdVigente"
          }
        ]
      }, 
      "numLiqProdVigente": {
        "$sum": [
          "$numLiqProdVigente", {
            "$first": "$Liquidacionmetric.numLiqProdVigente"
          }
        ]
      }, 
      "montoLiqProdVigente45d": {
        "$sum": [
          "$montoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.montoLiqProdVigente45d"
          }
        ]
      }, 
      "montoLiqProdVigente6m": {
        "$sum": [
          "$montoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.montoLiqProdVigente6m"
          }
        ]
      }, 
      "montoLiqProdVigente9m": {
        "$sum": [
          "$montoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.montoLiqProdVigente9m"
          }
        ]
      }, 
      "montoLiqProdVigente1a": {
        "$sum": [
          "$montoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.montoLiqProdVigente1a"
          }
        ]
      }, 
      "montoLiqProdVigenteMas1a": {
        "$sum": [
          "$montoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.montoLiqProdVigenteMas1a"
          }
        ]
      }, 
      "comercialmontoLiqProdVigente": {
        "$sum": [
          "$comercialmontoLiqProdVigente", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigente"
          }
        ]
      }, 
      "comercialnumLiqProdVigente": {
        "$sum": [
          "$comercialnumLiqProdVigente", {
            "$first": "$Liquidacionmetric.comercialnumLiqProdVigente"
          }
        ]
      }, 
      "comercialmontoLiqProdVigente45d": {
        "$sum": [
          "$comercialmontoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigente45d"
          }
        ]
      }, 
      "comercialmontoLiqProdVigente6m": {
        "$sum": [
          "$comercialmontoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigente6m"
          }
        ]
      }, 
      "comercialmontoLiqProdVigente9m": {
        "$sum": [
          "$comercialmontoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigente9m"
          }
        ]
      }, 
      "comercialmontoLiqProdVigente1a": {
        "$sum": [
          "$comercialmontoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigente1a"
          }
        ]
      }, 
      "comercialmontoLiqProdVigenteMas1a": {
        "$sum": [
          "$comercialmontoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.comercialmontoLiqProdVigenteMas1a"
          }
        ]
      }, 
      "productivomontoLiqProdVigente": {
        "$sum": [
          "$productivomontoLiqProdVigente", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigente"
          }
        ]
      }, 
      "productivonumLiqProdVigente": {
        "$sum": [
          "$productivonumLiqProdVigente", {
            "$first": "$Liquidacionmetric.productivonumLiqProdVigente"
          }
        ]
      }, 
      "productivomontoLiqProdVigente45d": {
        "$sum": [
          "$productivomontoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigente45d"
          }
        ]
      }, 
      "productivomontoLiqProdVigente6m": {
        "$sum": [
          "$productivomontoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigente6m"
          }
        ]
      }, 
      "productivomontoLiqProdVigente9m": {
        "$sum": [
          "$productivomontoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigente9m"
          }
        ]
      }, 
      "productivomontoLiqProdVigente1a": {
        "$sum": [
          "$productivomontoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigente1a"
          }
        ]
      }, 
      "productivomontoLiqProdVigenteMas1a": {
        "$sum": [
          "$productivomontoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.productivomontoLiqProdVigenteMas1a"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigente": {
        "$sum": [
          "$hipotecariomontoLiqProdVigente", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigente"
          }
        ]
      }, 
      "hipotecarionumLiqProdVigente": {
        "$sum": [
          "$hipotecarionumLiqProdVigente", {
            "$first": "$Liquidacionmetric.hipotecarionumLiqProdVigente"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigente45d": {
        "$sum": [
          "$hipotecariomontoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigente45d"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigente6m": {
        "$sum": [
          "$hipotecariomontoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigente6m"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigente9m": {
        "$sum": [
          "$hipotecariomontoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigente9m"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigente1a": {
        "$sum": [
          "$hipotecariomontoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigente1a"
          }
        ]
      }, 
      "hipotecariomontoLiqProdVigenteMas1a": {
        "$sum": [
          "$hipotecariomontoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.hipotecariomontoLiqProdVigenteMas1a"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigente": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigente", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente"
          }
        ]
      }, 
      "emprendeBdvnumLiqProdVigente": {
        "$sum": [
          "$emprendeBdvnumLiqProdVigente", {
            "$first": "$Liquidacionmetric.emprendeBdvnumLiqProdVigente"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigente45d": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente45d"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigente6m": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente6m"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigente9m": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente9m"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigente1a": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigente1a"
          }
        ]
      }, 
      "emprendeBdvmontoLiqProdVigenteMas1a": {
        "$sum": [
          "$emprendeBdvmontoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.emprendeBdvmontoLiqProdVigenteMas1a"
          }
        ]
      }, 
      "microCredmontoLiqProdVigente": {
        "$sum": [
          "$microCredmontoLiqProdVigente", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigente"
          }
        ]
      }, 
      "microCrednumLiqProdVigente": {
        "$sum": [
          "$microCrednumLiqProdVigente", {
            "$first": "$Liquidacionmetric.microCrednumLiqProdVigente"
          }
        ]
      }, 
      "microCredmontoLiqProdVigente45d": {
        "$sum": [
          "$microCredmontoLiqProdVigente45d", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigente45d"
          }
        ]
      }, 
      "microCredmontoLiqProdVigente6m": {
        "$sum": [
          "$microCredmontoLiqProdVigente6m", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigente6m"
          }
        ]
      }, 
      "microCredmontoLiqProdVigente9m": {
        "$sum": [
          "$microCredmontoLiqProdVigente9m", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigente9m"
          }
        ]
      }, 
      "microCredmontoLiqProdVigente1a": {
        "$sum": [
          "$microCredmontoLiqProdVigente1a", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigente1a"
          }
        ]
      }, 
      "microCredmontoLiqProdVigenteMas1a": {
        "$sum": [
          "$microCredmontoLiqProdVigenteMas1a", {
            "$first": "$Liquidacionmetric.microCredmontoLiqProdVigenteMas1a"
          }
        ]
      }
    }
  }, {
    "$merge": {
      "into": "Liquidacionmetric", 
      "on": "fecha_valor", 
      "whenMatched": "merge", 
      "whenNotMatched": "insert"
    }
  }
]