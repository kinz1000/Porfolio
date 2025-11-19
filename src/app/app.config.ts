import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)]
};
/*
Para generar un componente dentro de la carpeta 'pages' usando la CLI de Angular, ejecuta el siguiente comando en la terminal:

ng generate component pages/nombre-del-componente

Por ejemplo:
ng generate component pages/ejemplo

Esto creará una carpeta 'ejemplo' dentro de 'pages' con los archivos necesarios para el componente.
*/