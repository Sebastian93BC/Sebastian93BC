[
    {
      $match: {
        mcl_naturaleza_producto: {
          $in: [1, "1"],
        },
        mcl_producto: {
          $in: [
            9501,
            9502,
            9509,
            9506,
            "9501",
            "9502",
            "9509",
            "9506",
          ],
        },
        mcl_fecha_proceso: ISODate("2023-07-31"),
        //mcl_rif_cedula:'V11925194'
      },
    },
    {
      $group: {
        _id: {
          tarjeta: {
            $switch: {
              branches: [
                {
                  case: {
                    $in: [
                      "$mcl_bin_tarjeta",
                      [
                        "455612",
                        "455613",
                        "455615",
                        "448174",
                        "459347",
                        "462229",
                        "455614",
                      ],
                    ],
                  },
                  then: "VISA",
                },
                {
                  case: {
                    $in: [
                      "$mcl_bin_tarjeta",
                      [
                        "542037",
                        "540019",
                        "546690",
                        "552292",
                      ],
                    ],
                  },
                  then: "MASTERCARD",
                },
                {
                  case: {
                    $eq: [
                      "$mcl_bin_tarjeta",
                      "540145",
                    ],
                  },
                  then: "MASTERCARD_PRE",
                },
              ],
              default: "OTRO",
            },
          },
          rifCedula: "$mcl_rif_cedula",
        },
        fechaProceso: {
          $first: "$mcl_fecha_proceso",
        },
        rifCedula: {
          $first: "$mcl_rif_cedula",
        },
        nombreCliente: {
          $first: "$mcl_nombre_cliente",
        },
        nroTarjeta: {
          $first: {
            $substr: [
              "$mcl_documento_asociado",
              4,
              16,
            ],
          },
        },
        binTarjeta: {
          $first: "$mcl_bin_tarjeta",
        },
        limiteCredito: {
          $max: {
            $round: ["$mcl_limite_credito", 4],
          },
        },
        saldo: {
          $sum: {
            $round: ["$mcl_saldo", 4],
          },
        },
      },
    },
    {
      $addFields: {
        tarjeta: "$_id.tarjeta",
      },
    },
    {
      $group: {
        _id: {
          rifCedula: "$rifCedula",
          fechaProceso: "$fechaProceso",
        },
        rifCedula: {
          $first: "$rifCedula",
        },
        fechaProceso: {
          $first: "$fechaProceso",
        },
        tdcProdVinVisalimiteCredito: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "VISA"],
              },
              "$limiteCredito",
              0,
            ],
          },
        },
        tdcProdVinVisasaldo: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "VISA"],
              },
              "$saldo",
              0,
            ],
          },
        },
        tdcProdVinVisabinTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "VISA"],
              },
              "$binTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinVisanroTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "VISA"],
              },
              "$nroTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardlimiteCredito: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "MASTERCARD"],
              },
              "$limiteCredito",
              0,
            ],
          },
        },
        tdcProdVinMastercardsaldo: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "MASTERCARD"],
              },
              "$saldo",
              0,
            ],
          },
        },
        tdcProdVinMastercardbinTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "MASTERCARD"],
              },
              "$binTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardnroTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "MASTERCARD"],
              },
              "$nroTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardPrelimiteCredito: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$_id.tarjeta",
                  "MASTERCARD_PRE",
                ],
              },
              "$limiteCredito",
              0,
            ],
          },
        },
        tdcProdVinMastercardPresaldo: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$_id.tarjeta",
                  "MASTERCARD_PRE",
                ],
              },
              "$saldo",
              0,
            ],
          },
        },
        tdcProdVinMastercardPrebinTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: [
                  "$_id.tarjeta",
                  "MASTERCARD_PRE",
                ],
              },
              "$binTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardPrenroTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: [
                  "$_id.tarjeta",
                  "MASTERCARD_PRE",
                ],
              },
              "$nroTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinotroslimiteCredito: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "OTRO"],
              },
              "$limiteCredito",
              0,
            ],
          },
        },
        tdcProdVinotrossaldo: {
          $sum: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "OTRO"],
              },
              "$saldo",
              0,
            ],
          },
        },
        tdcProdVinotrosbinTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "OTRO"],
              },
              "$binTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinotrosnroTarjeta: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "OTRO"],
              },
              "$nroTarjeta",
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinVisaactive: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "VISA"],
              },
              true,
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardactive: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "MASTERCARD"],
              },
              true,
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinMastercardPreactive: {
          $addToSet: {
            $cond: [
              {
                $eq: [
                  "$_id.tarjeta",
                  "MASTERCARD_PRE",
                ],
              },
              true,
              "$$REMOVE",
            ],
          },
        },
        tdcProdVinotrosactive: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$_id.tarjeta", "OTROS"],
              },
              true,
              "$$REMOVE",
            ],
          },
        },
      },
    },
    {
      $addFields: {
        _id: "$$REMOVE",
        tdcProdVinVisaNombre: "Visa",
        tdcProdVinVisaactive: {
          $cond: [
            {
              $gt: [
                {
                  $size: "$tdcProdVinVisaactive",
                },
                0,
              ],
            },
            {
              $first: "$tdcProdVinVisaactive",
            },
            false,
          ],
        },
        tdcProdVinVisalastUse: null,
        tdcProdVinVisaFirstUse: null,
        tdcProdVinVisabinTarjeta: {
          $first: "$tdcProdVinVisabinTarjeta",
        },
        tdcProdVinVisanroTarjeta: {
          $first: "$tdcProdVinVisanroTarjeta",
        },
        tdcProdVinMastercardNombre: "Mastercard",
        tdcProdVinMastercardactive: {
          $cond: [
            {
              $gt: [
                {
                  $size:
                    "$tdcProdVinMastercardactive",
                },
                0,
              ],
            },
            {
              $first: "$tdcProdVinMastercardactive",
            },
            false,
          ],
        },
        tdcProdVinMastercardlastUse: null,
        tdcProdVinMastercardFirstUse: null,
        tdcProdVinMastercardbinTarjeta: {
          $first: "$tdcProdVinMastercardbinTarjeta",
        },
        tdcProdVinMastercardnroTarjeta: {
          $first: "$tdcProdVinMastercardnroTarjeta",
        },
        tdcProdVinMastercardPreNombre:
          "Mastercard Pre",
        tdcProdVinMastercardPreactive: {
          $cond: [
            {
              $gt: [
                {
                  $size:
                    "$tdcProdVinMastercardPreactive",
                },
                0,
              ],
            },
            {
              $first:
                "$tdcProdVinMastercardPreactive",
            },
            false,
          ],
        },
        tdcProdVinMastercardPrelastUse: null,
        tdcProdVinMastercardPreFirstUse: null,
        tdcProdVinMastercardPrebinTarjeta: {
          $first:
            "$tdcProdVinMastercardPrebinTarjeta",
        },
        tdcProdVinMastercardPrenroTarjeta: {
          $first:
            "$tdcProdVinMastercardPrenroTarjeta",
        },
        tdcProdVinotrosNombre: "otros",
        tdcProdVinotrosactive: {
          $cond: [
            {
              $gt: [
                {
                  $size: "$tdcProdVinotrosactive",
                },
                0,
              ],
            },
            {
              $first: "$tdcProdVinotrosactive",
            },
            false,
          ],
        },
        tdcProdVinotroslastUse: null,
        tdcProdVinotrosFirstUse: null,
        tdcProdVinotrosbinTarjeta: {
          $first: "$tdcProdVinotrosbinTarjeta",
        },
        tdcProdVinotrosnroTarjeta: {
          $first: "$tdcProdVinotrosnroTarjeta",
        },
      },
    },
    // {
    //   $merge: {
    //     into: "sidis_productosVinculados",
    //     on: ["fechaProceso", "rifCedula"],
    //     whenMatched: "merge",
    //     whenNotMatched: "insert",
    //   },
    // }
  ]