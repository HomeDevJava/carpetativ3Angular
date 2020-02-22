import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Empleado } from '../models/empleado';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class EmpleadoService {

  urlEndpoint = 'http://localhost:8080/api/empleado';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );

  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  findById( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'empleados' ] );
          return throwError( e );
        } )
      );
  }

  create( empleado: Empleado ): Observable<any> {
    return this.http.post( this.urlEndpoint, empleado, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          // se lanzan los errores de validacion del backend
          if ( e.status === 400 ) { return throwError( e ); } else { this.router.navigate( [ 'empleados' ] ); }
          console.error( e );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( empleado: Empleado ): Observable<any> {
    return this.http.put( `${ this.urlEndpoint }/${ empleado.id }`, empleado, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          console.error( e );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  delete( id: number ): Observable<any> {
    return this.http.delete( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

}
