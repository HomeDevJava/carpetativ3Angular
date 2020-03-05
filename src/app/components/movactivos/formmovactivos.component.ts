import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Equipo } from 'src/app/models/equipo';
import { Movactivo } from 'src/app/models/movactivo';
import { Cedi } from '../../models/cedi';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { CediService } from 'src/app/services/cedi.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ModalService } from 'src/app/services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatOptionSelectionChange } from '@angular/material';
import { FormreparacionesComponent } from '../reparaciones/formreparaciones.component';
import { Reparacion } from 'src/app/models/reparacion';
import { MovactivoService } from '../../services/movactivo.service';
import { startWith, map } from 'rxjs/operators';
import { ItemMovactivo } from '../../models/item-movactivo';
import Swal from 'sweetalert2';

@Component( {
  selector: 'app-formmovactivos',
  templateUrl: './formmovactivos.component.html'
} )
export class FormmovactivosComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Equipo[]>;
  movactivo: Movactivo = new Movactivo();
  titulo = 'Formulario de Movimiento de Activos';
  errores: string[];
  cedis: Cedi[];
  empleados: Empleado[];
  equipos: Equipo[] = [];


  constructor(
    private movactivoService: MovactivoService,
    private empleadoService: EmpleadoService,
    private cediService: CediService,
    private equipoService: EquiposService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormreparacionesComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Movactivo,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.equipoService.getAll().subscribe( i => this.equipos = i );
    this.cediService.getListCedis().subscribe( i => this.cedis = i );
    this.empleadoService.getAll().subscribe( i => this.empleados = i );
    this.getMovactivo();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith( '' ),
      map( value => this._filter( value ) )
    );
  }

  private _filter( value: string ): Equipo[] {
    const filterValue = value.trim().toLowerCase();
    const result = this.equipos.filter( d => d.serie.toLowerCase().includes( filterValue ) );
    return result;
  }

  private comparar( o1: Empleado | Cedi, o2: Empleado | Cedi ) {
    if ( o1 === undefined && o2 === undefined ) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  OnChanges( event: MatOptionSelectionChange, e: Equipo ) {
    if ( event.source.selected ) {
      const item = new ItemMovactivo();
      item.equipo = e;
      this.movactivo.items.push( item );
      console.log( this.movactivo.items );
      return true;
    }
    this.myControl.setValue( '' );
  }

  getMovactivo() {
    if ( this.data ) {
      this.movactivo = this.data;
    } else {
      this.movactivo = new Movactivo();
      this.movactivo.items = [];
    }
  }

  create() {
    this.movactivoService.create( this.movactivo ).subscribe( json => {
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
    this.movactivoService.update( this.movactivo ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( true );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: 'Proceso Completado', text: json.msg,
        timer: 3000
      } );
    }, err => this.errores = err.error.errores );
  }

  delete( item: ItemMovactivo, index: number ) {
    if ( item.id === undefined || item.id === null ) {
      this.movactivo.items.splice( index, 1 );
    } else {
      Swal.fire( {
        title: 'Borrando...!',
        text: `Dese borrar el registro ${ item.equipo.serie }`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        confirmButtonColor: '#3085d6'
      } ).then( result => {
        if ( result.value ) {
          this.movactivoService.deleteItem( item.id ).subscribe( response => {
            this.movactivo.items.splice( index, 1 );
            Swal.fire( 'Proceso Completado', `${ response.msg } ${ item.id }`, 'success' );
          } );
        }
      } );
    }
  }

}
