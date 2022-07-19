import { Component, OnInit } from '@angular/core';
import { ICart } from '../cart.entity';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  CartCount: number = 0;
  Carts: ICart[] = [];
  constructor(private pserice: ProductService) { }

  ngOnInit(): void {

    this.pserice.Carts$?.subscribe((data: any) => {
      this.Carts = data;
    })
  }
  RemoveFromCart(c: ICart): void {
     this.pserice.removeFromCart(c.Id);
  }


}
