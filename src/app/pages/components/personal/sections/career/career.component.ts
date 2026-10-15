import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiomaServiceService } from '../../../../services/idioma-service.service';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css'
})
export class CareerComponent implements OnInit {

  selectedLang: 'ES' | 'EN' = 'ES';

  translations = {
    ES: {
      studies: 'Estudios',

      bachillerato: 'Bachillerato en IES La Salle',
      bachilleratoDesc:
        'Finalicé el bachillerato científico-tecnológico en el IES La Salle, donde desarrollé una sólida base en matemáticas, física e informática.',

      gradoSuperior: 'Grado Superior DAM',
      gradoSuperiorDesc:
        'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM), adquiriendo experiencia en Java, SQL, Android y estructuras de datos.',

      cursoPython: 'Curso de Python en IA',
      cursoPythonDesc:
        'Actualmente cursando en Toki School un programa de especialización en Python, IA y automatización con modelos de aprendizaje automático.',
      
      downloadCertificate: 'Descargar Certificado',
      uned: 'Ingeniería en Inteligencia Artificial - UNED',

      unedDesc:
        ' Estudio Ingeniería en Inteligencia Artificial en la UNED para ampliar mi perfil como desarrollador y aplicar IA, lógica y matemáticas al desarrollo de software.',
          
    workExperience: 'Experiencia Laboral',

      alten: 'Alten Spain',
      altenDesc:
        'Realicé 250 horas de prácticas en Alten Spain como desarrollador junior, colaborando en proyectos de software empresarial y automatización de procesos.',

      indra: 'Nuek Mindaist (INDRA)',
      indraDesc:
        'Realizo mi actividad profesional en INDRA como desarrollador Full Stack, participando en un proyecto basado en Spring.',

      monthSept: 'Septiembre',
      monthDec: 'Diciembre',
      present: 'Actualidad'
    },

    EN: {
      studies: 'Education',

      bachillerato: 'High School at IES La Salle',
      bachilleratoDesc:
        'I completed the scientific-technological high school at IES La Salle.',

      gradoSuperior: 'Higher Degree DAM',
      gradoSuperiorDesc:
        'Higher Technician in Multi-Platform Application Development (DAM).',

      cursoPython: 'Python Course in AI',
      cursoPythonDesc:
        'Currently attending a specialization program in Python, AI and automation.',

      downloadCertificate: 'Download Certificate',

      workExperience: 'Work Experience',

      uned: 'UNED - Artificial Intelligence Engineering',

      unedDesc:
        'I am currently studying Artificial Intelligence Engineering at UNED while combining my university studies with my professional career. During this first year, I am strengthening the mathematical and logical foundations required for AI through subjects such as Algebraic Foundations for AI, Discrete Logic and Foundations of Calculus for AI.',

      alten: 'Alten Spain',
      altenDesc:
        'I completed 250 hours of internship at Alten Spain as a junior developer.',

      indra: 'Nuek Mindaist (INDRA)',
      indraDesc:
        'I work professionally at INDRA as a Full Stack Developer.',

      monthSept: 'September',
      monthDec: 'December',
      present: 'Present'
    }
  };

  constructor(
    private languageService: IdiomaServiceService
  ) {}

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.selectedLang = lang;
    });
  }

  getTranslation(
    key: keyof typeof this.translations['ES']
  ): string {
    return this.translations[this.selectedLang][key];
  }
}