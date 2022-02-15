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

const appRoutes: Routes = [
  {path: 'creation', component: CreationComponent},
  {path: 'consultation/:id', component: ConsultationComponent},
  {path: 'modification/:id', component: ModificationComponent},
  {path: '', redirectTo: 'creation', pathMatch: 'full'},
  {path: '**', redirectTo: 'creation'}
];

@NgModule({
  declarations: [
    AppComponent,
    CreationComponent,
    ConsultationComponent,
    ModificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
