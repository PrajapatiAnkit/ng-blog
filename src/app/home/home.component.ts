import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}
  submitted = false;
  topics = ['Angular', 'Vue', 'React'];
  userModel = new User('ankit', '', '', '', false);

  ngOnInit(): void {}
  submitForm() {
    this.submitted = true;
  }
}
