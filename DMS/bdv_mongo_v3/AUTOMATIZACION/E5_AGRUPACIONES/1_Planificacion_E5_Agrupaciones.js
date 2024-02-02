[
    {
      $limit: 1,
    },
    {
      $addFields: {
        _id: "$$REMOVE",
        proceso: "1_Planificacion_E5_Agrupaciones",
        fechaProceso: {
          $toDate: "2023-06-30",
          //"$toDate": "{{$json.fechaProceso}}"
        },
  
        descripcion: "Agrupaciones",
        status: "En Proceso",
        fechaInicio: "$$NOW",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        tipoOperación:
          "Paralela: Agrupaciones por banca, grupo, segmento y nse, una operación por cada mes",
        frecuencia: "Mensual",
        procesos: [
          {
            codigo: "banca",
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: "grupoEconomico",
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: "segmento",
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: "NSE",
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
        ],
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
        "proceso": "1_Planificacion_E5_Agrupaciones", 
        "fechaProceso": {
            "$toDate": "{{$json.fechaProceso}}"
        }, 
        "descripcion": "Agrupaciones", 
        "status": "En Proceso", 
        "fechaInicio": "$$NOW", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "tipoOperación": "Paralela: Agrupaciones por banca, grupo, segmento y nse, una operación por cada mes", 
        "frecuencia": "Mensual", 
        "procesos": [
          {
            "codigo": "banca", 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": "grupoEconomico", 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": "segmento", 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": "NSE", 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }
        ]
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