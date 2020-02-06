import { Component, OnInit, Inject } from '@angular/core';
import { Tipoproblema } from './tipoproblema';
import { TipoproblemaService } from './tipoproblema.service';
import Swal from 'sweetalert2';
import { ModalService } from '../paginator/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
  selector: 'app-formtipoproblemas',
  templateUrl: './formtipoproblemas.component.html'
} )
export class FormtipoproblemasComponent implements OnInit {

  problema: Tipoproblema = new Tipoproblema();
  titulo = 'Formulario de Tipo de Problemas';
  errores: string[];

  constructor( private tipoproblemaService: TipoproblemaService,
               private modalService: ModalService,
               public dialogRef: MatDialogRef<FormtipoproblemasComponent>,
               @Inject( MAT_DIALOG_DATA) public data: Tipoproblema) { }

  ngOnInit() {
    this.getTipoproblema();
  }

  getTipoproblema() {
    ( this.data ? this.problema = this.data : this.problema = new Tipoproblema() );
  }

  create() {
    this.tipoproblemaService.create( this.problema ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit(this.problema);
      Swal.fire( {
        position: 'center', icon: 'success',
        title: 'Nuevo Registro', text: json.msg,
        showConfirmButton: true, timer: 4500
      } );
    }, err => this.errores = err.error.errors as string[] );
  }

  update() {
    this.tipoproblemaService.update( this.problema ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit(this.problema);
      Swal.fire( {
        position: 'center', icon: 'success',
        title: `Registro Actualizado: ${ json.tipoproblema.id }`, text: json.msg,
        showConfirmButton: true, timer: 3000
      } );
    }, err => ( this.errores = err.error.errors as string[] ) );
  }

}
