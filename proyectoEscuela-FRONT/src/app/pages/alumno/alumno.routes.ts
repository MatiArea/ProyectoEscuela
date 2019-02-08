import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';

import { PanelComponent } from './panel/panel.component';
import { AvisosComponent } from './avisos/avisos.component';
import { BoletinComponent } from './boletin/boletin.component';
import { AvisoComponent } from './aviso/aviso.component';
import { MateriasComponent } from './materias/materias.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';


const alumnoRoutes: Routes = [
    { path: 'panel', component: PanelComponent,canActivate:[LoginGuard],
        children: [
            { path: 'notificacion', component: AvisoComponent,canActivate:[LoginGuard]},
            { path: 'notificaciones', component: AvisosComponent,canActivate:[LoginGuard]},
            { path: 'boletin', component: BoletinComponent,canActivate:[LoginGuard]},
            { path: 'materias', component: MateriasComponent,canActivate:[LoginGuard]},
            { path: 'evaluaciones', component: EvaluacionesComponent,canActivate:[LoginGuard]}

        ]   
    }
];


export const ALUMNO_ROUTES = RouterModule.forChild( alumnoRoutes );
