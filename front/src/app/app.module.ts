import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { CreationComponent } from './creation/creation.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ModificationComponent } from './modification/modification.component';
import {BanqueService} from "./banque.service";

// définition des routes
const appRoutes: Routes = [
  {path: 'creation', component: CreationComponent},
  {path: 'consultation/:id', component: ConsultationComponent},
  {path: 'modification/:id', component: ModificationComponent},
  {path: '', redirectTo: 'creation', pathMatch: 'full'},
  {path: '**', redirectTo: 'creation'}
];

@NgModule({
  declarations: [ // déclaration des composants
    AppComponent,
    CreationComponent,
    ConsultationComponent,
    ModificationComponent
  ],
  imports: [ // modules Angular dont on dépend
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes) // ne pas oublier les routes
  ],
  providers: [BanqueService], // le service
  bootstrap: [AppComponent]
})
export class AppModule { }
