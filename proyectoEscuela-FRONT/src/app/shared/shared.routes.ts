import { RouterModule, Routes  } from '@angular/router';
import { ErrorComponent } from './error/error.component';


const SharedRoutes: Routes = [
    { path: 'error', component: ErrorComponent},

];

export const SHARED_ROUTES = RouterModule.forRoot(SharedRoutes);


