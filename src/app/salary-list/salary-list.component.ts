import { Observable } from "rxjs";
import { SalaryService } from "./../salary.service";
import { Salary } from "./../salary";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})

export class SalaryListComponent implements OnInit {
  salaries: Observable<Salary[]>;

  constructor(private salaryService: SalaryService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

/*    reloadData() {
 this.salaryService.getSalariesList()
    .subscribe(
      data => {
        this.salaries=data;
        console.log(data);
          },
      error => console.log(error));
    
  }  */

  reloadData() {
    this.salaries = this.salaryService.getSalariesList()
    
  } 

  deleteSalary(id: number) {
    this.salaryService.deleteSalary(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
/* 
  salaryDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateSalary(id: number){
    this.router.navigate(['update', id]);
  }
 */
}
