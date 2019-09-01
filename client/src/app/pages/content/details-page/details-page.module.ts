import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsPageRoutingModule } from './details-page-routing.module';
import {DetailsPageComponent} from "./details-page.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DetailsPageRoutingModule
  ]
})
export class DetailsPageModule { }
