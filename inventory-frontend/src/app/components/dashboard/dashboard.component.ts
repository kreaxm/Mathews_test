import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  topSellingProducts: any[] = [];
  popularCategories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadTopSellingProducts();
    this.loadPopularCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  loadTopSellingProducts() {
    this.productService.getTopSellingProducts().subscribe((data: any[]) => {
      this.topSellingProducts = data;
    });
  }

  loadPopularCategories() {
    this.productService.getPopularCategories().subscribe((data: any[]) => {
      this.popularCategories = data;
    });
  }

  getInventoryValue(): number {
    return this.products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);
  }

  getLowStockItems(): any[] {
    return this.products.filter(p => p.stockQuantity < p.reorderLevel);
  }

  exportAll(): void {
    this.productService.exportAllToCSV();
  }

  exportLowStock(): void {
    this.productService.exportLowStockToCSV();
  }
}
