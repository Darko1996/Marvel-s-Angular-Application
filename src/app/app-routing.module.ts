import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CharacterDetailsComponent} from "./components/character-details/character-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'character-details/:id', component: CharacterDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
