import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../Services/user-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage implements OnInit{
  private userService = inject(UserService);
  private router = inject(Router)
  
  signupForm = new FormGroup({
    username: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
    email: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
    password: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
    profilePicUrl: new FormControl<string>('', {nonNullable:true})
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
    this.userService.signup(this.signupForm.getRawValue()).subscribe({
      next: () => {
        console.log("Signed Up");
        this.router.navigate(["/login"])
      },
      error: () => {
        console.log('error signing up!');
      }
    })
  }

}
