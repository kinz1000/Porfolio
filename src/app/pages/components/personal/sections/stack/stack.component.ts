import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import gsap from 'gsap';

import { IdiomaServiceService }
  from '../../../../services/idioma-service.service';


@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent
  implements OnInit, AfterViewInit, OnDestroy {


@HostListener('window:resize')
onResize(): void {
  this.initializeResponsiveStack();
}

  selectedLang: 'ES' | 'EN' = 'ES';

  private languageSubscription?: Subscription;


  // =========================================================
  // TRADUCCIONES
  // =========================================================

  translations = {

    ES: {
      stackDescription:
        'Estas son algunas de las tecnologías, herramientas y conocimientos que utilizo y continúo desarrollando mediante mi experiencia profesional, proyectos personales y formación en Ingeniería en Inteligencia Artificial.'
    },

    EN: {
      stackDescription:
        'These are some of the technologies, tools and skills I use and continue developing through my professional experience, personal projects and Artificial Intelligence Engineering studies.'
    }

  };


  // =========================================================
  // SKILLS
  // =========================================================

  circleArrayLeft = [

    // Desarrollo
    {
      name: 'Python',
      class: 'icon--python'
    },

    {
      name: 'Java',
      class: 'icon--java'
    },

    {
      name: 'Kotlin',
      class: 'icon--kotlin'
    },

    {
      name: 'SQL',
      class: 'icon--sql'
    },

    {
      name: 'TypeScript',
      class: 'icon--typescript'
    },

    {
      name: 'Angular',
      class: 'icon--angular'
    },

    {
      name: 'jQuery',
      class: 'icon--jquery'
    },

    {
      name: 'Firebase',
      class: 'icon--firebase'
    },


    // IA / INFORMÁTICA
    {
      name: 'Inteligencia Artificial',
      class: 'icon--ai'
    },

    {
      name: 'Matemáticas para IA',
      class: 'icon--math'
    },

    {
      name: 'Lógica Computacional',
      class: 'icon--logic'
    },

    {
      name: 'Algoritmos',
      class: 'icon--algorithms'
    }

  ];


  // =========================================================
  // TOOLS
  // =========================================================

  circleArrayRight = [

    {
      name: 'GitHub',
      class: 'icon--github'
    },

    {
      name: 'Postman',
      class: 'icon--postman'
    },

    {
      name: 'Android Studio',
      class: 'icon--android'
    },

    {
      name: 'IntelliJ',
      class: 'icon--intellij'
    },

    {
      name: 'VS Code',
      class: 'icon--vscode'
    },

    {
      name: 'Eclipse',
      class: 'icon--eclipse'
    },

    {
      name: 'MobaXterm',
      class: 'icon--mobaxterm'
    },

    {
      name: 'FileZilla',
      class: 'icon--filezilla'
    },

    {
      name: 'FortiClient',
      class: 'icon--forticlient'
    },

    {
      name: 'Teams',
      class: 'icon--teams'
    },

    {
      name: 'Outlook',
      class: 'icon--outlook'
    }

  ];


  // =========================================================
  // ESTADO ANIMACIÓN
  // =========================================================

  isAnimatingLeft = false;
  isAnimatingRight = false;


  // =========================================================
  // REFERENCIAS HTML
  // =========================================================

  @ViewChild('containerStackLeft')
  containerStackLeft!: ElementRef<HTMLUListElement>;


  @ViewChild('containerStackRight')
  containerStackRight!: ElementRef<HTMLUListElement>;


  @ViewChildren('wrapElLeft')
  wrapsLeft!: QueryList<ElementRef<HTMLLIElement>>;


  @ViewChildren('wrapElRight')
  wrapsRight!: QueryList<ElementRef<HTMLLIElement>>;


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private languageService: IdiomaServiceService
  ) {
    this.selectedLang =
      this.languageService.currentLanguage;
  }


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.languageSubscription =
      this.languageService.lang$.subscribe(lang => {

        this.selectedLang = lang;

      });

  }

private initializeResponsiveStack(): void {

  const width = window.innerWidth;

  let radius: number;

  if (width <= 375) {
    radius = 115;
  }
  else if (width <= 575) {
    radius = 135;
  }
  else if (width <= 991) {
    radius = 180;
  }
  else {
    radius = 225;
  }

  this.initStack(
    this.wrapsLeft,
    radius
  );

  this.initStack(
    this.wrapsRight,
    radius
  );

  this.updateScales(
    'left',
    false
  );

  this.updateScales(
    'right',
    false
  );
}
ngAfterViewInit(): void {

  setTimeout(() => {
    this.initializeResponsiveStack();
  });

}


  ngOnDestroy(): void {

    this.languageSubscription?.unsubscribe();

  }


  // =========================================================
  // TRADUCCIONES
  // =========================================================

  getTranslation(
    key: keyof typeof this.translations['ES']
  ): string {

    return this.translations[this.selectedLang][key];

  }


  // =========================================================
  // POSICIONAR ICONOS EN CÍRCULO
  // =========================================================

  initStack(
    wraps: QueryList<ElementRef<HTMLLIElement>>,
    radius: number
  ): void {

    const totalItems = wraps.length;

    if (totalItems === 0) {
      return;
    }


    wraps.forEach((wrapRef, index) => {

      const wrap =
        wrapRef.nativeElement as HTMLLIElement & {
          _angle?: number;
        };


      const angle =
        (index / totalItems)
        * 2
        * Math.PI;


      wrap._angle = angle;


      const x =
        radius * Math.cos(angle);


      const y =
        radius * Math.sin(angle);


      gsap.set(
        wrap,
        {
          xPercent: -50,
          yPercent: -50,
          x,
          y
        }
      );

    });

  }


  // =========================================================
  // ROTAR CÍRCULOS
  // =========================================================

  rotateCircles(
    side: 'left' | 'right'
  ): void {

    const container =
      side === 'left'
        ? this.containerStackLeft.nativeElement
        : this.containerStackRight.nativeElement;


    const wraps =
      side === 'left'
        ? this.wrapsLeft
        : this.wrapsRight;


    const isAnimating =
      side === 'left'
        ? this.isAnimatingLeft
        : this.isAnimatingRight;


    if (isAnimating) {
      return;
    }


    if (side === 'left') {

      this.isAnimatingLeft = true;

    } else {

      this.isAnimatingRight = true;

    }


    const rotationStep =
      (2 * Math.PI)
      / wraps.length;


    wraps.forEach(wrapRef => {

      const wrap =
        wrapRef.nativeElement as HTMLLIElement & {
          _angle?: number;
        };


      wrap._angle =
        (wrap._angle ?? 0)
        + rotationStep;

    });


    gsap.to(
      container,
      {

        rotation:
          `+=${(rotationStep * 180) / Math.PI}`,

        duration: 1,

        ease: 'power2.inOut',


        onUpdate: () => {

          const containerRotation =
            Number(
              gsap.getProperty(
                container,
                'rotation'
              )
            ) || 0;


          wraps.forEach(wrapRef => {

            const wrap =
              wrapRef.nativeElement;


            const icon =
              wrap.querySelector('a');


            if (!icon) {
              return;
            }


            gsap.set(
              icon,
              {
                rotation: -containerRotation
              }
            );

          });

        },


        onComplete: () => {

          this.updateScales(
            side,
            true
          );


          if (side === 'left') {

            this.isAnimatingLeft = false;

          } else {

            this.isAnimatingRight = false;

          }

        }

      }
    );

  }


  // =========================================================
  // ESCALA SEGÚN POSICIÓN
  // =========================================================

  updateScales(
    side: 'left' | 'right',
    animate = true
  ): void {

const maxScale = 1.85;
const minScale = 0.7;


    const wraps =
      side === 'left'
        ? this.wrapsLeft
        : this.wrapsRight;


    wraps.forEach(wrapRef => {

      const wrap =
        wrapRef.nativeElement as HTMLLIElement & {
          _angle?: number;
        };


      const icon =
        wrap.querySelector('a');


      if (!icon) {
        return;
      }


      let angle =
        (wrap._angle ?? 0)
        % (2 * Math.PI);


      if (angle < 0) {

        angle +=
          2 * Math.PI;

      }


      let distance = angle;


      if (distance > Math.PI) {

        distance =
          2 * Math.PI
          - distance;

      }


      if (side === 'right') {

        distance =
          Math.PI
          - distance;

      }


      const scale =
        maxScale
        -
        (
          distance
          / Math.PI
        )
        *
        (
          maxScale
          - minScale
        );


      if (animate) {

        gsap.to(
          icon,
          {
            scale,
            duration: 0.8,
            ease: 'power2.inOut'
          }
        );

      } else {

        gsap.set(
          icon,
          {
            scale
          }
        );

      }

    });

  }

}