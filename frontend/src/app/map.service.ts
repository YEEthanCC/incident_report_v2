import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';

import { ReportService } from './report.service';

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

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: any 
  markers: L.Marker[] = []
  marker: any

  constructor(private rs: ReportService) { 
  }


  initializedMap() {
    this.map = L.map('map').setView([49.2, -123], 11) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.rs.getReports().subscribe((reports: any[]) => {
      reports.forEach((report: any) => {
        if(!this.markers.find(marker => marker.getLatLng().lat === report.location.coordinates[0] && marker.getLatLng().lng === report.location.coordinates[1])) {
          this.markers = [L.marker(report.location.coordinates), ...this.markers]
        }
      })
      this.markers.forEach(marker => marker.addTo(this.map));
    })

    console.log('map has been initialized')
  }

  zoomIn(coordinates: any) {
    var zoom = 15
    this.map.flyTo(coordinates, zoom)
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
    this.marker = this.markers.find(marker => marker.getLatLng().lat === coordinates[0] && marker.getLatLng().lng === coordinates[1])
    this.map.removeLayer(this.marker) 
    this.marker = L.marker(coordinates, {icon: redIcon}).addTo(this.map)
  }

  getMap() {
    if(!this.map) {
      this.initializedMap()
    }
    console.log('getMap is called', this.map)
    return this.map
  }
}
