import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Reparacion } from '../models/reparacion';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class ReparacionService {

  private urlEndpoint = 'http://localhost:8080/api/reparacion';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'Application/json' } );


  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<Reparacion[]> {
    return this.http.get<Reparacion[]>( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  findById( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'reparaciones' ] );
          return throwError( e );
        } )
      );
  }

  create( reparacion: Reparacion ): Observable<any> {
    return this.http.post( this.urlEndpoint, reparacion, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          // se lanzan los errores de validacion del backend
          if ( e.status === 400 ) { return throwError( e ); } else { this.router.navigate( [ 'reparaciones' ] ); }
          console.error( e );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( reparacion: Reparacion ): Observable<any> {
    return this.http.put( `${this.urlEndpoint}/${reparacion.id}`, reparacion, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          // se lanzan los errores de validacion del backend
          if ( e.status === 400 ) { return throwError( e ); } else { this.router.navigate( [ 'reparaciones' ] ); }
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
