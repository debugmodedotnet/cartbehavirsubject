import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cart Demo';
  isCartVisible = false; 
  isCartVisible$? : Observable<boolean>; 
  constructor(private pservice: ProductService){

  }
  ngOnInit(){
    this.isCartVisible$ = this.pservice.isCartVisible$;
    this.pservice.isCartVisible$?.subscribe(data=>{
      this.isCartVisible = data; 
    })
  }
}
