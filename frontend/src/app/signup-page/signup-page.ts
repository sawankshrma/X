import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { MainPopupModal } from '../main-popup-modal/main-popup-modal';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, MainPopupModal],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
})
export class SignupPage implements OnInit{
  private userService = inject(UserService);
  private router = inject(Router);

  @ViewChild(MainPopupModal) modal!: MainPopupModal;
  
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
        // this.router.navigate(['/home'])
      }
    })
  }

  ngAfterViewInit() {
    this.modal.open();
  }

  onSubmit() {
    this.userService.signup(this.signupForm.getRawValue()).subscribe({
      next: () => {
        console.log("Signed Up");
        this.modal.close()
        this.router.navigate(["/login"])
      },
      error: () => {
        console.log('error signing up!');
      }
    })
  }

}
