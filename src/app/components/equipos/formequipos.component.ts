import { Component, OnInit, Inject } from '@angular/core';
import { Equipo } from '../../models/equipo';
import { Modelo } from '../../models/modelo';
import { EquiposService } from '../../services/equipos.service';
import { ModeloService } from '../../services/modelo.service';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-formequipos',
  templateUrl: './formequipos.component.html'
} )
export class FormequiposComponent implements OnInit {

  equipo: Equipo = new Equipo();
  titulo = 'Formulario Equipos';
  errores: string[] = [];
  modelos: Modelo[];

  constructor(
    private equiposService: EquiposService,
    private modeloService: ModeloService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormequiposComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Equipo
  ) { }

  ngOnInit() {
    this.modeloService.getAll().subscribe( i => this.modelos = i );
    this.getEquipo();
  }

  getEquipo() {
    if ( this.data ) {
      this.equiposService.findById( this.data.id ).subscribe( i => this.equipo = i );
    } else { this.equipo = new Equipo(); }
  }

  create() {
    this.equiposService.create( this.equipo ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( true );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: 'Proceso Completado', text: json.msg,
        timer: 3000
      } );
    }, err => this.errores = err.error.errores );
  }

  update() {
    this.equiposService.update( this.equipo ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( true );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: 'Proceso Completado', text: json.msg,
        timer: 3000
      } );
    }, err => this.errores = err.error.errores );
  }

  comparar( o1: Modelo , o2: Modelo ) {
    if ( o1 === undefined && o2 === undefined ) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  // para evaluar el on/off del formulario y pasa el valor booleano a 0 y 1
  onChange(value) {
    if (value.checked === true) {
      this.equipo.enabled = 1;
      console.log(1);
    } else {
      this.equipo.enabled = 0;
      console.log(0);
    }
  }

}
