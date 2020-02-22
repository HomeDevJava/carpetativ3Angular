import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Equipo } from '../models/equipo';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class EquiposService {

  urlEndpoint = 'http://localhost:8080/api/equipos';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );


  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  findById( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'equipos' ] );
          return throwError( e );
        } )
      );
  }

  create( equipo: Equipo ): Observable<any> {
    return this.http.post( this.urlEndpoint, equipo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); } else { this.router.navigate( [ 'equipos' ] ); }
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( equipo: Equipo ): Observable<any> {
    return this.http.put( `${ this.urlEndpoint }/${ equipo.id }`, equipo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); } else { this.router.navigate( [ 'equipos' ] ); }
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
