import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ReportService } from '../report.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  id: any = ''
  report$: any

  constructor(private ActivatedRoute: ActivatedRoute, private rs: ReportService, private router: Router) { 
   }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.params['id'] 
    this.rs.getReport(this.id).subscribe((data: any) => {
      this.report$ = data
      console.log(this.report$)
    })
  }

  onClick() {
    this.router.navigate(["home"])
  }
}
