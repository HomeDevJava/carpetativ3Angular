import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from './status';
import { StatusService } from './status.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { FormstatusComponent } from './formstatus.component';
import { ModalService } from '../paginator/modal.service';

@Component( {
  selector: 'app-status',
  templateUrl: './status.component.html'
} )
export class StatusComponent implements OnInit {

  liststatus: Status[];
  paginador: any;
  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'descripcion', 'acciones' ];
  dataSource: MatTableDataSource<Status> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormstatusComponent>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;

  constructor( private statusService: StatusService,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe(e => this.getTable());
  }

  getListstatus(): void {
    this.statusService.getListStatus().subscribe( data => this.liststatus = data );
  }

  getTable() {
    this.statusService.getListStatus().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(status: Status): void {
    Swal.fire( {
      title: 'Borrando...!', text: `Dese borrar el registro ${ status.id }`,
      icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!', confirmButtonColor: '#3085d6'
    } ).then( result => {
      if ( result.value ) {
        this.statusService.delete( status.id ).subscribe( response => {
          this.getTable();
          Swal.fire( 'Proceso Completado', `${ response.msg } ${ status.id }`, 'success' );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Status ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormstatusComponent,  { height: '400px', width: '400px' } );
    } else {
      this.dialogRef = this.dialog.open( FormstatusComponent, { data: entidad, height: '400px', width: '400px' } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
