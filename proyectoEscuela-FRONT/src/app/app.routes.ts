import { RouterModule, Routes  } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AltausuarioComponent } from './components/usuario/altausuario/altausuario.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'paneladmin', component: PaneladminComponent},
    { path: 'altausuario', component: AltausuarioComponent},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
