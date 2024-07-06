import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    console.log('getLocations is called')
    return this.http.get<any[]>('http://localhost:4000/api/locations')
  }

  getLocation(id: any): Observable<any> {
    return this.http.get('http://localhost:4000/api/locations/', { params: id })
  }

  createLocation(location: any): Observable<any> {
    return this.http.post('http://localhost:4000/api/locations/',location)
  }

  deleteLocation(id: any): Observable<any> {
    return this.http.delete('http://localhost:4000/api/locations/', { params: id })
  }

  updateLocation(id: any, location: any): Observable<any> {
    return this.http.put('http://localhost:4000/api/location/', { params: id }, location)
  }
}
