import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { LocationService } from '../location.service';
import { RouterModule } from '@angular/router';
import { Report } from '../report'


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css', 
  standalone: true, 
  imports: [ 
    CommonModule, 
    RouterModule
   ]
})
export class DataTableComponent implements OnInit {
  reports$: Observable<any[]>

  constructor(private rs:ReportService, private ls: LocationService) {
    this.reports$ = of([])
  }

  async onDelete(id: any) {
    console.log("onDelete function called")
    this.rs.deleteReport(id).subscribe((res) => {
      console.log(res)
    })
    this.reports$ = this.rs.getReports()
  }

  ngOnInit(): void {
    this.reports$ = this.rs.getReports()
  }

  onStatusChange(id: any) {
    let status: string
    this.rs.getReport(id).subscribe((data: any) => {
      // report = new Report(data.title, data.status, data.info, data.image_url, data.location)
      // if(report.status === 'unresolved') {
      //   report.status = 'resolved'
      // } else {
      //   report.status = 'unresolved'
      // }
      status = data.status 
      if(status === 'unresolved') {
        status = 'resolved'
      } else {
        status = 'unresolved'
      }
      this.rs.updateReport(id, {
        "status": status
      }).subscribe((res) => {
        console.log(res) 
        this.reports$ = this.rs.getReports()
      })
    })
  }

}