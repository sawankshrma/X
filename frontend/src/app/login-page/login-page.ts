import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../Services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms"
import { MainPopupModal } from "../main-popup-modal/main-popup-modal";

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, MainPopupModal],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit, AfterViewInit{
  private userService = inject(UserService);
  private router = inject(Router)

  @ViewChild(MainPopupModal) modal!: MainPopupModal;
  
  loginFrom = new FormGroup({
    username: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
    password: new FormControl<string>('', {nonNullable:true, validators: Validators.required}),
  })

  ngOnInit () {
    this.userService.getLoggedInState().subscribe(value => {
      if (value === true) {
        console.log('logged in already');
        // this.router.navigate(['/home'])
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal.open();
  }

  onSubmit() {
    this.userService.login(this.loginFrom.getRawValue()).subscribe({
      next: () => {
        this.userService.setLoggedIn(true);
        console.log("logged in");
        this.modal.close();
        this.router.navigate(["/home"])
      },
      error: () => {
        console.log('error loggin in!');
      }
    })
  }

}
