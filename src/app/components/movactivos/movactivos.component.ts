import { Component, OnInit, ViewChild, OnDestroy, PipeTransform, Pipe } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { MovactivoService } from '../../services/movactivo.service';
import { ModalService } from '../../services/modal.service';
import { Movactivo } from 'src/app/models/movactivo';
import Swal from 'sweetalert2';
import { FormmovactivosComponent } from './formmovactivos.component';
import { ItemMovactivo } from '../../models/item-movactivo';

@Component( { selector: 'app-movactivos', templateUrl: './movactivos.component.html' } )
export class MovactivosComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;
  displayedColumns: string[] = [ 'id', 'fecha', 'origen', 'destino', 'empleado', 'motivo', 'items', 'acciones' ];
  dataSource: MatTableDataSource<Movactivo> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormmovactivosComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor(
    private movactivoService: MovactivoService,
    private dialog: MatDialog,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.getTable();
    this.suscripcion = this.modalService.notificar.subscribe( e => this.getTable() );

    this.dataSource.filterPredicate = ( data, filter: string ) => {
      const accumulator = ( currentTerm: any, key: any ) => {
        return this.nestedFilterCheck( currentTerm, data, key );
      };
      const dataStr = Object.keys( data ).reduce( accumulator, '' ).toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf( transformedFilter ) !== -1;
    };
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getTable() {
    this.movactivoService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Movactivo ) {
    Swal.fire( {
      title: 'Borrando...!',
      text: `Dese borrar el registro ${ tipo.id }`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      confirmButtonColor: '#3085d6'
    } ).then( result => {
      if ( result.value ) {
        this.movactivoService.delete( tipo.id ).subscribe( response => {
          this.getTable();
          Swal.fire(
            'Proceso Completado',
            `${ response.msg } ${ tipo.id }`,
            'success'
          );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nestedFilterCheck( search, data, key ) {
    if ( typeof data[ key ] === 'object' ) {
      for ( const k in data[ key ] ) {
        if ( data[ key ][ k ] !== null ) {
          search = this.nestedFilterCheck( search, data[ key ], k );
        }
      }
    } else {
      search += data[ key ];
    }
    return search;
  }

  openDialog( entidad: Movactivo ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormmovactivosComponent, { width: '80%', height: '80%' } );
    } else {
      this.dialogRef = this.dialog.open( FormmovactivosComponent, { data: entidad, width: '80%', height: '80%' } );
    }

    this.dialogRef.afterClosed().subscribe( result => this.getTable() );
  }


}
