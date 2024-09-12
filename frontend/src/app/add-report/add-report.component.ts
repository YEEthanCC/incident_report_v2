import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapComponent } from '../map/map.component';

import { CommonModule } from '@angular/common';

import { HttpClient, HttpParams } from '@angular/common/http';

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

import { FormControl, FormGroup, FormsModule, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms'
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Observable, of, map } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css', 
  standalone: true, 
  imports: [
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent
]
})
export class AddReportComponent implements OnInit{
  form: FormGroup 
  private map: any 
  marker: any
  // locations$: Observable<any[]> = of([]) 
  location: any
  invalidNames: String[] = []
  coordinates?: L.LatLngExpression  
  locations: any[] = []

  constructor(private ls: LocationService, private rs: ReportService, private router: Router, private http: HttpClient) {
    let formControls = {
      title: new FormControl('', [
        Validators.required, 
        // this.invalidNameValidator as ValidatorFn 
      ]),
      info: new FormControl('', [
        Validators.required, 
      ]),
      imageUrl: new FormControl('', [
        Validators.required, 
      ]), 
      location: new FormControl('', [
        Validators.required,
      ]) 
    }
    this.form = new FormGroup(formControls) 
    this.marker = {} 
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.2, -123], 11) 
    // this.locations$ = this.ls.getLocations() 
    this.rs.getReports().subscribe((reports: any[]) => {
      reports.forEach((report: any) => {
        if(!this.locations.find((location: any) => location.coordinates[0] === report.location.coordinates[0] && location.coordiantes[1] === report.location.coordinates[1])) {
          this.locations = [report.location, ...this.locations]
        }        
      });
    })
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

  invalidNameValidator = (control: FormControl) => {
    // console.log(this.invalidNames);
    // if (this.invalidNames.includes(control.value.trim())) {
    //   return { name_error: "The name already exists" };
    // } else {
    //   return null;
    // }
  }


  onSubmit(newReport: any) {
    if(newReport.location === 'Add new location') {
      if (this.coordinates && Array.isArray(this.coordinates) && this.coordinates.length === 2) {
        const lat = this.coordinates[0];
        const lon = this.coordinates[1];
        
        if (typeof lat === 'number' && typeof lon === 'number') {
          this.http.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`).subscribe((data: any) => {
            newReport.location = {
              name: data.display_name, 
              coordinates: this.coordinates
            }
            if (this.coordinates) {
              this.rs.createReport({
                title: newReport.title,
                status: "unresolved", 
                info: newReport.info, 
                image_url: newReport.imageUrl, 
                location: newReport.location
              }).subscribe((res) => {
                console.log(res)
                this.ls.createLocation(newReport.location).subscribe(() => {
                  this.router.navigate(["home"]);
                })
              });
            } else {
              // Handle the case where the selected location data is null
              console.error('Selected location data is null');
            }
          });
        } else {
          console.error('Coordinates are not numbers:', this.coordinates);
        }
      } else {
        console.error('Coordinates are not defined or do not contain the correct structure:', this.coordinates);
      }
    } else {
      if (this.coordinates) {
        this.rs.createReport({
          title: newReport.title,
          status: "Unresolved", 
          info: newReport.info, 
          image_url: newReport.imageUrl, 
          location: newReport.location
        }).subscribe((res) => {
          console.log(res)
          this.router.navigate(["home"]);
        });
      } else {
        // Handle the case where the selected location data is null
        console.error('Selected location data is null');
      }
    }
}
  onLocationChange(e: any) {
    if(e.target.value === 'Add new location') {
      // this.router.navigate(['add-location']) 
      return
    } 
    if(this.coordinates) {
      this.map.removeLayer(this.marker) 
    }
    console.log(this.form.controls['location'].value)
    this.marker = L.marker(this.form.controls['location'].value.coordinates).addTo(this.map) 
    this.coordinates = this.form.controls['location'].value.coordinates
  }
  onClick() {
    this.router.navigate(["add-report"]) 
  }
}