import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  NavigationEnd,
  Router
} from '@angular/router';

import {
  filter,
  Subscription
} from 'rxjs';

import { IdiomaServiceService }
  from '../../services/idioma-service.service';


@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './navbar.component.html',

  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent
  implements AfterViewInit, OnDestroy {

volverPersonal(): void {
  this.router.navigate(['/personal']);
}
  // =========================================================
  // IDIOMA
  // =========================================================

  selectedLang: 'ES' | 'EN';


  private languageSubscription?: Subscription;

  private routerSubscription?: Subscription;


  // =========================================================
  // BÚSQUEDA
  // =========================================================

  isSearchActive = false;


  @ViewChild('searchContainer')
  searchContainer!: ElementRef<HTMLElement>;


  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;


  @Output()
  searchEvent =
    new EventEmitter<string>();


  @Output()
  navigateResult =
    new EventEmitter<number>();


  @Input()
  currentResultIndex = 0;


  @Input()
  totalResults = 0;


  private globalClickListener?: () => void;


  // =========================================================
  // NAVEGACIÓN
  // =========================================================

  ruta = '';

  activeSection = 'introduccion';


  private observer?: IntersectionObserver;


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private languageService:
      IdiomaServiceService
  ) {

    this.selectedLang =
      this.languageService.currentLanguage;

    this.ruta =
      this.router.url;

  }


  // =========================================================
  // INIT
  // =========================================================

  ngAfterViewInit(): void {

    this.languageSubscription =
      this.languageService.lang$
        .subscribe(lang => {

          this.selectedLang = lang;

        });


    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationEnd
          )
        )
        .subscribe(event => {

          const navigation =
            event as NavigationEnd;

          this.ruta =
            navigation.urlAfterRedirects;


          setTimeout(() => {
            this.initScrollSpy();
          });

        });


    this.globalClickListener =
      this.renderer.listen(
        'document',
        'click',
        (event: Event) => {

          if (
            !this.isSearchActive ||
            !this.searchContainer
          ) {
            return;
          }


          const clickedInside =
            this.searchContainer
              .nativeElement
              .contains(
                event.target as Node
              );


          if (!clickedInside) {
            this.closeSearch();
          }

        }
      );


    setTimeout(() => {
      this.initScrollSpy();
    });

  }


  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {

    this.languageSubscription
      ?.unsubscribe();


    this.routerSubscription
      ?.unsubscribe();


    this.globalClickListener
      ?.();


    this.observer
      ?.disconnect();

  }


  // =========================================================
  // CAMBIO IDIOMA
  // =========================================================

  toggleLang(): void {

    const newLanguage:
      'ES' | 'EN' =
      this.selectedLang === 'ES'
        ? 'EN'
        : 'ES';


    this.languageService
      .setLanguage(
        newLanguage
      );

  }


  // =========================================================
  // FECHA
  // =========================================================

  get fechaAct(): string {

    const fecha =
      '04/12/2025';


    return this.selectedLang === 'ES'
      ? `Actualizado en ${fecha}`
      : `Updated on ${fecha}`;

  }


  // =========================================================
  // RUTAS
  // =========================================================

  get esTecnico(): boolean {

    return this.ruta
      .includes('tecnic');

  }


  get esPersonal(): boolean {

    return this.ruta
      .includes('personal');

  }


  get esTerminos(): boolean {

    return this.ruta
      .includes(
        'TermsandConditions'
      );

  }


  get esPrivacidad(): boolean {

    return this.ruta
      .includes(
        'Privacyandcookis'
      );

  }


  // =========================================================
  // VOLVER
  // =========================================================

  volverInicio(): void {

    this.router.navigate([
      '/tecnic'
    ]);

  }


  // =========================================================
  // BÚSQUEDA
  // =========================================================

  toggleSearch(): void {

    this.isSearchActive =
      !this.isSearchActive;


    if (
      this.isSearchActive
    ) {

      setTimeout(() => {

        this.searchInput
          ?.nativeElement
          .focus();

      });

      return;
    }


    this.clearSearch();

  }


  onInputChange(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    this.searchEvent.emit(
      input.value.trim()
    );

  }


  navigate(
    direction: number
  ): void {

    this.navigateResult.emit(
      direction
    );

  }


  closeSearch(): void {

    this.isSearchActive =
      false;


    this.clearSearch();

  }


  clearSearch(): void {

    if (
      this.searchInput
    ) {

      this.searchInput
        .nativeElement
        .value = '';

    }


    this.searchEvent.emit('');

  }


  // =========================================================
  // SCROLL A SECCIÓN
  // =========================================================
scrollToSection(sectionId: string): void {

  const element =
    document.getElementById(sectionId);

  if (!element) {
    return;
  }


  const navbar =
    document.querySelector(
      '.portfolio-navbar'
    ) as HTMLElement | null;


  const navbarHeight =
    navbar?.offsetHeight ?? 80;


  const elementPosition =
    element.getBoundingClientRect().top +
    window.scrollY;


  let extraOffset = 0;


  /*
   * En habilidades queremos entrar un poco
   * más abajo para mostrar directamente
   * el bloque principal completo.
   */
  if (sectionId === 'habilidades') {
    extraOffset = 115;
  }


  const targetPosition =
    elementPosition -
    navbarHeight +
    extraOffset;


  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });


  this.activeSection =
    sectionId;


  this.closeMobileMenu();

}
  // =========================================================
  // CERRAR MENÚ MÓVIL
  // =========================================================

  private closeMobileMenu(): void {

    const collapse =
      document.getElementById(
        'portfolioNavbar'
      );


    if (
      !collapse ||
      window.innerWidth >= 992
    ) {
      return;
    }


    collapse.classList.remove(
      'show'
    );


    const toggler =
      document.querySelector(
        '.navbar-toggler'
      );


    toggler?.setAttribute(
      'aria-expanded',
      'false'
    );

  }


  // =========================================================
  // SCROLL SPY
  // =========================================================

  private initScrollSpy(): void {

    this.observer
      ?.disconnect();


    const sections =
      document.querySelectorAll<HTMLElement>(
        'main section[id]'
      );


    if (
      sections.length === 0
    ) {
      return;
    }


    this.observer =
      new IntersectionObserver(
        entries => {

          const visibleEntries =
            entries
              .filter(
                entry =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (
            visibleEntries.length === 0
          ) {
            return;
          }


          this.activeSection =
            visibleEntries[0]
              .target
              .id;

        },
        {
          root: null,

          rootMargin:
            '-20% 0px -55% 0px',

          threshold: [
            0,
            0.2,
            0.4,
            0.6
          ]
        }
      );


    sections.forEach(
      section => {

        this.observer
          ?.observe(section);

      }
    );

  }

}