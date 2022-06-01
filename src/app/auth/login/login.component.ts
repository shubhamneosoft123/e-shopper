import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth,signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  list: any=[];
  a: any;

  loginForm:any;
  changeType:boolean=true;
  isVisible:boolean=true;
  loginUsername: any;
  constructor(public _auth:Auth,private router:Router,private _sharedService:SharedService){}

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
    this._sharedService.hideNavbar();
  }


  // Login
  login(){
    console.log(this.loginForm.value);
      signInWithEmailAndPassword(this._auth,this.loginForm.value.email,this.loginForm.value.password).then((res:any)=>{
            console.log(res.user);
            console.log(res.user.auth.email);
            this.router.navigate(['']);
        })
        .catch((err)=>{
          alert(err.message);
        })
        this._sharedService.hideNavbar();
  }


  //Show Password
  viewPassword(){
    this.changeType=!this.changeType;
    this.isVisible=!this.isVisible;
  }

  //Sign in with google
  googleProvider=new GoogleAuthProvider();

  siginWithGoogle(){
    signInWithPopup(this._auth,this.googleProvider)
    .then((res:any)=>{
      console.log(res);
      this.router.navigate(['/']);
       localStorage.setItem('token',JSON.stringify(res.user.displayName));
      this.loginUsername=res.user.displayName;
      // console.log(this.loginUsername);
      
      this._sharedService.getLogInUsername(this.loginUsername);
    },
    err=>{
      alert(err.message)
    }
    )
  }
  
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
}//
