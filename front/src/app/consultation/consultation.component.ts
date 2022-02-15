import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InfoCompte} from "../info.compte";
import {BanqueService} from "../banque.service";

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  // détails du compte
  ic : InfoCompte;
  // message d'erreur ou de retour
  resultat: string;

  // on a besoin du service, de l'a route (pour récupérer l'id) et du routeur pour changer d'URL
  constructor(private banque: BanqueService, private route: ActivatedRoute, private router: Router) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  // initialisation
  ngOnInit(): void {
    // récupération de l'id depuis l'URL
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      // s'il n'est pas null
      if(id !== null)
        // on l'affecte au service
        this.banque.currentId = this.ic._id = id;
        // on récupère la position du compte
        this.positionDuCompte();
    });
  }

  positionDuCompte() {
    // on appelle la méthode du service
    this.banque.positionDuCompte(this.ic._id).subscribe({
      // si ça se passe bien, cette fonction sera appelée
      next: (response) => {
        // on récupère la position
        this.ic = response;
        // on affiche un message
        this.resultat = "Le compte d'id "+response._id+" a "+response._somme+
          " euros et la date de dernière opération est "+response._date;
      },
      // s'il y a une erreur
      error: (error) => {
        // on affiche le message d'erreur
        this.resultat = "Erreur : " + error.error.error;
        // plus de détails dans la console
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      }
    });
  }

  // lors d'un appui sur le bouton il faut changer d'URL
  changerCompte() {
    this.router.navigate(['/consultation', this.ic._id]);
  }
}
