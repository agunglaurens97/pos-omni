import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterProductPipe } from './filter-product.pipe';

@NgModule({
  declarations: [ FilterProductPipe ],
  exports: [ FilterProductPipe ]
})
export class PipesModule { }
