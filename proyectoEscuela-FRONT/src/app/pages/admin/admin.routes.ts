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
import { ListadodivComponent } from './listadodiv/listadodiv.component';
import { ListadoalumnosComponent } from './listadoalumnos/listadoalumnos.component';
import { MateriasalumnoComponent } from './materiasalumno/materiasalumno.component';
import { RolAdmin } from 'src/app/guards/RolAdmin.guard';
import { InicioComponent } from 'src/app/shared/inicio/inicio.component';



const adminRoutes: Routes = [
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard,RolAdmin],
        children: [
            { path: 'inicio', component: InicioComponent,canActivate:[LoginGuard]},
            { path: 'altausuario', component: AltausuarioComponent,canActivate:[LoginGuard]},
            { path: 'enviaraviso', component: EnviarnotificacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'listadoanios', component: ListadoaniosComponent,canActivate:[LoginGuard]},
            { path: 'notas', component: NotasComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'listadomaterias', component: ListadomateriasComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'crearevaluacion', component: CrearevaluacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'cargarevaluacion', component: CargarevaluacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'cargadenotas', component: CargadenotasComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'nota', component: NotaComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'divisiones', component: ListadodivComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'listadoalumnos', component: ListadoalumnosComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'materiasalumno', component: MateriasalumnoComponent,canActivate:[LoginGuard,RolAdmin]}

        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
