import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IdiomaServiceService } from '../../services/idioma-service.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
volverInicio() {
  this.router.navigate(["/tecnic"]);
}

  // =================== Cambio de idioma ==================
  selectedLang: 'ES' | 'EN';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private languageService: IdiomaServiceService
  ) {
    // Inicializamos idioma desde el servicio
    this.selectedLang = this.languageService.currentLanguage;

    // Actualizamos ruta al navegar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.urlAfterRedirects;
      }
    });
  }

  toggleLang() {
    this.selectedLang = this.selectedLang === 'ES' ? 'EN' : 'ES';
    this.languageService.setLanguage(this.selectedLang);
  }

  // =================== Fecha de actualización traducible ==================
  get fechaAct(): string {
    const fecha = '04/12/2025'; // Aquí puedes poner fecha dinámica si quieres
    return this.selectedLang === 'ES' ? `Actualizado en ${fecha}` : `Updated on ${fecha}`;
  }

  // =================== Búsqueda ==================
  isSearchActive = false;
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  @Output() searchEvent = new EventEmitter<string>();
  @Output() navigateResult = new EventEmitter<number>();
  @Input() currentResultIndex = 0;
  @Input() totalResults = 0;
  private globalClickListener!: () => void;

  // =================== Información general ==================
  ruta: string = '';
  activeSection: string = 'introduccion';

  // =================== Ciclo de vida ==================
ngOnInit() {
  // Suscribirse al idioma del servicio
  this.languageService.lang$.subscribe(lang => {
    this.selectedLang = lang;
  });

  // Listener de rutas y scroll spy
  this.ruta = this.router.url;
  this.globalClickListener = this.renderer.listen('document', 'click', (event: Event) => {
    if (this.isSearchActive && this.searchContainer) {
      const clickedInside = this.searchContainer.nativeElement.contains(event.target);
      if (!clickedInside) this.closeSearch();
    }
  });

  this.initScrollSpy();
}

  ngOnDestroy() {
    if (this.globalClickListener) this.globalClickListener();
  }

  // =================== Búsqueda ==================
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    } else {
      this.clearSearch();
    }
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchEvent.emit(value.trim());
  }

  navigate(direction: number) {
    this.navigateResult.emit(direction);
  }

  closeSearch() {
    this.isSearchActive = false;
    this.clearSearch();
  }

  clearSearch() {
    if (this.searchInput) this.searchInput.nativeElement.value = '';
    this.searchEvent.emit('');
  }

  // =================== Menú y rutas ==================
  get esTecnico(): boolean { return this.ruta.includes('tecnic'); }
  get esPersonal(): boolean { return this.ruta.includes('personal'); }
    get esTerminos(): boolean { return this.ruta.includes('TermsandConditions'); }
      get esPrivacidad(): boolean { return this.ruta.includes('Privacyandcookis'); }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =================== Scroll spy ==================
  initScrollSpy() {
    const sections = document.querySelectorAll<HTMLElement>('section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) this.activeSection = entry.target.id;
      });
    }, { threshold: 0.6 });

    sections.forEach(section => observer.observe(section));
  }
}
