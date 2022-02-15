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
  // les infos du compte
  ic : InfoCompte;
  // pour les retours et erreurs
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
    });
  }

  // méthde pour créditer
  ajouterAuCompte() {
    // on vérifie que la somme est positive
    if(this.ic._somme > 0) {
      this.resultat = "Opération en cours";
      // on appelle la méthode du service
      this.banque.ajouterAuCompte(this.ic).subscribe({
        // si ça c'est bien passé
        next: (response) => {
          // on affiche un message
          this.resultat = "Compte crédité";
        },
        // en cas d'erreur
        error: (error) => {
          // on affiche un message d'erreur
          this.resultat = "Erreur : " + error.error.error;
          // et plus de détails en console
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error.error}`);
        }
      });
    } else {
      // on affiche un message d'erreur
      this.resultat = "La somme doit être positive";
    }
    // on re-génère l'URL en cas de changement d'id
    this.router.navigate(['/modification', this.ic._id]);
  }

  // méthode pour débiter
  retirerDuCompte() {
    // si la somme est positive
    if(this.ic._somme > 0) {
      // on crée un objet info compte pour transporter la somme négative
      // on ne veut pas l'afficher à l'utilisateur
      var retrait = new InfoCompte();
      retrait._id = this.ic._id;
      retrait._somme = -1 * this.ic._somme;
      this.resultat = "Opération en cours";
      // on appelle la méthode du service
      this.banque.retirerDuCompte(retrait).subscribe({
        // si ça c'est bien passé
        next: (response) => {
          // on affiche un message
          this.resultat = "Compte crédité";
        },
        // en cas d'erreur
        error: (error) => {
          // on affiche le message d'erreur
          this.resultat = "Erreur : " + error.error.error;
          // plus de détails en console
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error.error}`);
        }
      });
    } else {
      // on affiche un message d'erreur
      this.resultat = "La somme doit être positive";
    }
    // on re-génère l'URL en cas de changement d'id
    this.router.navigate(['/modification', this.ic._id]);
  }

}
