import {Component, OnInit} from '@angular/core';
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
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ProductService} from "../../service/product/product.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CustomerStatusManagerComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReactiveFormsModule,
    NgForOf,
    CurrencyPipe,
    MatPaginator
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  searchText = '';
  page: any = 0;
  size: any = 1;
  count = 0;
  dataList: any[] = [];
  rate: any = 0;

  searchForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  constructor(private matDialog: MatDialog,
              private productService: ProductService,
              private forexService: ForexService,
              private clipboardService: ClipboardService) {
  }

  ngOnInit(): void {
    this.forexService.exchange('USD', 'LKR').subscribe(data => {
      this.rate = data?.result?.LKR;
      this.loadAllProducts();
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data => {
        this.searchText = data.text;
        this.loadAllProducts();
      })
  }

  openNewProductForm() {
    let matDialogRef = this.matDialog.open(NewProductComponent, {
      width: '500px',
      disableClose: true
    });

    matDialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadAllProducts();
      }
    })
  }

  openUpdateProductForm(product: any) {
    let matDialogRef = this.matDialog.open(UpdateProductComponent, {
      width: '500px',
      disableClose: true,
      data: {product: product}
    });

    matDialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadAllProducts();
      }
    })
  }

  openProductImageForm(product: any) {
    let matDialogRef = this.matDialog.open(ManageProductImagesComponent, {
      width: '500px',
      disableClose: true,
      data: product
    });

    matDialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadAllProducts();
      }
    })
  }

  private loadAllProducts() {
    this.productService.search(this.page, this.size, this.searchText).subscribe(response => {
      console.log(response);
      this.dataList =  response.data?.dataList;
      this.count = response.data?.count;
    });
  }

  exchange(amount:number){

  }


  deleteConfirm(item: any) {
    if (confirm('are you sure?')) {
      this.productService.delete(item?.propertyId).subscribe(response => {
        this.loadAllProducts();
      }, error => {
        console.log(error?.error?.message);
      })
    }
  }

  getServerData(data: PageEvent) {
    this.page = data?.pageIndex;
    this.size = data?.pageSize;
    this.loadAllProducts();
  }

  copyText(propertyId: any) {
    this.clipboardService.copy(propertyId);
  }
}
