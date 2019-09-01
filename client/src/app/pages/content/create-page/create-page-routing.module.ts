import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatePageComponent} from "./create-page.component";


const routes: Routes = [
  {path: '', component: CreatePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePageRoutingModule { }
