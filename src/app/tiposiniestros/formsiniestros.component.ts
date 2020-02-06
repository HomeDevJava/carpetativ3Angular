import { Component, OnInit, Inject } from '@angular/core';
import { Siniestro } from './siniestro';
import { SiniestrosService } from './siniestros.service';
import Swal from 'sweetalert2';
import { ModalService } from '../paginator/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-formsiniestros',
  templateUrl: './formsiniestros.component.html'
})
export class FormsiniestrosComponent implements OnInit {
  siniestro: Siniestro;
  titulo = 'Form Tipo de Siniestro';
  errores: string[];

  constructor(
    private siniestrosService: SiniestrosService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormsiniestrosComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Siniestro
  ) {}

  ngOnInit() {
    this.getSiniestro();
  }

  getSiniestro() {
    ( this.data ? this.siniestro = this.data : this.siniestro = new Siniestro() );
  }

  create() {
    this.siniestrosService.create(this.siniestro).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit(this.siniestro);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Nuevo Registro',
          text: json.msg,
          showConfirmButton: true,
          timer: 4500
        });
      },
      err => (this.errores = err.error.errors as string[])
    );
  }
  update() {
    this.siniestrosService.update(this.siniestro).subscribe(json => {
      this.dialogRef.close();
      this.modalService.notificar.emit(this.siniestro);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Registro Actualizado ${json.tiposiniestro.id}`,
        text: json.msg,
        showConfirmButton: true,
        timer: 3000
      });
    },  err => ( this.errores = err.error.errors as string[]));
  }

}
