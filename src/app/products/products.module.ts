import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';

import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    ViewProductComponent,
    WishListComponent,
    CartComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule, NgxPayPalModule
  ]
})
export class ProductsModule { }
