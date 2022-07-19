import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product.entity';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Products$? : Observable<IProduct[]>; 
  constructor(private pservice : ProductService) { }

  ngOnInit(): void {
     this.Products$ = this.pservice.Products$;
  }
  addToCart(p: IProduct):void{
    this.pservice.addToCart(p);
  }
}
