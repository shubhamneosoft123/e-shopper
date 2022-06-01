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
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProductData: any;
  productName:any;
  searchedData: any;
  homecartCount:any;
  cartProductData:any;

  totalLength:any;
  page:number=1;
  itemExists: number[] = [];
  isLoader:boolean=true;
  isPagination:boolean=false;
  userProductCart: null | any ="";
  getUserProduct: any;
  // productName:any;

  constructor(private fireStore:Firestore,private _sharedService:SharedService,private router:Router, private _auth:Auth) { }

  ngOnInit(): void {
    this.getAllProducts();
    this._sharedService.hideNavbar();

      this._sharedService.searchDataSubject.subscribe((res:any)=>{
      this.searchedData=res;
    })
    this.getAllCartsProducts();
    this.FiltergetAllProducts();
  }

  getAllCartsProducts() {

    onAuthStateChanged(this._auth, (user) => {
      this.getUserProduct = user?.email
      const dbInstace = collection(this.fireStore, this.getUserProduct);
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
//
  getAllProducts() {
    const dbInstace = collection(this.fireStore, 'adminProducts');
    getDocs(dbInstace)
    .then((res) => {
      this.allProductData = res.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      this.totalLength=this.allProductData.length;
      console.log(this.totalLength,"mnbv");
      this.isLoader=false;
      this.isPagination=true;
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  //
  FiltergetAllProducts(){
    const dbInstace = collection(this.fireStore, 'adminProducts');
    getDocs(dbInstace)
    .then((res) => {
      this.allProductData = res.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      this.totalLength=this.allProductData.length;
      console.log(this.totalLength,"mnbv");
      this.isLoader=false;
      this.isPagination=true;
    })
    .catch((err) => {
      alert(err.message);
    });
  }
  //


  // Add to cart 
 

  
  addToCart(id:any){
    onAuthStateChanged(this._auth, (user) => {
      console.log(user?.email);
      this.userProductCart=user?.email;
      if(this.userProductCart != null ){
        this.allProductData.forEach((ele:any) => {
          if(id == ele.id){
            const dbInstace=collection(this.fireStore,this.userProductCart);
            addDoc(dbInstace,ele)
            .then(()=>{
              Swal.fire(
                'Added!',
                'Product has Added to Cart!',
                'success'
              );
              //
              if (id && !this.itemExists.includes(ele.id)) {
                this.itemExists.push(ele.id);
            }
              // 
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

  filterProducts(data:any){

    //  console.log(data);
    this.searchedData=data;

  }


}//


 


