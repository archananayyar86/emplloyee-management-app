import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  AddEmpURL: string;

  constructor(private http: HttpClient) {
    this.AddEmpURL = 'http://localhost:3000/empList';
  }

  addEmployee(emp: Employee) {
    return this.http.post<Employee>(this.AddEmpURL, emp).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllEmployee() {
    return this.http.get<Employee[]>(this.AddEmpURL).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateEmployee(emp: any, id: number) {
    return this.http.put<any>(this.AddEmpURL + '/' + id, emp).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(this.AddEmpURL + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
