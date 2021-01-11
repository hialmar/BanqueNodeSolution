// importation du module banque
const Banque = require('./banque');

// création de la banque
const banque = new Banque();

// création d'un compte
const id1 = banque.creerCompte(1000);

// affichage de la position du compte 1
console.log(banque.positionDuCompte(id1));

// création d'un second compte
const id2 = banque.creerCompte(1000);

// affichage de la position du compte 2
console.log(banque.positionDuCompte(id2));

// retrait du premier compte
banque.retirerDuCompte(id1, 500);

// ajout au second compte
banque.ajouterAuCompte(id2, 500);

// affichage de la position du compte 1
console.log(banque.positionDuCompte(id1));

// affichage de la position du compte 2
console.log(banque.positionDuCompte(id2));

