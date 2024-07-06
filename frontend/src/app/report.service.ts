import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:4000/api/reports')
  }

  getReport(id: any) {
    return this.http.get('http://localhost:4000/api/reports/' + id)
  }

  createReport(report: any) {
    return this.http.post('http://localhost:4000/api/reports/', report)
  }

  deleteReport(id: any) {
    return this.http.delete('http://localhost:4000/api/reports/' + id)
  }

  updateReport(id: any, report: any) {
    return this.http.patch('http://localhost:4000/api/reports/' + id, report)
  }
}
