import { Component, OnInit, Inject } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Status } from '../../models/status';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component( {
  selector: 'app-formstatus',
  templateUrl: './formstatus.component.html'
} )
export class FormstatusComponent implements OnInit {
  status: Status = new Status();
  titulo = '   Formulario de Status   ';
  errores: string[];

  constructor(
    private statusService: StatusService,
    private router: Router,
    private modalService: ModalService,
    public dialogRef: MatDialogRef<FormstatusComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: Status
  ) { }

  ngOnInit() {
    this.getstatus();
  }

  getstatus(): void {
    ( this.data ? this.status = this.data : this.status = new Status() );
  }

  createStatus(): void {
    this.statusService.createStatus( this.status ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit( this.status );

        Swal.fire( {
          position: 'top-end',
          icon: 'success',
          title: 'Proceso Completado',
          text: json.msg,
          timer: 4000
        } );
      },
      err => ( this.errores = err.error.errors as string[] )
    );
  }

  updateStatus(): void {
    this.statusService.updateStatus( this.status ).subscribe(
      json => {
        this.dialogRef.close();
        this.modalService.notificar.emit( this.status );
        Swal.fire( {
          position: 'top-end',
          icon: 'success',
          title: 'Proceso Completado',
          text: json.msg,
          timer: 4000
        } );
      },
      err => ( this.errores = err.error.errors as string[] )
    );
  }
}
