import { Component, OnInit } from '@angular/core';
import {InfoCompte} from "../info.compte";
import {BanqueService} from "../banque.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {

  ic : InfoCompte;
  resultat: string;

  constructor(private banque: BanqueService, private route: ActivatedRoute) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id !== null)
        this.ic._id = id;
    });
  }

  ajouterAuCompte() {
    if(this.ic._somme > 0) {
      this.resultat = "Opération en cours";
      this.banque.ajouterAuCompte(this.ic).subscribe((response) => {
        this.resultat = "Compte crédité";
      }, (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      });
    } else {
      this.resultat = "La somme doit être positive";
    }
  }

  retirerDuCompte() {
    if(this.ic._somme > 0) {
      var retrait = new InfoCompte();
      retrait._id = this.ic._id;
      retrait._somme = -1 * this.ic._somme;
      this.resultat = "Opération en cours";
      this.banque.retirerDuCompte(retrait).subscribe((response) => {
        this.resultat = "Compte débité";
      }, (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      });
    } else {
      this.resultat = "La somme doit être positive";
    }
  }

}
