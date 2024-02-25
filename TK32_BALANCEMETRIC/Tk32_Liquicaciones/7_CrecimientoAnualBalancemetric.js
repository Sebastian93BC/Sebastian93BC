[
  {
    $match: {
      $expr: {
        $gte: [
          "$fecha_valor",
          {
            $toDate: "2022-12-31",
          },
        ],
      },
    },
  },
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
                $toInt: "45",
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
      dateMonthbefore: {
        $subtract: [
          {
            $dateFromParts: {
              year: {
                $year: "$today",
              },
            },
          },
          86400000,
        ],
      },
    },
  },
  {
    $match: {
      $or: [
        {
          $expr: {
            $eq: [
              "$fecha_valor",
              "$dateMonthbefore",
            ],
          },
        },
        {
          $expr: {
            $eq: ["$fecha_valor", "$today"],
          },
        },
      ],
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
      liquidacionesmontoLiqProdtotalBdvacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.montoLiqProd.totalBdv.acAnual",
            0,
          ],
        },
      },
      liquidacionesmontoLiqProdproductivoacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidaciones.montoLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdhipotecarioacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidaciones.montoLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdemprendeBdvacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidaciones.montoLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdcomercialacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.montoLiqProd.comercial.acAnual",
            0,
          ],
        },
      },
      liquidacionesmontoLiqProdmicroCredacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.montoLiqProd.microCred.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdtotalBdvacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.totalBdv.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdproductivoacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.productivo.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdhipotecarioacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.hipotecario.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdemprendeBdvacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.emprendeBdv.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdcomercialacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.comercial.acAnual",
            0,
          ],
        },
      },
      liquidacionesnumLiqProdmicroCredacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidaciones.numLiqProd.microCred.acAnual",
            0,
          ],
        },
      },
      liquidacionesmontoLiqProdtotalBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.totalBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdproductivoacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdhipotecarioacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdemprendeBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdcomercialacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.comercial.acAnual",
              0,
            ],
          },
        },
      liquidacionesmontoLiqProdmicroCredacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.montoLiqProd.microCred.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdtotalBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.totalBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdproductivoacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdhipotecarioacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdemprendeBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdcomercialacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.comercial.acAnual",
              0,
            ],
          },
        },
      liquidacionesnumLiqProdmicroCredacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidaciones.numLiqProd.microCred.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdtotalBdvacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.totalBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdproductivoacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdhipotecarioacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdemprendeBdvacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdcomercialacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.comercial.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdmicroCredacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.montoLiqProd.microCred.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdtotalBdvacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidacionesBs.numLiqProd.totalBdv.acAnual",
            0,
          ],
        },
      },
      liquidacionesBsnumLiqProdproductivoacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.numLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdhipotecarioacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.numLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdemprendeBdvacAnual:
        {
          $sum: {
            $cond: [
              {
                $eq: ["$fecha_valor", "$today"],
              },
              "$liquidacionesBs.numLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdcomercialacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidacionesBs.numLiqProd.comercial.acAnual",
            0,
          ],
        },
      },
      liquidacionesBsnumLiqProdmicroCredacAnual: {
        $sum: {
          $cond: [
            {
              $eq: ["$fecha_valor", "$today"],
            },
            "$liquidacionesBs.numLiqProd.microCred.acAnual",
            0,
          ],
        },
      },
      liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.totalBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdproductivoacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdcomercialacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.comercial.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsmontoLiqProdmicroCredacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.montoLiqProd.microCred.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdtotalBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.totalBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdproductivoacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.productivo.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdhipotecarioacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.hipotecario.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.emprendeBdv.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdcomercialacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.comercial.acAnual",
              0,
            ],
          },
        },
      liquidacionesBsnumLiqProdmicroCredacAnualAnterior:
        {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$fecha_valor",
                  "$dateMonthbefore",
                ],
              },
              "$liquidacionesBs.numLiqProd.microCred.acAnual",
              0,
            ],
          },
        },
    },
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      "liquidaciones.montoLiqProd.totalBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdtotalBdvacAnual",
                            "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.montoLiqProd.productivo.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdproductivoacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdproductivoacAnual",
                            "$liquidacionesmontoLiqProdproductivoacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdproductivoacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.montoLiqProd.hipotecario.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdhipotecarioacAnual",
                            "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.montoLiqProd.emprendeBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdemprendeBdvacAnual",
                            "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.montoLiqProd.comercial.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdcomercialacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdcomercialacAnual",
                            "$liquidacionesmontoLiqProdcomercialacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdcomercialacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.montoLiqProd.microCred.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesmontoLiqProdmicroCredacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesmontoLiqProdmicroCredacAnual",
                            "$liquidacionesmontoLiqProdmicroCredacAnualAnterior",
                          ],
                        },
                        "$liquidacionesmontoLiqProdmicroCredacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.totalBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdtotalBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdtotalBdvacAnual",
                            "$liquidacionesnumLiqProdtotalBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdtotalBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.productivo.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdproductivoacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdproductivoacAnual",
                            "$liquidacionesnumLiqProdproductivoacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdproductivoacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.hipotecario.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdhipotecarioacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdhipotecarioacAnual",
                            "$liquidacionesnumLiqProdhipotecarioacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdhipotecarioacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.emprendeBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdemprendeBdvacAnual",
                            "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.comercial.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdcomercialacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdcomercialacAnual",
                            "$liquidacionesnumLiqProdcomercialacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdcomercialacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidaciones.numLiqProd.microCred.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesnumLiqProdmicroCredacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesnumLiqProdmicroCredacAnual",
                            "$liquidacionesnumLiqProdmicroCredacAnualAnterior",
                          ],
                        },
                        "$liquidacionesnumLiqProdmicroCredacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.totalBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdtotalBdvacAnual",
                            "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.productivo.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdproductivoacAnual",
                            "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.hipotecario.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdhipotecarioacAnual",
                            "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.emprendeBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdemprendeBdvacAnual",
                            "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.comercial.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdcomercialacAnual",
                            "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.montoLiqProd.microCred.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsmontoLiqProdmicroCredacAnual",
                            "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.totalBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdtotalBdvacAnual",
                            "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.productivo.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdproductivoacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdproductivoacAnual",
                            "$liquidacionesBsnumLiqProdproductivoacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdproductivoacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.hipotecario.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdhipotecarioacAnual",
                            "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.emprendeBdv.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdemprendeBdvacAnual",
                            "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.comercial.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdcomercialacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdcomercialacAnual",
                            "$liquidacionesBsnumLiqProdcomercialacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdcomercialacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      "liquidacionesBs.numLiqProd.microCred.creAnual":
        {
          $cond: [
            {
              $gt: [
                "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior",
                0,
              ],
            },
            {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            "$liquidacionesBsnumLiqProdmicroCredacAnual",
                            "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior",
                          ],
                        },
                        "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior",
                      ],
                    },
                    100,
                  ],
                },
                2,
              ],
            },
            "$$REMOVE",
          ],
        },
      liquidacionesmontoLiqProdtotalBdvacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdproductivoacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdhipotecarioacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdemprendeBdvacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdcomercialacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdmicroCredacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdtotalBdvacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdproductivoacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdhipotecarioacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdemprendeBdvacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdcomercialacAnual:
        "$$REMOVE",
      liquidacionesnumLiqProdmicroCredacAnual:
        "$$REMOVE",
      liquidacionesmontoLiqProdtotalBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesmontoLiqProdproductivoacAnualAnterior:
        "$$REMOVE",
      liquidacionesmontoLiqProdhipotecarioacAnualAnterior:
        "$$REMOVE",
      liquidacionesmontoLiqProdemprendeBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesmontoLiqProdcomercialacAnualAnterior:
        "$$REMOVE",
      liquidacionesmontoLiqProdmicroCredacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdtotalBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdproductivoacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdhipotecarioacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdemprendeBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdcomercialacAnualAnterior:
        "$$REMOVE",
      liquidacionesnumLiqProdmicroCredacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdtotalBdvacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdproductivoacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdhipotecarioacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdemprendeBdvacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdcomercialacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdmicroCredacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdtotalBdvacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdproductivoacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdhipotecarioacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdemprendeBdvacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdcomercialacAnual:
        "$$REMOVE",
      liquidacionesBsnumLiqProdmicroCredacAnual:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdproductivoacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdcomercialacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsmontoLiqProdmicroCredacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdtotalBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdproductivoacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdhipotecarioacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdcomercialacAnualAnterior:
        "$$REMOVE",
      liquidacionesBsnumLiqProdmicroCredacAnualAnterior:
        "$$REMOVE",
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
    "$match": {
      "$expr": {
        "$gte": [
          "$fecha_valor", {
            "$toDate": "2022-12-31"
          }
        ]
      }
    }
  }, {
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
      "dateMonthbefore": {
        "$subtract": [
          {
            "$dateFromParts": {
              "year": {
                "$year": "$today"
              }
            }
          }, 86400000
        ]
      }
    }
  }, {
    "$match": {
      "$or": [
        {
          "$expr": {
            "$eq": [
              "$fecha_valor", "$dateMonthbefore"
            ]
          }
        }, {
          "$expr": {
            "$eq": [
              "$fecha_valor", "$today"
            ]
          }
        }
      ]
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
      "liquidacionesmontoLiqProdtotalBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdproductivoacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdhipotecarioacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdemprendeBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdcomercialacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdmicroCredacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.montoLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdtotalBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdproductivoacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdhipotecarioacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdemprendeBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdcomercialacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdmicroCredacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidaciones.numLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdtotalBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdproductivoacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdhipotecarioacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdemprendeBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdcomercialacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesmontoLiqProdmicroCredacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.montoLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdtotalBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdproductivoacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdhipotecarioacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdemprendeBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdcomercialacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesnumLiqProdmicroCredacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidaciones.numLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdtotalBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdproductivoacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdhipotecarioacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdemprendeBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdcomercialacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdmicroCredacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.montoLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdtotalBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdproductivoacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdhipotecarioacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdemprendeBdvacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdcomercialacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdmicroCredacAnual": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$today"
              ]
            }, "$liquidacionesBs.numLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdproductivoacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdcomercialacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsmontoLiqProdmicroCredacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.montoLiqProd.microCred.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdtotalBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.totalBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdproductivoacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.productivo.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdhipotecarioacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.hipotecario.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.emprendeBdv.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdcomercialacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.comercial.acAnual", 0
          ]
        }
      }, 
      "liquidacionesBsnumLiqProdmicroCredacAnualAnterior": {
        "$sum": {
          "$cond": [
            {
              "$eq": [
                "$fecha_valor", "$dateMonthbefore"
              ]
            }, "$liquidacionesBs.numLiqProd.microCred.acAnual", 0
          ]
        }
      }
    }
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "liquidaciones.montoLiqProd.totalBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdtotalBdvacAnual", "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdtotalBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.montoLiqProd.productivo.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdproductivoacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdproductivoacAnual", "$liquidacionesmontoLiqProdproductivoacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdproductivoacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.montoLiqProd.hipotecario.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdhipotecarioacAnual", "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdhipotecarioacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.montoLiqProd.emprendeBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdemprendeBdvacAnual", "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdemprendeBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.montoLiqProd.comercial.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdcomercialacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdcomercialacAnual", "$liquidacionesmontoLiqProdcomercialacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdcomercialacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.montoLiqProd.microCred.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesmontoLiqProdmicroCredacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesmontoLiqProdmicroCredacAnual", "$liquidacionesmontoLiqProdmicroCredacAnualAnterior"
                        ]
                      }, "$liquidacionesmontoLiqProdmicroCredacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.totalBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdtotalBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdtotalBdvacAnual", "$liquidacionesnumLiqProdtotalBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdtotalBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.productivo.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdproductivoacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdproductivoacAnual", "$liquidacionesnumLiqProdproductivoacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdproductivoacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.hipotecario.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdhipotecarioacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdhipotecarioacAnual", "$liquidacionesnumLiqProdhipotecarioacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdhipotecarioacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.emprendeBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdemprendeBdvacAnual", "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdemprendeBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.comercial.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdcomercialacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdcomercialacAnual", "$liquidacionesnumLiqProdcomercialacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdcomercialacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidaciones.numLiqProd.microCred.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesnumLiqProdmicroCredacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesnumLiqProdmicroCredacAnual", "$liquidacionesnumLiqProdmicroCredacAnualAnterior"
                        ]
                      }, "$liquidacionesnumLiqProdmicroCredacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.totalBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdtotalBdvacAnual", "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.productivo.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdproductivoacAnual", "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdproductivoacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.hipotecario.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdhipotecarioacAnual", "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.emprendeBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdemprendeBdvacAnual", "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.comercial.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdcomercialacAnual", "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdcomercialacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.montoLiqProd.microCred.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsmontoLiqProdmicroCredacAnual", "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior"
                        ]
                      }, "$liquidacionesBsmontoLiqProdmicroCredacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.totalBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdtotalBdvacAnual", "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdtotalBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.productivo.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdproductivoacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdproductivoacAnual", "$liquidacionesBsnumLiqProdproductivoacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdproductivoacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.hipotecario.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdhipotecarioacAnual", "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdhipotecarioacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.emprendeBdv.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdemprendeBdvacAnual", "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.comercial.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdcomercialacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdcomercialacAnual", "$liquidacionesBsnumLiqProdcomercialacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdcomercialacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesBs.numLiqProd.microCred.creAnual": {
        "$cond": [
          {
            "$gt": [
              "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior", 0
            ]
          }, {
            "$round": [
              {
                "$multiply": [
                  {
                    "$divide": [
                      {
                        "$subtract": [
                          "$liquidacionesBsnumLiqProdmicroCredacAnual", "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior"
                        ]
                      }, "$liquidacionesBsnumLiqProdmicroCredacAnualAnterior"
                    ]
                  }, 100
                ]
              }, 2
            ]
          }, "$$REMOVE"
        ]
      }, 
      "liquidacionesmontoLiqProdtotalBdvacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdproductivoacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdhipotecarioacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdemprendeBdvacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdcomercialacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdmicroCredacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdtotalBdvacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdproductivoacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdhipotecarioacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdemprendeBdvacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdcomercialacAnual": "$$REMOVE", 
      "liquidacionesnumLiqProdmicroCredacAnual": "$$REMOVE", 
      "liquidacionesmontoLiqProdtotalBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesmontoLiqProdproductivoacAnualAnterior": "$$REMOVE", 
      "liquidacionesmontoLiqProdhipotecarioacAnualAnterior": "$$REMOVE", 
      "liquidacionesmontoLiqProdemprendeBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesmontoLiqProdcomercialacAnualAnterior": "$$REMOVE", 
      "liquidacionesmontoLiqProdmicroCredacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdtotalBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdproductivoacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdhipotecarioacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdemprendeBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdcomercialacAnualAnterior": "$$REMOVE", 
      "liquidacionesnumLiqProdmicroCredacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdtotalBdvacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdproductivoacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdhipotecarioacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdemprendeBdvacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdcomercialacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdmicroCredacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdtotalBdvacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdproductivoacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdhipotecarioacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdemprendeBdvacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdcomercialacAnual": "$$REMOVE", 
      "liquidacionesBsnumLiqProdmicroCredacAnual": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdtotalBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdproductivoacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdhipotecarioacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdemprendeBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdcomercialacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsmontoLiqProdmicroCredacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdtotalBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdproductivoacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdhipotecarioacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdemprendeBdvacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdcomercialacAnualAnterior": "$$REMOVE", 
      "liquidacionesBsnumLiqProdmicroCredacAnualAnterior": "$$REMOVE"
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