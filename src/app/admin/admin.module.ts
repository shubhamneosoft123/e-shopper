import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { SharedModule } from '../shared/shared/shared.module';

console.log("Admin Module");

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports:[
    AdminProductsComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
  ]
})
export class AdminModule { }
