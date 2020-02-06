import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from './marca';
import { MarcaService } from './marca.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatDialogRef, MatPaginator, MatDialog } from '@angular/material';
import { FormmarcasComponent } from './formmarcas.component';
import { ModalService } from '../paginator/modal.service';

@Component( {
  selector: 'app-marcas',
  templateUrl: './marcas.component.html'
} )
export class MarcasComponent implements OnInit {

  marcas: Marca[];

  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'nombre', 'acciones' ];
  dataSource: MatTableDataSource<Marca> = new MatTableDataSource();
  dialogRef: MatDialogRef<FormmarcasComponent>;
  @ViewChild( MatPaginator, { static: false } ) paginator: MatPaginator;

  constructor( private marcaService: MarcaService,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe(e => this.getTable());
  }

  getListMarcas() {
    this.marcaService.getListMarcas().subscribe( data => {
      this.marcas = data;
    } );
  }

  getTable() {
    this.marcaService.getListMarcas().subscribe( data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete( marca: Marca ): void {
    Swal.fire( {
      title: 'Borrando...!',
      text: `Desea continuar borrando el registro ${ marca.nombre }`,
      icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar!'
    } ).then( ( result ) => {
      if ( result.value ) {
        this.marcaService.delete( marca.id ).subscribe( response => {
          this.getTable();
          Swal.fire( 'Borrado!', response.msg + marca.id, 'success' );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Marca ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormmarcasComponent );
    } else {
      this.dialogRef = this.dialog.open( FormmarcasComponent, { data: entidad } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
