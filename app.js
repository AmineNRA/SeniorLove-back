import express from 'express';
import * as dotenv from 'dotenv';

// Variable d'environnement
dotenv.config();

//Définir le port sur lequel on sera, soit il est définit dans le .env sinon c'est 3000
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send("Bienvenue sur mon API !")
})

app.use(express.urlencoded({ extended: true }));

// Middleware pour lire du json
app.use(express.json())

// Pour indiquer si le serveur est bien allumé
app.listen(port, () => {
    console.log(`Serveur sur http://localhost:${port}/`)
})