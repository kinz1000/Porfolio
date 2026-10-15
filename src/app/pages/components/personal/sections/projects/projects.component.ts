import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { IdiomaServiceService }
  from '../../../../services/idioma-service.service';


interface Project {

  number: string;

  date: string;

  status?: {
    ES: string;
    EN: string;
  };

  title: {
    ES: string;
    EN: string;
  };

  category: {
    ES: string;
    EN: string;
  };

  description: {
    ES: string;
    EN: string;
  };

  image: string;

  technologies: string[];

  features?: {
    ES: string[];
    EN: string[];
  };

  github?: string;

  available: boolean;
}


@Component({
  selector: 'app-projects',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './projects.component.html',

  styleUrl:
    './projects.component.css'
})
export class ProjectsComponent
  implements OnInit, OnDestroy {


  selectedLang: 'ES' | 'EN' = 'ES';

  private languageSubscription?: Subscription;


  activeIndex = 0;

  expandedProject:
    number | null = null;


  projects: Project[] = [

    {
      number: '01',

      date: '2026',

      status: {
        ES: 'Proyecto personal',
        EN: 'Personal project'
      },

      title: {
        ES: 'Bot Inmobiliario',
        EN: 'Real Estate Bot'
      },

      category: {
        ES: 'Automatización · Backend',
        EN: 'Automation · Backend'
      },

      description: {
        ES:
          'Sistema automatizado que analiza correos de distintos portales inmobiliarios, detecta nuevos anuncios, evita duplicados y envía únicamente las novedades relevantes.',

        EN:
          'Automated system that analyses emails from several real estate portals, detects new listings, prevents duplicates and sends only relevant new properties.'
      },

      image:
        '/inmobiliario.png',

      technologies: [
        'Python',
        'SQLite',
        'SQLAlchemy',
        'Docker',
        'IMAP / SMTP',
        'APScheduler'
      ],

      features: {

        ES: [
          'Extracción automática de anuncios desde correos.',
          'Identificación de portal y anuncio.',
          'Filtrado de particulares y agencias.',
          'Control de duplicados mediante SQLite.',
          'Histórico de anuncios.',
          'Ejecución automatizada mediante APScheduler.',
          'Despliegue con Docker.'
        ],

        EN: [
          'Automatic property extraction from emails.',
          'Portal and listing identification.',
          'Private seller and agency filtering.',
          'Duplicate control using SQLite.',
          'Listing history.',
          'Automated execution with APScheduler.',
          'Docker deployment.'
        ]

      },

      github:
        'https://github.com/kinz1000/buscador-inmobiliario',

      available: true
    },


    {
      number: '02',

      date: '2024',

      status: {
        ES: 'Proyecto personal',
        EN: 'Personal project'
      },

      title: {
        ES: 'Portfolio Informático',
        EN: 'Developer Portfolio'
      },

      category: {
        ES: 'Frontend · Diseño web',
        EN: 'Frontend · Web design'
      },

      description: {
        ES:
          'Portfolio personal desarrollado para presentar mi experiencia, proyectos, tecnologías y evolución como desarrollador mediante una interfaz responsive e interactiva.',

        EN:
          'Personal portfolio created to present my experience, projects, technologies and growth as a developer through a responsive and interactive interface.'
      },

      image:
        '/proyecto.png',

      technologies: [
        'Angular',
        'TypeScript',
        'Bootstrap',
        'HTML',
        'CSS',
        'GSAP'
      ],

      features: {

        ES: [
          'Diseño completamente responsive.',
          'Arquitectura basada en componentes standalone.',
          'Cambio de idioma ES / EN.',
          'Buscador global.',
          'Animaciones e interacciones.',
          'Diseño adaptado a móvil, tablet y escritorio.'
        ],

        EN: [
          'Fully responsive design.',
          'Standalone component architecture.',
          'Spanish / English language switch.',
          'Global search.',
          'Animations and interactions.',
          'Mobile, tablet and desktop layouts.'
        ]

      },

      github:
        'https://github.com/kinz1000/Porfolio',

      available: true
    },


    {
      number: '03',

      date: '2024',

      status: {
        ES: 'Proyecto académico',
        EN: 'Academic project'
      },

      title: {
        ES: 'WorldHelp',
        EN: 'WorldHelp'
      },

      category: {
        ES: 'Aplicación móvil',
        EN: 'Mobile application'
      },

      description: {
        ES:
          'Trabajo de Fin de Grado de Desarrollo de Aplicaciones Multiplataforma orientado a ayudar a personas afectadas por situaciones de emergencia como la DANA.',

        EN:
          'Final Degree Project in Multiplatform Application Development focused on helping people affected by emergency situations such as the DANA.'
      },

      image:
        '/Worldhelp.jpg',

      technologies: [
        'Android',
        'Kotlin',
        'Firebase',
        'Google Maps'
      ],

      features: {

        ES: [
          'Aplicación desarrollada para Android.',
          'Gestión de información mediante Firebase.',
          'Localización y servicios basados en mapas.',
          'Proyecto desarrollado como TFG de DAM.'
        ],

        EN: [
          'Android application.',
          'Firebase data management.',
          'Location and map-based services.',
          'Developed as my DAM final project.'
        ]

      },
  github:
        'https://github.com/kinz1000/WorldAppFrontend',

      
      available: true
    },


    {
      number: '04',

      date: '—',

      status: {
        ES: 'En desarrollo',
        EN: 'In development'
      },

      title: {
        ES: 'Próximamente',
        EN: 'Coming soon'
      },

      category: {
        ES: 'Nuevo proyecto',
        EN: 'New project'
      },

      description: {
        ES:
          'Actualmente trabajando en nuevos proyectos que iré incorporando al portfolio.',

        EN:
          'Currently working on new projects that will be added to the portfolio.'
      },

      image:
        '/prox.jpg',

      technologies: [],

      available: false
    }

  ];


  constructor(
    private languageService:
      IdiomaServiceService
  ) {

    this.selectedLang =
      this.languageService.currentLanguage;

  }


  ngOnInit(): void {

    this.languageSubscription =
      this.languageService.lang$
        .subscribe(lang => {

          this.selectedLang = lang;

        });

  }


  ngOnDestroy(): void {

    this.languageSubscription
      ?.unsubscribe();

  }


  get activeProject(): Project {

    return this.projects[
      this.activeIndex
    ];

  }


  selectProject(
    index: number
  ): void {

    this.activeIndex =
      index;

  }


  toggleDetails(
    index: number
  ): void {

    this.activeIndex =
      index;


    this.expandedProject =
      this.expandedProject === index
        ? null
        : index;

  }

}