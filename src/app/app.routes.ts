import { Routes } from '@angular/router';
import { PersonalComponent } from './pages/components/personal/personal.component';
import { TecnicComponent } from './pages/components/tecnic/tecnic.component';
import { LoaderComponent } from './pages/components/loader/loader.component';

export const routes: Routes = [



  { path: 'personal', component: PersonalComponent },
  { path: 'tecnic', component: TecnicComponent },
  { path: 'loader', component: LoaderComponent },
  // Ruta por defecto, puedes cambiarla a la que quieras
  { path: '', redirectTo: '/personal', pathMatch: 'full' },

  // Ruta comodín para páginas no encontradas
  { path: '**', redirectTo: '/personal' }

];
