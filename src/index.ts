import {Application, Request, Response} from "express";
import routers from "./routes/routers";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app: Application = express();
app.use(bodyParser.json());
app.use(cors())

//log all requests
app.use((req: Request, res: Response, next: any) => {
    console.log(req.method, req.path);
    next();
});

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error: any) => console.log('MongoDB connection error:', error));

routers(app);

app.get('/', (req: Request, res:Response) => {
    res.sendStatus(200);
})

// Ajouter une mesure
// app.post('/measurement', async (req: Request, res: Response) => {
//     const {height, ioT} = req.body as {height: number, ioT: string};
//     const measurement = await createMeasurement({height, ioT: new mongoose.ObjectId(ioT), createdAt: new Date()});
//     res.json(measurement);
// });
//
// // Ajouter un tank
// app.post('/tank', async (req: Request, res: Response) => {
//     const {name, dimensions} = req.body as {name: string, dimensions: {length: number, width: number, height: number}};
//     const tank = await createTank({name, dimensions});
//     res.json(tank);
// });
//
// // Patch un tank avec un iot
// app.patch('/tank/:id', async (req: Request, res: Response) => {
//     const {id} = req.params;
//     const {ioT} = req.body as {ioT: string};
//     const tank = await addIotToTank(id, ioT);
//     res.json(tank);
// });
//
// // List all tanks
// app.get('/tanks', async (req: Request, res: Response) => {
//     const tanks = await findTanks({});
//     res.json(tanks);
// });
//
// // Get measurement of iot between dates
// app.get('/measurement/:id', async (req: Request, res: Response) => {
//     const {id} = req.params;
//     const {from, to} = req.query as {from: string, to: string};
//     const measurements = await findMeasurementsBetweenDates(from, to, {
//         ioT: new mongoose.ObjectId(id)
//     });
//     res.json(measurements);
// });
// Lancer le serveur
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
