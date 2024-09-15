
import { ReportComponent } from './../report/report.component';
import { ReportService } from './../report.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LocationService } from '../location.service';
import { RouterModule } from '@angular/router';
import { Report } from '../report'
import * as L from 'leaflet';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { ReportModalComponent } from "../report-modal/report-modal.component";
import { MapService } from '../map.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css', 
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule,
    ReportComponent,
    ReportModalComponent, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule
  ]
})
export class DataTableComponent implements OnInit {
  reports$: Observable<any[]>
  clickedReport: any
  marker: any

  constructor(private rs:ReportService, private ls: LocationService, private ms: MapService, private router: Router) {
    this.reports$ = of([])
  }

  async onDelete(id: any) {
    console.log("onDelete function called")
    this.rs.deleteReport(id).subscribe((res) => {
      console.log(res)
      this.reports$ = this.rs.getReports()
    })
  }

  ngOnInit(): void {
    this.reports$ = this.rs.getReports()
    console.log('data-table initialized')
  }

  onStatusChange(id: any) {
    let status: string
    this.rs.getReport(id).subscribe((data: any) => {
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

  onReportClick(location: any) {
    this.ms.zoomIn(location.coordinates)
  }

  openModal(report: any) {
    this.clickedReport = report
    const modalElement = document.getElementById('reportModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  onModalClose() {
    console.log('onModalClose() is called')
    const modalElement = document.getElementById('reportModal')
    if (modalElement) {
      modalElement.style.display = 'none'
    }
  }

  onEditClicked(id: any) {
    this.router.navigate([`home/reports/${id}/edit`])
  }
}