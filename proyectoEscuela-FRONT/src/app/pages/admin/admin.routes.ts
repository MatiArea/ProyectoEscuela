import { RouterModule, Routes } from '@angular/router';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { LoginGuard } from '../../guards/login.guard';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { RolAdmin } from 'src/app/guards/RolAdmin.guard';
import { InicioComponent } from 'src/app/shared/inicio/inicio.component';
import { CargarEvaluacionComponent } from './cargarevaluacion/cargarevaluacion.component';
import { CargarBoletinComponent } from './cargarboletin/cargarboletin.component';
import { MostrarboletinesComponent } from './mostrarboletines/mostrarboletines.component';
import { ListadoEvaluacionesComponent } from './listadoevaluaciones/listadoevaluaciones.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';



const adminRoutes: Routes = [
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard,RolAdmin],
        children: [
            { path: 'inicio', component: InicioComponent,canActivate:[LoginGuard]},
            { path: 'enviarnotificacion', component: EnviarnotificacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'listadoevaluaciones', component: ListadoEvaluacionesComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'crearevaluacion', component: CrearevaluacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'cargarevaluacion', component: CargarEvaluacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'cargarboletin', component: CargarBoletinComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'boletines', component: MostrarboletinesComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'alumnos', component: AlumnosComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'profesores', component: ProfesoresComponent,canActivate:[LoginGuard,RolAdmin]}



        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
