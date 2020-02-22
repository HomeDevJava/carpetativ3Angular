import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Tipoproblema } from '../models/tipoproblema';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class TipoproblemaService {

  private urlEndpoint = 'http://localhost:8080/api/tipoproblema';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );

  constructor( private http: HttpClient, private router: Router ) { }

  getListAll(): Observable<Tipoproblema[]> {
    return this.http.get<Tipoproblema[]>( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  getTipoproblema( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'problemas' ] );
          return throwError( e );
        } )
      );
  }

  create( tipo: Tipoproblema ): Observable<any> {
    return this.http.post( this.urlEndpoint, tipo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); }
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( tipo: Tipoproblema ): Observable<any> {
    return this.http.put( `${ this.urlEndpoint }/${ tipo.id }`, tipo, { headers: this.httpHeaders } )
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

}
