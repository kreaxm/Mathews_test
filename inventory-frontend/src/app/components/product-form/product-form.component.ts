import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service'; // Create this if not present
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  productForm !: FormGroup;
  suppliers: any[] = [];

constructor(
  private fb: FormBuilder,
  private productService: ProductService,
  private supplierService: SupplierService,
  private router: Router // Inject router
) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: [''],
      sku: [''],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, Validators.required],
      reorderLevel: [0],
      supplierId: ['', Validators.required]
    });

    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

onSubmit() {
  if (this.productForm.valid) {
    const formValue = this.productForm.value;

    // Find supplier object by supplierId
    const selectedSupplier = this.suppliers.find(s => s._id === formValue.supplierId);

    if (!selectedSupplier) {
      alert('Please select a valid supplier');
      return;
    }

    // Construct product payload with nested supplier object
    const productPayload = {
      ...formValue,
      supplier: {
        name: selectedSupplier.name,
        contact: selectedSupplier.contact,
        phone: selectedSupplier.phone
      }
    };

    // Remove supplierId as backend expects supplier object
    delete productPayload.supplierId;

    this.productService.addProduct(productPayload).subscribe(() => {
      alert('Product added successfully!');
      this.router.navigate(['/products']);
    }, err => {
      console.error('Error adding product:', err);
      alert('Failed to add product, please try again.');
    });
  }
}
}
