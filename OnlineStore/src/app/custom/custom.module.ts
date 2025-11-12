import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProductHighligtDirective } from './directives/app-product-highligt.directive';


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,AppProductHighligtDirective
  ],
  exports: [
    AppProductHighligtDirective // ✅ fixed syntax
  ]
})
export class CustomModule { }
