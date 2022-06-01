import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// import { SharedService } from 'src/app/shared/shared.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import {
  addDoc,
  Firestore,
  collection
} from '@angular/fire/firestore'

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  adminAddprodctForm: any;
  file:any=[];
  productImage:any;
  imageUrl: any;
  image='staticImage.jpeg';

  constructor(public fireStore:Firestore,public _storage:Storage) { }

  ngOnInit(): void {

    this.adminAddprodctForm=new FormGroup({
      productName:new FormControl("",[Validators.required]),
      discription:new FormControl("",[Validators.required]),
      productPrice:new FormControl("",[Validators.required]),
      productImage:new FormControl("",[Validators.required]),
      productType:new FormControl("",[Validators.required]),
      productQuantity:new FormControl(1),
    })
  }

  // With file uplod
  addProduct(){

    console.log(this.file.name, "file name")
    const storageRef = ref(this._storage, this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
         
          this.adminAddprodctForm.value.productImage = downloadURL;
          this.adminAddprodctForm.value.productQuantity=1;
          console.log(this.adminAddprodctForm.value);
          this.sendProducts()
        });
      }
    );
  }

  sendProducts(){
    console.log(this.adminAddprodctForm.value,"jhfsdgfhds");
    
    const dbInstace=collection(this.fireStore,'adminProducts');
    addDoc(dbInstace,this.adminAddprodctForm.value)
    .then(()=>{
      Swal.fire(
        'Added!',
        'Product has successfully Added!',
        'success'
      );
      console.log("neoSoft",this.adminAddprodctForm.value);
      
      this.adminAddprodctForm.reset();
    })
    .catch((err)=>{
      alert(err.message)
    })
    this.image='staticImage.jpeg';
  }

  preview(data:any){
    
    this.file=data.target.files[0];
    this.image=data.target.files[0].name;
    console.log(this.imageUrl);
    
   
  }







  // addProduct(){
  //   console.log(this.adminAddprodctForm.value);
  //   this.shared.adminddProduct(this.adminAddprodctForm.value).subscribe((res:any)=>{
  //     console.log(res,"key");
  //   })
  // }

}
