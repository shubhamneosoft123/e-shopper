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

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  allProductData: any = [];
  productName:any;
  constructor(private fireStore: Firestore) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    const dbInstace = collection(this.fireStore, 'adminProducts');
    getDocs(dbInstace)
      .then((res) => {
        this.allProductData = res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        console.log(this.allProductData);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  //
  deleteProduct(id: any) {
   
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
        const delProduct = doc(this.fireStore, 'adminProducts', id);
        deleteDoc(delProduct)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAllProducts();
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    })

  }


  
  //   //
  //     getAllProducts(){
  //       this.shared.getAllProduct().subscribe((res:any)=>{
  //         this.allProductData=res;
  //         console.log(res);
  //       })
  //     }
  // //
  //       objectKeys(obj:any) {
  //         return Object.keys(obj);
  //     }

  // //
  // deletPoducts(id:any){
  //   alert("do u want tot delete")
  //   this.shared.onDeletePost(id).subscribe((res)=>{
  //     console.log(res);
  //     this.getAllProducts();

  //   })
  // }
}
