import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import Swal from 'sweetalert2';
import { Siniestro } from '../../models/siniestro';
import { SiniestrosService } from '../../services/siniestros.service';
import { ModalService } from '../../services/modal.service';
import { FormsiniestrosComponent } from './formsiniestros.component';


@Component( {
  selector: 'app-tiposiniestros',
  templateUrl: './tiposiniestros.component.html'
} )
export class TiposiniestrosComponent implements OnInit {

  siniestros: Siniestro[];
  paginador: any;
  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'descripcion', 'acciones' ];
  dataSource: MatTableDataSource<Siniestro> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormsiniestrosComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor( private siniestrosService: SiniestrosService,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe( e => this.getTable() );
  }

  getAll() {
    this.siniestrosService.getAll().subscribe( i => this.siniestros = i );
  }

  getTable() {
    this.siniestrosService.getAll().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( tipo: Siniestro ) {
    Swal.fire( {
      title: 'Borrando...!', text: `Dese borrar el registro ${ tipo.id }`,
      icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!', confirmButtonColor: '#3085d6'
    } ).then( result => {
      if ( result.value ) {
        this.siniestrosService.delete( tipo.id ).subscribe( response => {
          this.getTable();
          Swal.fire( 'Proceso Completado', `${ response.msg } ${ tipo.id }`, 'success' );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Siniestro ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormsiniestrosComponent,  { height: '400px', width: '400px' } );
    } else {
      this.dialogRef = this.dialog.open( FormsiniestrosComponent, { data: entidad, height: '400px', width: '400px' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
