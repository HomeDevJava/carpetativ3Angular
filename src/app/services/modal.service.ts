import { Injectable, EventEmitter } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {

  modal = false;

  private _notificar = new EventEmitter<any>();

  constructor() { }

  get notificar(): EventEmitter<any> {
    return this._notificar;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModdal() {
    this.modal = false;
  }
}
