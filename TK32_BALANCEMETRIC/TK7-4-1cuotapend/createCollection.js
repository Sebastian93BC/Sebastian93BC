createCollection.mongodb
//hashed
db.createCollection("sidis_cuotapend")

sh.shardCollection("bdv.sidis_cuotapend", {
    contrato: 1,
    fecha_valor: 1,

})

db.sidis_cuotapend.createIndex(
    {
        contrato: 1,
        fecha_valor: 1,
        _id: 1,
    },
    { unique: true, name: "mergeIndex" },
)





contrato,
fecha_valor,
_id,