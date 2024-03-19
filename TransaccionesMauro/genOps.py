import pandas as pd
import numpy as np
import json
import os

df = pd.read_excel('operaciones.xlsx')
dfAggregate = df['aggregate']
df['proceso'] =  df['code'].astype(str) + "_" + df['position'].astype(str) + "_"  + df['kpi'].astype(str)
dfProcess = df['proceso']

ruta_directorio = './Agregados'
if not os.path.exists(ruta_directorio):
    os.makedirs(ruta_directorio)

for elemento in range(dfAggregate.size):
    outPut = str(dfAggregate.iloc[elemento])
    outPut = outPut.replace('\n', '').replace('\\n\\', '')
    ruta_archivo = os.path.join(ruta_directorio, dfProcess.iloc[elemento])

    with open(ruta_archivo, 'w') as archivo:
        archivo.write(outPut)