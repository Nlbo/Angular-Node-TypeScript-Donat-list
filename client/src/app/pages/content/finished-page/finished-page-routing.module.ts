import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinishedPageComponent} from "./finished-page.component";


const routes: Routes = [
  {path: '', component: FinishedPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishedPageRoutingModule { }
