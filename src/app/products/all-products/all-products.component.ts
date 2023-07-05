import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

searchTerm:string=""
  allProducts: any=[];
  
  constructor (private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllproducts().subscribe((result:any)=>{
      
      console.log(result);
    this.allProducts=result;
    }
    )
    this.api.searchTerm.subscribe((result:any)=>{
     this.searchTerm=result
      console.log(this.searchTerm);
    })
   
    

  }
}
