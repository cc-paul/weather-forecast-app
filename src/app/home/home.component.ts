import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userFullName: string = "";
  userGitProfileLink: string = "";

  ngOnInit(): void {
    this.userFullName = 'John Doe';
    this.userGitProfileLink = 'github.com/johndoe';
  }
}
