import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [

  
  {path:"admin-products",component:AdminProductsComponent,canActivate:[AuthGuard]},
  {path:"admin-add-product",component:AdminAddProductComponent,},
  {path:"admin-editproduct/:id",component:AdminEditProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
