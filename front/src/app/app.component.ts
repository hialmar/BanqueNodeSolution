import { Component } from '@angular/core';
import {BanqueService} from "./banque.service";
import {InfoCompte} from "./info.compte";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id = "0";

  constructor(private router: Router) {
  }

  creation() {
    this.router.navigate(['/creation']);
  }

  consultation() {
    this.router.navigate(['/consultation', this.id]);
  }

  modification() {
    this.router.navigate(['/modification', this.id]);
  }
}
