import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {

  constructor(private productService:ProductService) {
  }

  form = new FormGroup({
    qty: new FormControl('',[Validators.required]),
    unitPrice: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });

  create(){
    const obj={
      qty:this.form.value.qty,
      unitPrice:this.form.value.unitPrice,
      description:this.form.value.description
    }
    this.productService.create(obj).subscribe(response=>{

    }, error => {
      console.log(error?.error?.message);
    })
  }

}
