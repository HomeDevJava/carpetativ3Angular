import { Component, OnInit } from '@angular/core';
import { Cedi } from './cedi';
import { CediService } from './cedi.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formcedis',
  templateUrl: './formcedis.component.html'
})
export class FormcedisComponent implements OnInit {
  cedi: Cedi = new Cedi();
  titulo = 'Formulario de Cedis';
  errores: string[];

  constructor(
    private cediService: CediService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCedis();
  }

  createCedis(): void {
    this.cediService.createCedis(this.cedi).subscribe(
      json => {
        this.router.navigate(['/cedis']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Nuevo Registro`,
          text: json.msg,
          showConfirmButton: true,
          timer: 4500
        });
      },
      err => {
        console.error(err.error.errors);
        this.errores = err.error.errors as string[];
      }
    );
  }

  getCedis(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.cediService.getCedis(id).subscribe(c => (this.cedi = c));
      }
    });
  }

  updateCedis(): void {
    this.cediService.updateCedis(this.cedi).subscribe(
      json => {
        this.router.navigate(['/cedis']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Registro Actualizado: ${json.cedi.nombre}`,
          text: json.msg,
          showConfirmButton: true,
          timer: 4500
        });
      },
      err => (this.errores = err.error.errors as string[])
    );
  }
}
