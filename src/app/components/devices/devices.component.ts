import { Component, OnInit, ViewChild } from '@angular/core';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormdevicesComponent } from './formdevices.component';
import { ModalService } from '../../services/modal.service';

@Component( {
  selector: 'app-devices',
  templateUrl: './devices.component.html'
} )
export class DevicesComponent implements OnInit {

  // 1.- crear el contenedor del listado del backend
  devices: Device[];
  paginador: any;

  /*implementando data table*/
  displayedColumns: string[] = [ 'id', 'nombre', 'acciones' ];
  dataSource: MatTableDataSource<Device>;
  dialogRef: MatDialogRef<FormdevicesComponent>;
  @ViewChild( MatPaginator, { static: false } ) paginator: MatPaginator;

  // 2.- inyectar el servicio deviceService
  constructor( private deviceService: DeviceService,
               private activatedRoute: ActivatedRoute,
               private dialog: MatDialog,
               private modalService: ModalService ) { }

  // 4.- llamar al metodo getListDevice
  ngOnInit() {
    this.getTable();
    this.modalService.notificar.subscribe( e => this.getTable() );
    // ----------------------------------------


    // this.activatedRoute.paramMap.subscribe( params => {
    //   let page: number = +params.get( 'page' );
    //   if ( !page || page == null ) {
    //     page = 0;
    //   }
    //   this.getAllPaged( page );
    // } );
  }

  // 3.- crear los metodos

  // obtiene el listado del backend y lo almacena al contenedor device
  getListDevices() {
    this.deviceService.getListDevice().subscribe(
      lista => this.devices = lista
    );
  }

  getAllPaged( page: number ) {
    this.deviceService.getAllPaged( page ).subscribe( response => {
      this.devices = response.content;
      this.paginador = response;
    } );
  }

  getTable() {
    this.deviceService.getListDevice().subscribe( list => {
      this.dataSource = new MatTableDataSource( list );
      this.dataSource.paginator = this.paginator;
    } );
  }

  delete( device: Device ) {
    Swal.fire( {
      title: 'Borrando...!', text: `Desea Borrar el registro ${ device.nombre }`,
      icon: 'warning',
      showCancelButton: true, cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!', confirmButtonColor: '#3085d6'
    } ).then( result => {
      if ( result.value ) {
        this.deviceService.delete( device.id ).subscribe( response => {
          this.getTable();
          Swal.fire( 'Proceso Completado', `Se ha eliminado el registro ${ device.id }`, 'success' );
        } );
      }
    } );
  }

  applyFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog( entidad: Device ) {
    if ( entidad == null ) {
      this.dialogRef = this.dialog.open( FormdevicesComponent );
    } else {
      this.dialogRef = this.dialog.open( FormdevicesComponent, { data: entidad } );
    }

    this.dialogRef.afterClosed().subscribe( result => {
      console.log( `Dialog result: ${ result }` );
    } );
  }

}
