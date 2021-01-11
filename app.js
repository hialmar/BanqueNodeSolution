const express = require('express');
const app = express();
const Banque = require('./banque');

// création de la banque
const banque = new Banque();

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

// Si on veut que l'application Angular soit envoyé par notre application Node.js
app.use(express.static(__dirname + '/banque-frontend/dist/banque-frontend'));

app.use(express.json()); // pour parser du JSON

app.post('/compte/', function (req, res) {
    console.log(req.body);
    if (!isFloat(req.body.somme)) {
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
    } else {
        const id = banque.creerCompte(parseFloat(req.body.somme))
        const pos = banque.positionDuCompte(id);
        if (pos) {
            console.log(pos);
            res.json(pos);
        } else {
            res.status(500).json({error: "Erreur interne lors de la création du compte"});
        }
    }
});

app.get('/compte/:id', function (req, res) {
    if (typeof req.params.id === 'undefined') {
        res.status(400).json({error: 'Il faut préciser l\'id.'});
    } else {
        const pos = banque.positionDuCompte(req.params.id);
        if (pos) {
            console.log(pos);
            res.json(pos);
        } else {
            res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
        }
    }
});

app.put('/compte/:id', function (req, res) {
    console.log(req.query);
    let pos;
    if (typeof req.params.id === 'undefined' || !isFloat(req.body.somme)) {
        res.status(400).json({error: 'Il faut préciser les paramètres.'});
    } else {
        if (req.body.somme > 0) {
            console.log("ajout");
            if (banque.ajouterAuCompte(req.params.id, parseFloat(req.body.somme))) {
                pos = banque.positionDuCompte(req.params.id);
                if (pos) {
                    console.log(pos);
                    res.json(pos);
                } else {
                    res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
                }
            } else {
                res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
            }
        } else {
            console.log("retrait");
            if (banque.retirerDuCompte(req.params.id, -parseFloat(req.body.somme))) {
                pos = banque.positionDuCompte(req.params.id);
                if (pos) {
                    console.log(pos);
                    res.json(pos);
                } else {
                    res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
                }
            } else {
                res.status(404).json({error: "Le compte d'id " + req.params.id + " n'existe pas."});
            }
        }
    }
});

app.listen(3000, function () {
 console.log('La banque écoute sur le port 3000!') ;
});

