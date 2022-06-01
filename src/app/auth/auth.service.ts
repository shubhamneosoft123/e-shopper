import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }
  // googleSignIn(){
  //   let auth=getAuth();
  //   let googleProvider=new GoogleAuthProvider();
  //  return signInWithPopup(auth,googleProvider).then((res:any)=>{
  //     console.log(res);
  //     // this.router.navigate(['/']);
  //     // localStorage.setItem('token',JSON.stringify(res.user?.uid))
  //   },
  //   err=>{
  //     alert(err.message)
  //   }
  //   )
  // }
}



