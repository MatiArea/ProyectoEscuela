import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';

import { PanelComponent } from './panel/panel.component';
import { AvisosComponent } from './avisos/avisos.component';
import { MateriasComponent } from './materias/materias.component';


const alumnoRoutes: Routes = [
    { path: 'panel', component: PanelComponent,canActivate:[LoginGuard],
        children: [
            { path: 'avisos', component: AvisosComponent,canActivate:[LoginGuard]},
            { path: 'materias', component: MateriasComponent,canActivate:[LoginGuard]}
        ]   
    }
];


export const ALUMNO_ROUTES = RouterModule.forChild( alumnoRoutes );
