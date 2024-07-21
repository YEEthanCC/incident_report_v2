import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../location.service';
import { ReportService } from '../report.service';
import { MapComponent } from '../map/map.component';

import * as L from 'leaflet';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-report',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MapComponent, 
    NavbarComponent
  ],
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit{
  form: FormGroup;
  private map: any 
  marker: any
  // location$: Observable<any> = of
  locations: any[];
  coordinates?: any 

  constructor(private activatedRoute: ActivatedRoute, private ls: LocationService, private rs: ReportService, private router: Router) {
    this.locations = [];
    this.form = new FormGroup({
      title: new FormControl(""),
      info: new FormControl(""),
      imageUrl: new FormControl(""),
      location: new FormControl(""), 
      status: new FormControl("")
    });
    this.marker = {} 
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.2, -123], 11) 
    // this.locations$ = this.ls.getLocations() 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map) 
    this.map.on('click', (e:MouseEvent)=>this.onMapClick(e))
    this.rs.getReports().subscribe((reports: any[]) => {
      reports.forEach((report: any) => {
        if(!this.locations.find((location: any) => location.coordinates[0] === report.location.coordinates[0] && location.coordiantes[1] === report.location.coordinates[1])) {
          this.locations = [report.location, ...this.locations]
        }        
      });
      let report = reports.find((report: any) => report._id === this.activatedRoute.snapshot.params['id'])
      const selectedLocation = this.locations.find((p: any) => p.name === report.location.name);
      this.coordinates = report.location.coordinates
      this.marker = L.marker(this.coordinates).addTo(this.map) 
      this.form.setValue({
        title: report.title,
        info: report.info,
        imageUrl: report.image_url,
        location: selectedLocation, 
        status: report.status
      });
    })
    // this.ls.getLocations().subscribe((res: any[]) => {
    //   this.locations = res;
    //   this.rs.getReport(this.activatedRoute.snapshot.params['id']).subscribe((data: any) => {
    //     const selectedLocation = this.locations.find((p: any) => p.name === data.location.name);
    //     this.coordinates = data.location.coordinates
    //     this.marker = L.marker(this.coordinates).addTo(this.map) 
    //     this.form.setValue({
    //       title: data.title,
    //       info: data.info,
    //       imageUrl: data.image_url,
    //       location: selectedLocation, 
    //       status: data.status
    //     });
    //     console.log(this.form.controls['status'].value)
    //   });
    // });
  }

  onSubmit(newReport: any) {
    this.rs.updateReport(this.activatedRoute.snapshot.params['id'], {
      title: newReport.title,
      info: newReport.info, 
      image_url: newReport.imageUrl, 
      location: newReport.location, 
      status: newReport.status
    }).subscribe((res) => {
      console.log(res)
      this.router.navigate(["home"]);
    });
  }

  onLocationChange(e: any) {
    if(e.target.value === 'Add new location') {
      this.router.navigate(['add-location']);
    }
  }
  onClick() {
    this.router.navigate(["add-report"]) 
  }
  onMapClick(e: any) {
    if(this.coordinates) {
      this.map.removeLayer(this.marker) 
    }
    this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map) 
    this.coordinates = [e.latlng.lat, e.latlng.lng] 
  }
  
}


