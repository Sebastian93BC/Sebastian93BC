[
  {
    $limit: 1,
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      proceso: "1_Planificacion_E3_Procesamiento",
      fechaProceso: {
        $toDate: "2023-06-30",
        //"$toDate": "{{$json.fechaProceso}}"
      },

      descripcion:
        "Procesamiento de datos margenmetric y agrupaciones de generalmetric",
      status: "En Proceso",
      fechaInicio: "$$NOW",
      fechaFin: "nda",
      tiempoEjecucion: "nda",
      tipoOperación:
        "Paralela: 8 procesos, 4 en serie 4 en paralelo",
      frecuencia: "Mensual",
      "procesos.M_1_Indicadores_Margenmetric": {
        proceso: "M_1_Indicadores_Margenmetric",
        fechaProceso: "nda",
        descripcion:
          "Calcula indicadores y reciprocidad",
        status: "En espera",
        fechaInicio: "nda",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        fuenteEntrada: "margenmetric",
        fuenteSalida: "margenmetric",
        tipoOperación: "Paralela: 1 proceso",
        frecuencia: "Mensual",
      },
      "procesos.M_2_saldosPromedio6m_Margenmetric":
        {
          proceso:
            "M_2_saldosPromedio6m_Margenmetric",
          fechaProceso: "nda",
          descripcion:
            "Cálculo indicadores promedio 6m",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida: "margenmetric",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.M_3_SumaAnual13m_Margenmetric": {
        proceso: "M_3_SumaAnual13m_Margenmetric",
        fechaProceso: "nda",
        descripcion:
          "Cálculo indicadores suma anual 13m",
        status: "En espera",
        fechaInicio: "nda",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        fuenteEntrada: "margenmetric",
        fuenteSalida: "margenmetric",
        tipoOperación: "Paralela: 1 proceso",
        frecuencia: "Mensual",
      },
      "procesos.M_4_CrecimientoAnual_Margenmetric":
        {
          proceso:
            "M_4_CrecimientoAnual_Margenmetric",
          fechaProceso: "nda",
          descripcion:
            "Cálculo indicadores crecimiento anual 13m",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida: "margenmetric",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.M_5_saldosPromedio3m_Margenmetric":
        {
          proceso:
            "M_5_saldosPromedio3m_Margenmetric",
          fechaProceso: "nda",
          descripcion:
            "Cálculo indicadores promedio 3m",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida: "margenmetric",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.A_5_AgrupacionMargengeneralmetric_Margengeneralmetric":
        {
          proceso:
            "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric",
          fechaProceso: "nda",
          descripcion:
            "Agrupación Visión general",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida: "Margengeneralmetric",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.A_6_AgrupacionMSN_Margenmetricsegmentnatural":
        {
          proceso:
            "A_6_AgrupacionMSN_Margenmetricsegmentnatural",
          fechaProceso: "nda",
          descripcion:
            "Agrupación segmentación CRM Natural",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida:
            "Margenmetricsegmentnatural",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.A_7_AgrupacionMSJ_Margenmetricsegmentjuridico":
        {
          proceso:
            "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico",
          fechaProceso: "nda",
          descripcion:
            "Agrupación segmentación CRM jurídico",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "margenmetric",
          fuenteSalida:
            "Margenmetricsegmentnatural",
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
//n8n

[
  {
    "$limit": 1
  }, {
    "$addFields": {
      "_id": "$$REMOVE", 
      "proceso": "1_Planificacion_E3_Procesamiento", 
      "fechaProceso": {
        "$toDate": "{{$json.fechaProceso}}"
      }, 
      "descripcion": "Procesamiento de datos margenmetric y agrupaciones de generalmetric", 
      "status": "En Proceso", 
      "fechaInicio": "$$NOW", 
      "fechaFin": "nda", 
      "tiempoEjecucion": "nda", 
      "tipoOperación": "Paralela: 8 procesos, 4 en serie 4 en paralelo", 
      "frecuencia": "Mensual", 
      "procesos.M_1_Indicadores_Margenmetric": {
        "proceso": "M_1_Indicadores_Margenmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Calcula indicadores y reciprocidad", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "margenmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.M_2_saldosPromedio6m_Margenmetric": {
        "proceso": "M_2_saldosPromedio6m_Margenmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Cálculo indicadores promedio 6m", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "margenmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.M_3_SumaAnual13m_Margenmetric": {
        "proceso": "M_3_SumaAnual13m_Margenmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Cálculo indicadores suma anual 13m", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "margenmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.M_4_CrecimientoAnual_Margenmetric": {
        "proceso": "M_4_CrecimientoAnual_Margenmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Cálculo indicadores crecimiento anual 13m", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "margenmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.M_5_saldosPromedio3m_Margenmetric": {
        "proceso": "M_5_saldosPromedio3m_Margenmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Cálculo indicadores promedio 3m", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "margenmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.A_5_AgrupacionMargengeneralmetric_Margengeneralmetric": {
        "proceso": "A_5_AgrupacionMargengeneralmetric_Margengeneralmetric", 
        "fechaProceso": "nda", 
        "descripcion": "Agrupación Visión general", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "Margengeneralmetric", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.A_6_AgrupacionMSN_Margenmetricsegmentnatural": {
        "proceso": "A_6_AgrupacionMSN_Margenmetricsegmentnatural", 
        "fechaProceso": "nda", 
        "descripcion": "Agrupación segmentación CRM Natural", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "Margenmetricsegmentnatural", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.A_7_AgrupacionMSJ_Margenmetricsegmentjuridico": {
        "proceso": "A_7_AgrupacionMSJ_Margenmetricsegmentjuridico", 
        "fechaProceso": "nda", 
        "descripcion": "Agrupación segmentación CRM jurídico", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margenmetric", 
        "fuenteSalida": "Margenmetricsegmentnatural", 
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