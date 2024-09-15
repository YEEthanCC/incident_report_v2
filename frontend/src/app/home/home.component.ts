import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';

import { NavbarComponent } from '../navbar/navbar.component';
import { ReportModalComponent } from "../report-modal/report-modal.component";
import { ReportService } from '../report.service';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';


import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ReportModalComponent, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule
]
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild('mapContainer') private mapContainer?: ElementRef
  reports$: Observable<any[]> = of([])
  map: any
  markers: L.Marker[] = []
  clickedReport: any
  marker: any

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit(): void {
    console.log('Home component is rendered')
    this.reports$ = this.rs.getReports()
    if (this.map) {
      console.log('map is already initialized')

      return;
    }
    console.log('map does not exist, is initialized')

  }

  ngAfterViewInit() {
    console.log(this.mapContainer)
    this.map = L.map(this.mapContainer!.nativeElement).setView([49.2, -123], 11) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.rs.getReports().subscribe((reports: any[]) => {
      reports.forEach((report: any) => {
        if(!this.markers.find(marker => marker.getLatLng().lat === report.location.coordinates[0] && marker.getLatLng().lng === report.location.coordinates[1])) {
          this.markers = [L.marker(report.location.coordinates), ...this.markers]
        }
      })
      this.markers.forEach(marker => marker.addTo(this.map));
    })
  }

  onReportClick(location: any) {
    var zoom = 15
    this.map.flyTo(location.coordinates, zoom)
    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    if(this.marker) {
      this.map.removeLayer(this.marker)
      L.marker([this.marker.getLatLng().lat, this.marker.getLatLng().lng]).addTo(this.map) 
    }
    this.marker = this.markers.find(marker => marker.getLatLng().lat === location.coordinates[0] && marker.getLatLng().lng === location.coordinates[1])
    this.map.removeLayer(this.marker) 
    this.marker = L.marker(location.coordinates, {icon: redIcon}).addTo(this.map)
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

  async onDelete(id: any) {
    console.log("onDelete function called")
    this.rs.deleteReport(id).subscribe((res) => {
      console.log(res)
      this.reports$ = this.rs.getReports()
    })
  }

  onEditClicked(id: any) {
    this.router.navigate([`home/reports/${id}/edit`])
  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}