import { RouterModule, Routes } from '@angular/router';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadoaniosComponent } from './listadoanios/listadoanios.component';
import { NotasComponent } from './notas/notas.component';
import { ListadomateriasComponent } from './listadomaterias/listadomaterias.component';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { NotaComponent } from './nota/nota.component';
import { CargarevaluacionComponent } from './cargarevaluacion/cargarevaluacion.component';
import { CargadenotasComponent } from './cargadenotas/cargadenotas.component';


const adminRoutes: Routes = [
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard],
        children: [
            { path: 'altausuario', component: AltausuarioComponent,canActivate:[LoginGuard]},
            { path: 'enviaraviso', component: EnviarnotificacionComponent,canActivate:[LoginGuard]},
            { path: 'listadoanios', component: ListadoaniosComponent,canActivate:[LoginGuard]},
            { path: 'notas', component: NotasComponent,canActivate:[LoginGuard]},
            { path: 'listadomaterias', component: ListadomateriasComponent,canActivate:[LoginGuard]},
            { path: 'crearevaluacion', component: CrearevaluacionComponent,canActivate:[LoginGuard]},
            { path: 'cargarevaluacion', component: CargarevaluacionComponent,canActivate:[LoginGuard]},
            { path: 'cargadenotas', component: CargadenotasComponent,canActivate:[LoginGuard]},
            { path: 'nota', component: NotaComponent,canActivate:[LoginGuard]}

        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
