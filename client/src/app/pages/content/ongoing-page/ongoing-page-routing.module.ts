import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OngoingPageComponent} from "./ongoing-page.component";


const routes: Routes = [
  {path: '', component: OngoingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngoingPageRoutingModule { }
