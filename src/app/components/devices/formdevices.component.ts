import { Component, OnInit, Inject } from '@angular/core';
import { Device } from '../../models/device';
import { DeviceService } from '../../services/device.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formdevices',
  templateUrl: './formdevices2.component.html'
})
export class FormdevicesComponent implements OnInit {
  // 1.- declarar device, titulo y array errores para captura de errores del BackE
  device: Device;
  titulo = 'Formulario de Dispositivos';
  errores: string[];

  // 2.- inyectar deviceService, router y activateRouter
  constructor( private deviceService: DeviceService,
               private router: Router,
               private activateRoute: ActivatedRoute,
               private modalService: ModalService,
               public dialogRef: MatDialogRef<FormdevicesComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Device) {}

  // 4.- llamar getdevice() para obtener el registro con ngModel
  ngOnInit() {
    this.getdevice();
    if (this.data) { this.device = this.data; } else { this.device = new Device(); }
  }

  // 3.- decalarar metodos que podra usar el formulario
  getdevice(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.deviceService.getDevice(id).subscribe(i => (this.device = i));
      }
    });
  }

  createdevices(): void {
    this.deviceService.createDevice(this.device).subscribe(
      json => {
        // this.router.navigate(['/devices']);
        this.dialogRef.close();
        this.modalService.notificar.emit(this.device);
        Swal.fire({
          position: 'center', icon: 'success',
          title: 'Nuevo Registro', text: json.msg,
          showConfirmButton: true, timer: 4500
        });
      },
      err => {
        console.error(err.error.errors);
        this.errores = err.error.errors as string[];
      }
    );
  }

  updatedevices(): void {
    this.deviceService.updateDevice(this.device).subscribe(json => {
      // this.router.navigate(['/devices']);
      this.dialogRef.close();
      this.modalService.notificar.emit(this.device);
      Swal.fire({
        position: 'top-end', icon: 'success',
        title: `Registro Actualizado: ${json.device.nombre}`, text: json.msg,
        showConfirmButton: true, timer: 4500
      });
    }, err => this.errores = err.error.errors as string[]
    );
  }
}
