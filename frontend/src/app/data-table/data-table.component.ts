import { ReportService } from './../report.service';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { LocationService } from '../location.service';
import { RouterModule } from '@angular/router';
import { Report } from '../report'
import * as L from 'leaflet';
import { ReportComponent } from "../report/report.component";


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css', 
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule,
    ReportComponent
]
})
export class DataTableComponent implements OnInit {
  reports$: Observable<any[]>
  @Input() map:any
  @Input() markers: L.Marker[] = []
  marker: any

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
    console.log(this.map)
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

  onSourceClick(id: any) {
    console.log('onSourceClick() is called')
    const modalElement = document.getElementById('reportModal');
    if (modalElement) {
      modalElement.style.display = 'block';
    }
    const reportElement = document.getElementById('clickedReport')
    if (reportElement) {
      reportElement.id = id
    }
  }

  onModalClose() {
    console.log('onModalClose() is called')
    const modalElement = document.getElementById('reportModal')
    if (modalElement) {
      modalElement.style.display = 'none'
    }
  }
}