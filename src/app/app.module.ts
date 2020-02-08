import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CedisComponent } from './cedis/cedis.component';
import { CediService } from './cedis/cedi.service';
import { RoutesRoutes } from './routes.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormcedisComponent } from './cedis/formcedis.component';
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './devices/devices.component';
import { FormdevicesComponent } from './devices/formdevices.component';
import { MarcasComponent } from './marcas/marcas.component';
import { FormmarcasComponent } from './marcas/formmarcas.component';
import { PuestosComponent } from './puestos/puestos.component';
import { FormpuestosComponent } from './puestos/formpuestos.component';
import { StatusComponent } from './status/status.component';
import { FormstatusComponent } from './status/formstatus.component';
import { TipoproblemasComponent } from './tipoproblemas/tipoproblemas.component';
import { FormtipoproblemasComponent } from './tipoproblemas/formtipoproblemas.component';
import { TiposiniestrosComponent } from './tiposiniestros/tiposiniestros.component';
import { FormsiniestrosComponent } from './tiposiniestros/formsiniestros.component';
import { ModelosComponent } from './modelos/modelos.component';
import { FormmodelosComponent } from './modelos/formmodelos.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MatTableModule, MatCardModule, MatButtonModule,
         MatMenuModule, MatIconModule, MatPaginatorModule, MatFormFieldModule,
         MatInputModule, MatDialogModule, MatSelectModule, MatSlideToggleModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { FormempleadosComponent } from './empleados/formempleados.component';
import { EquiposComponent } from './equipos/equipos.component';
import { FormequiposComponent } from './equipos/formequipos.component';


@NgModule( {
   declarations: [
      AppComponent, HeaderComponent, FooterComponent, CedisComponent,
      FormcedisComponent, DevicesComponent, FormdevicesComponent,
      MarcasComponent, FormmarcasComponent, PuestosComponent,
      FormpuestosComponent, StatusComponent, FormstatusComponent,
      TipoproblemasComponent, FormtipoproblemasComponent,
      TiposiniestrosComponent,
      FormsiniestrosComponent,
      ModelosComponent,
      FormmodelosComponent,
      PaginatorComponent,
      EmpleadosComponent,
      FormempleadosComponent,
      EquiposComponent,
      FormequiposComponent
   ],
   imports: [
      BrowserModule, HttpClientModule, FormsModule, RoutesRoutes,
      BrowserAnimationsModule, MatTableModule, MatCardModule,
      MatButtonModule, MatButtonModule, MatMenuModule, MatIconModule, MatPaginatorModule,
      MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatSlideToggleModule, MatCheckboxModule, MatRadioModule
   ],
   providers: [ CediService ],
   bootstrap: [
      AppComponent
   ]
   // entryComponents: [FormempleadosComponent]
} )
export class AppModule { }
