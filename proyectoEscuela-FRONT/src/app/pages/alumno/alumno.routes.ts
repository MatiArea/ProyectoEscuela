import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { RolAlumno } from '../../guards/rolalumno.guard';

import { PanelComponent } from './panel/panel.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { BoletinComponent } from './boletin/boletin.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { MateriasComponent } from './materias/materias.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { InicioComponent } from 'src/app/shared/inicio/inicio.component';



const alumnoRoutes: Routes = [
    { path: 'panel', component: PanelComponent,canActivate:[LoginGuard,RolAlumno],
        children: [
            { path: 'inicio', component: InicioComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'notificacion/:id', component: NotificacionComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'notificaciones', component: NotificacionesComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'boletin', component: BoletinComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'materias', component: MateriasComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'evaluaciones', component: EvaluacionesComponent,canActivate:[LoginGuard,RolAlumno]}

        ]   
    }
];


export const ALUMNO_ROUTES = RouterModule.forChild( alumnoRoutes );
