import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any;
  changeType:boolean=true;
  isVisible:boolean=true;
 constructor(public auth:Auth){}

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      email:new FormControl("",[Validators.required]),
      password:new FormControl("",[Validators.required]),
    })
  }

  register(){
    console.log(this.registerForm.value);
      createUserWithEmailAndPassword(this.auth,this.registerForm.value.email,this.registerForm.value.password).then((res:any)=>{
          console.log(res.user);
      })
      .catch((err)=>{
        alert(err.message);
      })

    
  }

  viewPassword(){
    this.changeType=!this.changeType;
    this.isVisible=!this.isVisible;
  }

  get email(){
    return this.registerForm.get('email')
  }
  get password(){
    return this.registerForm.get('password')
  }

}
