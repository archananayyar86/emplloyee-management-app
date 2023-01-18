import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  baseCmpURL: string;
  constructor(private http: HttpClient) {
    this.baseCmpURL = 'http://localhost:3000/company';
  }

  getCompany() {
    return this.http.get<Company[]>(this.baseCmpURL);
  }

  addCompany(company: Company) {
    return this.http.post<Company>(this.baseCmpURL, company);
  }
}
