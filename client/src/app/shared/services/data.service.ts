import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url;

  constructor(private http: HttpClient, private globals: AppGlobals) {
    this.url = globals.url;
  }


  publishProject(data) {
    return this.http.post(this.url + '/api/project', data)
  };

  getOngoingProjects() {
    return this.http.get(this.url + '/api/project/ongoing')
  }

  getFinishedProjects() {
    return this.http.get(this.url + '/api/project/finished')
  }

  getOneProject(id) {
    return this.http.get(this.url + `/api/project?id=${id}`)
  }

  donate(data, id) {
    console.log(id)
    return this.http.put(this.url + `/api/project?id=${id}`, data)
  }
}
