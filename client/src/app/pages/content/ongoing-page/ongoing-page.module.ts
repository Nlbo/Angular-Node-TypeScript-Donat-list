import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OngoingPageRoutingModule } from './ongoing-page-routing.module';
import {OngoingPageComponent} from "./ongoing-page.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination'

@NgModule({
  declarations: [
    OngoingPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    OngoingPageRoutingModule
  ]
})
export class OngoingPageModule { }
