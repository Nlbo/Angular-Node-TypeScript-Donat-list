import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePageRoutingModule } from './create-page-routing.module';
import {CreatePageComponent} from "./create-page.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    CreatePageRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreatePageModule { }
