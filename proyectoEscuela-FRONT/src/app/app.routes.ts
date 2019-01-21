import { RouterModule, Routes  } from '@angular/router';
import { UnloginGuard } from './guards/unlogin.guard';
import { LoginComponent } from './pages/login/login.component';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[UnloginGuard]},
    { path: '', component: LoginComponent}

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


