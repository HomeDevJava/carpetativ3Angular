import { Component, OnInit, ViewChild } from '@angular/core';
import { Tipoproblema } from './tipoproblema';
import { TipoproblemaService } from './tipoproblema.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { FormtipoproblemasComponent } from './formtipoproblemas.component';
import { ModalService } from '../paginator/modal.service';

@Component( {
  selector: 'app-tipoproblemas',
  templateUrl: './tipoproblemas.component.html'
} )
export class TipoproblemasComponent implements OnInit {

  problemas: Tipoproblema[];
  paginador: any;
  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'descripcion', 'acciones' ];
  dataSource: MatTableDataSource<Tipoproblema> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormtipoproblemasComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor( private tipoproblemaService: TipoproblemaService,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe( e => this.getTable() );
  }

  getListAll() {
    this.tipoproblemaService.getListAll().subscribe( l => this.problemas = l );
  }

  getTable() {
    this.tipoproblemaService.getListAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Tipoproblema ) {
    Swal.fire( {
      title: 'Borrando...!', text: `Dese borrar el registro ${ tipo.id }`,
      icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!', confirmButtonColor: '#3085d6'
    } ).then( result => {
      if ( result.value ) {
        this.tipoproblemaService.delete( tipo.id ).subscribe( response => {
          this.getTable();
          Swal.fire( 'Proceso Completado', `${ response.msg } ${ tipo.id }`, 'success' );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Tipoproblema ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormtipoproblemasComponent,  { height: '400px', width: '400px' } );
    } else {
      this.dialogRef = this.dialog.open( FormtipoproblemasComponent, { data: entidad, height: '400px', width: '400px' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
