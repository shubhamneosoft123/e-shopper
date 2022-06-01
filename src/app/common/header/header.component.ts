import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import {
  doc,
  getDocs,
  deleteDoc,
  Firestore,
  collection,
} from '@angular/fire/firestore';
import { Auth, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  pname: any;
  cartProductData: any;
  finalCartCount: any;
  loginUser?: any;
  isLogedIn: boolean | undefined;
  isAdmin: boolean|undefined;
  isCart:boolean=false;
  getUserProduct: any;

  constructor(
    private fireStore: Firestore,
    public _sharedService: SharedService,
    private _auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signOutGoogle();
    this._sharedService.hideNavbar();
    //
 

    onAuthStateChanged(this._auth, (user) => {
    this.getUserProduct = user?.email
    const dbInstace = collection(this.fireStore,this.getUserProduct);
    getDocs(dbInstace)
      .then((res) => {
        this.cartProductData = res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        console.log(this.cartProductData.length, 'uytr');
        this.finalCartCount = this.cartProductData.length;
      })
      .catch((err) => {
        alert(err.message);
      });

    this.getCartCount();
    })
  }

  // sending input value to home component
  sendMessage(data: any) {
    this._sharedService.sendSearchData(data.value);
  }
  //
  getCartCount() {
    this._sharedService.carthomeCountSubject.subscribe((res: any) => {
      this.finalCartCount = res;
    });
  }

  // sign out

  logout() {
    signOut(this._auth)
      .then(() => {
        Swal.fire(
          'Logout!',
          'Successfully Logout',
          'success'
        );
        this.isCart=false;
        this.isAdmin=false;
        this.router.navigate(['products/home'])
        this.signOutGoogle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  signOutGoogle() {
    onAuthStateChanged(this._auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(user.email);
        this.loginUser = user.email;
        this.isLogedIn = true;
        this.isCart=true;

        if(this.loginUser=="shubham@gmail.com"){
          this.isAdmin=true;
        }else{
          this.isAdmin=false;
        }
      } else {
        this.loginUser = '';
        this.isLogedIn = false;
      }
    });
  }
}
