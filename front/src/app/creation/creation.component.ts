import { Component, OnInit } from '@angular/core';
import {InfoCompte} from "../info.compte";
import {BanqueService} from "../banque.service";

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  ic : InfoCompte;
  resultat: string;

  constructor(private banque: BanqueService) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  creerCompte() {
    this.resultat = "Opération en cours";
    this.banque.creerCompte(this.ic).subscribe({
      next: (response) => {
        this.resultat = "Compte d'id "+response._id+" créé";
        this.banque.currentId = response._id;
      },
      error: (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      }
    });
  }

  ngOnInit(): void {
  }

}
