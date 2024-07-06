
import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
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

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ReportService } from '../report.service';

import { Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.css', 
  standalone: true, 
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AddLocationComponent implements OnInit{
  form: FormGroup 
  private map: any 
  marker: any
  coordinates?: L.LatLngExpression

  
  constructor(private ls: LocationService, private rs: ReportService, private router: Router) {
    let formControls = {
      name: new FormControl() 
    }
    this.form = new FormGroup(formControls) 
    this.marker = {} 
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.2, -123], 11) 
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map) 
    this.map.on('click', (e:MouseEvent)=>this.onMapClick(e))


  }

  onMapClick(e: any) {
    if(this.coordinates) {
      this.map.removeLayer(this.marker) 
    }
    this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map) 
    this.coordinates = [e.latlng.lat, e.latlng.lng] 
  }

  onSubmit(e: any) {
    if(!this.coordinates) {
      this.coordinates = [0, 0] 
    } 
    this.ls.createLocation({
      name: e.name, 
      coordinates: this.coordinates
    }).subscribe((res) => {
      console.log(res)
    }) 
    this.router.navigate(["add-report"])
  }
}