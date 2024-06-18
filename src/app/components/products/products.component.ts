import {Component} from '@angular/core';
import {
  CustomerStatusManagerComponent
} from "../customers/inner/customer-status-manager/customer-status-manager.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewProductComponent} from "./inner-pages/new-product/new-product.component";
import {UpdateProductComponent} from "./inner-pages/update-product/update-product.component";
import {ManageProductImagesComponent} from "./inner-pages/manage-product-images/manage-product-images.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CustomerStatusManagerComponent,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private matDialog: MatDialog) {
  }

  openNewProductForm() {
    let matDialogRef = this.matDialog.open(NewProductComponent,{
      width:'500px',
      disableClose:true
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.loadAllProducts();
      }
    })
  }
  openUpdateProductForm(product:any) {
    let matDialogRef = this.matDialog.open(UpdateProductComponent,{
      width:'500px',
      disableClose:true,
      data:product
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.loadAllProducts();
      }
    })
  }
  openProductImageForm(product:any) {
    let matDialogRef = this.matDialog.open(ManageProductImagesComponent,{
      width:'500px',
      disableClose:true,
      data:product
    });

    matDialogRef.afterClosed().subscribe(response=>{
      if(response){
        this.loadAllProducts();
      }
    })
  }

  private loadAllProducts() {

  }

  protected readonly confirm = confirm;
}
