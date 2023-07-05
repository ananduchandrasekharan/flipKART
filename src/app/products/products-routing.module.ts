import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [{ path: '', component: AllProductsComponent },

{path:'viewproduct/:productId',component:ViewProductComponent},
{path: 'cart',component:CartComponent},
{path:'wishlist',component:WishListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
