[
    {
      $limit: 1,
    },
    {
      $addFields: {
        _id: "$$REMOVE",
        proceso:
          "1_Planificacion_E4_Resegmentacion",
        fechaProceso: {
          $toDate: "2023-06-30",
          //"$toDate": "{{$json.fechaProceso}}"
        },
  
        descripcion:
          "Procesamiento de resegmentación clientes",
        status: "En Proceso",
        fechaInicio: "$$NOW",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        tipoOperación:
          "Paralela: 10 procesos, por cada lastDigRif",
        frecuencia: "Mensual",
        procesos: [
          {
            codigo: 0,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 1,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 2,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 3,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 4,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 5,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 6,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 7,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 8,
            status: "En Espera",
            fechaInicio: "nda",
            fechaFin: "nda",
            tiempoEjecucion: "nda",
          },
          {
            codigo: 9,
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
        "proceso": "1_Planificacion_E4_Resegmentacion", 
        "fechaProceso": {
            "$toDate": "{{$json.fechaProceso}}"
        }, 
        "descripcion": "Procesamiento de resegmentación clientes", 
        "status": "En Proceso", 
        "fechaInicio": "$$NOW", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "tipoOperación": "Paralela: 10 procesos, por cada lastDigRif", 
        "frecuencia": "Mensual", 
        "procesos": [
          {
            "codigo": 0, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 1, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 2, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 3, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 4, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 5, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 6, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 7, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 8, 
            "status": "En Espera", 
            "fechaInicio": "nda", 
            "fechaFin": "nda", 
            "tiempoEjecucion": "nda"
          }, {
            "codigo": 9, 
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