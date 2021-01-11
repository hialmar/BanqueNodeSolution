module.exports = class Position {

    // constructeur
    constructor(id, somme) {
        // l'id du compte
        // la somme
        // la date de dernière opération
        this._date = new Date();
        this._id = id;
        this._somme = somme;
    }

    // Getters et Setters utiles
    get id() {
        return this._id;
    }

    get somme() {
        return this._somme;
    }

    set somme(value) {
        this._somme = value;
    }

    get date() {
        return this._date;
    }

    set date(d) {
        this._date = d;
    }
}
