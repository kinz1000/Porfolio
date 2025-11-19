import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-boton-cambio',
  imports: [],
  templateUrl: './boton-cambio.component.html',
  styleUrl: './boton-cambio.component.css'
})
export class BotonCambioComponent {
 rutaActual: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = event.urlAfterRedirects;
      }
    });
  }

  cambiarComponente() {
    if (this.rutaActual.includes('personal')) {
      this.router.navigate(['/tecnic']);
    } else if (this.rutaActual.includes('tecnic')) {
      this.router.navigate(['/personal']);
    } else {
      // Si estás en otra ruta, puedes decidir a dónde ir:
      this.router.navigate(['/personal']);
    }
  }

}
