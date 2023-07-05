import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
  // isInWishlist = false;
  

  zoomImage(event: MouseEvent) {
    const image = event.target as HTMLImageElement;
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    image.classList.add('zoomed');
  }
  resetZoom(event: MouseEvent) {
   
    const image = event.target as HTMLImageElement;
    image.style.transformOrigin = 'center center';
    image.classList.remove('zoomed');
  
  }
  // isPreviewVisible: boolean = false;
  // previewImage: string = '';

  // zoomImage(event: MouseEvent) {
  //   const zoomedImage = event.target as HTMLImageElement;
  //   const preview = document.getElementById('preview') as HTMLDivElement;

  //   const { left, top, width, height } = zoomedImage.getBoundingClientRect();
  //   const x = (event.clientX - left) / width;
  //   const y = (event.clientY - top) / height;

  //   zoomedImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  //   zoomedImage.style.transform = 'scale(2)';

  //   this.isPreviewVisible = true;
  //   this.previewImage = zoomedImage.src;
  //   preview.style.left = `${left + width}px`;
  // }

  // hidePreview() {
  //   const zoomedImage = document.getElementsByClassName('zoom-image')[0] as HTMLImageElement;

  //   zoomedImage.style.transform = 'initial';

  //   this.isPreviewVisible = false;
  //   this.previewImage = '';
  // }







  productId:string=""
constructor(private viewRoute:ActivatedRoute, private api:ApiService){
  
{
  // alert(result);
  // this.toastr.success('Hello world!', 'Toastr fun!');
  // this.isLiked = !this.isLiked;
  // this.isLiked = this.isLiked;
//  this.isLiked=true;
    
}
}
allwishlist:any=[]
product:any=[]
  message: string = '';
  decimalPlaces: number = 1;
  
ngOnInit(): void {
  
  
  this.viewRoute.params.subscribe((result:any)=>{
    console.log(result.productId);

   



this.productId=result.productId;
    //to fetch particular product id details

    this.api.viewProduct(this.productId).subscribe((result:any)=>{
      console.log(result);
      // ====================================================================================
     
      this.product=result
    },
    
    (result:any)=>{console.log(result.error);
    })
  })
}

//addtowishlist
isLiked = false;
// showMessage = true;

// toggleWishlist() {
//   if (this.isLiked) {
//     this.deleteWishlist(this.productId);
//   } else {
//     this.addToWishlist();
//   }
// }






////////////////////////////////////////////////////////////////////////
addToWishlist(){
//destructuring
  const {id,title,price,image}=this.product

this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>
{
  // alert(result);
  // this.toastr.success('Hello world!', 'Toastr fun!');
  this.isLiked = !this.isLiked;
  
    
},(result:any)=>{
  
  alert(result.error);
  console.log(result.error);
  // this.deleteWishlist
  
      // setTimeout(() => {
      //   this.showMessage = false;
      //   this.message="added already"
      // }, 3000);
  // this.isLiked = this.isLiked;
}
)
}

//remove from wishlist
deleteWishlist(id:any){
  //delete api call

  this.api.deleteWishlist(id).subscribe((result:any)=>{
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

 this.api.addToCart(product).subscribe((result:any)=>{
  alert(result)//added to cart
  this.api.cartCount()
 },
 (result:any)=>{
  alert(result.error)//error
 })
}


}
