import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductPipe } from './pipe/product.pipe';
import { FormsModule } from '@angular/forms';


const routes:Routes=[
  {path:'',component: ProductsComponent}

]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductPipe
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports:[
    ProductsComponent
  ]
})
export class ProductsModule { }