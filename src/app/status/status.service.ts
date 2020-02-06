import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Status } from './status';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable( {
  providedIn: 'root'
} )
export class StatusService {

  urlEndpoint = 'http://localhost:8080/api/status';
  private httpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );

  constructor( private http: HttpClient, private router: Router ) { }

  getListStatus(): Observable<Status[]> {
    return this.http.get<Status[]>( this.urlEndpoint );
  }

  getAllPaged( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} );
  }

  getStatus( id: any ): Observable<any> {
    return this.http.get( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } ).pipe(
      catchError( e => {
        this.router.navigate( [ 'status' ] );
        Swal.fire( e.error.error, e.error.msg, 'error' );
        return throwError( e );
      } )
    );
  }

  createStatus( status: Status ): Observable<any> {
    return this.http.post( this.urlEndpoint, status, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          if ( e.status === 400 ) { return throwError( e ); }
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  updateStatus( status: Status ): Observable<any> {
    return this.http.put<any>( `${ this.urlEndpoint }/${ status.id }`, status, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  delete( id: any ): Observable<any> {
    return this.http.delete( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } ).pipe(
      catchError( e => {
        Swal.fire( e.error.msg, e.error.error, 'error' );
        return throwError( e );
      } )
    );
  }

}
