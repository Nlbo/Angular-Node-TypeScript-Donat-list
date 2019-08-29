import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from "./content.component";


const routes: Routes = [
  {path: '', component: ContentComponent, children: [
      {path: 'ongoing', loadChildren: './ongoing-page/ongoing-page.module#OngoingPageModule' },
      {path: 'finished', loadChildren: './finished-page/finished-page.module#FinishedPageModule' },
      {path: '', redirectTo: 'ongoing', pathMatch: 'full'}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
