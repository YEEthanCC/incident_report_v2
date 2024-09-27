import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { ReportService } from '../report.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() reports$: any

  constructor(private router: Router, public as: AuthService, private rs:ReportService) {}

  ngOnInit(): void {
    if(this.reports$) {
      console.log(this.reports$)
    }
  }
  navigateToProfile() {
    // if(this.reports$) {
    //   this.reports$ = this.rs.getReports().pipe(
    //     map(reports => reports.filter(report => {

    //       return report.authorization === true
    //     })))
    // }
    this.router.navigate(["profile"])
  }

  logout() {
    this.as.logout()
  }
}
