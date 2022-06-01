import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';

console.log("product Module");

@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  exports:[
    HomeComponent
  ]
})
export class ProductsModule { }
