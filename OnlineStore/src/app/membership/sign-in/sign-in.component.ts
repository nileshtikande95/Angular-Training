import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';


  constructor(public authService: AuthService, private router:Router) {}

  ngOnInit() {
    // 🔍 This ensures username is always a string
    // const stored = localStorage.getItem('username');
    // this.username = typeof stored === 'string' ? stored : '';
  }

  login(form:any): void {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.message = '✅ Login successful!';
      setTimeout(() => this.router.navigate(['/home']), 1500);
 
    } else {
      this.message = '❌ Invalid username or password.';
    
    }
  }
  
  logout(): void {
    debugger
    this.authService.logout();
    this.username = '';
    this.password = '';
    this.goHome();
  }
  
   goHome(): void {
    this.router.navigate(['/home']);
  }
}
