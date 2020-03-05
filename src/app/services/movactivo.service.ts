import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Movactivo } from '../models/movactivo';

@Injectable()
export class MovactivoService {

  private urlEndpoint = 'http://localhost:8080/api/movactivo';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );


  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<any> {
    return this.http.get( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/page/${ page }`, { headers: this.httpHeaders } );
  }

  findById( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'movactivos' ] );
          return throwError( e );
        } )
      );
  }

  create( movactivo: Movactivo ): Observable<any> {
    return this.http.post( this.urlEndpoint, movactivo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); }
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( movactivo: Movactivo ): Observable<any> {
    return this.http.put( `${ this.urlEndpoint }/${ movactivo.id }`, movactivo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  delete( id: any ): Observable<any> {
    return this.http.delete( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  deleteItem( id: number ): Observable<any> {
    return this.http.delete( `${ this.urlEndpoint }/item/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

}
