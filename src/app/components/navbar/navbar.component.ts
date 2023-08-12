import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';

  login() {
    if (this.username === 'user' && this.password === 'pass') {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
  }
}