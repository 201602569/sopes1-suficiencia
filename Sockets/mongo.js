const express = require('express');
const mongoose = require('mongoose');

//Conexión con el contenedor de mongo
mongoose.connect('mongodb://35.194.11.222:80/sopes', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("La base de datos fue correctamente conectada.");
  }).catch((error) => {
    console.log("Error de conexion en la base de datos");
    console.log(error);
  });

//Estructura del modelo
  const person = mongoose.model(
    "personas",
    {
      name: String,
      location: String,
      gender: String,
      age : String,
      vaccine_type: String
    }
);

const create = async (individual) => {
  console.log("create");  
  console.log(individual)
    let { name, location, age, gender,vaccine_type } = individual
    const newPerson = new person({ name: name, location: location, age: age, vaccine_type: vaccine_type, gender: gender});
    console.log(newPerson)
    try {
      console.log("Crear un nuevo caso");
      //insertar un nuevo doc
      await newPerson.save();
  
      console.log("Caso guardado correctamente");
      return { msg: "Ok", data: newPerson.toJSON(), code: 201 };
    } catch ({ message }) {
      console.log(
        `Error producido guardando informacion en MongoDB, error ${message}`
      );
      return { msg: message, data: null, code: 500 };
    }
  };


  const getAll = async () => {
    try {
      console.log("Obtener todos los casos");
      const all_data = await person.find({});
      console.log("Master: Datos obtenidos correctamente");
      return { data: all_data, code: 201 };
    } catch ({ message }) {
      console.log(
        `Error producido extrayendo datos en MongoDB, error ${message}`
      );
      return { data: [], code: 500 };
    };
  }


  const deleteAllData = async () => {
    try {
      console.log("Master: Eliminando los TODOS los datos...");
      const response = await mongoose.connection.db.dropCollection('personas')
      console.log("Master: Datos eliminados correctamente");
      return { data: response, code: 201 };
    } catch ({ message }) {
      console.log(
        `Master: Error producido eliminando datos en MongoDB, error ${message}`
      );
      return { data: [], code: 500 };
    };
  }

  module.exports = { create, getAll,person,deleteAllData };