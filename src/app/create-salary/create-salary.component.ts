import { SalaryService } from '../salary.service';
import { Router } from '@angular/router';


import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { Salary } from '../salary';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-create-salary',
  templateUrl: './create-salary.component.html',
  styleUrls: ['./create-salary.component.css']
})

export class CreateSalaryComponent implements OnInit {

  employees: Observable<Employee[]>;
  salaries: Observable<Salary[]>;

  employee: Employee = new Employee();
  salary: Salary = new Salary();


  submitted = false;
  test: String = "test";


  constructor(private salaryService: SalaryService,
    private router: Router, private employeeService: EmployeeService) { }


  ngOnInit() {
    this.employees = this.employeeService.getEmployeesList();
  }


  reloadData() {
    this.employees = this.employeeService.getEmployeesList();

  }

  newSalary(): void {
    this.submitted = false;
    this.employee = new Employee();
    this.salary = new Salary();
  }

  save() {
   // this.salary.employee = this.employee;
    this.salaryService.createSalary(this.salary)
      .subscribe(data => 
        { 
          console.log(data),
          this.employee.salaries.concat(this.salary) 
        },
        error => console.log(error));
    this.gotoList();
  }

  employeeChanged(id: number): void {
    this.employeeService.getEmployee(id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;        
      }, error => console.log(error));
    this.salary.employeeId = this.employee.id;
    console.log(this.salary);
  }



  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/salaries']);
  }

}
