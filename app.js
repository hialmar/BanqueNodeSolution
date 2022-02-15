// importation d'express
const express = require('express');
// création d'une app express
const app = express();

// importation de la banque
const Banque = require('./banque');
// création de la banque
const banque = new Banque();

// fonction utilitaire pour gérer les sommes envoyées par le front
function isFloat(value) {
    return !isNaN(value) &&
        parseFloat(Number(value)) == value &&
        !isNaN(parseFloat(value));
}

// Si on lance l'application Angular.js avec ng serve
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Si on veut que l'application Angular soit envoyée par notre application Node.js
app.use(express.static(__dirname + '/front/dist/front'));

// pour parser du JSON
app.use(express.json());

// Route POST qui sert à créer un compte
app.post('/compte/', function (req, res) {
    console.log(req.body);
    // on vérifie que le body reçu contient une somme.
    if (!isFloat(req.body._somme)) {
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
    } else {
        // on appelle la méthode métier
        const id = banque.creerCompte(parseFloat(req.body._somme));
        // on récupère la position du compte créé
        const pos = banque.positionDuCompte(id);
        // si la position est correcte
        if (pos) {
            console.log(pos);
            // on la renvoie au front
            res.json(pos);
        } else {
            // il y a eu un gros problème
            res.status(500).json({error: "Erreur interne lors de la création du compte"});
        }
    }
});

// Route GET pour récupérer la position du compte d'id id
app.get('/compte/:id', function (req, res) {
    // si l'id n'est pas défini (normalement on ne devrait pas entrer dans la méthode, mais au cas où)
    if (typeof req.params.id === 'undefined') {
        res.status(400).json({error: 'Il faut préciser l\'id.'});
    } else {
        // tentative de récupération de la position du compte
        const pos = banque.positionDuCompte(req.params.id);
        // si elle est correcte
        if (pos) {
            console.log(pos);
            // on la renvoie
            res.json(pos);
        } else {
            // sinon on envoie une erreur 404
            res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
        }
    }
});

// Route PUT pour gérer les opérations de crédit et débit
app.put('/compte/:id', function (req, res) {
    let pos;
    // on vérifie qu'on a l'id et la somme
    if (typeof req.params.id === 'undefined' || !isFloat(req.body._somme)) {
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
    } else {
        // si la somme est positive, c'est un crédit
        if (req.body._somme > 0) {
            console.log("ajout");
            // on tente d'appeler la méthode métier
            if (banque.ajouterAuCompte(req.params.id, parseFloat(req.body._somme))) {
                // c'est bon
                // on récupère la position à jour
                pos = banque.positionDuCompte(req.params.id);
                // si elle est correcte
                if (pos) {
                    console.log(pos);
                    // on l'envoie
                    res.json(pos);
                } else {
                    // normalement on ne devrait pas passer ici
                    res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
                }
            } else {
                // le compte n'existe probablement pas
                res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
            }
        } else {
            // C'est un débit
            console.log("retrait");
            // on tente d'appeler la méthode métier
            if (banque.retirerDuCompte(req.params.id, -parseFloat(req.body._somme))) {
                // c'est bon
                // on récupère la position à jour
                pos = banque.positionDuCompte(req.params.id);
                // si elle est correcte
                if (pos) {
                    console.log(pos);
                    // on l'envoie
                    res.json(pos);
                } else {
                    // normalement on ne devrait pas passer ici
                    res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
                }
            } else {
                // le compte n'existe probablement pas
                res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
            }
        }
    }
});

// on lance l'app express sur le port 3000
app.listen(3000, function () {
 console.log('La banque écoute sur le port 3000!') ;
});

