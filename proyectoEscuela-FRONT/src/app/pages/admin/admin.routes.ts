import { RouterModule, Routes } from '@angular/router';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadoaniosComponent } from './listadoanios/listadoanios.component';
import { NotasComponent } from './notas/notas.component';
import { ListadomateriasComponent } from './listadomaterias/listadomaterias.component';


const adminRoutes: Routes = [
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard],
        children: [
            { path: 'altausuario', component: AltausuarioComponent,canActivate:[LoginGuard]},
            { path: 'enviaraviso', component: EnviarnotificacionComponent,canActivate:[LoginGuard]},
            { path: 'listadoanios', component: ListadoaniosComponent,canActivate:[LoginGuard]},
            { path: 'notas', component: NotasComponent,canActivate:[LoginGuard]},
            { path: 'listadomaterias', component: ListadomateriasComponent,canActivate:[LoginGuard]}
        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
