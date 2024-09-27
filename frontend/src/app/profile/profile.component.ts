import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReportModalComponent } from "../report-modal/report-modal.component";
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';
import { ReportService } from '../report.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png'; 
const iconUrl = 'assets/marker-icon.png'; 
const shadowUrl = 'assets/marker-shadow.png'; 
const iconDefault = icon({ 
  iconRetinaUrl, 
  iconUrl,
  shadowUrl, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  tooltipAnchor: [16, -28], 
  shadowSize: [41, 41] 
});


Marker.prototype.options.icon = iconDefault;


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
  map: any 
  markers: L.Marker[]
  reports$: Observable<any[]> 

  constructor(private router: Router, private rs: ReportService) {
    this.reports$ = of([])
    this.markers = []
  }

  ngOnInit(): void {
    this.map = L.map('profile-map').setView([49.2, -123], 11) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.rs.getReports().subscribe((reports: any[]) => {
      reports.forEach((report: any) => {
        if(!this.markers.find(marker => marker.getLatLng().lat === report.location.coordinates[0] && marker.getLatLng().lng === report.location.coordinates[1]) && report.authorization == true) {
          this.markers = [L.marker(report.location.coordinates), ...this.markers]
        }
      })
      this.markers.forEach(marker => marker.addTo(this.map));
    })
  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}
