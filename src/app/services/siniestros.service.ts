import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Siniestro } from '../models/siniestro';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class SiniestrosService {

  private urlEndpoint = 'http://localhost:8080/api/tiposiniestro';
  private httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );

  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<Siniestro[]> {
    return this.http.get<Siniestro[]>( this.urlEndpoint, { headers: this.httpHeaders } );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  findbyId( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          this.router.navigate( [ 'tiposiniestros' ] );
          return throwError( e );
        } )
      );
  }

  create( tipo: Siniestro ): Observable<any> {
    return this.http.post( this.urlEndpoint, tipo, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); }
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  update( tipo: Siniestro ): Observable<any> {
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
