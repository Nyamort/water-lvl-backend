import {createIot, findIot, findIots} from "./services/iot.service";
import {Request, Response} from "express";
import {createMeasurement, findMeasurementsBetweenDates} from "./services/measurement.service";
import {addIotToTank, createTank, findTanks} from "./services/tank.service";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error: any) => console.log('MongoDB connection error:', error));

app.get('/', (req, res) => {
  res.send('ok')
})

// Ajouter un iot
app.post('/iot', async (req: Request, res: Response) => {
    const {name, key} = req.body as {name: string, key: string};
    const iot = await createIot({name, key});
    res.json(iot);
})

// Récupérer un iot
app.get('/iot/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const iot = await findIot({_id: id});
    res.json(iot);
})

// Récupérer tous les iots
app.get('/iot', async (req: Request, res: Response) => {
    const iots = await findIots({});
    res.json(iots);
});

// Ajouter une mesure
app.post('/measurement', async (req: Request, res: Response) => {
    const {height, ioT} = req.body as {height: number, ioT: string};
    const measurement = await createMeasurement({height, ioT, createdAt: new Date()});
    res.json(measurement);
});

// Ajouter un tank
app.post('/tank', async (req: Request, res: Response) => {
    const {name, dimensions} = req.body as {name: string, dimensions: {length: number, width: number, height: number}};
    const tank = await createTank({name, dimensions});
    res.json(tank);
});

// Patch un tank avec un iot
app.patch('/tank/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {ioT} = req.body as {ioT: string};
    const tank = await addIotToTank(id, ioT);
    res.json(tank);
});

// List all tanks
app.get('/tanks', async (req: Request, res: Response) => {
    const tanks = await findTanks({});
    res.json(tanks);
});

// Get measurement of iot between dates
app.get('/measurement/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {from, to} = req.query as {from: string, to: string};
    const measurements = await findMeasurementsBetweenDates(from, to, {
        ioT: id
    });
    res.json(measurements);
});
// Lancer le serveur
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
