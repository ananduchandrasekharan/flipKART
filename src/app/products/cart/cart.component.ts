import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  proceedtopay:boolean=false;

  // ----------------------paypal
  public payPalConfig?: IPayPalConfig;

  showSuccess:boolean=false;
  // -----------------------------


deleteWishlist(arg0: any) {
throw new Error('Method not implemented.');
}

  allCart:any=[]
  constructor(private api:ApiService){}
  totalPrice:number=0;
  ngOnInit(): void {
    this.initConfig();
    
    this.api.getCart().subscribe((result:any)=>{
      console.log(result);
      this.allCart=result
      this.getCartTotal()
      
    },(result:any)=>{
      console.log(result.error);
      
    })



  }




  removeCartItem(id:any){
    this.api.removeCartItem(id).subscribe((result:any)=>{console.log(result);
    
    this.allCart=result
    this.api.cartCount()
  },
    (result:any)=>{
      console.log(result.error);
      
    }
    )
  }
  getCartTotal(){
    let total=0;
    this.allCart.forEach((item:any)=>{
      total=total+item.grandTotal
      this.totalPrice=Math.ceil( total)
    })

  }


  incrementCart(id:any){
    this.api.incrementCartCount(id).subscribe((result:any)=>{

      this.allCart=result
      this.getCartTotal()
    },
    (result:any)=>{
      alert(result.error)
    })
  }





  decrementCart(id:any){
    this.api.decrementCartCount(id).subscribe((result:any)=>{

      this.allCart=result
      this.getCartTotal()
    },
    (result:any)=>{
      alert(result.error)
    })
  }




/////////////////////////////paypal function

private initConfig(): void {
  this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => <ICreateOrderRequest>{
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: '9.99',
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: '9.99'
            }
          }
        },
        items: [
          {
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }
        ]
      }
    ]
  },
  advanced: {
    commit: 'true'
  },
  style: {
    label: 'paypal',
    layout: 'vertical'
  },
  onApprove: (data, actions) => {
    console.log('onApprove - transaction was approved, but not authorized', data, actions);
    actions.order.get().then((details:any) => {
      console.log('onApprove - you can get full order details inside onApprove: ', details);
    });
  },
  onClientAuthorization: (data) => {
    console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    this.showSuccess = true;
  },
  onCancel: (data, actions) => {
    console.log('OnCancel', data, actions);
  },
  onError: err => {
    console.log('OnError', err);
  },
  onClick: (data, actions) => {
    console.log('onClick', data, actions);
  },
};
}


makepayment(){
  this.proceedtopay=true;
}
// modalclose(){
//   this.form.reset()
// }
}
