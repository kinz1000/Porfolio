import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import gsap from 'gsap';
import Swiper from 'swiper';
import emailjs from 'emailjs-com';
@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements AfterViewInit{
  //-------------------------------------------------------------bootn cambio----------------------------------------------------------------

  rutaActual: string = '';


cambiarComponente() {
  console.log('--- cambiarComponente invoked ---');
  console.log('Ruta actual:', this.rutaActual);

  if (this.rutaActual.includes('personal')) {
    console.log('Ruta contiene "personal", navegando a /tecnic');
    this.router.navigate(['/tecnic']);
  } else if (this.rutaActual.includes('tecnic')) {
    console.log('Ruta contiene "tecnic", navegando a /personal');
    this.router.navigate(['/personal']);
  } else {
    console.log('Ruta no coincide con personal ni tecnic, navegando a /personal por defecto');
    this.router.navigate(['/personal']);
  }
}
  //-------------------------------------------------------------ANIMACION SCROLL INDICADOR-------------------------------------------------------------


  @ViewChild('introduccionSection') introduccionSection!: ElementRef;






  constructor(private router: Router, private el: ElementRef, private cd: ChangeDetectorRef, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = event.urlAfterRedirects;
      }
    });
  }


  //----------------------------------------------------------------ANIMACION TECLADO -----------------------------------------------------------------

  @Input() texts: string[] = ['Soy David Quintana', 'Encantado de presentar', 'Mi porfolio :) '];
  @Input() period: number = 2000;

  displayText: string = '';
  private loopNum = 0;
  private isDeleting = false;


  private tick() {
    const i = this.loopNum % this.texts.length;
    const fullText = this.texts[i];

    if (this.isDeleting) {
      this.displayText = fullText.substring(0, this.displayText.length - 1);
    } else {
      this.displayText = fullText.substring(0, this.displayText.length + 1);
    }

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.displayText === fullText) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.displayText === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
  //--------------------------------------------------------------ANIMACION CIRCULOS-----------------------------------------------------------------

// ===== SKILLS =====
circleArrayLeft = [
  { name: 'Python', class: 'icon--python' },
  { name: 'Java', class: 'icon--java' },
  { name: 'Kotlin', class: 'icon--kotlin' },
  { name: 'C#', class: 'icon--csharp' },


  { name: 'SQL', class: 'icon--sql' },
  { name: 'TypeScript', class: 'icon--typescript' },
  { name: 'Node.js', class: 'icon--nodejs' },
  { name: 'Angular', class: 'icon--angular' },
  { name: 'jQuery', class: 'icon--jquery' },
  { name: 'Firebase', class: 'icon--firebase' },
  { name: 'PostgreSQL', class: 'icon--postgresql' },
  { name: 'MongoDB', class: 'icon--mongodb' }
];
// html javascript css 
// ===== TOOLS =====
circleArrayRight = [
  { name: 'Git', class: 'icon--git' },
  { name: 'GitHub', class: 'icon--github' },
  { name: 'GitLab', class: 'icon--gitlab' },

  { name: 'Android Studio', class: 'icon--android' },
  { name: 'IntelliJ', class: 'icon--intellij' },
  { name: 'VS Code', class: 'icon--vscode' },
  { name: 'Eclipse', class: 'icon--eclipse' },
  { name: 'Postman', class: 'icon--postman' },


  { name: 'Teams', class: 'icon--teams' }
];
  isAnimatingLeft = false;
  isAnimatingRight = false;

  @ViewChild('containerStackLeft') containerStackLeft!: ElementRef<HTMLUListElement>;
  @ViewChild('containerStackRight') containerStackRight!: ElementRef<HTMLUListElement>;
  @ViewChildren('wrapElLeft') wrapsLeft!: QueryList<ElementRef<HTMLLIElement>>;
  @ViewChildren('wrapElRight') wrapsRight!: QueryList<ElementRef<HTMLLIElement>>;



  initStack(wraps: QueryList<ElementRef<HTMLLIElement>>, radius: number) {
    const n = wraps.length;
    wraps.forEach((wrapRef, i) => {
      const wrap = wrapRef.nativeElement as any;
      const angle = (i / n) * 2 * Math.PI;
      wrap._angle = angle;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
     gsap.set(wrap, { xPercent: -50, yPercent: -50, x, y });
    });
  }

rotateCircles(side: 'left' | 'right') {
    const container = side === 'left' ? this.containerStackLeft.nativeElement : this.containerStackRight.nativeElement;
    const wraps = side === 'left' ? this.wrapsLeft : this.wrapsRight;

    if ((side === 'left' ? this.isAnimatingLeft : this.isAnimatingRight)) return;

    if (side === 'left') this.isAnimatingLeft = true;
    else this.isAnimatingRight = true;

    const rotationStep = 2 * Math.PI / wraps.length; // ✅ dinámico según cantidad de elementos

    wraps.forEach(wrapRef => {
      const wrap = wrapRef.nativeElement as any;
      wrap._angle += rotationStep;
    });

    gsap.to(container, {
      rotation: `+=${(rotationStep * 180) / Math.PI}`,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        const containerRotation = Number(gsap.getProperty(container, 'rotation')) || 0;
        wraps.forEach(wrapRef => {
          const wrap = wrapRef.nativeElement;
          const icon = wrap.querySelector('a')!;
          gsap.set(icon, { rotation: -containerRotation });
        });
      },
      onComplete: () => {
        this.updateScales(side, true);
        if (side === 'left') this.isAnimatingLeft = false;
        else this.isAnimatingRight = false;
      }
    });
}

  updateScales(side: 'left' | 'right', animate = true) {
    const maxScale = 2.2;
    const minScale = 0.8;
    const wraps = side === 'left' ? this.wrapsLeft : this.wrapsRight;

    wraps.forEach(wrapRef => {
      const wrap = wrapRef.nativeElement as any;
      const icon = wrap.querySelector('a')!;
      let angle = wrap._angle % (2 * Math.PI);
      if (angle < 0) angle += 2 * Math.PI;

      let distance = angle;
      if (distance > Math.PI) distance = 2 * Math.PI - distance;

      // Invertimos la escala para la columna izquierda
      if (side === 'right') distance = Math.PI - distance;

      const scale = maxScale - (distance / Math.PI) * (maxScale - minScale);

      if (animate) gsap.to(icon, { scale, duration: 0.8, ease: 'power2.inOut' });
      else gsap.set(icon, { scale });
    });
  }

  //--------------------------------------------------------------proyectos-----------------------------------------------------------------
proyectos = [
  {
    nombre: 'Proyecto A',
    descripcion: 'Descripción general del proyecto A',
    posts: [
      {
        img: '\Worldhelp.jpg',
        date: 'Octubre 2024',
        title: 'WORLDHELP',
      
        text: 'Trabajo Fin de Grado Superior orientado a ayudar a las personas afectadas por la DANA .',
        buttonText: true,
   icons: [
          { img: '/github.png', url: 'https://github.com/tuusuario/worldhelp' },
          { img: 'd.jpg', url: 'https://worldhelp-demo.com' }
        ]
      },
      {
        img: 'aaaa.png',
        date: '',
        title: 'Stack',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
        buttonText: false
      },
      {
        img: 'https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp',
        date: '',
        title: 'Lorem Ipsum Dolor 3',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?',
        buttonText: false
      }
    ]
  },
  {
    nombre: 'Proyecto B',
    descripcion: 'Otro proyecto de ejemplo',
     posts: [
  {
    img: 'logo.jpg',
    date: 'Octubre 2024',
    title: 'Porfolio Informatico',
    text: 'Una muestra de mis capacidades y proyectos en desarrollo web y software.',
        buttonText: false
  },
  {
    img:'p.png',
    date: '',
    title: 'Stack',
    text: 'Los colores del cielo se mezclan con el mar en un espectáculo único.',
        buttonText: false
  },
  {
    img: 'w.png',
    date: '',
    title: 'Codigo Propio',
    text: 'Aunque sea programdor backend he decidido meterme en css apra la realizacion de este proyecto.',
        buttonText: false
  }
]
  }, {
    nombre: 'Proyecto C',
    descripcion: 'Otro proyecto de ejemplo',
     posts: [
  {
    img: 'prox.jpg',
    date: '...',
    title: 'Proximamente...',
    text: 'En construccion.                                         ',
        buttonText: false
  },
  
]
  }
];
  activeImages: string[] = [];
  fadeImages: boolean[] = [];
  currentSlides: number[] = [];

 
  ngOnInit() {
      this.rutaActual = this.router.url; // Obtiene la URL actual
  console.log('Ruta inicial:', this.rutaActual);
       this.tick();
    // Inicializa imágenes y estados antes de render
    this.proyectos.forEach((proyecto, i) => {
      this.activeImages[i] = proyecto.posts[0].img;
      this.fadeImages[i] = false;
      this.currentSlides[i] = 0;
    });
this.contactForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  title: ['', Validators.required],
  message: ['', Validators.required]
});





  this.contactForm.valueChanges.subscribe(() => {
    if (this.contactForm.dirty) {
      this.statusLightClass = 'orange';
    } else {
      this.statusLightClass = '';
    }
  });


  }

  ngAfterViewInit() {
         this.initStack(this.wrapsLeft, 240);
    this.initStack(this.wrapsRight, 240);
    this.updateScales('left', false);
    this.updateScales('right', false);
     this.proyectos.forEach((proyecto, i) => {
  setTimeout(() => {
    const hasMultiplePosts = proyecto.posts.length > 1;

    const swiper = new Swiper(`.blog-slider-${i}`, {
      direction: 'vertical',
      effect: 'fade',
      speed: 300,
      loop: hasMultiplePosts, // ✅ solo activa loop si hay más de un slide
      mousewheel: hasMultiplePosts,
      autoHeight: true,
      pagination: {
        el: `.blog-slider-pagination-${i}`,
        clickable: true,
      },
    });

    swiper.on('slideChangeTransitionStart', () => {
      this.fadeImages[i] = true;
      this.cd.detectChanges();
    });

    swiper.on('slideChangeTransitionEnd', () => {
      const idx = swiper.realIndex;
      this.activeImages[i] = proyecto.posts[idx].img;
      this.currentSlides[i] = idx;
      this.fadeImages[i] = false;
      this.cd.detectChanges();
    });
  }, 0);
});
}
//--------------------------------------------------------------FIN TRAYECTORIA-----------------------------------------------------------------
//
 contactForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
statusLightClass = ''; // clase de la luz


onSubmit() {
  if (this.contactForm.invalid) return;

  // Naranja parpadeante mientras se envía
  this.statusLightClass = 'orange-blink';
  this.errorMessage = '';

  const templateParams = {
    name: this.contactForm.value.name,
    email: this.contactForm.value.email,
    title: this.contactForm.value.title,
    message: this.contactForm.value.message,
    time: new Date().toLocaleString()
  };

  emailjs.send('service_bisnl91', 'template_jr3osdw', templateParams, '2S-UBMR-Cc75s_a3Y')
    .then(() => {
            this.contactForm.reset();
      // Verde estático 3 segundos
    this.statusLightClass = 'green'; 
      setTimeout(() => this.statusLightClass = '', 2000);
      console.log('Mensaje enviado con éxito');

    })
    .catch(() => {
      // Rojo parpadeante 3 segundos
      this.statusLightClass = 'red-blink';
       console.log('error al enviar mensaje');
      setTimeout(() => this.statusLightClass = '', 3000);

      this.errorMessage = 'Ocurrió un error al enviar el mensaje.';
    });
    
}



//---------------------------------------------------------------------------------------------------------------------------------------------
// 🔎 -------------------------------------------- FILTRO DE BÚSQUEDA -------------------------------------------------------------------------

@ViewChildren('sectionElement') sectionElements!: QueryList<ElementRef>;
@ViewChild('mainContent', { static: true }) mainContent!: ElementRef;

highlightedElements: HTMLElement[] = [];
currentResultIndex: number = 0;
totalResults: number = 0;
onSearch(query: string) {
  console.log('Buscando:', query);

  // Limpia los resaltados anteriores
  this.clearHighlights();

  // Reset contador
  this.totalResults = 0;
  this.currentResultIndex = 0;

  if (!query) return;

  const content = this.mainContent.nativeElement as HTMLElement;
  const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');

  // Recorremos nodos de texto
  const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  const nodesToHighlight: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (regex.test(node.textContent || '')) {
      nodesToHighlight.push(node);
    }
  }

  // Sustituimos textos por <mark>
  for (const node of nodesToHighlight) {
    const parent = node.parentNode as HTMLElement;
    const html = (node.textContent || '').replace(regex, `<mark class="highlight">$1</mark>`);
    const temp = document.createElement('span');
    temp.innerHTML = html;
    while (temp.firstChild) parent.insertBefore(temp.firstChild, node);
    parent.removeChild(node);
  }

  // Guardamos todas las coincidencias
  this.highlightedElements = Array.from(content.querySelectorAll('mark.highlight'));

  // Actualizamos contador y nos situamos en la primera
  this.totalResults = this.highlightedElements.length;
  this.currentResultIndex = this.totalResults > 0 ? 1 : 0;

  if (this.totalResults > 0) {
    this.scrollToHighlight(0);
  }
}
private escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
scrollToHighlight(index: number) {
  if (!this.highlightedElements.length) return;

  this.highlightedElements.forEach(el => el.classList.remove('active'));
  const element = this.highlightedElements[index];
  if (element) {
    element.classList.add('active');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    this.currentResultIndex = index + 1;
  }
}
onNavigateResult(direction: number) {
  if (this.totalResults === 0) return;

  // convertimos currentResultIndex (1-based) a índice 0-based
  let idx = this.currentResultIndex > 0 ? this.currentResultIndex - 1 : 0;
  idx = (idx + direction + this.totalResults) % this.totalResults; // circular
  this.scrollToHighlight(idx);
}
clearHighlights() {
  const content = this.mainContent.nativeElement as HTMLElement;
  const marks = content.querySelectorAll('mark.highlight');
  marks.forEach(mark => {
    const parent = mark.parentNode!;
    parent.replaceChild(document.createTextNode(mark.textContent || ''), mark);
    parent.normalize();
  });
  this.highlightedElements = [];
}






}



