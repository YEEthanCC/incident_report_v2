import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';

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


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css', 
  standalone: true, 
  imports: [
    MapComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule
  ]
})
export class AddReportComponent implements OnInit{
  form: FormGroup 
  locations$: Observable<any[]> = of([]) 
  location: any
  invalidNames: String[] = []  

  constructor(private ls: LocationService, private rs: ReportService, private router: Router) {
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
    }
    this.form = new FormGroup(formControls) 
  }

  ngOnInit(): void {
    this.locations$ = this.ls.getLocations()
  }

  invalidNameValidator = (control: FormControl) => {
    console.log(this.invalidNames);
    if (this.invalidNames.includes(control.value.trim())) {
      return { name_error: "The name already exists" };
    } else {
      return null;
    }
  }


  onSubmit(newReport: any) {
    
    if (this.location) {
      this.rs.createReport({
        title: newReport.title,
        status: "Unresolved", 
        info: newReport.info, 
        image_url: newReport.imageUrl, 
        location: this.location
      }).subscribe((res) => {
        console.log(res)
        this.router.navigate(["home"]);
      });
    } else {
      // Handle the case where the selected location data is null
      console.error('Selected location data is null');
    }
  }

  onLocationChange(e: any) {
    if(e.target.value === 'Add new location') {
      this.router.navigate(['add-location'])
    }
    console.log(this.location)
  }
}