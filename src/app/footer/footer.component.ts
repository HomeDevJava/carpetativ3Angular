import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public autor: any = {nombre: 'Abel Jisashi', apellidos: 'Ramos Nakamura', company: 'GEPP', anio:'2018-2019'};

}
