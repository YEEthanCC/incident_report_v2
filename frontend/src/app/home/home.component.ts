import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';
import { DataTableComponent } from '../data-table/data-table.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReportModalComponent } from "../report-modal/report-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  standalone: true,
  imports: [
    MapComponent,
    DataTableComponent,
    NavbarComponent,
    ReportModalComponent
]
})
export class HomeComponent {
  constructor(private router: Router) {

  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}