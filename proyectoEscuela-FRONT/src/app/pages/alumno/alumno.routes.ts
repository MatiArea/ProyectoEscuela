import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { RolAlumno } from 'src/app/guards/rolAlumno.guard';

import { PanelComponent } from './panel/panel.component';
import { AvisosComponent } from './avisos/avisos.component';
import { BoletinComponent } from './boletin/boletin.component';
import { AvisoComponent } from './aviso/aviso.component';
import { MateriasComponent } from './materias/materias.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { InicioComponent } from 'src/app/shared/inicio/inicio.component';



const alumnoRoutes: Routes = [
    { path: 'panel', component: PanelComponent,canActivate:[LoginGuard,RolAlumno],
        children: [
            { path: 'inicio', component: InicioComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'notificacion', component: AvisoComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'notificaciones', component: AvisosComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'boletin', component: BoletinComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'materias', component: MateriasComponent,canActivate:[LoginGuard,RolAlumno]},
            { path: 'evaluaciones', component: EvaluacionesComponent,canActivate:[LoginGuard,RolAlumno]}

        ]   
    }
];


export const ALUMNO_ROUTES = RouterModule.forChild( alumnoRoutes );
