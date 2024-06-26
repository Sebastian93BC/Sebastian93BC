[
  {
    $match:{
      rifCedula:{$in:[]}
    }
  },
  {
    $project: {
      fechaProceso: 1,
      rifCedula: 1,
      tkNombreCliente:1,
      nombreBanca: 1,
      codigoBanca: 1,
      nombreSegmento: 1,
      codigoSegmento: 1,
      nombreSubsegmento: 1,
      codigoSubsegmento: 1,
      nombreGrupoeconomico: 1,
      codigoGrupoeconomico: 1,
      nombreNSE: 1,
      nombreCliente: 1,
      regionName: 1,
      regionCode: 1,
      state: 1,
      sexo: 1,
      generacion: 1,
      volumenPagosProveedor: 1,
      volumenPagosProveedorBDV: 1,
      volumenPagosProveedorOTRO: 1,
      cantidadBeneficiario: 1,
      reciprocidadBeneficiario: 1,
      saldoActivo: 1,
      saldoActivoDivisaOrigen: 1,
      promedioActivo: 1,
      promedioActivoDivisaOrigen: 1,
      montoDebitosActivo: 1,
      montoDebitosActivoDivisaOrigen: 1,
      montoCreditosActivos: 1,
      montoCreditosActivoDivisaOrigen: 1,
      abonoLiqActivo: 1,
      abonoLiqActivoDivisaOrigen: 1,
      interesesActivo: 1,
      interesesActivoDivisaOrigen: 1,
      numeroContratosActivoBolivar: 1,
      numeroContratosActivo: 1,
      numDebitosActivoBolivar: 1,
      numDebitosActivo: 1,
      numCreditosActivoBolivar: 1,
      numCreditosActivo: 1,
      movimientosMesPasivo: 1,
      saldosMesPasivo: 1,
      fechaUltimaTransacPasivo: 1,
      saldoPasivo: 1,
      saldoPasivoDivisaOrigen: 1,
      promedioPasivo: 1,
      promedioPasivoDivisaOrigen: 1,
      montoCreditoPasivo: 1,
      montoCreditoPasivoDivisaOrigen: 1,
      montoCreditoPasivoDolar: 1,
      montoCreditoPasivoEuro: 1,
      montoDebitoPasivo: 1,
      montoDebitoPasivoDivisaOrigen: 1,
      numCreditoPasivo: 1,
      numDebitoPasivo: 1,
      numeroContrato: 1,
      numCreditoPasivoTodasDivisa: 1,
      numDebitoPasivoTodasDivisa: 1,
      numeroContratoTodasDivisa: 1,
      saldoDolar: 1,
      saldoEuro: 1,
      movimientosMesPasivo: 1,
      saldosMesPasivo: 1,
      montoCreditoPasivoEuro: 1,
      clienteActivo: 1,
      saldoConv20: 1,
      saldoConv20Dolar: 1,
      saldoConv20Euro: 1,
      montoAbonado: 1,
      saldoDolarProm6m: 1,
      saldoEuroProm6m: 1,
      sumAAbonoLiqActivo: 1,
      sumAMontoAbonado: 1,
      creASaldoActivo: 1,
      creAAbonoLiqActivo: 1,
      creAMontoAbonado: 1,
      creAPromedioPasivo: 1,
      montoAbonadoProm3m: 1,
      reciprocidadGeneral: 1,
      gastosFlatOtrosBolivares: 1,
      gastosFlatOtrosDolares: 1,
      gastosFlatOtrosEuros: 1,
      lineaCreditoBolivares: 1,
      lineaCreditoDolares: 1,
      lineaCreditoEuros: 1,
      tasaInteresBolivares: 1,
      tasaInteresDolares: 1,
      tasaInteresEuros: 1,
      variacionIDIBolivares: 1,
      variacionIDIDolares: 1,
      variacionIDIEuros: 1,
      icc_totalMesBolivares: 1,
      icc_totalMesDolares: 1,
      icc_totalMesEuros: 1,
      icc_acumuladoBolivares7m: 1,
      icc_acumuladoDolares7m: 1,
      icc_acumuladoEuros7m: 1,
      icc_totalPromBolivares7m: 1,
      icc_totalPromDolares7m: 1,
      icc_totalPromEuros7: 1,
      nominaBolivares: 1,
      nominaDolares: 1,
      nominaEuros: 1,
      opCambiariasBolivares: 1,
      opCambiariasDolares: 1,
      opCambiariasEuros: 1,
      otrosBolivares: 1,
      otrosDolares: 1,
      otrosEuros: 1,
      pagoProveedoresBolivares: 1,
      pagoProveedoresDolares: 1,
      pagoProveedoresEuros: 1,
      posBolivares: 1,
      posComisionesBolivares: 1,
      posComisionesDolares: 1,
      posComisionesEuros: 1,
      posDolares: 1,
      posEuros: 1,
      posTransaccionesBolivares: 1,
      posTransaccionesDolares: 1,
      posTransaccionesEuros: 1,
      ic_totalMesBolivares: 1,
      ic_totalMesDolares: 1,
      ic_totalMesEuros: 1,
      ic_acumuladoBolivares7m: 1,
      ic_acumuladoDolares7m: 1,
      ic_acumuladoEuros7m: 1,
      ic_totalPromBolivares7m: 1,
      ic_totalPromDolares7m: 1,
      ic_totalPromEuros7m: 1,
      comprasDolares: 1,
      comprasEuros: 1,
      depositosDolares: 1,
      depositosEuros: 1,
      acumComprasDolares: 1,
      acumComprasEuros: 1,
      acumDepositosDolares: 1,
      acumDepositosEuros: 1,
      cantidadTransacciones: 1,
      montoFacturacionBolivares: 1,
      montoFacturacionDolares: 1,
      montoFacturacionEuros: 1,
      acumuladoFacturacionUlt7MesesBolivares: 1,
      acumuladoFacturacionUlt7MesesDolares: 1,
      acumuladoFacturacionUlt7MesesEuros: 1,
      acumuladoTransaccionesUlt7Meses: 1,
      promedioFacturacionUlt7MesesBolivares: 1,
      promedioFacturacionUlt7MesesDolares: 1,
      promedioFacturacionUlt7MesesEuros: 1,
      promedioTransaccionesUlt7Meses: 1,
      pagoProveedores: 1,
      bdvEnLineaEmpresas: 1,
      nomina: 1,
      pagoMovil: 1,
      intervencionBancaria: 1,
      mesaCambio: 1,
      pos: 1,
      linkedProducts:1,
    },
  },
  {
    $addFields: {
      nombreBanca: {
        $ifNull: ["$nombreBanca", ""],
      },
      codigoBanca: {
        $ifNull: ["$codigoBanca", ""],
      },
      nombreSegmento: {
        $ifNull: ["$nombreSegmento", ""],
      },
      codigoSegmento: {
        $ifNull: ["$codigoSegmento", ""],
      },
      nombreSubsegmento: {
        $ifNull: ["$nombreSubsegmento", ""],
      },
      codigoSubsegmento: {
        $ifNull: ["$codigoSubsegmento", ""],
      },
      nombreGrupoeconomico: {
        $ifNull: ["$nombreGrupoeconomico", ""],
      },
      codigoGrupoeconomico: {
        $ifNull: ["$codigoGrupoeconomico", ""],
      },
      nombreNSE: {
        $ifNull: ["$nombreNSE", ""],
      },
      nombreCliente: {
        $ifNull: ["$nombreCliente", ""],
      },
      regionName: {
        $ifNull: ["$regionName", ""],
      },
      regionCode: {
        $ifNull: ["$regionCode", ""],
      },
      state: {
        $ifNull: ["$state", ""],
      },
      sexo: {
        $ifNull: ["$sexo", ""],
      },
      generacion: {
        $ifNull: ["$generacion", ""],
      },
      volumenPagosProveedor: {
        $ifNull: ["$volumenPagosProveedor", ""],
      },
      volumenPagosProveedorBDV: {
        $ifNull: [
          "$volumenPagosProveedorBDV",
          "",
        ],
      },
      volumenPagosProveedorOTRO: {
        $ifNull: [
          "$volumenPagosProveedorOTRO",
          "",
        ],
      },
      cantidadBeneficiario: {
        $ifNull: ["$cantidadBeneficiario", ""],
      },
      reciprocidadBeneficiario: {
        $ifNull: [
          "$reciprocidadBeneficiario",
          "",
        ],
      },
      saldoActivo: {
        $ifNull: ["$saldoActivo", ""],
      },
      saldoActivoDivisaOrigen: {
        $ifNull: ["$saldoActivoDivisaOrigen", ""],
      },
      promedioActivo: {
        $ifNull: ["$promedioActivo", ""],
      },
      promedioActivoDivisaOrigen: {
        $ifNull: [
          "$promedioActivoDivisaOrigen",
          "",
        ],
      },
      montoDebitosActivo: {
        $ifNull: ["$montoDebitosActivo", ""],
      },
      montoDebitosActivoDivisaOrigen: {
        $ifNull: [
          "$montoDebitosActivoDivisaOrigen",
          "",
        ],
      },
      montoCreditosActivos: {
        $ifNull: ["$montoCreditosActivos", ""],
      },
      montoCreditosActivoDivisaOrigen: {
        $ifNull: [
          "$montoCreditosActivoDivisaOrigen",
          "",
        ],
      },
      abonoLiqActivo: {
        $ifNull: ["$abonoLiqActivo", ""],
      },
      abonoLiqActivoDivisaOrigen: {
        $ifNull: [
          "$abonoLiqActivoDivisaOrigen",
          "",
        ],
      },
      interesesActivo: {
        $ifNull: ["$interesesActivo", ""],
      },
      interesesActivoDivisaOrigen: {
        $ifNull: [
          "$interesesActivoDivisaOrigen",
          "",
        ],
      },
      numeroContratosActivoBolivar: {
        $ifNull: [
          "$numeroContratosActivoBolivar",
          "",
        ],
      },
      numeroContratosActivo: {
        $ifNull: ["$numeroContratosActivo", ""],
      },
      numDebitosActivoBolivar: {
        $ifNull: ["$numDebitosActivoBolivar", ""],
      },
      numDebitosActivo: {
        $ifNull: ["$numDebitosActivo", ""],
      },
      numCreditosActivoBolivar: {
        $ifNull: [
          "$numCreditosActivoBolivar",
          "",
        ],
      },
      numCreditosActivo: {
        $ifNull: ["$numCreditosActivo", ""],
      },
      movimientosMesPasivo: {
        $ifNull: ["$movimientosMesPasivo", ""],
      },
      saldosMesPasivo: {
        $ifNull: ["$saldosMesPasivo", ""],
      },
      fechaUltimaTransacPasivo: {
        $ifNull: [
          "$fechaUltimaTransacPasivo",
          "",
        ],
      },
      saldoPasivo: {
        $ifNull: ["$saldoPasivo", ""],
      },
      saldoPasivoDivisaOrigen: {
        $ifNull: ["$saldoPasivoDivisaOrigen", ""],
      },
      promedioPasivo: {
        $ifNull: ["$promedioPasivo", ""],
      },
      promedioPasivoDivisaOrigen: {
        $ifNull: [
          "$promedioPasivoDivisaOrigen",
          "",
        ],
      },
      montoCreditoPasivo: {
        $ifNull: ["$montoCreditoPasivo", ""],
      },
      montoCreditoPasivoDivisaOrigen: {
        $ifNull: [
          "$montoCreditoPasivoDivisaOrigen",
          "",
        ],
      },
      montoCreditoPasivoDolar: {
        $ifNull: ["$montoCreditoPasivoDolar", ""],
      },
      montoCreditoPasivoEuro: {
        $ifNull: ["$montoCreditoPasivoEuro", ""],
      },
      montoDebitoPasivo: {
        $ifNull: ["$montoDebitoPasivo", ""],
      },
      montoDebitoPasivoDivisaOrigen: {
        $ifNull: [
          "$montoDebitoPasivoDivisaOrigen",
          "",
        ],
      },
      numCreditoPasivo: {
        $ifNull: ["$numCreditoPasivo", ""],
      },
      numDebitoPasivo: {
        $ifNull: ["$numDebitoPasivo", ""],
      },
      numeroContrato: {
        $ifNull: ["$numeroContrato", ""],
      },
      numCreditoPasivoTodasDivisa: {
        $ifNull: [
          "$numCreditoPasivoTodasDivisa",
          "",
        ],
      },
      numDebitoPasivoTodasDivisa: {
        $ifNull: [
          "$numDebitoPasivoTodasDivisa",
          "",
        ],
      },
      numeroContratoTodasDivisa: {
        $ifNull: [
          "$numeroContratoTodasDivisa",
          "",
        ],
      },
      saldoDolar: {
        $ifNull: ["$saldoDolar", ""],
      },
      saldoEuro: {
        $ifNull: ["$saldoEuro", ""],
      },
      movimientosMesPasivo: {
        $ifNull: ["$movimientosMesPasivo", ""],
      },
      saldosMesPasivo: {
        $ifNull: ["$saldosMesPasivo", ""],
      },
      montoCreditoPasivoEuro: {
        $ifNull: ["$montoCreditoPasivoEuro", ""],
      },
      clienteActivo: {
        $ifNull: ["$clienteActivo", ""],
      },
      saldoConv20: {
        $ifNull: ["$saldoConv20", ""],
      },
      saldoConv20Dolar: {
        $ifNull: ["$saldoConv20Dolar", ""],
      },
      saldoConv20Euro: {
        $ifNull: ["$saldoConv20Euro", ""],
      },
      montoAbonado: {
        $ifNull: ["$montoAbonado", ""],
      },
      saldoDolarProm6m: {
        $ifNull: ["$saldoDolarProm6m", ""],
      },
      saldoEuroProm6m: {
        $ifNull: ["$saldoEuroProm6m", ""],
      },
      sumAAbonoLiqActivo: {
        $ifNull: ["$sumAAbonoLiqActivo", ""],
      },
      sumAMontoAbonado: {
        $ifNull: ["$sumAMontoAbonado", ""],
      },
      creASaldoActivo: {
        $ifNull: ["$creASaldoActivo", ""],
      },
      creAAbonoLiqActivo: {
        $ifNull: ["$creAAbonoLiqActivo", ""],
      },
      creAMontoAbonado: {
        $ifNull: ["$creAMontoAbonado", ""],
      },
      creAPromedioPasivo: {
        $ifNull: ["$creAPromedioPasivo", ""],
      },
      montoAbonadoProm3m: {
        $ifNull: ["$montoAbonadoProm3m", ""],
      },
      reciprocidadGeneral: {
        $ifNull: ["$reciprocidadGeneral", ""],
      },
      gastosFlatOtrosBolivares: {
        $ifNull: [
          "$gastosFlatOtrosBolivares",
          "",
        ],
      },
      gastosFlatOtrosDolares: {
        $ifNull: ["$gastosFlatOtrosDolares", ""],
      },
      gastosFlatOtrosEuros: {
        $ifNull: ["$gastosFlatOtrosEuros", ""],
      },
      lineaCreditoBolivares: {
        $ifNull: ["$lineaCreditoBolivares", ""],
      },
      lineaCreditoDolares: {
        $ifNull: ["$lineaCreditoDolares", ""],
      },
      lineaCreditoEuros: {
        $ifNull: ["$lineaCreditoEuros", ""],
      },
      tasaInteresBolivares: {
        $ifNull: ["$tasaInteresBolivares", ""],
      },
      tasaInteresDolares: {
        $ifNull: ["$tasaInteresDolares", ""],
      },
      tasaInteresEuros: {
        $ifNull: ["$tasaInteresEuros", ""],
      },
      variacionIDIBolivares: {
        $ifNull: ["$variacionIDIBolivares", ""],
      },
      variacionIDIDolares: {
        $ifNull: ["$variacionIDIDolares", ""],
      },
      variacionIDIEuros: {
        $ifNull: ["$variacionIDIEuros", ""],
      },
      icc_totalMesBolivares: {
        $ifNull: ["$icc_totalMesBolivares", ""],
      },
      icc_totalMesDolares: {
        $ifNull: ["$icc_totalMesDolares", ""],
      },
      icc_totalMesEuros: {
        $ifNull: ["$icc_totalMesEuros", ""],
      },
      icc_acumuladoBolivares7m: {
        $ifNull: [
          "$icc_acumuladoBolivares7m",
          "",
        ],
      },
      icc_acumuladoDolares7m: {
        $ifNull: ["$icc_acumuladoDolares7m", ""],
      },
      icc_acumuladoEuros7m: {
        $ifNull: ["$icc_acumuladoEuros7m", ""],
      },
      icc_totalPromBolivares7m: {
        $ifNull: [
          "$icc_totalPromBolivares7m",
          "",
        ],
      },
      icc_totalPromDolares7m: {
        $ifNull: ["$icc_totalPromDolares7m", ""],
      },
      icc_totalPromEuros7: {
        $ifNull: ["$icc_totalPromEuros7", ""],
      },
      nominaBolivares: {
        $ifNull: ["$nominaBolivares", ""],
      },
      nominaDolares: {
        $ifNull: ["$nominaDolares", ""],
      },
      nominaEuros: {
        $ifNull: ["$nominaEuros", ""],
      },
      opCambiariasBolivares: {
        $ifNull: ["$opCambiariasBolivares", ""],
      },
      opCambiariasDolares: {
        $ifNull: ["$opCambiariasDolares", ""],
      },
      opCambiariasEuros: {
        $ifNull: ["$opCambiariasEuros", ""],
      },
      otrosBolivares: {
        $ifNull: ["$otrosBolivares", ""],
      },
      otrosDolares: {
        $ifNull: ["$otrosDolares", ""],
      },
      otrosEuros: {
        $ifNull: ["$otrosEuros", ""],
      },
      pagoProveedoresBolivares: {
        $ifNull: [
          "$pagoProveedoresBolivares",
          "",
        ],
      },
      pagoProveedoresDolares: {
        $ifNull: ["$pagoProveedoresDolares", ""],
      },
      pagoProveedoresEuros: {
        $ifNull: ["$pagoProveedoresEuros", ""],
      },
      posBolivares: {
        $ifNull: ["$posBolivares", ""],
      },
      posComisionesBolivares: {
        $ifNull: ["$posComisionesBolivares", ""],
      },
      posComisionesDolares: {
        $ifNull: ["$posComisionesDolares", ""],
      },
      posComisionesEuros: {
        $ifNull: ["$posComisionesEuros", ""],
      },
      posDolares: {
        $ifNull: ["$posDolares", ""],
      },
      posEuros: {
        $ifNull: ["$posEuros", ""],
      },
      posTransaccionesBolivares: {
        $ifNull: [
          "$posTransaccionesBolivares",
          "",
        ],
      },
      posTransaccionesDolares: {
        $ifNull: ["$posTransaccionesDolares", ""],
      },
      posTransaccionesEuros: {
        $ifNull: ["$posTransaccionesEuros", ""],
      },
      ic_totalMesBolivares: {
        $ifNull: ["$ic_totalMesBolivares", ""],
      },
      ic_totalMesDolares: {
        $ifNull: ["$ic_totalMesDolares", ""],
      },
      ic_totalMesEuros: {
        $ifNull: ["$ic_totalMesEuros", ""],
      },
      ic_acumuladoBolivares7m: {
        $ifNull: ["$ic_acumuladoBolivares7m", ""],
      },
      ic_acumuladoDolares7m: {
        $ifNull: ["$ic_acumuladoDolares7m", ""],
      },
      ic_acumuladoEuros7m: {
        $ifNull: ["$ic_acumuladoEuros7m", ""],
      },
      ic_totalPromBolivares7m: {
        $ifNull: ["$ic_totalPromBolivares7m", ""],
      },
      ic_totalPromDolares7m: {
        $ifNull: ["$ic_totalPromDolares7m", ""],
      },
      ic_totalPromEuros7m: {
        $ifNull: ["$ic_totalPromEuros7m", ""],
      },
      comprasDolares: {
        $ifNull: ["$comprasDolares", ""],
      },
      comprasEuros: {
        $ifNull: ["$comprasEuros", ""],
      },
      depositosDolares: {
        $ifNull: ["$depositosDolares", ""],
      },
      depositosEuros: {
        $ifNull: ["$depositosEuros", ""],
      },
      acumComprasDolares: {
        $ifNull: ["$acumComprasDolares", ""],
      },
      acumComprasEuros: {
        $ifNull: ["$acumComprasEuros", ""],
      },
      acumDepositosDolares: {
        $ifNull: ["$acumDepositosDolares", ""],
      },
      acumDepositosEuros: {
        $ifNull: ["$acumDepositosEuros", ""],
      },
      cantidadTransacciones: {
        $ifNull: ["$cantidadTransacciones", ""],
      },
      montoFacturacionBolivares: {
        $ifNull: [
          "$montoFacturacionBolivares",
          "",
        ],
      },
      montoFacturacionDolares: {
        $ifNull: ["$montoFacturacionDolares", ""],
      },
      montoFacturacionEuros: {
        $ifNull: ["$montoFacturacionEuros", ""],
      },
      acumuladoFacturacionUlt7MesesBolivares: {
        $ifNull: [
          "$acumuladoFacturacionUlt7MesesBolivares",
          "",
        ],
      },
      acumuladoFacturacionUlt7MesesDolares: {
        $ifNull: [
          "$acumuladoFacturacionUlt7MesesDolares",
          "",
        ],
      },
      acumuladoFacturacionUlt7MesesEuros: {
        $ifNull: [
          "$acumuladoFacturacionUlt7MesesEuros",
          "",
        ],
      },
      acumuladoTransaccionesUlt7Meses: {
        $ifNull: [
          "$acumuladoTransaccionesUlt7Meses",
          "",
        ],
      },
      promedioFacturacionUlt7MesesBolivares: {
        $ifNull: [
          "$promedioFacturacionUlt7MesesBolivares",
          "",
        ],
      },
      promedioFacturacionUlt7MesesDolares: {
        $ifNull: [
          "$promedioFacturacionUlt7MesesDolares",
          "",
        ],
      },
      promedioFacturacionUlt7MesesEuros: {
        $ifNull: [
          "$promedioFacturacionUlt7MesesEuros",
          "",
        ],
      },
      promedioTransaccionesUlt7Meses: {
        $ifNull: [
          "$promedioTransaccionesUlt7Meses",
          "",
        ],
      },
      pagoProveedores: {
        $ifNull: ["$pagoProveedores", ""],
      },
      bdvEnLineaEmpresas: {
        $ifNull: ["$bdvEnLineaEmpresas", ""],
      },
      nomina: {
        $ifNull: ["$nomina", ""],
      },
      pagoMovil: {
        $ifNull: ["$pagoMovil", ""],
      },
      intervencionBancaria: {
        $ifNull: ["$intervencionBancaria", ""],
      },
      mesaCambio: {
        $ifNull: ["$mesaCambio", ""],
      },
      pos: {
        $ifNull: ["$pos", ""],
      },
      tkNombreCliente:{
        $ifNull: ["$tkNombreCliente", ""],
      },
      linkedProductspos: {
        $ifNull: ["$linkedProductspos", ""],
      },
    },
  },
  {
    $merge: {
      into: "Margenmetric_test",
      on: "_id",
    },
  },
]