# SERVERLESS FUNCTIONS

Para la comunicación entre REDIS y la aplicación de React se utilizaron funciones serverless. Cada una de estas se accede mediante un enlace.

## RUTAS

Los enlaces para la obtención de los reportes son los siguientes:

### TOP 10 LOCATIONS.
**GET** https://us-central1-core-silicon-306401.cloudfunctions.net/top10Locations
Este enlace envía la información de los 10 países que más personas vacunadas tienen.
```
[
    {
        "location":"Guatemala",
        "total":4
    },
    {
        "location":"Tokyo",
        "total":1
    }
    ...
]
```

### PERSONAS VACUNADAS POR PAIS
**GET** https://us-central1-core-silicon-306401.cloudfunctions.net/Locations
Este enlace envía la información de la cantidad de personas vacunadas por país.
```
[
    {
        "location":"Guatemala City",
        "total":4
    },
    {
        "location":"Tokyo",
        "total":1
    }
    ...
]
```

### RANGO DE EDADES

**GET** https://us-central1-core-silicon-306401.cloudfunctions.net/getAges
Este enlace envía la información de la cantidad de personas vacunadas en rango de edades de 10 en 10.
```
[
    {
        "age":"10 - 19",
        "total":3
    },
    {
        "age":"20 - 29",
        "total":2
    }
    ...
]
```
