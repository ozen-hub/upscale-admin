import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";

@Component({
  selector: 'app-manage-product-images',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
  ],
  templateUrl: './manage-product-images.component.html',
  styleUrl: './manage-product-images.component.scss'
})
export class ManageProductImagesComponent {

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly service = inject(ProductService);

  form = new FormGroup({
    image: new FormControl(null, Validators.required)
  });
  loading: boolean = false;

  image: any;


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    this.image = fileInput.files?.[0];
    if (this.image) {
      if (this.isFileSizeValid(this.image)) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'pdf'];
        const fileExtension = this.image.name.split('.').pop()?.toLowerCase();

        if (fileExtension && allowedExtensions.includes(fileExtension)) {
          this.handleFile(this.image);
        } else {
          this.image = null;
          fileInput.value = '';
          return;
        }

      } else {
        this.image = null;
        fileInput.value = '';
        return;
        // Show a warning or error message to the user indicating that the file size is too large.
      }
    }
  }

  isFileSizeValid(file: File): boolean {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB in bytes
    return file.size <= maxSizeInBytes;
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadFile() {
    this.loading = true;
    const formData = new FormData();
    formData.append('productImage', this.image);
    this.service.productImageUpload(formData, this.data?.propertyId).subscribe(response => {
      console.log(response);
      this.loading = false;
    });
  }

}
