import { Directive, ElementRef, Input, Renderer2, OnInit, HostListener } from '@angular/core';
import { Product } from '../../product';

@Directive({
  selector: '[appAppProductHighligt]',
  standalone: true
})
export class AppProductHighligtDirective implements OnInit   {
    @Input("appAppProductHighligt")  product : any;


  constructor(private el: ElementRef, private renderer: Renderer2  ) { }
ngOnInit() {
  // if (this.product?.discount > 5) {
  //     this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
  //     this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#14de65ff');
  //   }

    // Reset any styles
    this.renderer.removeStyle(this.el.nativeElement, 'border');
    this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    this.renderer.removeStyle(this.el.nativeElement, 'transition');

    // 1️⃣ Highlight discounted products
    if (this.product?.discount > 2 && this.product.stock > 0) {
      const color = this.product.stock > 0 ? 'green' : 'red';
       this.renderer.setStyle(this.el.nativeElement, 'border', `2px solid ${color}`);
    }

    // 2️⃣ Dim out-of-stock products
    if (this.product?.stock === 0) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
      this.renderer.setStyle(this.el.nativeElement, 'pointerEvents', 'none'); // disable hover/click
    }

    // 3️⃣ Add transition for smooth hover animations
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease, box-shadow 0.3s ease');
  }

  // 3️⃣ Hover effects
  @HostListener('mouseenter') onMouseEnter() {
    if (this.product?.stock > 0) { // only active products get hover effects
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.03)');
      this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0 4px 15px rgba(0,0,0,0.2)');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.product?.stock > 0) {
      this.renderer.removeStyle(this.el.nativeElement, 'transform');
      this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    }
  }
   }

  

