import { RouterModule, Routes  } from '@angular/router';
import { UnloginGuard } from './guards/unlogin.guard';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { PruebaComponent } from './shared/prueba/prueba.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[UnloginGuard]},
    { path: 'error', component: ErrorComponent},
    { path: 'prueba', component: PruebaComponent},

    { path: '', component: LoginComponent}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


