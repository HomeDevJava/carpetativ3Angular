import { Component, OnInit, Inject } from '@angular/core';
import { PuestoService } from './puesto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Puesto } from './puesto';
import Swal from 'sweetalert2';
import { ModalService } from '../paginator/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
  selector: 'app-formpuestos',
  templateUrl: './formpuestos.component.html'
} )
export class FormpuestosComponent implements OnInit {
  puesto: Puesto = new Puesto();
  titulo = 'Formulario de Puestos';
  errores: string[];

  constructor(
    private puestoService: PuestoService,
    private router: Router,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormpuestosComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Puesto
  ) { }

  ngOnInit() {
    this.getPuesto();
  }

  getPuesto(): void {
    ( this.data ? this.puesto = this.data : this.puesto = new Puesto() );
  }

  createPuesto(): void {
    this.puestoService.createPuesto( this.puesto ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit( this.puesto );
        Swal.fire( {
          position: 'top-end',
          icon: 'success',
          title: 'Nuevo Registro',
          text: json.msg,
          timer: 3000
        } );
      },
      err => ( this.errores = err.error.errors as string[] )
    );
  }

  updatePuesto(): void {
    this.puestoService.updatePuesto( this.puesto ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit( this.puesto );
        Swal.fire( {
          position: 'top-end',
          icon: 'success',
          title: `Registro Actualizado: ${ json.puesto.nombre }`,
          text: json.msg,
          timer: 3000
        } );
      },
      err => ( this.errores = err.error.errors as string[] )
    );
  }
}
