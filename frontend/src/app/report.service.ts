import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/reports`)
  }

  getReport(id: any) {
    return this.http.get(`${this.apiUrl}/api/reports` + id)
  }

  createReport(report: any) {
    return this.http.post(`${this.apiUrl}/api/reports`, report)
  }

  deleteReport(id: any) {
    return this.http.delete(`${this.apiUrl}/api/reports` + id)
  }

  updateReport(id: any, report: any) {
    return this.http.patch(`${this.apiUrl}/api/reports` + id, report)
  }
}
