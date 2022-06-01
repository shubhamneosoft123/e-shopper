import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  doc,
  updateDoc,
  getDocs,
  Firestore,
  collection,
} from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss'],
})
export class AdminEditProductComponent implements OnInit {
  adminEditprodctForm: any;
  ProductByIdData: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public fireStore: Firestore,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.adminEditprodctForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      discription: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
    });
    this.getProductById();
  }

  getProductById() {
    const dbInstace = collection(this.fireStore, 'adminProducts');
    getDocs(dbInstace)
      .then((res) => {
        this.ProductByIdData = res.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
        console.log(this.ProductByIdData);
        this.ProductByIdData.forEach((ele: any) => {
          if (ele.id == this._activatedRoute.snapshot.params['id']) {
            this.adminEditprodctForm.controls['productName'].setValue(
              ele.productName
            );
            this.adminEditprodctForm.controls['discription'].setValue(
              ele.discription
            );
            this.adminEditprodctForm.controls['productPrice'].setValue(
              ele.productPrice
            );
            this.adminEditprodctForm.controls['productImage'].setValue(
              ele.productImage
            );
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  updateProduct() {
    const editedProducts = doc(this.fireStore, 'adminProducts',this._activatedRoute.snapshot.params['id']);
    updateDoc(editedProducts,{
      productName: this.adminEditprodctForm.value.productName,
      discription: this.adminEditprodctForm.value.discription,
      productPrice: this.adminEditprodctForm.value.productPrice,
      productImage: this.adminEditprodctForm.value.productImage,
    })
      .then(() => {
        Swal.fire(
          'Updated!',
          'Product has successfully Updated!',
          'success'
        );
        this._router.navigate(['/admin-products']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
