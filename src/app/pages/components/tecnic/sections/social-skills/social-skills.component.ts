import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { IdiomaServiceService }
  from '../../../../services/idioma-service.service';


interface SocialSkill {

  number: string;

  title: {
    ES: string;
    EN: string;
  };

  short: {
    ES: string;
    EN: string;
  };

  description: {
    ES: string;
    EN: string;
  };

  application: {
    ES: string;
    EN: string;
  };

}


@Component({
  selector: 'app-social-skills',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './social-skills.component.html',

  styleUrl:
    './social-skills.component.css'
})
export class SocialSkillsComponent
  implements OnInit, OnDestroy {


  selectedLang: 'ES' | 'EN' = 'ES';

  private languageSubscription?: Subscription;


  activeIndex = 0;


  skills: SocialSkill[] = [

    {
      number: '01',

      title: {
        ES: 'Comunicación asertiva',
        EN: 'Assertive communication'
      },

      short: {
        ES: 'Comunicar con claridad y escuchar antes de responder.',
        EN: 'Communicate clearly and listen before responding.'
      },

      description: {
        ES:
          'Intento expresar ideas, dudas y propuestas de forma clara y directa, adaptando el mensaje a la persona y al contexto.',

        EN:
          'I try to express ideas, questions and proposals clearly and directly, adapting the message to the person and context.'
      },

      application: {
        ES:
          'Especialmente útil al trabajar en equipo, explicar problemas técnicos, solicitar ayuda o defender una propuesta.',

        EN:
          'Especially useful when working in teams, explaining technical issues, asking for help or defending a proposal.'
      }
    },


    {
      number: '02',

      title: {
        ES: 'Pensamiento crítico',
        EN: 'Critical thinking'
      },

      short: {
        ES: 'Entender el problema antes de elegir una solución.',
        EN: 'Understand the problem before choosing a solution.'
      },

      description: {
        ES:
          'Me gusta analizar el porqué de los problemas y cuestionar las primeras soluciones cuando existen alternativas mejores.',

        EN:
          'I like analysing why problems happen and questioning initial solutions when better alternatives may exist.'
      },

      application: {
        ES:
          'Lo aplico al depurar código, revisar requisitos, comparar soluciones y tomar decisiones técnicas.',

        EN:
          'I apply it when debugging code, reviewing requirements, comparing solutions and making technical decisions.'
      }
    },


    {
      number: '03',

      title: {
        ES: 'Adaptabilidad',
        EN: 'Adaptability'
      },

      short: {
        ES: 'Aprender rápido cuando cambian herramientas o prioridades.',
        EN: 'Learn quickly when tools or priorities change.'
      },

      description: {
        ES:
          'Me adapto bien a tecnologías, proyectos y formas de trabajo nuevas cuando la situación lo requiere.',

        EN:
          'I adapt well to new technologies, projects and ways of working when the situation requires it.'
      },

      application: {
        ES:
          'Me permite cambiar entre backend, frontend, bases de datos o herramientas nuevas sin bloquear el progreso.',

        EN:
          'It allows me to move between backend, frontend, databases or new tools without blocking progress.'
      }
    },


    {
      number: '04',

      title: {
        ES: 'Gestión del tiempo',
        EN: 'Time management'
      },

      short: {
        ES: 'Priorizar lo importante y dividir problemas grandes.',
        EN: 'Prioritise what matters and break down large problems.'
      },

      description: {
        ES:
          'Intento organizar las tareas según prioridad, dificultad y dependencia para avanzar de forma constante.',

        EN:
          'I organise tasks according to priority, difficulty and dependencies in order to make consistent progress.'
      },

      application: {
        ES:
          'Es especialmente importante al compatibilizar trabajo, formación y proyectos personales.',

        EN:
          'It is particularly important when balancing work, education and personal projects.'
      }
    },


    {
      number: '05',

      title: {
        ES: 'Resolución de problemas',
        EN: 'Problem solving'
      },

      short: {
        ES: 'Separar el problema, investigar y comprobar hipótesis.',
        EN: 'Break down the problem, investigate and test hypotheses.'
      },

      description: {
        ES:
          'Cuando algo falla prefiero aislar el problema, entender qué está ocurriendo y probar soluciones de forma controlada.',

        EN:
          'When something fails, I prefer to isolate the problem, understand what is happening and test solutions in a controlled way.'
      },

      application: {
        ES:
          'Es una habilidad que utilizo continuamente en programación, integración de sistemas y resolución de incidencias.',

        EN:
          'It is a skill I continuously use in programming, system integration and troubleshooting.'
      }
    },


    {
      number: '06',

      title: {
        ES: 'Compromiso',
        EN: 'Commitment'
      },

      short: {
        ES: 'Ser constante incluso cuando el progreso es lento.',
        EN: 'Stay consistent even when progress is slow.'
      },

      description: {
        ES:
          'Valoro la constancia y terminar correctamente aquello en lo que me involucro, incluso cuando requiere aprender algo nuevo.',

        EN:
          'I value consistency and properly finishing what I commit to, even when it requires learning something new.'
      },

      application: {
        ES:
          'Lo aplico tanto en el trabajo como en mi formación y en los proyectos personales que desarrollo fuera de él.',

        EN:
          'I apply it at work, in my studies and in the personal projects I develop outside of work.'
      }
    },


    {
      number: '07',

      title: {
        ES: 'Escucha activa',
        EN: 'Active listening'
      },

      short: {
        ES: 'Comprender antes de asumir lo que necesita otra persona.',
        EN: 'Understand before assuming what another person needs.'
      },

      description: {
        ES:
          'Procuro entender completamente una petición o problema antes de responder o empezar a implementar una solución.',

        EN:
          'I try to fully understand a request or problem before responding or starting to implement a solution.'
      },

      application: {
        ES:
          'Ayuda a evitar malentendidos en requisitos, revisiones de código y comunicación con compañeros.',

        EN:
          'It helps prevent misunderstandings in requirements, code reviews and communication with colleagues.'
      }
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


  get activeSkill(): SocialSkill {

    return this.skills[
      this.activeIndex
    ];

  }


  selectSkill(
    index: number
  ): void {

    this.activeIndex =
      index;

  }

}