import { Component, OnInit } from '@angular/core';
import {InfoCompte} from "../info.compte";
import {BanqueService} from "../banque.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  // les infos du compte
  ic : InfoCompte;
  // retour ou erreur
  resultat: string;

  // on a besoin du service
  constructor(private banque: BanqueService) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  // création du compte
  creerCompte() {
    this.resultat = "Opération en cours";
    // on appelle la méthode du service
    this.banque.creerCompte(this.ic).subscribe({
      // ça s'est bien passé
      next: (response) => {
        // on affiche l'id du compte créé
        this.resultat = "Compte d'id "+response._id+" créé";
        // et on l'indique en tant que compte courant
        this.banque.currentId = response._id;
      },
      // en cas d'erreur
      error: (error) => {
        // on affiche le message
        this.resultat = "Erreur : " + error.error.error;
        // avec plus de détails en console
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      }
    });
  }

  ngOnInit(): void {
  }

}
