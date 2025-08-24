import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:5000/api/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL);
  }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(BASE_URL, supplier);
  }

  updateSupplier(id: string, supplier: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, supplier);
  }

  deleteSupplier(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
