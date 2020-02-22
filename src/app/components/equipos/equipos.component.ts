import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialogRef, MatTableDataSource, MatDialog } from '@angular/material';
import { Equipo } from '../../models/equipo';
import { FormequiposComponent } from './formequipos.component';
import { EquiposService } from '../../services/equipos.service';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
} )
export class EquiposComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'serie', 'afijo', 'enabled', 'modelo', 'acciones' ];
  dataSource: MatTableDataSource<Equipo> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormequiposComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;


  constructor(
    private equiposService: EquiposService,
    private dialog: MatDialog,
    public modalService: ModalService
  ) { }

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
    this.equiposService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Equipo ) {
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
        this.equiposService.delete( tipo.id ).subscribe( response => {
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

  openDialog( entidad: Equipo ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormequiposComponent, { height: '70%', width: '45%' } );
    } else {
      this.dialogRef = this.dialog.open( FormequiposComponent, { data: entidad, height: '70%', width: '45%' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }



}
