import { Component, OnInit, Inject } from '@angular/core';
import { Marca } from './marca';
import { MarcaService } from './marca.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from '../paginator/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
  selector: 'app-formmarcas',
  templateUrl: './formmarcas.component.html'
} )
export class FormmarcasComponent implements OnInit {
  marca: Marca = new Marca();
  titulo = 'Formulario de Marcas';
  errores: string[];

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormmarcasComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Marca
  ) { }

  ngOnInit() {
    this.getMarca();
  }

  getMarca(): void {
    ( this.data ? this.marca = this.data : this.marca = new Marca() );
  }

  createMarca(): void {
    this.marcaService.createMarcas( this.marca ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit(this.marca);
        Swal.fire( {
          position: 'top-end', icon: 'success',
          title: 'Proceso Completado', text: json.msg,
          timer: 4000
        } );
      },
      err => this.errores = err.error.errors as string[]
    );
  }

  updateMarca(): void {
    this.marcaService.updateMarcas( this.marca ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit(this.marca);
        Swal.fire( {
          position: 'top-end', icon: 'success',
          title: `Registro Actualizado: ${ json.marca.nombre }`, text: json.msg,
          timer: 3000
        } );
      },
      err => ( this.errores = err.error.errors as string[] )
    );
  }
}
