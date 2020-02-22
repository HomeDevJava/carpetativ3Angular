import { Component, OnInit } from '@angular/core';
import { Cedi } from '../../models/cedi';
import { CediService } from '../../services/cedi.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-cedis',
  templateUrl: './cedis.component.html'
} )
export class CedisComponent implements OnInit {

  cedis: Cedi[];
  paginador: any;


  constructor( private cediService: CediService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get( 'page' );
      if ( !page || page == null ) {
        page = 0;
      }
      this.getAll( page );
    } );
  }

  getListCedis() {
    this.cediService.getListCedis().subscribe(
      lista => this.cedis = lista
    );
  }

  getAll( page: number ) {
    this.cediService.getAll( page ).subscribe( response => {
      this.cedis = response.content;
      console.log( response );
      this.paginador = response;
    } );
  }

  delete( cedi: Cedi ) {
    Swal.fire( {
      title: 'Borrando..!',
      text: `¿Desea continuar con el borrado del registro ${ cedi.nombre }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    } ).then( ( result ) => {
      if ( result.value ) {
        this.cediService.delete( cedi.id ).subscribe( response => {
          // this.cedis = this.cedis.filter(c => c !== cedi );
          this.getListCedis();
          // this.getListCedis();
          Swal.fire(
            'Borrado!',
            `El registro con id ${ cedi.id }, ha sido borrado exitosamente!`,
            'success'
          );
        } );
      }
    } );
  }

}
