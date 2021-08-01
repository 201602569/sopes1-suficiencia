# REDIS DB

El servidor de redis es una aplicación de node que esta dentro de una máquina virtual. Esto para facilitar la comunicación con redis en sí.

## RUTAS

Para la comunicación con la base de datos de REDIS se definieron algunas rutas para el insertar, obtener y eliminar de esta. Las rutas son las siguientes:

### GET DATA

**GET** http://34.66.140.125:3000/getData
Esto devuelve la lista entera de información que se encuentre en redis.
```
[
    {
        "name": "Alessandro Alson",
        "location": "Guatemala",
        "gender": "male",
        "age": 45,
        "vaccine_type": "Sputnik V",
        "hash": "465d76cf1d087de08f0f9d5ee5e0528d8a4a747a"
    },
    {
        "name": "Mirna Alson",
        "location": "España",
        "gender": "female",
        "age": 20,
        "vaccine_type": "Sputnik V",
        "hash": "8a110c84ff6ebe7cf31e31e5b9b21edf3f546dbf"
    }
    ...
]
```

### SAVE DATA

**POST** http://34.66.140.125:3000/saveData
Este ingresa el objeto JSON dentro de la base de datos redis. Se debe de enviar de la siguiente forma:
```
{
    "name": "Kev Sato",
    "location": "Berlin",
    "gender": "male",
    "age": 18,
    "vaccine_type": "Moderna",
    "origin": "Redis PubSub"
}
```
Como es base de datos clave-valor, lo que se le envía es bastante flexible. Pueden faltar campos o venir más campos.

### DELETE DATA

**GET** http://34.66.140.125:3000/deleteAll
Este elimina todas las llaves que estén ingresadas en redis.