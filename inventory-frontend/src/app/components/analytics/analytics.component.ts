import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {
  products: any[] = [];
  bestProduct: any | null = null;
  slowMovingProducts: any[] = [];
  totalInventoryValue = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.calculateAnalytics();
    });
  }

  calculateAnalytics() {
    if (this.products.length === 0) {
      this.bestProduct = null;
      this.slowMovingProducts = [];
      this.totalInventoryValue = 0;
      return;
    }

    // Calculate total inventory value
    this.totalInventoryValue = this.products.reduce(
      (sum, p) => sum + (p.price * p.stockQuantity),
      0
    );

    // Determine best performing product by "units sold"
    // unitsSold = reorderLevel - stockQuantity (assuming reorderLevel > stockQuantity)
    this.bestProduct = this.products.reduce((prev, curr) => {
      const soldPrev = (prev.reorderLevel || 0) - (prev.stockQuantity || 0);
      const soldCurr = (curr.reorderLevel || 0) - (curr.stockQuantity || 0);
      return soldCurr > soldPrev ? curr : prev;
    });

    // Identify slow moving products: stockQuantity is close to or above reorderLevel (within 5 units)
    this.slowMovingProducts = this.products.filter(
      p => p.stockQuantity <= (p.reorderLevel || 0) + 5
    );
  }
}
