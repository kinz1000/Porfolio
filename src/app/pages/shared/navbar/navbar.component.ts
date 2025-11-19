import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // =================== BÚSQUEDA =====================
  isSearchActive = false;
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

@Output() searchEvent = new EventEmitter<string>();
  @Output() navigateResult = new EventEmitter<number>(); // 🔹 Emite dirección (±1)

  @Input() currentResultIndex = 0; // 🔹 Recibe índice actual del padre
  @Input() totalResults = 0; // 🔹 Recibe total de resultados

  private globalClickListener!: () => void;

  // =================== INFO GENERAL =====================
  fechaAct: string = 'Actualizado en 22/06/2024';
  ruta: string = '';
  selectedLang: 'ES' | 'EN' = 'ES';
  activeSection: string = 'introduccion';
  searchChanged: any;

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.urlAfterRedirects;
      }
    });
  }

  // =================== CICLO DE VIDA =====================
  ngOnInit() {
    this.ruta = this.router.url;

    // 🔹 Cerrar búsqueda al hacer click fuera
    this.globalClickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        if (this.isSearchActive && this.searchContainer) {
          const clickedInside = this.searchContainer.nativeElement.contains(
            event.target
          );
          if (!clickedInside) {
            this.closeSearch();
          }
        }
      }
    );

    // 🔹 Activar scroll spy
    this.initScrollSpy();
  }

  ngOnDestroy() {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  // =================== LÓGICA DE BÚSQUEDA =====================
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;

    if (this.isSearchActive) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    } else {
      this.clearSearch();
    }
  }



onInputChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchEvent.emit(value.trim());
}


  navigate(direction: number) {
    this.navigateResult.emit(direction); // 🔹 Mover entre resultados
  }

  closeSearch() {
    this.isSearchActive = false;
    this.clearSearch();
  }

clearSearch() {
  if (this.searchInput) {
    this.searchInput.nativeElement.value = '';
  }
  // emitimos cadena vacía para que el padre limpie highlights
  this.searchEvent.emit('');
}

  // =================== MENÚ Y RUTAS =====================
  get esTecnico(): boolean {
    return this.ruta.includes('tecnic');
  }

  get esPersonal(): boolean {
    return this.ruta.includes('personal');
  }

  toggleLang() {
    this.selectedLang = this.selectedLang === 'ES' ? 'EN' : 'ES';
    console.log('Idioma seleccionado:', this.selectedLang);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // =================== MARCAR SECCIÓN ACTIVA =====================
  initScrollSpy() {
    const sections = document.querySelectorAll<HTMLElement>('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.6 } // 🔹 60% visible para activarse
    );

    sections.forEach((section) => observer.observe(section));
  }
}