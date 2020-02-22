import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Device } from '../models/device';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  // 1.- crear el URLENDPOINT del backend
  private urlEndpoint = 'http://localhost:8080/api/device';
  // 2.- crear el header
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  // 3.- inyectar el HttpClient y router
  constructor(private http: HttpClient, private router: Router) {}

  // 4.- crear los metodos

  getListDevice(): Observable<Device[]> {
    return this.http.get<Device[]>(this.urlEndpoint);
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  createDevice(device: Device): Observable<any> {
    return this.http.post(this.urlEndpoint, device, { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          if (e.status === 400) { return throwError(e); }
          console.error(e);
          Swal.fire(e.error.msg, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getDevice(id: any): Observable<Device> {
    return this.http.get<Device>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/devices']);
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  updateDevice(device: Device): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${device.id}`, device, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        console.error(e.error.msg);
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        console.error(e.error.msg);
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
