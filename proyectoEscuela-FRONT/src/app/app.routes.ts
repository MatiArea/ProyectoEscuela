import { RouterModule, Routes  } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AltausuarioComponent } from './components/usuario/altausuario/altausuario.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { EnviarnotificacionComponent } from './components/usuario/enviarnotificacion/enviarnotificacion.component';
import { LoginGuard } from './guards/login.guard';
import { UnloginGuard } from './guards/unlogin.guard';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[UnloginGuard]},
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard],
        children: [
            { path: 'altausuario', component: AltausuarioComponent,canActivate:[LoginGuard]},
            { path: 'enviarnotificacion', component: EnviarnotificacionComponent,canActivate:[LoginGuard]}
        ]
    },
    { path: 'prueba', component: PruebaComponent,},
    { path: '', component: LoginComponent}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


