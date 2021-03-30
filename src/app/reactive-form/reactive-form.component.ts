import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  constructor() {}
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  ngOnInit(): void {}

  submitForm() {
    console.warn(this.profileForm.value);
  }
}
