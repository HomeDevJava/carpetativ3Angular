import { Component, OnInit, ViewChild } from '@angular/core';
import { Puesto } from '../../models/puesto';
import { PuestoService } from '../../services/puesto.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { FormpuestosComponent } from './formpuestos.component';
import { ModalService } from '../../services/modal.service';

@Component( {
  selector: 'app-puestos',
  templateUrl: './puestos.component.html'
} )
export class PuestosComponent implements OnInit {
  puestos: Puesto[];
  paginador: any;
  displayedColumns: string[] = [ 'id', 'nombre', 'acciones' ];
  dataSource: MatTableDataSource<Puesto> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormpuestosComponent>;
  @ViewChild( MatPaginator, { static: false } ) paginator: MatPaginator;

  constructor( private puestoService: PuestoService,
               private activatedRoute: ActivatedRoute,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe(e => this.getTable());
  }

  getListPuestos(): void {
    this.puestoService.getListPuestos()
      .subscribe( data => ( this.puestos = data ) );
  }

  getPaged() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get( 'page' );
      if ( !page || page == null ) {
        page = 0;
      }
      this.puestoService.getAllPaged( page ).subscribe( response => {
        this.puestos = response.content;
        this.paginador = response;
      } );
    } );
  }

  getTable() {
    this.puestoService.getListPuestos().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete( puesto: Puesto ) {
    Swal.fire( {
      title: 'Borrando..!',
      text: `¿Desea continuar con el borrado del registro ${ puesto.nombre }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    } ).then( result => {
      if ( result.value ) {
        this.puestoService.delete( puesto.id ).subscribe( response => {
          this.getTable();
          Swal.fire(
            'Borrado!',
            `el registro con id ${ puesto.id } ha sido borrado exitosamente!`,
            'success'
          );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Puesto ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormpuestosComponent );
    } else {
      this.dialogRef = this.dialog.open( FormpuestosComponent, { data: entidad } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
