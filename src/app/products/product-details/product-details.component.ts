import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  Firestore,
  collection,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetailsById: any;
  finalDetails:any;
  cartProductData: any;
  homecartCount: any;
  userProductCart: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public fireStore: Firestore,
    private _sharedService:SharedService,
    private _auth:Auth,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getProductById();

    // this.getAllCartsProducts();
  }

  // 
  getProductById() {
    const dbInstace = collection(this.fireStore, 'adminProducts');
    getDocs(dbInstace)
      .then((res) => {
        this.productDetailsById = res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
       
        console.log(this.productDetailsById);
        this.productDetailsById.forEach((ele: any) => {
          if (ele.id == this._activatedRoute.snapshot.params['id']) {
          //  console.log(ele);
           this.finalDetails=ele;
           
          }
         
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  //

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
        console.log(this.cartProductData.length,"uytr");
        this.homecartCount=this.cartProductData.length;
        this._sharedService.homecartCounts(this.homecartCount);
      })
      .catch((err) => {
        alert(err.message);
      });
    })
    
  }
  // Add to cart 
  addToCart(id:any){
    onAuthStateChanged(this._auth, (user) => {
        console.log(user?.email);
        this.userProductCart=user?.email;
        if(this.userProductCart != null ){
          this.productDetailsById.forEach((ele:any) => {
          if(id==ele.id){
            const dbInstace=collection(this.fireStore,this.userProductCart);
            addDoc(dbInstace,ele)
            .then(()=>{
              Swal.fire(
                'Added!',
                'Product has Added to Cart!',
                'success'
              );          
            })
            .catch((err)=>{
              alert(err.message)
            })
          }
          });
           this.getAllCartsProducts();
        }else{
          this.router.navigate(['auth/login'])
      }
   })
  
  }
}
