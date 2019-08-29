import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishedPageRoutingModule } from './finished-page-routing.module';
import {FinishedPageComponent} from "./finished-page.component";


@NgModule({
  declarations: [
    FinishedPageComponent
  ],
  imports: [
    CommonModule,
    FinishedPageRoutingModule
  ]
})
export class FinishedPageModule { }
