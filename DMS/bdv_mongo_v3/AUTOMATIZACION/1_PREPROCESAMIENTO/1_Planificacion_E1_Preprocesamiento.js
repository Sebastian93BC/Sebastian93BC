[
  {
    $limit: 1,
  },
  {
    $addFields: {
      _id: "$$REMOVE",
      proceso: "E1_Preprocesamiento",
      fechaProceso: {
        $toDate: "2023-06-30",
        //"$toDate": "{{$json.fechaProceso}}"
      },

      descripcion:
        "Preprocesamiento de datos de las colecciones de entrada",
      status: "En Proceso",
      detalles: {
        $arrayToObject: [
          [
            ["fechaInicio", "$$NOW"],
            ["fechaFin", "nda"],
            ["tiempoEjecucion", "nda"],
            [
              "tipoOperación",
              "Paralela: 7 sub-procesos, 1 secuencia en la colección margen",
            ],
            ["frecuencia", "Mensual"],
            [
              "operaciones",
              [
                "P_0_1_margenShardingMargenShad",
                "P_1_clienteFormateoIntegracion_CBS",
                "P_2_segmentacionFormateoIntegracion_CBS",
                "P_3_baseClienteFormateoIntegracion_CBS",
                "P_4_beneficiarioFormateoSidisBeneficiario",
                "P_5_ordenanteFormateoSidisOrdenante",
                "P_6_margenFormateoSidisMargen",
              ],
            ],
          ],
        ],
      },
      "procesos.P_0_1_margenShardingMargenShad": {
        fechaProceso: "nda",
        descripcion:
          "Añade el último dígito del rif",
        status: "En espera",
        fechaInicio: "nda",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        fuenteEntrada: "margen",
        fuenteSalida: "margen",
        tipoOperación: "Paralela: 1 proceso",
        frecuencia: "Mensual",
      },
      "procesos.P_1_clienteFormateoIntegracion_CBS":
        {
          fechaProceso: "nda",
          descripcion:
            "Formatea la colección cliente",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "cliente",
          fuenteSalida:
            "sidis_cliente_base_segmentacion",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.P_2_segmentacionFormateoIntegracion_CBS":
        {
          fechaProceso: "nda",
          descripcion:
            "Formatea la colección segmentacion",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "segmentacion",
          fuenteSalida:
            "sidis_cliente_base_segmentacion",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.P_3_baseClienteFormateoIntegracion_CBS":
        {
          fechaProceso: "nda",
          descripcion:
            "Formatea la colección base cliente",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "base_cliente",
          fuenteSalida:
            "sidis_cliente_base_segmentacion",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.P_4_beneficiarioFormateoSidisBeneficiario":
        {
          fechaProceso: "nda",
          descripcion:
            "Formatea la colección beneficiario",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "beneficiario",
          fuenteSalida: "sidis_beneficiario",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.P_5_ordenanteFormateoSidisOrdenante":
        {
          fechaProceso: "nda",
          descripcion:
            "Formatea la colección ordenante",
          status: "En espera",
          fechaInicio: "nda",
          fechaFin: "nda",
          tiempoEjecucion: "nda",
          fuenteEntrada: "ordenante",
          fuenteSalida: "sidis_ordenante",
          tipoOperación: "Paralela: 1 proceso",
          frecuencia: "Mensual",
        },
      "procesos.P_6_margenFormateoSidisMargen": {
        fechaProceso: "nda",
        descripcion:
          "Formatea la colección ordenante",
        status: "En espera",
        fechaInicio: "nda",
        fechaFin: "nda",
        tiempoEjecucion: "nda",
        fuenteEntrada: "margen",
        fuenteSalida: "sidis_margen",
        tipoOperación:
          "Paralela: 10 sub-procesos",
        frecuencia: "Mensual",
        sub_procesos: [
          "0_En espera",
          "1_En espera",
          "2_En espera",
          "3_En espera",
          "4_En espera",
          "5_En espera",
          "6_En espera",
          "7_En espera",
          "8_En espera",
          "9_En espera",
          "10_En espera",
        ],
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
      "proceso": "E1_Preprocesamiento", 
      "fechaProceso": {
        "$toDate": "{{$json.fechaProceso}}"
      }, 
      "descripcion": "Preprocesamiento de datos de las colecciones de entrada", 
      "status": "En Proceso", 
      "detalles": {
        "$arrayToObject": [
          [
            [
              "fechaInicio", "$$NOW"
            ], [
              "fechaFin", "nda"
            ], [
              "tiempoEjecucion", "nda"
            ], [
              "tipoOperación", "Paralela: 7 sub-procesos, 1 secuencia en la colección margen"
            ], [
              "frecuencia", "Mensual"
            ], [
              "operaciones", [
                "P_0_1_margenShardingMargenShad", "P_1_clienteFormateoIntegracion_CBS", "P_2_segmentacionFormateoIntegracion_CBS", "P_3_baseClienteFormateoIntegracion_CBS", "P_4_beneficiarioFormateoSidisBeneficiario", "P_5_ordenanteFormateoSidisOrdenante", "P_6_margenFormateoSidisMargen"
              ]
            ]
          ]
        ]
      }, 
      "procesos.P_0_1_margenShardingMargenShad": {
        "fechaProceso": "nda", 
        "descripcion": "Añade el último dígito del rif", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margen", 
        "fuenteSalida": "margen", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_1_clienteFormateoIntegracion_CBS": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección cliente", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "cliente", 
        "fuenteSalida": "sidis_cliente_base_segmentacion", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_2_segmentacionFormateoIntegracion_CBS": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección segmentacion", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "segmentacion", 
        "fuenteSalida": "sidis_cliente_base_segmentacion", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_3_baseClienteFormateoIntegracion_CBS": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección base cliente", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "base_cliente", 
        "fuenteSalida": "sidis_cliente_base_segmentacion", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_4_beneficiarioFormateoSidisBeneficiario": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección beneficiario", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "beneficiario", 
        "fuenteSalida": "sidis_beneficiario", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_5_ordenanteFormateoSidisOrdenante": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección ordenante", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "ordenante", 
        "fuenteSalida": "sidis_ordenante", 
        "tipoOperación": "Paralela: 1 proceso", 
        "frecuencia": "Mensual"
      }, 
      "procesos.P_6_margenFormateoSidisMargen": {
        "fechaProceso": "nda", 
        "descripcion": "Formatea la colección ordenante", 
        "status": "En espera", 
        "fechaInicio": "nda", 
        "fechaFin": "nda", 
        "tiempoEjecucion": "nda", 
        "fuenteEntrada": "margen", 
        "fuenteSalida": "sidis_margen", 
        "tipoOperación": "Paralela: 10 sub-procesos", 
        "frecuencia": "Mensual", 
        "sub_procesos": [
          "0_En espera", "1_En espera", "2_En espera", "3_En espera", "4_En espera", "5_En espera", "6_En espera", "7_En espera", "8_En espera", "9_En espera", "10_En espera"
        ]
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