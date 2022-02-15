import { Component } from '@angular/core';
import {BanqueService} from "./banque.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // on a besoin du service pour avoir l'id du compte courant
  // on a besoin du routeur pour naviguer vers les différentes routes
  constructor(private banqueService : BanqueService, private router: Router) {
  }

  // navigue vers la route création
  creation() {
    this.router.navigate(['/creation']);
  }

  // navigue vers la route consultation en précisant l'id du compte courant
  consultation() {
    this.router.navigate(['/consultation', this.banqueService.currentId]);
  }

  // navigue vers la route modification en précisant l'id du compte courant
  modification() {
    this.router.navigate(['/modification', this.banqueService.currentId]);
  }
}
