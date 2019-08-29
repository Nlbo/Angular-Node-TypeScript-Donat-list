import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import {HeaderComponent} from "../../components/header/header.component";
import {OngoingCardComponent} from "../../components/ongoing-card/ongoing-card.component";
import {FinishedCardComponent} from "../../components/finished-card/finished-card.component";


@NgModule({
  declarations: [
    ContentComponent,
    NavbarComponent,
    HeaderComponent,
    OngoingCardComponent,
    FinishedCardComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
