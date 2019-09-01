import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinishedPageRoutingModule } from './finished-page-routing.module';
import {FinishedPageComponent} from "./finished-page.component";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination'


@NgModule({
  declarations: [
    FinishedPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FinishedPageRoutingModule
  ]
})
export class FinishedPageModule { }
