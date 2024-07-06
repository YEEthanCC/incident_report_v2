import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../location.service';
import { ReportService } from '../report.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-edit-report',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MapComponent
  ],
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent {
  form: FormGroup;
  locations: any[];

  constructor(private activatedRoute: ActivatedRoute, private ls: LocationService, private rs: ReportService, private router: Router) {
    this.locations = [];
    this.form = new FormGroup({
      title: new FormControl(""),
      info: new FormControl(""),
      imageUrl: new FormControl(""),
      location: new FormControl(""), 
      status: new FormControl("")
    });
  }

  ngOnInit(): void {
    this.ls.getLocations().subscribe((res: any[]) => {
      this.locations = res;
      this.rs.getReport(this.activatedRoute.snapshot.params['id']).subscribe((data: any) => {
        const selectedLocation = this.locations.find((p: any) => p.name === data.location.name);
        this.form.setValue({
          title: data.title,
          info: data.info,
          imageUrl: data.image_url,
          location: selectedLocation, 
          status: data.status
        });
      });
    });
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
}
