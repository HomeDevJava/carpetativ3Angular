import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
   MatTableModule, MatCardModule, MatButtonModule,
   MatMenuModule, MatIconModule, MatPaginatorModule, MatFormFieldModule,
   MatInputModule, MatDialogModule, MatSelectModule, MatSlideToggleModule,
   MatCheckboxModule, MatRadioModule, MatAutocompleteModule, MatDatepickerModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS,
} from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CedisComponent } from './components/cedis/cedis.component';
import { CediService } from './services/cedi.service';
import { RoutesRoutes } from './routes.routing';
import { FormcedisComponent } from './components/cedis/formcedis.component';
import { DevicesComponent } from './components/devices/devices.component';
import { FormdevicesComponent } from './components/devices/formdevices.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { FormmarcasComponent } from './components/marcas/formmarcas.component';
import { PuestosComponent } from './components/puestos/puestos.component';
import { FormpuestosComponent } from './components/puestos/formpuestos.component';
import { StatusComponent } from './components/status/status.component';
import { FormstatusComponent } from './components/status/formstatus.component';
import { TipoproblemasComponent } from './components/tipoproblemas/tipoproblemas.component';
import { FormtipoproblemasComponent } from './components/tipoproblemas/formtipoproblemas.component';
import { TiposiniestrosComponent } from './components/tiposiniestros/tiposiniestros.component';
import { FormsiniestrosComponent } from './components/tiposiniestros/formsiniestros.component';
import { ModelosComponent } from './components/modelos/modelos.component';
import { FormmodelosComponent } from './components/modelos/formmodelos.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FormempleadosComponent } from './components/empleados/formempleados.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { FormequiposComponent } from './components/equipos/formequipos.component';
import { ReparacionesComponent } from './components/reparaciones/reparaciones.component';
import { FormreparacionesComponent } from './components/reparaciones/formreparaciones.component';
import { StatusService } from './services/status.service';


@NgModule( {
   declarations: [
      AppComponent, HeaderComponent, FooterComponent, CedisComponent,
      FormcedisComponent, DevicesComponent, FormdevicesComponent,
      MarcasComponent, FormmarcasComponent, PuestosComponent,
      FormpuestosComponent, StatusComponent, FormstatusComponent,
      TipoproblemasComponent, FormtipoproblemasComponent,
      TiposiniestrosComponent, FormsiniestrosComponent, ModelosComponent,
      FormmodelosComponent, PaginatorComponent, EmpleadosComponent,
      FormempleadosComponent, EquiposComponent, FormequiposComponent,
      ReparacionesComponent, FormreparacionesComponent
   ],
   imports: [
      BrowserModule, HttpClientModule, FormsModule, RoutesRoutes,
      BrowserAnimationsModule, MatTableModule, MatCardModule,
      MatButtonModule, MatMenuModule, MatIconModule, MatPaginatorModule,
      MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule,
      MatSlideToggleModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule,
      MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatMomentDateModule
   ],
   providers: [
      CediService, StatusService,
      { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
      { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
   ],
   bootstrap: [
      AppComponent
   ]
   // entryComponents: [FormempleadosComponent]
} )
export class AppModule { }
