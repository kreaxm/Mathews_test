import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5000/api/products';
const SALES_BASE_URL = 'http://localhost:5000/api/sales';  // Sales API base URL

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(BASE_URL, product);
  }

  // Update an existing product
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  // Export all products to CSV
  exportAllToCSV(): void {
    this.getProducts().subscribe((products: any[]) => {
      const csv = this.convertToCSV(products);
      this.downloadCSV(csv, 'all-products.csv');
    });
  }

  // Export only low stock products to CSV
  exportLowStockToCSV(): void {
    this.getProducts().subscribe((products: any[]) => {
      const lowStock = products.filter(p => p.stockQuantity < p.reorderLevel);
      const csv = this.convertToCSV(lowStock);
      this.downloadCSV(csv, 'low-stock-products.csv');
    });
  }

  // Get top-selling products from sales API (updated with /analytics)
  getTopSellingProducts(): Observable<any> {
    return this.http.get(`${SALES_BASE_URL}/analytics/top-selling`);
  }

  // Get popular categories from sales API (updated with /analytics)
  getPopularCategories(): Observable<any> {
    return this.http.get(`${SALES_BASE_URL}/analytics/popular-categories`);
  }

  // Convert array of objects to CSV format
  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const rows = data.map(item =>
      headers.map(field => JSON.stringify(item[field] ?? '')).join(',')
    );

    return [headers.join(','), ...rows].join('\r\n');
  }

  // Trigger CSV download using browser APIs
  private downloadCSV(csvData: string, filename: string): void {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();

    window.URL.revokeObjectURL(url);
  }
}
