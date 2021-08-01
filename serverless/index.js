const express = require('express');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

const app = new express();
app.use(express.json({ extended: true }));

app.get('/', async (req, res) => {
    return res.send({ msg: 'Hi from Serverless Functions' });
});

app.get('/top10Locations', async(req, res) => {
    let topLocations = new Map();
    fetch("http://34.66.140.125:3000/getData", { method: 'GET' })
        .then(res => res.json())
        .then(
            data => {
                let auxData;
                for(let i = 0; i < data.length; i++){
                    auxData = data[i];
                    if(!topLocations.has(auxData.location)){
                        topLocations.set(auxData.location, 1);
                    }else{
                        let count = topLocations.get(auxData.location);
                        topLocations.set(auxData.location, count+1);
                    }
                }
                let auxRet = Array.from(topLocations);
                let ret = [];
                for(let i=0; i < auxRet.length; i++){
                    ret.push({
                        location: auxRet[i][0],
                        total: auxRet[i][1]
                    });
                }
                ret.sort((a, b) => {
                    if(a.total > b.total){
                        return -1;
                    }
                    if(a.total < b.total){
                        return 1;
                    }
                    return 0;
                });
                res.send(ret.slice(0, 10));
            },
            err => {
                console.error(err);
            }
        )
});

app.get('/Locations', async(req, res) => {
    let topLocations = new Map();
    fetch("http://34.66.140.125:3000/getData", { method: 'GET' })
        .then(res => res.json())
        .then(
            data => {
                let auxData;
                for(let i = 0; i < data.length; i++){
                    auxData = data[i];
                    if(!topLocations.has(auxData.location)){
                        topLocations.set(auxData.location, 1);
                    }else{
                        let count = topLocations.get(auxData.location);
                        topLocations.set(auxData.location, count+1);
                    }
                }
                let auxRet = Array.from(topLocations);
                let ret = [];
                for(let i=0; i < auxRet.length; i++){
                    ret.push({
                        location: auxRet[i][0],
                        total: auxRet[i][1]
                    });
                }
                return res.send(ret.sort((a, b) => {
                    if(a.total > b.value){
                        return -1;
                    }
                    if(a.total < b.total){
                        return 1;
                    }
                    return 0;
                }));
            },
            err => {
                console.error(err);
            }
        )
})

app.get('/getAges', async(req, res) => {
    let locations = new Map();
    fetch("http://34.66.140.125:3000/getData", { method: 'GET' })
        .then(res => res.json())
        .then(
            data => {
                let auxData;
                for(let i = 0; i < data.length; i++){
                    auxData = data[i];
                    if(!locations.has(auxData.location)){
                        let ages = [
                            {
                                age: "0 - 9",
                                total: 0
                            },
                            {
                                age: "10 - 19",
                                total: 0
                            },
                            {
                                age: "20 - 29",
                                total: 0
                            },
                            {
                                age: "30 - 39",
                                total: 0
                            },
                            {
                                age: "40 - 49",
                                total: 0
                            },
                            {
                                age: "50 - 59",
                                total: 0
                            },
                            {
                                age: "60 - 69",
                                total: 0
                            },
                            {
                                age: "70 - 79",
                                total: 0
                            },
                            {
                                age: "80 - 89",
                                total: 0
                            },
                            {
                                age: "90 - 99",
                                total: 0
                            },
                            {
                                age: "100 - más",
                                total: 0
                            }
                        ]
                        locations.set(auxData.location, ages);
                    }
                    let arr = locations.get(auxData.location);
                    let age = auxData.age;
                    if(age >= 0 && age < 10){
                        arr[0].total++;
                    }else if(age >= 10 && age < 20){
                        arr[1].total++;
                    }else if(age >= 20 && age < 30){
                        arr[2].total++;
                    }else if(age >= 30 && age < 40){
                        arr[3].total++;
                    }else if(age >= 40 && age < 50){
                        arr[4].total++;
                    }else if(age >= 50 && age < 60){
                        arr[5].total++;
                    }else if(age >= 60 && age < 70){
                        arr[6].total++;
                    }else if(age >= 70 && age < 80){
                        arr[7].total++;
                    }else if(age >= 80 && age < 90){
                        arr[8].total++;
                    }else if(age >= 90 && age < 100){
                        arr[9].total++;
                    }else if(age >= 100){
                        arr[10].total++;
                    }
                    locations.set(auxData.location, arr);
                }
                let auxRet = Array.from(locations);
                return res.send(auxRet);
            },
            err => {
                console.error(err);
            }
        )
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})