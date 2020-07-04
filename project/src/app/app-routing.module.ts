import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {GameComponent} from "./game/game.component";
import {DisclaimerComponent} from "./disclaimer/disclaimer.component";


const routes: Routes = [
  { path: '', component: DisclaimerComponent},
  { path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
