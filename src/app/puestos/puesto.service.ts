import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Puesto } from './puesto';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private urlendpoint = 'http://localhost:8080/api/puesto';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getListPuestos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.urlendpoint);
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlendpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  getPuesto(id: any): Observable<Puesto> {
    return this.http.get<any>(`${this.urlendpoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        this.router.navigate(['puestos']);
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  createPuesto(puesto: Puesto): Observable<any> {
    return this.http.post(this.urlendpoint, puesto, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        if (e.status === 400) { return throwError(e); }
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  updatePuesto(puesto: Puesto): Observable<any> {
    return this.http.put(`${this.urlendpoint}/${puesto.id}`, puesto, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Puesto> {
    return this.http.delete<Puesto>(`${this.urlendpoint}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        Swal.fire(e.error.msg, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
