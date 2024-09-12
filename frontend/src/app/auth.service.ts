import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode"; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(email:string, password:string) {
    return this.http.post('http://localhost:4000/api/users/signup/', {email, password})
  }

  login(email:string, password:string ) {
    return this.http.post('http://localhost:4000/api/users/login/', {email, password})
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')
    if(token) {
      let decoded = jwtDecode(token)
      if(decoded.exp && decoded.exp > Date.now() / 1000) {
        return true
      }
    }
    return false
  }
}
