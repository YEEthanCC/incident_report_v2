import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReportModalComponent } from "../report-modal/report-modal.component";
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    DataTableComponent,
    NavbarComponent,
    ReportModalComponent
]
})
export class HomeComponent implements OnInit{
  @ViewChild('mapComponent') mapContainer?: ElementRef;
  @ViewChild('reportTableComponenet ') reportsContainer: any
  reports$: any

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    console.log('Home component is rendered')
    console.log(this.mapContainer)
  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}