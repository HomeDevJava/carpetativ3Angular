import { Injectable } from '@angular/core';
import { Cedi } from '../models/cedi';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class CediService {
  private urlEndpoint = 'http://localhost:8080/api/cedi';
  private httpHeaders = new HttpHeaders( { 'Content-type': 'application/json' } );

  constructor( private http: HttpClient, private router: Router ) { }

  getListCedis(): Observable<Cedi[]> {
    return this.http.get<Cedi[]>( this.urlEndpoint ).pipe(
      map( res => {
        const cedis = res as Cedi[];
        return cedis.map( cedi => {
          cedi.domicilio = cedi.domicilio.toUpperCase();
          return cedi;
        } );
      } )
    );
    // utilizando operador of de rxjs // return of(this.cedis);
    // utilizando el operador map de rxjs/operators // return this.http.get( this.urlEndpoint).pipe(map(response => response as Cedi[]));
  }

  getAll( page: number ): Observable<any> {
    return this.http.get( this.urlEndpoint + '/page/' + page, {headers: this.httpHeaders} )
    .pipe(
      map((res: any) => {
        (res.content as Cedi[]).map(cedi => {
          cedi.domicilio = cedi.domicilio.toUpperCase();
          return cedi;
        });
        return res;
      })
    );
  }

  createCedis( cedi: Cedi ): Observable<any> {
    return this.http
      .post<any>( this.urlEndpoint, cedi, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          // se lanzan los errores de validacion del backend
          if ( e.status === 400 ) { return throwError( e ); }
          console.error( e );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  getCedis( id: any ): Observable<Cedi> {
    return this.http.get<Cedi>( `${ this.urlEndpoint }/${ id }` ).pipe(
      catchError( e => {
        this.router.navigate( [ '/cedis' ] );
        console.error( e.error.msg );
        Swal.fire( e.error.msg, e.error.error, 'error' );
        return throwError( e );
      } )
    );
  }

  updateCedis( cedi: Cedi ): Observable<any> {
    return this.http.put<any>( `${ this.urlEndpoint }/${ cedi.id }`, cedi, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          console.error( e.error.msg );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }

  delete( id: number ): Observable<Cedi> {
    return this.http
      .delete<Cedi>( `${ this.urlEndpoint }/${ id }`, { headers: this.httpHeaders } )
      .pipe(
        catchError( e => {
          console.error( e.error.msg );
          Swal.fire( e.error.msg, e.error.error, 'error' );
          return throwError( e );
        } )
      );
  }
}
