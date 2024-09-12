import { Injectable } from "@angular/core"; 
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private as: AuthService, private router: Router) {} 

    canActivate(): boolean {
        console.log('AuthGuard is called')
        if(this.as.isLoggedIn()) {
            return true 
        } else {
            this.router.navigate(["login"])
            return false 
        }
    }
}