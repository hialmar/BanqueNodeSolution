const Position = require('./position');

module.exports = class Compte {
    // constructeur
    constructor(id, somme) {
        this._position = new Position(id, somme);
    }

    // pour créditer le compte
    ajouter(somme) {
        this._position.somme += somme;
        this._position.date = new Date();
    };

    // pour débiter le compte
    retirer(somme) {
        this._position.somme -= somme;
        this._position.date = new Date();
    }

    // pour récupérer la position du compte
    get position() {
        return this._position;
    }
}
