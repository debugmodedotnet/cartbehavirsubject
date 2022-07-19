import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, identity } from 'rxjs';
import { ICart } from './cart.entity';
import { IProduct } from './product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Products: IProduct[] = [
    {
      Id: "1",
      Title: "Pen",
      Price: 200,
      Stock: 40
    },
    {
      Id: "2",
      Title: "Pencil",
      Price: 100,
      Stock: 56
    },
    {
      Id: "3",
      Title: "Book",
      Price: 400,
      Stock: 26
    },
    {
      Id: "4",
      Title: "Eraser",
      Price: 30,
      Stock: 100
    },
    {
      Id: "5",
      Title: "Notebook",
      Price: 250,
      Stock: 20
    }
  ];

  private Carts: ICart[] = [];

  Products$?: BehaviorSubject<IProduct[]>;
  Carts$?: BehaviorSubject<ICart[]>;
  isCartVisible$?: BehaviorSubject<boolean>;
  constructor() {
    this.Products$ = new BehaviorSubject<IProduct[]>(this.Products);
    this.Carts$ = new BehaviorSubject<ICart[]>(this.Carts);
    this.isCartVisible$ = new BehaviorSubject<boolean>(false);
  }

  addToCart(p: IProduct) {

    let index = this.Carts.findIndex(c => c.Id == p.Id);
    if (index == -1) {
      this.Carts.push({
        Id: p.Id,
        Title: p.Title,
        Qunatity: 1,
        Price: p.Price
      })
    }
    else {
      this.Carts[index].Qunatity = this.Carts[index].Qunatity + 1;
      this.Carts[index].Price = this.Carts[index].Qunatity * p.Price;
    }
    let pindex = this.Products.findIndex(c => c.Id == p.Id);

    this.Products[pindex].Stock = this.Products[pindex].Stock - 1;
    this.Products$?.next(this.Products);
    this.Carts$?.next(this.Carts);
    this.isCartVisible$?.next(true);
  }

  removeFromCart(Id: string){
    let cindex = this.Carts.findIndex(c => c.Id == Id); 
     if(this.Carts[cindex].Qunatity == 1){
          this.Carts.splice(cindex,1);
     }
     else {
       let unitprice = this.Carts[cindex].Price / this.Carts[cindex].Qunatity ;
       this.Carts[cindex].Qunatity = this.Carts[cindex].Qunatity - 1; 
       this.Carts[cindex].Price = this.Carts[cindex].Price - unitprice;
     }

     let pindex = this.Products.findIndex(c => c.Id == Id);
     if(pindex != -1){
      this.Products[pindex].Stock = this.Products[pindex].Stock + 1; 
     }
     this.Products$?.next(this.Products);
     if(this.Carts.length == 0){
       this.isCartVisible$?.next(false);
     }
     this.Carts$?.next(this.Carts);
  }
}
