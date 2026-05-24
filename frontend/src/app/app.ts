import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './Services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('tweetX');
  private router = inject(Router);

  constructor( private userService: UserService) {}

  ngOnInit () {
    this.userService.checkAuth().subscribe()
  }

  logOut () {
    this.userService.logout().subscribe({
      next: () => {
        this.userService.setLoggedIn(false);
        console.log('logged out! Redirecting to Login Page');
        this.router.navigate(['/login'])
      },
      error: () => {
        console.log('error loggin out!')
      }
    })
  }

}
