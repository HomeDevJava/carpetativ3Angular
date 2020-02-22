import { Routes, RouterModule } from '@angular/router';
import { CedisComponent } from './components/cedis/cedis.component';
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
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FormempleadosComponent } from './components/empleados/formempleados.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { FormequiposComponent } from './components/equipos/formequipos.component';
import { ReparacionesComponent } from './components/reparaciones/reparaciones.component';
import { FormreparacionesComponent } from './components/reparaciones/formreparaciones.component';


const routes: Routes = [
  { path: '', redirectTo: '/cedis', pathMatch: 'full' }, { path: 'cedis', component: CedisComponent },
  { path: 'cedis/page/:page', component: CedisComponent },
  { path: 'cedis/form', component: FormcedisComponent },
  { path: 'cedis/form/:id', component: FormcedisComponent },
  { path: 'devices', component: DevicesComponent }, { path: 'devices/page/:page', component: DevicesComponent },
  { path: 'devices/form', component: FormdevicesComponent },
  { path: 'devices/form/:id', component: FormdevicesComponent },
  { path: 'marcas', component: MarcasComponent }, { path: 'marcas/page/:page', component: MarcasComponent },
  { path: 'marcas/form', component: FormmarcasComponent },
  { path: 'marcas/form/:id', component: FormmarcasComponent },
  { path: 'puestos', component: PuestosComponent }, { path: 'puestos/page/:page', component: PuestosComponent },
  { path: 'puestos/form', component: FormpuestosComponent },
  { path: 'puestos/form/:id', component: FormpuestosComponent },
  { path: 'status', component: StatusComponent }, { path: 'status/page/:page', component: StatusComponent },
  { path: 'status/form', component: FormstatusComponent },
  { path: 'status/form/:id', component: FormstatusComponent },
  { path: 'problemas', component: TipoproblemasComponent }, { path: 'problemas/page/:page', component: TipoproblemasComponent },
  { path: 'problemas/form', component: FormtipoproblemasComponent },
  { path: 'problemas/form/:id', component: FormtipoproblemasComponent },
  { path: 'tiposiniestros', component: TiposiniestrosComponent }, { path: 'tiposiniestros/page/:page', component: TiposiniestrosComponent },
  { path: 'tiposiniestros/form', component: FormsiniestrosComponent },
  { path: 'tiposiniestros/form/:id', component: FormsiniestrosComponent },
  { path: 'modelos', component: ModelosComponent }, { path: 'modelos/page/:page', component: ModelosComponent },
  { path: 'modelos/form', component: FormmodelosComponent },
  { path: 'modelos/form/:id', component: FormmodelosComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'empleados/form', component: FormempleadosComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'equipos/form', component: FormequiposComponent },
  {path: 'reparaciones', component: ReparacionesComponent},
  {path: 'reparaciones/form', component: FormreparacionesComponent}


];

export const RoutesRoutes = RouterModule.forRoot( routes );
