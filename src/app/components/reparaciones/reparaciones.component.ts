import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { Reparacion } from '../../models/reparacion';
import { FormreparacionesComponent } from '../reparaciones/formreparaciones.component';
import { ReparacionService } from '../../services/reparacion.service';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html'
} )
export class ReparacionesComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;
  displayedColumns: string[] = [ 'id', 'fectramite', 'cedi', 'empleado', 'observacion', 'guiafedex', 'status', 'acciones' ];
  dataSource: MatTableDataSource<Reparacion> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormreparacionesComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor(
    private reparacionService: ReparacionService,
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

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
    console.log('ngOndestroy: reparaciones');
  }

  getTable() {
    this.reparacionService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Reparacion ) {
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
        this.reparacionService.delete( tipo.id ).subscribe( response => {
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

  openDialog( entidad: Reparacion ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormreparacionesComponent, { height: '90%', width: '99%' } );
    } else {
      this.dialogRef = this.dialog.open( FormreparacionesComponent, { data: entidad, height: '90%', width: '99%' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      // console.log( `Dialog result: ${ result }` );
      this.getTable();
    } );
  }

}
