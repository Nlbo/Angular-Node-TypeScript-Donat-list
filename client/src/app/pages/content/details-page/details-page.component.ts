import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../../../shared/services/data.service";
import {AppGlobals} from "../../../app.globals";
import Project from "../../../models/Project";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  url;
  imgSrc: string = 'https://via.placeholder.com/1640x800';
  donated = '0';
  amount = '0';
  initiator = '';
  title = '';
  description = '';
  donat = '';
  id= '';
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private globals: AppGlobals) {
    this.url = globals.url;
  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.dataService.getOneProject(params.id).subscribe((data: Project) => {
        this.imgSrc = this.url +  data.img;
        this.donated = data.donated;
        this.amount = data.amount;
        this.initiator = data.initiator;
        this.title = data.title;
        this.description = data.description;
      })
    });

  }
  getDate() {
    return new Date().toDateString();
  }

  donate() {
    let data = {
      user_id: localStorage.getItem('user_id'),
      donat: this.donat
    };
    console.log(this.id)
    this.dataService.donate(data, this.id).subscribe((dataa) => {
      this.router.navigate(['ongoing'])
    })
  }
  check() {
    return (+this.donated / +this.amount) * 100 === 0 ? '1%' :
      (+this.donated / +this.amount) * 100 < 100 ? (+this.donated / +this.amount) * 100 + '%' :
        100 + '%'
  }
}
