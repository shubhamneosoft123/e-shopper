import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  isAdmin: boolean|any;
  loginUser: any;
  constructor(private _auth:Auth,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.logIn();
      return this.isAdmin;

  }


  logIn(){
    onAuthStateChanged(this._auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.loginUser = user.email;
        if(this.loginUser=="shubham@gmail.com"){
            this.isAdmin=true
        }else{
          this.isAdmin=false;
          this.router.navigate(['/'])
        }
      }
    });
  }
  
}
