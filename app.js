import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import conversationRouter from './routes/conversationRoute.js';
import eventRouter from './routes/eventRoute.js';
import profileRouter from './routes/profileRoute.js';
import matchRouter from './routes/matchRoute.js';
import messageRouter from './routes/MessageRoute.js';
import authRouter from './routes/authRoute.js';
import reservationRouter from './routes/reservationRoute.js';
import initAssociations from './models/associations.js';

// Variable d'environnement
dotenv.config();

//Définir le port sur lequel on sera, soit il est définit dans le .env sinon c'est 3000
const port = process.env.PORT || 3000;
const app = express();

// Initialiser les associations avant de démarrer le serveur
initAssociations();

app.get('/', (req, res) => {
    res.send("Bienvenue sur mon API !")
})

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Middleware pour lire du json
app.use(express.json());


app.use(authRouter);
app.use(conversationRouter);
app.use(eventRouter);
app.use(profileRouter);
app.use(matchRouter);
app.use(messageRouter);
app.use(reservationRouter);

// Pour indiquer si le serveur est bien allumé
app.listen(port, () => {
    console.log(`Serveur sur http://localhost:${port}/`)
})