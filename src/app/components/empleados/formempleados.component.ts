import { Component, OnInit, Inject } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PuestoService } from '../../services/puesto.service';
import { CediService } from '../../services/cedi.service';
import { Puesto } from '../../models/puesto';
import { Cedi } from '../../models/cedi';
import { EmpleadoService } from '../../services/empleado.service';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-formempleados',
  templateUrl: './formempleados.component.html'
} )
export class FormempleadosComponent implements OnInit {

  empleado: Empleado = new Empleado();
  titulo = 'Formulario Empleado';
  errores: string[] = [];
  puestos: Puesto[];
  cedis: Cedi[];

  constructor(
    private empleadoService: EmpleadoService,
    private puestoService: PuestoService,
    private cediService: CediService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormempleadosComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Empleado
  ) { }

  ngOnInit() {
    this.puestoService.getListPuestos().subscribe( i => this.puestos = i );
    this.cediService.getListCedis().subscribe(i => this.cedis = i);
    this.getEmpleado();
  }

  getEmpleado() {
    if ( this.data ) {
      this.empleadoService.findById( this.data.id ).subscribe( i => this.empleado = i );
    } else {
      this.empleado = new Empleado();
    }
  }

  create() {
    this.empleadoService.create( this.empleado ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( true );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: 'Proceso Completado', text: json.msg,
        timer: 4000
      } );
    }, err => this.errores = err.error.errores );
  }

  update() {
    this.empleadoService.update( this.empleado ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( this.empleado );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: `Registro Actualizado: ${ json.empleado.nombre }`, text: json.msg,
        timer: 3000
      } );
    }, err => this.errores = err.error.errores );
  }

  comparar( o1: Puesto | Cedi, o2: Puesto | Cedi ) {
    if ( o1 === undefined && o2 === undefined ) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
