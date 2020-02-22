import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../services/modelo.service';
import { DeviceService } from '../../services/device.service';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../models/marca';
import { Device } from '../../models/device';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
  selector: 'app-formmodelos',
  templateUrl: './formmodelos.component.html'
} )
export class FormmodelosComponent implements OnInit {

  modelo: Modelo = new Modelo();
  titulo = 'Formulario Modelos';
  errores: string[] = [];
  marcas: Marca[];
  devices: Device[];

  constructor( private modeloService: ModeloService, private deviceService: DeviceService,
               private marcaService: MarcaService,
               private modalService: ModalService,
               public dialogRef: MatDialogRef<FormmodelosComponent>,
               @Inject( MAT_DIALOG_DATA ) public data: Modelo) { }

  ngOnInit() {
    this.deviceService.getListDevice().subscribe( i => this.devices = i );
    this.marcaService.getListMarcas().subscribe( i => this.marcas = i );

    this.getModelo();
  }

  getModelo() {
    if ( this.data ) {
      this.modeloService.findById(this.data.id).subscribe( i => this.modelo = i);
    } else {
      this.modelo = new Modelo();
    }
  }

  create() {
    this.modeloService.create( this.modelo ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit(true);
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: 'Proceso Completado', text: json.msg,
        timer: 4000
      } );
    } );
  }

  update() {
    this.modeloService.update( this.modelo ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit(this.modelo);
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: `Registro Actualizado: ${ json.modelo.nombre }`, text: json.msg,
        timer: 3000
      } );
    } );
  }

  comparar( o1: Device | Marca, o2: Device | Marca ) {
    if ( o1 === undefined && o2 === undefined ) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
