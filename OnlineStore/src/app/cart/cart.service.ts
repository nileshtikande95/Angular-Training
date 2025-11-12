import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({ ...product });
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(p => p.id !== productId);
    this.cartSubject.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, p) => total + (p.price * p.quantity), 0);
  }
}
