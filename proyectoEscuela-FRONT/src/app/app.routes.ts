import { RouterModule, Routes  } from '@angular/router';
import { UnloginGuard } from './guards/unlogin.guard';
<<<<<<< HEAD
import { LoginComponent } from './pages/login/login.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[UnloginGuard]},
=======
import { NotasComponent } from './components/usuario/notas/notas.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[UnloginGuard]},
    { path: 'paneladmin', component: PaneladminComponent,canActivate:[LoginGuard],
        children: [
            { path: 'altausuario', component: AltausuarioComponent,canActivate:[LoginGuard]},
            { path: 'enviaraviso', component: EnviarnotificacionComponent,canActivate:[LoginGuard]},
            { path: 'notas', component: NotasComponent,canActivate:[LoginGuard]}
        ]
    },
    { path: 'prueba', component: PruebaComponent,},
>>>>>>> a2dd117d2b088ae8b16e016e23a3c73b3872ec2c
    { path: '', component: LoginComponent}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


