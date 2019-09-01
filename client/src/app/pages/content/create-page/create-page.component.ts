import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../shared/services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  fileToUpload: File = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      location: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      initiator: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      started_at: new FormControl('', [Validators.required]),
      finished_at: new FormControl('', [Validators.required]),
      user: new FormControl(localStorage.getItem('user_id'), [Validators.required]),
    })
  }

  handleFileInput(e) {
    this.fileToUpload = e.target.files.item(0);
  }


  publish() {
    let formData = new FormData();

    formData.append('location', this.form.get('location').value);
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('initiator', this.form.get('initiator').value);
    formData.append('amount', this.form.get('amount').value);
    formData.append('started_at', this.form.get('started_at').value);
    formData.append('finished_at', this.form.get('finished_at').value);
    formData.append('user', this.form.get('user').value);
    formData.append('image', this.fileToUpload);

    this.dataService.publishProject(formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['content','ongoing'])
    })
  }

}
