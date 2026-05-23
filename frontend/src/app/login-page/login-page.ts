import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service';
import { loginParams } from '../Services/Types/types';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit{
  private userService = inject(UserService);
  private router = inject(Router)
  
  loginFrom = new FormGroup({
    username: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
    password: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
  })

  ngOnInit () {
    this.userService.getLoggedInState().subscribe(value => {
      if (value === true) {
        console.log('logged in already');
        this.router.navigate(['/home'])
      }
    })
  }

  onSubmit() {
    this.userService.login(this.loginFrom.getRawValue()).subscribe({
      next: () => {
        this.userService.setLoggedIn(true);
        console.log("logged in");
        this.router.navigate(["/home"])
      },
      error: () => {
        console.log('error loggin in!');
      }
    })
  }

}
