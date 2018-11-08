import { RouterModule, Routes  } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AltausuarioComponent } from './components/usuario/altausuario/altausuario.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { EnviarnotificacionComponent } from './components/usuario/enviarnotificacion/enviarnotificacion.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'paneladmin', component: PaneladminComponent,
        children: [
            { path: 'altausuario', component: AltausuarioComponent},
            { path: 'enviarnotificacion', component: EnviarnotificacionComponent}
        ]
    },
    { path: 'prueba', component: PruebaComponent},
    { path: '', component: LoginComponent}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


