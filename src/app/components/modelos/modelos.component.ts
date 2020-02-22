import { Component, OnInit, ViewChild } from '@angular/core';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../services/modelo.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { FormmodelosComponent } from './formmodelos.component';
import { ModalService } from '../../services/modal.service';

@Component( {
  selector: 'app-modelos',
  templateUrl: './modelos.component.html'
} )
export class ModelosComponent implements OnInit {

  modelos: Modelo[];
  paginador: any;
  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'nombre', 'marca', 'device', 'acciones' ];
  dataSource: MatTableDataSource<Modelo> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormmodelosComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor(
    private modeloService: ModeloService,
    private dialog: MatDialog,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe( e => this.getTable());

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

  getAll() {
    this.modeloService.getAll().subscribe( i => ( this.modelos = i ) );
  }

  getTable() {
    this.modeloService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Modelo ) {
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
        this.modeloService.delete( tipo.id ).subscribe( response => {
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

  openDialog( entidad: Modelo ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormmodelosComponent, { height: '550px', width: '400px' } );
    } else {
      this.dialogRef = this.dialog.open( FormmodelosComponent, { data: entidad, height: '550px', width: '400px' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
