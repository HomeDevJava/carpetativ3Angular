import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { Empleado } from '../../models/empleado';
import { FormempleadosComponent } from './formempleados.component';
import { ModalService } from '../../services/modal.service';
import { EmpleadoService } from '../../services/empleado.service';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-empleados',
  templateUrl: './empleados.component.html'
} )
export class EmpleadosComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'nombre', 'apellido', 'email', 'telefono', 'puesto', 'cedi', 'acciones' ];
  dataSource: MatTableDataSource<Empleado> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormempleadosComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor(
    private empleadoService: EmpleadoService,
    private dialog: MatDialog,
    public modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe( e => this.getTable() );

    this.dataSource.filterPredicate = ( data, filter: string ) => {
      const accumulator = ( currentTerm: any, key: any ) => {
        return this.nestedFilterCheck( currentTerm, data, key );
      };
      const dataStr = Object.keys( data ).reduce( accumulator, '' ).toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf( transformedFilter ) !== -1;
    };
  }

  getTable() {
    this.empleadoService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Empleado ) {
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
        this.empleadoService.delete( tipo.id ).subscribe( response => {
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

  openDialog( entidad: Empleado ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormempleadosComponent, { height: '70%', width: '45%' } );
    } else {
      this.dialogRef = this.dialog.open( FormempleadosComponent, { data: entidad, height: '70%', width: '45%' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
