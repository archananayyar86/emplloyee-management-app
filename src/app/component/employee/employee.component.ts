import { EmployeeService } from './../../service/employee.service';
import { Employee } from './../../models/employee';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Company } from './../../models/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  empDetail!: FormGroup;

  empObj: Employee = new Employee();
  empList: Employee[] = [];
  company: Company[];
  employees: Employee[] = [];
  employeesToDisplay: Employee[];

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private cmpService: CompanyService
  ) {
    this.company = [];
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    // on load fetch all emp list
    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      companyName: [''],
    });

    // Get List og company
    this.cmpService.getCompany().subscribe((res) => {
      for (let emp of res) {
        this.company.unshift(emp);
      }
    });
  }

  // create a Employee
  addEmployee() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.firstname = this.empDetail.value.firstname;
    this.empObj.lastname = this.empDetail.value.lastname;
    this.empObj.companyName = this.empDetail.value.companyName;
    this.empService.addEmployee(this.empObj).subscribe(
      (res) => {
        alert('Employee Added Successfully');
        //Close Model
        let ref = document.getElementById('cancel');
        ref?.click();
        this.empDetail.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  // get all Employee
  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(
      (res) => {
        this.empList = res;
      },
      (err) => {
        console.log('Error while fetching data.');
      }
    );
  }

  // bind form value
  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['firstname'].setValue(emp.firstname);
    this.empDetail.controls['lastname'].setValue(emp.lastname);
    this.empDetail.controls['companyName'].setValue(emp.companyName);
  }

  UpdateEmployeeDetails() {
    this.empObj.id = this.empDetail.value.id;
    this.empObj.firstname = this.empDetail.value.firstname;
    this.empObj.lastname = this.empDetail.value.lastname;
    this.empObj.companyName = this.empDetail.value.companyName;

    this.empService
      .updateEmployee(this.empObj, this.empObj.id)
      .subscribe((res) => {
        alert('Update Successfully');
        //Close Model
        let reff = document.getElementById('cancel');
        reff?.click();
        this.empDetail.reset();
        this.getAllEmployee();
      });
  }

  // Delete Emplyee
  deleteEmployee(event: any) {
    this.empList.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.empService.deleteEmployee(event).subscribe((res) => {
          this.empList.splice(index, 1);
        });
      }
    });
  }

  // fiter Company
  searchComany(event: any) {
    let filteredCompany: Employee[] = [];

    if (event === '') {
      this.getAllEmployee();
    } else {
      filteredCompany = this.empList.filter((val, index) => {
        let targetKey = val.companyName.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.empList = filteredCompany;
    }
  }
}