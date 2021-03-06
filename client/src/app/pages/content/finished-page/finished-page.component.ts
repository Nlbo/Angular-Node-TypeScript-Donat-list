import { Component, OnInit } from '@angular/core';
import Project from "../../../models/Project";
import {Router} from "@angular/router";
import {DataService} from "../../../shared/services/data.service";

@Component({
  selector: 'app-finished-page',
  templateUrl: './finished-page.component.html',
  styleUrls: ['./finished-page.component.scss']
})
export class FinishedPageComponent implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  search = '';
  p: number = 1;
  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFinishedProjects().subscribe((data: Project[]) => {
      this.projects = data.filter(item => new Date(item.finished_at) < new Date() || item.finished);
      this.allProjects = data.filter(item => new Date(item.finished_at) < new Date() || item.finished);
    })
  }

  filter(text) {
    if(text) {
      this.projects = this.allProjects.filter(items => items.title.indexOf(text) >= 0)
    } else {
      this.projects = this.allProjects;
    }
  }

}
