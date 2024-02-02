[
    {
      $limit: 1,
    },
    {
      $addFields: {
        _id: "$$REMOVE",
        proceso: "1_Planificacion_E2_Procesamiento",
        fechaProceso: {
          $toDate: "2023-06-30",
          //"$toDate": "{{$json.fechaProceso}}"
        },
  
        descripcion: "Procesamiento de datos",
        status: "En Proceso",
        fechaInicio: "$$NOW",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        tipoOperación:
          "Paralela: 7 procesos, 4 en serie 3 en paralelo",
        frecuencia: "Mensual",
        "procesos.PP_1_clienteIntegracion_Margenmetric":
          {
            proceso:
              "PP_1_clienteIntegracion_Margenmetric",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.PP_2_sidisMargenActivos_Margenmetricactivo":
          {
            proceso:
              "PP_2_sidisMargenActivos_Margenmetricactivo",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.PP_3_sidisMargenPasivos_Margenmetricpasivo":
          {
            proceso:
              "PP_3_sidisMargenPasivos_Margenmetricpasivo",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.PP_4_sidisBeneficiarioIndicador_Margenmetric":
          {
            proceso:
              "PP_4_sidisBeneficiarioIndicador_Margenmetric",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.I_1_margenMetricActivoIndicador_Margenmetric":
          {
            proceso:
              "I_1_margenMetricActivoIndicador_Margenmetric",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.I_2_margenMetricPaivosIndicador_Margenmetric":
          {
            proceso:
              "I_2_margenMetricPaivosIndicador_Margenmetric",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
        "procesos.I_3_margenMetricPasivoConv20_Margenmetric":
          {
            proceso:
              "I_3_margenMetricPasivoConv20_Margenmetric",
            fechaProceso: "nda",
            descripcion: "",
            status: "En espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
            fuenteEntrada: "margen",
            fuenteSalida: "margen",
            tipoOperación: "Paralela: 1 proceso",
            frecuencia: "Mensual",
          },
      },
    },
    {
      $merge: {
        into: "sidis_statusProcesos",
        on: ["proceso", "fechaProceso"],
      },
    },
  ]

  //N8N

  [
    {
      "$limit": 1
    }, {
      "$addFields": {
        "_id": "$$REMOVE", 
        "proceso": "1_Planificacion_E2_Procesamiento", 
        "fechaProceso": {
          "$toDate": "{{$json.fechaProceso}}"
        }, 
        "descripcion": "Procesamiento de datos", 
        "status": "En Proceso", 
        "fechaInicio": "$$NOW", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "tipoOperación": "Paralela: 7 procesos, 4 en serie 3 en paralelo", 
        "frecuencia": "Mensual", 
        "procesos.PP_1_clienteIntegracion_Margenmetric": {
          "proceso": "PP_1_clienteIntegracion_Margenmetric", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.PP_2_sidisMargenActivos_Margenmetricactivo": {
          "proceso": "PP_2_sidisMargenActivos_Margenmetricactivo", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.PP_3_sidisMargenPasivos_Margenmetricpasivo": {
          "proceso": "PP_3_sidisMargenPasivos_Margenmetricpasivo", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.PP_4_sidisBeneficiarioIndicador_Margenmetric": {
          "proceso": "PP_4_sidisBeneficiarioIndicador_Margenmetric", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.I_1_margenMetricActivoIndicador_Margenmetric": {
          "proceso": "I_1_margenMetricActivoIndicador_Margenmetric", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.I_2_margenMetricPaivosIndicador_Margenmetric": {
          "proceso": "I_2_margenMetricPaivosIndicador_Margenmetric", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }, 
        "procesos.I_3_margenMetricPasivoConv20_Margenmetric": {
          "proceso": "I_3_margenMetricPasivoConv20_Margenmetric", 
          "fechaProceso": "nda", 
          "descripcion": "", 
          "status": "En espera", 
          "fechaInicio": "nda", 
          "fechaFin": "nda", 
          "tiempoEjecucion": "nda", 
          "fuenteEntrada": "margen", 
          "fuenteSalida": "margen", 
          "tipoOperación": "Paralela: 1 proceso", 
          "frecuencia": "Mensual"
        }
      }
    }, {
      "$merge": {
        "into": "sidis_statusProcesos", 
        "on": [
          "proceso", "fechaProceso"
        ]
      }
    }
  ]
