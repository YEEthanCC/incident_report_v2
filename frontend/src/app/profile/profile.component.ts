import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReportModalComponent } from "../report-modal/report-modal.component";
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MapComponent,
    DataTableComponent,
    NavbarComponent,
    ReportModalComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @ViewChild('mapComponent') private mapContainer?: ElementRef;

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
