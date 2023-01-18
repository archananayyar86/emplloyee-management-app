import { CompanyService } from './../../service/company.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companyForm!: FormGroup;
  company: Company[];
  cmpObj: Company = new Company();
  constructor(
    private formBuilder: FormBuilder,
    private cmpService: CompanyService
  ) {
    this.company = [];
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      id:[''],
      CompanyName: [''],
    });
  }

  addCompany() {
    this.cmpObj.id = this.companyForm.value.id
    this, this.cmpObj.name = this.companyForm.value.CompanyName
    this.cmpService.addCompany(this.cmpObj).subscribe((res) => {
      console.log(res);
      this.company.push(res);
      alert('Added succesFully');
      this.companyForm.reset();
    });
  }
}
