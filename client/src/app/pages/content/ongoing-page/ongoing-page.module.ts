import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngoingPageRoutingModule } from './ongoing-page-routing.module';
import {OngoingPageComponent} from "./ongoing-page.component";


@NgModule({
  declarations: [
    OngoingPageComponent
  ],
  imports: [
    CommonModule,
    OngoingPageRoutingModule
  ]
})
export class OngoingPageModule { }
