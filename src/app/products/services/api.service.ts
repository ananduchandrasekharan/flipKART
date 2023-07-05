import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getCartItemCount=new BehaviorSubject(0)//initial value is 0
    //to hold search term
    searchTerm=new BehaviorSubject('')

  BASE_URL = 'http://localhost:5000'
  constructor(private http:HttpClient){
    this.cartCount()
  }

  //get all products
  getAllproducts(){

    return this.http.get(`${this.BASE_URL}/products/all-products`)
    
  }

  //view particular product

  viewProduct(id:any){

    return this.http.get(`${this.BASE_URL}/products/viewproducts/${id}`)
  }

  //add to wishlist product

  addToWishlist(id:any,title:string,price:any,image:string){
   const body={
    id,
    title,
    price,
    image
   }
   
   
    return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
  }

  getAllWishlist(){
    return this.http.get(`${this.BASE_URL}/products/getwishlist`)
  }

  //delete wihslist

  deleteWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)
  }

  addToCart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
  }


  //GETCARTs

  getCart(){
   
    return this.http.get(`${this.BASE_URL}/products/getcart`)

  }

  cartCount(){
    this.getCart().subscribe((result:any)=>{

      this.getCartItemCount.next(result.length) ;

    })
  }

//delete cart item
removeCartItem(id:any){
  return this.http.delete(`${this.BASE_URL}/products/deletecart/${id}`)
}


//incrementcart count
incrementCartCount(id:any){
return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
}

//decrementcart count
decrementCartCount(id:any){
  return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
  }

}
