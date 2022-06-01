import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// import { SharedService } from 'src/app/shared/shared.service';
import {
  doc,
  getDocs,
  deleteDoc,
  Firestore,
  collection,
} from '@angular/fire/firestore';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  totalamount: any=0;
  userProductCart:any;
  getUserProduct: any;
  isbtn: boolean=true;
  decDisable: boolean|any;
  
  

  constructor(private fireStore: Firestore,private _sharedService:SharedService,private router:Router,private _auth:Auth) {}
  cartProductData:any;
  ngOnInit(): void {
    this.getAllCartsProducts();
  }

  getAllCartsProducts() {
    onAuthStateChanged(this._auth, (user) => {
      console.log(user?.email);
      this.userProductCart=user?.email;
    const dbInstace = collection(this.fireStore, this.userProductCart);
    getDocs(dbInstace)
      .then((res) => {
        this.cartProductData = res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        this.grandTotal();
        console.log(this.cartProductData,"uytr");
        this._sharedService.homecartCounts(this.cartProductData.length);
      })
      .catch((err) => {
        alert(err.message);
      });
    })
  }
//

  deleteCardProducts(id: any) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onAuthStateChanged(this._auth, (user) => {
          this.getUserProduct = user?.email
        const delProduct = doc(this.fireStore, this.getUserProduct,id);
        deleteDoc(delProduct)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAllCartsProducts();
          })
          .catch((err) => {
            alert(err.message);
          });
        })
      }
    })

  }

//

  increment(data:any){
    data.productQuantity=data.productQuantity+1;
    this.grandTotal();
  }
//

  deccrement(data:any){
    if(data.productQuantity==1){
      this.decDisable=true;
      
    } else if(data.productQuantity>1){
      data.productQuantity=data.productQuantity-1;
      this.decDisable=false;
      this.grandTotal();
    }
   
   
  }



//
    grandTotal(){
        let total=0
        if(this.cartProductData.length!==0){
            this.cartProductData.forEach((ele:any) => {
            total += ele.productPrice * ele.productQuantity;
            this.totalamount=total;
        });
      }
        else if(this.cartProductData.length==0){
          this.totalamount=0;
        }
  }

  checkLog(){
    onAuthStateChanged(this._auth, (user) => {
      this.getUserProduct = user?.email
      console.log(this.cartProductData,"lkkjh");
      this.cartProductData.forEach((ele:any) => {
        const delProduct = doc(this.fireStore, this.getUserProduct, ele.id);
            deleteDoc(delProduct)
            .then(() => {

              this.getAllCartsProducts();
              this.router.navigate(['products/checkout'])
            })
            .catch((err) => {
              alert(err.message);
            });  
          })   
        
      });
  }
}
