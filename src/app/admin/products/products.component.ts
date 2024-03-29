import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './models/product-model';
import { ProductService } from './service/product.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products:ProductModel[]=[];
  product:ProductModel=new ProductModel();
  filterText:string="";
  
constructor(private productService:ProductService,private errorService:ErrorService,private toastr:ToastrService,private helperService:HelperService){}

ngOnInit():void{
  this.getList();
}

exportExcel(){
  let element=document.getElementById("excel-table");
  let title="Urunler";
  this.helperService.exportExcel(element,title);
}

successNotification() {
  Swal.fire('Hi', 'We have been informed!', 'success');
}
deleteConfirmation(product:ProductModel) {
  Swal.fire({
    title: 'Are you sure to delete this?',
    text: 'This process is irreversible.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think',
  }).then((result) => {
    if (result.value) {
      this.delete(product);
      Swal.fire('Removed!', 'Product removed successfully.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Product still in our database.)', 'error');
    }
  });
}

getList(){
  this.productService.getList().subscribe((res:any)=>{
    this.products=res.data;
    
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
delete(product:ProductModel){
 this.productService.delete(product).subscribe((res:any)=>{
    this.toastr.info(res.message)
    this.getList()
 },(err)=>{
  this.errorService.errorHandler(err);
 })
console.log("delete product"+product);
}

add(addForm:NgForm){
  let product:ProductModel=new ProductModel();
  product.name=addForm.value.productName;
  product.id=0;

  this.productService.add(product).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    addForm.reset();
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
getProduct(product:ProductModel){
  this.productService.getById(product.id).subscribe((res:any)=>{
    this.product=res.data;
  },(err)=>{
    this.errorService.errorHandler(err);
  })
}
update(){ 

  this.productService.update(this.product).subscribe((res:any)=>{
    this.toastr.success(res.message);
    this.getList();
    document.getElementById("updateModelCloseBtn").click();//Modal'daki kapat butonunun otomatik kapanmasi icin kullanildi.
  },(err)=>{
    this.errorService.errorHandler(err);
  });
}

}
