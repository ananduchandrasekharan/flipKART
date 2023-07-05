import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
allwishlist:any=[];
constructor(private Api:ApiService){}

ngOnInit(): void {
  this.Api.getAllWishlist().subscribe((result:any)=>{
    console.log(result);
    this.allwishlist=result
  },
  (result:any)=>{
    console.log(result.error);
    
  }
  

  )




}
deleteWishlist(id:any){
  //delete api call

  this.Api.deleteWishlist(id).subscribe((result:any)=>{
    this.allwishlist=result
  },
  (result:any)=>{
    alert(result.error)
  })
}



addToCart(product:any){
  console.log(product);
 //add quantity to cart
 
 Object.assign(product,{quantity:1})
 console.log(product);
 
 //api call to add quantity

 this.Api.addToCart(product).subscribe((result:any)=>{
  alert(result)//added to cart
  this.Api.cartCount()
  this.deleteWishlist(product.id)
 },
 (result:any)=>{
  alert(result.error)//error
 })
}



}
