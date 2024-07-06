import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportComponent } from './report/report.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditReportComponent } from './edit-report/edit-report.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'home/reports/:id', component: ReportComponent}, 
  { path: 'add-report', component: AddReportComponent},
  { path: 'add-location', component: AddLocationComponent}, 
  { path: 'home/reports/:id/edit', component: EditReportComponent}, 
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];
