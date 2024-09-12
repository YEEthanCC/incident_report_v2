import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms'
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of, map, EMPTY, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form!: FormGroup 
  user: any 
  error?: string

  constructor(private as: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    let FormControls = {
      email: new FormControl('', [
        Validators.required
      ]), 
      password: new FormControl('', [
        Validators.required
      ])
    }
    this.form = new FormGroup(FormControls)
  }

  onSubmit(user: any) {
    this.as.login(user.email, user.password).subscribe((res: any) => {
      if(res) {
        localStorage.setItem('email', res.email)
        localStorage.setItem('token', res.token)
        this.router.navigate(["home"]);
      } 
    }, 
    (err: any) => {
      console.log('HTTP error: ', err.error.error)
      this.error = err.error.error
    })
    // this.as.login(user.email, user.password).pipe(
    //   catchError((error: any) => {
    //     console.log('HTTP ERROR', error.error.error) 
    //     return EMPTY
    //   })
    // ).subscribe((res: any) => {
    //   if(res) {
    //     localStorage.setItem('email', res.email)
    //     localStorage.setItem('token', res.token)
    //     this.router.navigate(["home"]);
    //   } 
    // })
  }
  
  signup() {
    this.router.navigate(["signup"])
  }
}
