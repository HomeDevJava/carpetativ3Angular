import { Routes, RouterModule } from '@angular/router';
import { CedisComponent } from './cedis/cedis.component';
import { FormcedisComponent } from './cedis/formcedis.component';
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
import { EmpleadosComponent } from './empleados/empleados.component';
import { FormempleadosComponent } from './empleados/formempleados.component';


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
  
];

export const RoutesRoutes = RouterModule.forRoot( routes );
