import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  suppliers: any[] = [];

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      (data: any[]) => {
        this.suppliers = data;
      },
      (error) => {
        console.error('Failed to load suppliers:', error);
      }
    );
  }

  deleteSupplier(id: string): void {
    if (confirm('Are you sure you want to delete this supplier?')) {
      this.supplierService.deleteSupplier(id).subscribe(
        () => {
          // Refresh the supplier list after deletion
          this.loadSuppliers();
        },
        (error) => {
          console.error('Failed to delete supplier:', error);
        }
      );
    }
  }
}
