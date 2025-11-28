import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotonCambioComponent } from "./pages/shared/boton-cambio/boton-cambio.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./pages/components/loader/loader.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BotonCambioComponent, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showBlackhole = true;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    // Forzar que siempre se vea el loader la primera vez que se abre la app
    localStorage.setItem('blackholeShown', 'false');

    const blackholeSeen = sessionStorage.getItem('blackholeShown') === 'true';
    this.showBlackhole = !blackholeSeen;

    this.cdr.detectChanges();
  }

  onBlackholeFinished(): void {
    this.showBlackhole = false;
    sessionStorage.setItem('blackholeShown', 'true');
 setTimeout(() => {
    this.router.navigate(['/personal'], {
      state: { animate: true }   // ← AQUÍ activamos la animación SOLO al venir desde el loader
    });
  }, 3000);
}
}