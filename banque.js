const Compte = require('./compte');

module.exports = class Banque {

	// constructeur
	constructor() {
		this.listeComptes = [];
		this.nextId = 0;
	}

	// créer un nouveau compte
	creerCompte(somme) {
		const id = this.nextId++;
		// on le cree
		this.listeComptes[id] = new Compte(id, somme);
		//console.log(listeComptes);
		return id;
	};

	// pour créditer un compte existant
	ajouterAuCompte(id, somme) {
		// s'il n'existe pas
		if (typeof this.listeComptes[id] === 'undefined')
			return 0;
		this.listeComptes[id].ajouter(somme);
		return 1;
	};

	// pour débiter un compte existant
	retirerDuCompte(id, somme) {
		// s'il n'existe pas
		if (typeof this.listeComptes[id] === 'undefined')
			return 0;
		this.listeComptes[id].retirer(somme);
		return 1;
	};

	// pour connaitre la position d'un compte existant
	positionDuCompte(id) {
		//console.log(listeComptes);
		// s'il n'existe pas
		if (typeof this.listeComptes[id] === 'undefined')
			return false;
		return this.listeComptes[id].position;
	};
}
