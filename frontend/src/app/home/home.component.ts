import { MapService } from './../map.service';
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
export class HomeComponent implements OnInit{
  map: any
  
  constructor(private ms: MapService, private router: Router) {

  }

  ngOnInit(): void {
    this.map = this.ms.getMap()
    console.log('map received: ', this.map)
    console.log('Home component is rendered')
  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}