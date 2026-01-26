import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import gsap from 'gsap';
import Swiper from 'swiper';
import emailjs from 'emailjs-com';
import { IdiomaServiceService } from '../../services/idioma-service.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})




export class PersonalComponent implements AfterViewInit{
 //----------------------------------------------------------------cambio de idioma --------------------------------------------------------------------------
private typingTimeout: any; // para guardar el setTimeout

selectedLang!: 'ES' | 'EN';


getTranslation(key: keyof typeof this.translations['ES']): string | string[] {
  const lang = this.selectedLang || 'ES'; // fallback
  return this.translations[lang][key];
}
translations: {
  ES: { 
    typing: string[]; 
    hello: string; 
    jobTitle: string; 
    description: string; 
    moreAbout: string; 
    downloadCV: string;
    studies: string;
    bachillerato: string;
    bachilleratoDesc: string;
    gradoSuperior: string;
    gradoSuperiorDesc: string;
    cursoPython: string;
    cursoPythonDesc: string;
    downloadCertificate: string;
    // Experiencia laboral
    workExperience: string;
    alten: string;
    altenDesc: string;
    indra: string;
    indraDesc: string;
    //meses
     monthSept: string,
    monthDec:  string,
    present: string,
    //stack
    stackDescription:string  ,
    //contaCTAME
  contactMe: string  ,
  contactHeader: string  ,
  contactDescription: string  ,
  phoneNumber: string  ,
  emailAddress: string  ,
  contactFormTitle: string  ,
  labelName: string  ,
  placeholderName: string  ,
  errorNameRequired:string  ,
  labelEmail: string  ,
  placeholderEmail: string  ,
  errorEmailInvalid:string  ,
  labelTitle: string  ,
  placeholderTitle: string  ,
  errorTitleRequired: string  ,
  labelMessage: string  ,
  placeholderMessage: string  ,
  errorMessageRequired: string  ,
  sendButton:string  ,
  signaturePhrase:string  ,

    //proyectos
   projectsTitle: string;      // ✅ aquí
  proyectos: any[];
   
  };
  EN: { 
    typing: string[]; 
    hello: string; 
    jobTitle: string; 
    description: string; 
    moreAbout: string; 
    downloadCV: string;
    studies: string;
    bachillerato: string;
    bachilleratoDesc: string;
    gradoSuperior: string;
    gradoSuperiorDesc: string;
    cursoPython: string;
    cursoPythonDesc: string;
    downloadCertificate: string;
    // Experiencia laboral
    workExperience: string;
    alten: string;
    altenDesc: string;
    indra: string;
    indraDesc: string;
      //meses
     monthSept: string,
    monthDec:  string,
    present: string,
     //stack
    stackDescription:string  ,
        //contaCTAME
  contactMe: string  ,
  contactHeader: string  ,
  contactDescription: string  ,
  phoneNumber: string  ,
  emailAddress: string  ,
  contactFormTitle: string  ,
  labelName: string  ,
  placeholderName: string  ,
  errorNameRequired:string  ,
  labelEmail: string  ,
  placeholderEmail: string  ,
  errorEmailInvalid:string  ,
  labelTitle: string  ,
  placeholderTitle: string  ,
  errorTitleRequired: string  ,
  labelMessage: string  ,
  placeholderMessage: string  ,
  errorMessageRequired: string  ,
  sendButton:string  ,
  signaturePhrase:string  ,

  //pryoectos
     projectsTitle: string;      // ✅ aquí
  proyectos: any[];
  };
} = {
  ES: {
    // Introducción
    hello: 'Hola, buenas 👋',
    jobTitle: 'Programador Backend',
    description: 'Apasionado por transformar ideas en soluciones eficientes y escalables. Me encanta trabajar en proyectos que desafían mis habilidades y contribuyen al crecimiento de la empresa.',
    moreAbout: 'Más sobre mí',
    downloadCV: 'Descargar CV',
    typing: ['Soy David Quintana', 'Encantado de presentar', 'Mi portafolio :) '],
    
    // Trayectoria
    studies: 'Estudios',
    bachillerato: 'Bachillerato en IES La Salle',
    bachilleratoDesc: 'Finalicé el bachillerato científico-tecnológico en el IES La Salle, donde desarrollé una sólida base en matemáticas, física e informática.',
    gradoSuperior: 'Grado Superior DAM',
    gradoSuperiorDesc: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM), adquiriendo experiencia en Java, SQL, Android y estructuras de datos.',
    cursoPython: 'Curso de Python en IA',
    cursoPythonDesc: 'Actualmente cursando en Toki School un programa de especialización en Python, IA y automatización con modelos de aprendizaje automático.',
    downloadCertificate: 'Descargar Certificado',

    // Experiencia laboral
    workExperience: 'Experiencia Laboral',
    alten: 'Alten Spain',
    altenDesc: 'Realicé 250 horas de prácticas en Alten Spain como desarrollador junior, colaborando en proyectos de software empresarial y automatización de procesos. Durante esta experiencia, reforcé mis conocimientos en Java, Spring Boot y SQL, además de adquirir experiencia en trabajo en equipo ágil.',
    indra: 'Nuek Mindaist (INDRA)',
    indraDesc: 'Realizo mi actividad profesional en INDRA como desarrollador Full Stack, participando en un proyecto basado en Spring. Colaboro en el desarrollo y mantenimiento de software empresarial, trabajando tanto en el backend con Java y Spring Boot como en el frontend, además de la integración con bases de datos mediante SQL.',
  
   //meses
    monthSept: 'Septiembre',
    monthDec: 'Diciembre',
    present: 'Actualidad',
   //stack
    stackDescription:'Todas estas habilidades las he adquirido a través de mis estudios en informática y desarrollo de software, la realización de proyectos personales, colaboraciones en equipo y experiencias prácticas en entornos profesionales. Gracias a estas experiencias, he podido dominar tecnologías clave, comprender buenas prácticas de desarrollo backend, trabajar con bases de datos, APIs y arquitecturas escalables, y aplicar soluciones eficientes para problemas reales.'
   //contactame
   , contactMe: 'Contáctame',
  contactHeader: 'Creemos algo histórico <br> - Contáctame',
  contactDescription: 'Rellena el formulario y tu mensaje llegará directamente a mi correo electrónico. También puedes contactarme por teléfono o Gmail si lo prefieres. La luz verde significa que el correo ha sido enviado correctamente, la roja que ha habido un error.',
  phoneNumber: '+34 123 456 789',
  emailAddress: 'miemail@gmail.com',
  contactFormTitle: 'Contacto',
  labelName: 'Nombre',
  placeholderName: 'Tu nombre',
  errorNameRequired: 'El nombre es obligatorio.',
  labelEmail: 'Correo electrónico',
  placeholderEmail: 'tucorreo@gmail.com',
  errorEmailInvalid: 'Introduce un correo válido.',
  labelTitle: 'Título',
  placeholderTitle: 'Asunto del mensaje',
  errorTitleRequired: 'El título es obligatorio.',
  labelMessage: 'Mensaje',
  placeholderMessage: 'Escribe tu mensaje...',
  errorMessageRequired: 'El mensaje no puede estar vacío.',
  sendButton: 'Enviar',
  signaturePhrase: 'Hecho por una mente humana curiosa… con buenos aliados digitales.',
    projectsTitle: 'Proyectos',
    proyectos: [
      {
        nombre: 'Proyecto A',
        descripcion: 'Descripción general del proyecto A',
        posts: [
          {
            date: 'Octubre 2024',
            title: 'WORLDHELP',
            text: 'Trabajo Fin de Grado Superior orientado a ayudar a las personas afectadas por la DANA. Estoy trabajando para subirlo.',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Stack',
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Codigo Propio',
            text: 'El codigo se divide en <span class="azulTs">Frontend</span> y <span class="rojoTs">Backend</span>.',
            buttonText: true,
            icons: [
              { img: 'logoAzul.jpg', url: 'https://github.com/kinz1000/AppWebFrontend' },
              { img: 'logoRojo.png', url: 'https://github.com/kinz1000/AppWebBackend' }
            ]
          }
        ]
      },
      {
        nombre: 'Proyecto B',
        descripcion: 'Otro proyecto de ejemplo',
        posts: [
          {
            date: 'Octubre 2024',
            title: 'Portfolio Informatico',
            text: 'Una muestra de mis capacidades y proyectos en desarrollo web y software.',
            buttonText: true,
            icons: [
              { img: 'codigo.png', url: 'https://github.com/kinz1000/Porfolio' }
            ]
          },
          {
            date: '',
            title: 'Stack',
            text: 'Los colores del cielo se mezclan con el mar en un espectáculo único.',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Codigo Propio',
            text: 'Aunque sea programador backend he decidido meterme en CSS para la realización de este proyecto.',
            buttonText: false,
            icons: []
          }
        ]
      },
      {
        nombre: 'Proyecto C',
        descripcion: 'Otro proyecto de ejemplo',
        posts: [
          {
            date: '...',
            title: 'Proximamente...',
            text: 'En construcción.',
            buttonText: false,
            icons: []
          }
        ]
      }
    ]
  },

  EN: {
    // Introducción
    hello: 'Hi there 👋',
    jobTitle: 'Backend Developer',
    description: 'Passionate about transforming ideas into efficient and scalable solutions. I love working on projects that challenge my skills and contribute to the company’s growth.',
    moreAbout: 'More about me',
    downloadCV: 'Download CV',
    typing: ['I am David Quintana', 'Pleased to introduce', 'My portfolio :) '],
    
    // Trayectoria
    studies: 'Education',
    bachillerato: 'High School at IES La Salle',
    bachilleratoDesc: 'I completed the scientific-technological high school at IES La Salle, where I built a solid foundation in mathematics, physics, and computer science.',
    gradoSuperior: 'Higher Degree DAM',
    gradoSuperiorDesc: 'Higher Technician in Multi-Platform Application Development (DAM), gaining experience in Java, SQL, Android, and data structures.',
    cursoPython: 'Python Course in AI',
    cursoPythonDesc: 'Currently attending a specialization program at Toki School in Python, AI, and automation using machine learning models.',
    downloadCertificate: 'Download Certificate',

    // Experiencia laboral
    workExperience: 'Work Experience',
    alten: 'Alten Spain',
    altenDesc: 'I completed 250 hours of internship at Alten Spain as a junior developer, collaborating on enterprise software and process automation projects. During this experience, I strengthened my knowledge in Java, Spring Boot, and SQL, and gained experience working in agile teams.',
    indra: 'Nuek Mindaist (INDRA)',
    indraDesc: 'I work professionally at INDRA as a Full Stack Developer, participating in a Spring-based project. I collaborate in the development and maintenance of enterprise software, working both on the backend with Java and Spring Boot and on the frontend, including integration with databases using SQL.',
  
    //meses
     monthSept: 'September',
    monthDec: 'December',
    present: 'Knowadays',
   //stack
  stackDescription: 'I have acquired all these skills through my studies in computer science and software development, personal projects, team collaborations, and practical experience in professional environments. Thanks to these experiences, I have mastered key technologies, understood good backend development practices, worked with databases, APIs, and scalable architectures, and applied efficient solutions to real-world problems.'
  //contactame
  , contactMe: 'Contact Me',
  contactHeader: 'Let’s create something historic <br> - Contact Me',
  contactDescription: 'Fill out the form and your message will be sent directly to my email. You can also contact me by phone or Gmail if you prefer. Green light means the email was sent successfully, red means there was an error.',
  phoneNumber: '+34 123 456 789',
  emailAddress: 'myemail@gmail.com',
  contactFormTitle: 'Contact',
  labelName: 'Name',
  placeholderName: 'Your name',
  errorNameRequired: 'Name is required.',
  labelEmail: 'Email',
  placeholderEmail: 'youremail@gmail.com',
  errorEmailInvalid: 'Enter a valid email.',
  labelTitle: 'Title',
  placeholderTitle: 'Message subject',
  errorTitleRequired: 'Title is required.',
  labelMessage: 'Message',
  placeholderMessage: 'Write your message...',
  errorMessageRequired: 'Message cannot be empty.',
  sendButton: 'Send',
  signaturePhrase: 'Made by a curious human mind… with great digital allies.',
  //proyectos
   projectsTitle: 'Projects',
    proyectos: [
      {
        nombre: 'Project A',
        descripcion: 'General description of Project A',
        posts: [
          {
            date: 'October 2024',
            title: 'WORLDHELP',
            text: 'Final degree project focused on helping people affected by the DANA. I am working on uploading it.',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Stack',
            text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Own Code',
            text: 'The code is divided into <span class="azulTs">Frontend</span> and <span class="rojoTs">Backend</span>.',
            buttonText: true,
            icons: [
              { img: 'logoAzul.jpg', url: 'https://github.com/kinz1000/AppWebFrontend' },
              { img: 'logoRojo.png', url: 'https://github.com/kinz1000/AppWebBackend' }
            ]
          }
        ]
      },
      {
        nombre: 'Project B',
        descripcion: 'Another example project',
        posts: [
          {
            date: 'October 2024',
            title: 'IT Portfolio',
            text: 'A sample of my skills and projects in web development and software.',
            buttonText: true,
            icons: [
              { img: 'codigo.png', url: 'https://github.com/kinz1000/Porfolio' }
            ]
          },
          {
            date: '',
            title: 'Stack',
            text: 'The sky colors mix with the sea in a unique spectacle.',
            buttonText: false,
            icons: []
          },
          {
            date: '',
            title: 'Own Code',
            text: 'Even as a backend developer, I decided to use CSS for this project.',
            buttonText: false,
            icons: []
          }
        ]
      },
      {
        nombre: 'Project C',
        descripcion: 'Another example project',
        posts: [
          {
            date: '...',
            title: 'Coming Soon...',
            text: 'Under construction.',
            buttonText: false,
            icons: []
          }
        ]
      }
    ]
  }
};

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


  langSubject: BehaviorSubject<string> = new BehaviorSubject('en');




  constructor(private router: Router, private el: ElementRef, private cd: ChangeDetectorRef, private fb: FormBuilder,private languageService: IdiomaServiceService) {

     const lang = localStorage.getItem('language');
  if (lang === 'ES' || lang === 'EN') this.langSubject.next(lang);
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
@Input() texts: string[] = []; // ⬅ ya no le ponemos valor literal
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

  // ⬇ velocidad base más lenta
  let delta = 100 + Math.random() * 210; // entre 300ms y 500ms por letra

  if (this.isDeleting) delta /= 3;       // borrado un poco más rápido, pero no tan extremo

  if (!this.isDeleting && this.displayText === fullText) {
    delta = this.period; // pausa al final de la palabra
    this.isDeleting = true;
  } else if (this.isDeleting && this.displayText === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500; // pausa al terminar de borrar
  }

  this.typingTimeout = setTimeout(() => this.tick(), delta);
}


private restartTypingAnimation() {
  // ❌ Detenemos cualquier tick anterior
  if (this.typingTimeout) clearTimeout(this.typingTimeout);

  // ❌ Reiniciamos variables
  this.loopNum = 0;
  this.isDeleting = false;
  this.displayText = '';

  // ❌ Arrancamos la animación de nuevo
  this.tick();
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
  { name: 'Outlook', class: 'icon--outlook' },
  { name: 'GitHub', class: 'icon--github' },
  { name: 'FortiClient', class: 'icon--forticlient' },

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
      
        text: 'Trabajo Fin de Grado Superior orientado a ayudar a las personas afectadas por la DANA .  Estoy trabajando para subirlo.',
        buttonText: false,
   icons: [
         
        ]
      },
      {
        img: 'aaaa.png',
        date: '',
        title: 'Stack',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus',
        buttonText: false
      },
      {
        img: 'tip.png',
        date: '',
        title: 'Codigo Propio',
text: 'El codigo se divide en <span class="azulTs">Frontend</span> y <span class="rojoTs">Backend</span>.',
        buttonText: true,
   icons: [
          { img: 'logoAzul.jpg', url: 'https://github.com/kinz1000/AppWebFrontend' },
          { img: 'logoRojo.png', url: 'https://github.com/kinz1000/AppWebBakend' }
        ]
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
       buttonText: true,
   icons: [
          { img: 'codigo.png', url: 'https://github.com/kinz1000/Porfolio' }
         
        ]
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

     this.languageService.lang$.subscribe(lang => {
    this.selectedLang = lang;
    this.texts = [...this.translations[lang].typing];
    this.restartTypingAnimation();
  });
   // Suscripción a cambios de idioma
  // Inicializa textos y animación con idioma actual
  this.texts = [...this.translations[this.selectedLang].typing];
  this.restartTypingAnimation();







      this.rutaActual = this.router.url; // Obtiene la URL actual
  console.log('Ruta inicial:', this.rutaActual);
   
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



