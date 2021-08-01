const express = require('express');
const cors = require('cors');
const redis = require('redis');
const sha1 = require('sha1');
const async1 = require('async');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const corsOptions = { origin: true, optionSuccessStatus: 200 };
const redisClient = redis.createClient(REDIS_PORT);

redisClient.on("error", err => {
    console.error("Error encountered: ", err);
});

const app = new express();
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));

app.get('/', async (req, res) => {
    return res.send({ msg: 'Hi from Redis :D' });
});

app.post('/saveData', async (req, res) => {
    if(!req.body){
        return res.send({ msg: "Error in data" });
    }

    const data = req.body;
    try {
        const hash = sha1(JSON.stringify(data));
        data['hash'] = hash;
        redisClient.set(hash, JSON.stringify(data));
        
        console.log(`Data saved with key ${hash}. Data: ${JSON.stringify(data)}`);;
        
        return res.send({ msg: "Data saved" })
    } catch (error) {
        console.error("Error encountered in saveData");
        return res.send({ msg: "Error in saveData" });
    }
});

app.get('/getData', async (req, res) => {
    redisClient.keys('*', (err, keys) => {
        if(err){
            console.error(`Error in getData keys*`);
            return res.send({ msg: `Error in getData keys*` });
        }
        if(keys){
            async1.map(keys, (key, cb) => {
                redisClient.get(key, (error, value) => {
                    if(error){
                        console.error(`Error in getData get`);
                        return res.send({ msg: `Error in getData get` });
                    }
                    cb(null, JSON.parse(value));
                })
            }, (error, results) => {
                if(error){
                    console.error(`Error in getData async`);
                    return res.send({ msg: `Error in getData async` });
                }
                return res.send(results);
            })
        }
    });
});

app.get('/deleteAll', async (req, res) => {
    redisClient.flushdb((err, succeeded) => {
        if(err){
            console.error(`Error in deleteAll`);
            return res.send({ msg: `Error in deleteAll` });
        }
        return res.send({ msg: "Data was deleted" })
    })
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});