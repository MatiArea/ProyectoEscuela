import { RouterModule, Routes } from '@angular/router';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadomateriasComponent } from './listadomaterias/listadomaterias.component';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { RolAdmin } from 'src/app/guards/RolAdmin.guard';
import { InicioComponent } from 'src/app/shared/inicio/inicio.component';
import { ListadomatevaComponent } from './listadomateva/listadomateva.component';
import { BoletinComponent } from './boletin/boletin.component';
import { MostrarboletinesComponent } from './mostrarboletines/mostrarboletines.component';



const adminRoutes: Routes = [
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard,RolAdmin],
        children: [
            { path: 'inicio', component: InicioComponent,canActivate:[LoginGuard]},
            { path: 'enviaraviso', component: EnviarnotificacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'listadomaterias', component: ListadomateriasComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'crearevaluacion', component: CrearevaluacionComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'materias', component: ListadomatevaComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'cargarboletin', component: BoletinComponent,canActivate:[LoginGuard,RolAdmin]},
            { path: 'boletines', component: MostrarboletinesComponent,canActivate:[LoginGuard,RolAdmin]}



        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );
