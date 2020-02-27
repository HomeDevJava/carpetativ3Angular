import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
  MatDialogRef, MAT_DIALOG_DATA,
  MatTableDataSource, MatAutocompleteSelectedEvent, MatOptionSelectionChange
} from '@angular/material';
import Swal from 'sweetalert2';
import { Equipo } from '../../models/equipo';
import { EquiposService } from '../../services/equipos.service';
import { Reparacion } from '../../models/reparacion';
import { Empleado } from '../../models/empleado';
import { Cedi } from '../../models/cedi';
import { ReparacionService } from '../../services/reparacion.service';
import { EmpleadoService } from '../../services/empleado.service';
import { CediService } from '../../services/cedi.service';
import { ModalService } from '../../services/modal.service';
import { startWith, map } from 'rxjs/operators';
import { Itemreparacion } from '../../models/itemreparacion';
import { StatusService } from '../../services/status.service';
import { Status } from '../../models/status';
import { Tipoproblema } from '../../models/tipoproblema';
import { TipoproblemaService } from '../../services/tipoproblema.service';

@Component( {
  selector: 'app-formreparaciones',
  templateUrl: './formreparaciones.component.html'
} )
export class FormreparacionesComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<Equipo[]>;

  reparacion: Reparacion = new Reparacion();
  titulo = 'Formulario reparaciones';
  errores: string[] = [];
  cedis: Cedi[];
  empleados: Empleado[];
  equipos: Equipo[] = [];
  status: Status[] = [];
  tiposproblemas: Tipoproblema[] = [];
  // lista: Itemreparacion[] = [];


  displayedColumns: string[] = [ 'id', 'reparacion', 'equipo', 'tipoproblema', 'fecenvio', 'fecretorno', 'falla' ];


  constructor(
    private reparacionService: ReparacionService,
    private empleadoService: EmpleadoService,
    private cediService: CediService,
    private equipoService: EquiposService,
    private statusService: StatusService,
    private tipoproblemaService: TipoproblemaService,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormreparacionesComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Reparacion,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.equipoService.getAll().subscribe( i => this.equipos = i );
    this.cediService.getListCedis().subscribe( i => this.cedis = i );
    this.empleadoService.getAll().subscribe( i => this.empleados = i );
    this.statusService.getListStatus().subscribe( i => this.status = i );
    this.tipoproblemaService.getListAll().subscribe( i => this.tiposproblemas = i );
    this.getReparacion();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith( '' ),
        map( value => this._filter( value ) )
      );
  }


  getReparacion() {
    if ( this.data ) {
      this.reparacion = this.data;
      // this.reparacion.items.forEach( d => this.lista.push( d ) );
      // this.lista = this.reparacion.items;
    } else {
      this.reparacion = new Reparacion();
      this.reparacion.items = [];
    }
  }

  create() {
    this.reparacionService.create( this.reparacion ).subscribe( json => {
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
    this.reparacionService.update( this.reparacion ).subscribe( json => {
      this.dialogRef.close();
      this.modalService.notificar.emit( true );
      Swal.fire( {
        position: 'top-end', icon: 'success',
        title: `Registro Actualizado: ${ json.reparacion.id }`, text: json.msg,
        timer: 3000
      } );
    }, err => this.errores = err.error.errores );
  }

  comparar( o1: Empleado | Cedi, o2: Empleado | Cedi ) {
    if ( o1 === undefined && o2 === undefined ) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  private _filter( value: string ): Equipo[] {
    const filterValue = value.trim().toLowerCase();
    const result = this.equipos.filter( d => d.serie.toLowerCase().includes( filterValue ) );
    return result;
  }

  private _normalizeValue( value: string ): Equipo {
    const eq: Equipo = new Equipo();
    eq.serie = value;
    return eq;
  }

  OnChanges( event: MatOptionSelectionChange, e: Equipo ) {

    if ( event.source.selected ) {
      const item = new Itemreparacion();
      item.equipo = e;
      this.reparacion.items.push( item );
      console.log( this.reparacion.items );
      return true;
    }

    this.myControl.setValue( '' );
    // this.items._updateChangeSubscription();
  }

  delete( item: Itemreparacion, index: number ) {

    if ( item.id === undefined || item.id === null ) {
      console.log( 'este registro es de nueva creacion' );
      this.reparacion.items.splice( index, 1 );
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
          this.reparacionService.deleteItem( item.id ).subscribe( response => {
            // this.getTable();
            this.reparacion.items.splice( index, 1 );
            Swal.fire(
              'Proceso Completado',
              `${ response.msg } ${ item.id }`,
              'success'
            );
          } );
        }
      } );
    }
  }

}
