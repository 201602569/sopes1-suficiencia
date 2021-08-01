const express = require('express');
const cors = require('cors');

const { create,getAll,deleteAllData } = require('./mongo');

var corsOptions = { origin: true, optionsSuccessStatus: 200 };

const app = new express();
app.use(cors(corsOptions));
app.use(express.json({ extended: true }))

app.post('/', async (req, res) => {
  
    return "nel";

});

app.post('/saveData', async (req, res) => {
  
    console.log(req.body)
    console.log("Master: Peticion de creacion de caso");

    const { code, msg, data } = await create(req.body);

    return res.status(code).send({ msg, data });

});

app.get('/deleteAllData', async (req, res) => {
    console.log("Master: Peticion de vaciar la base de datos");

    const { code, data } = await deleteAllData();

    return res.status(code).send(data);

});

app.get('/getAllData', async (req, res) => {
    console.log("Master: Peticion de obtencion de todos los casos");

    const { code, data } = await getAll();

    return res.status(code).send(data);

});

const PORT = process.env.port || 4001;

app.listen(PORT, () => { console.log(`API lista en -> http://localhost:${PORT}`) });