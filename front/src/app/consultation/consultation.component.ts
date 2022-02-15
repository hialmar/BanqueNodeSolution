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
  ic : InfoCompte;
  resultat: string;

  constructor(private banque: BanqueService, private route: ActivatedRoute, private router: Router) {
    this.resultat = "";
    this.ic = new InfoCompte();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id !== null)
        this.banque.currentId = this.ic._id = id;
        this.positionDuCompte();
    });
  }

  positionDuCompte() {
    this.banque.positionDuCompte(this.ic._id).subscribe({
      next: (response) => {
        this.ic = response;
        this.resultat = "Le compte d'id "+response._id+" a "+response._somme+
          " euros et la date de dernière opération est "+response._date;
      },
      error: (error) => {
        this.resultat = "Erreur : " + error.error.error;
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.error}`);
      }
    });
  }

  changerCompte() {
    this.router.navigate(['/consultation', this.ic._id]);
  }
}
