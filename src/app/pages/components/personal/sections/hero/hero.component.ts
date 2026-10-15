import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { IdiomaServiceService } from '../../../../services/idioma-service.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {

  selectedLang: 'ES' | 'EN' = 'ES';

  displayText = '';

  private loopNum = 0;
  private isDeleting = false;
  private typingTimeout?: ReturnType<typeof setTimeout>;

  private texts: string[] = [];

  translations = {
    ES: {
      hello: 'Hola, buenas 👋',
      typing: [
        'Soy David Quintana',
        'Encantado de presentar',
        'Mi portafolio :)'
      ],
      jobTitle: 'Programador Backend',
      description:
        'Apasionado por transformar ideas en soluciones eficientes y escalables.',
      moreAbout: 'Más sobre mí',
      downloadCV: 'Descargar CV'
    },

    EN: {
      hello: 'Hi there 👋',
      typing: [
        'I am David Quintana',
        'Pleased to introduce',
        'My portfolio :)'
      ],
      jobTitle: 'Backend Developer',
      description:
        'Passionate about transforming ideas into efficient and scalable solutions.',
      moreAbout: 'More about me',
      downloadCV: 'Download CV'
    }
  };

  constructor(
    private router: Router,
    private languageService: IdiomaServiceService
  ) {}

  ngOnInit(): void {
    this.languageService.lang$.subscribe(lang => {
      this.selectedLang = lang;

      this.texts = [
        ...this.translations[lang].typing
      ];

      this.restartTyping();
    });
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  getTranslation(
    key: keyof typeof this.translations['ES']
  ) {
    return this.translations[this.selectedLang][key];
  }

  cambiarComponente(): void {
    this.router.navigate(['/tecnic']);
  }

  private restartTyping(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.loopNum = 0;
    this.isDeleting = false;
    this.displayText = '';

    this.tick();
  }

  private tick(): void {
    if (!this.texts.length) return;

    const index = this.loopNum % this.texts.length;

    const fullText = this.texts[index];

    if (this.isDeleting) {
      this.displayText = fullText.substring(
        0,
        this.displayText.length - 1
      );
    } else {
      this.displayText = fullText.substring(
        0,
        this.displayText.length + 1
      );
    }

    let delay = 100 + Math.random() * 200;

    if (this.isDeleting) {
      delay /= 3;
    }

    if (
      !this.isDeleting &&
      this.displayText === fullText
    ) {
      delay = 2000;
      this.isDeleting = true;
    } else if (
      this.isDeleting &&
      this.displayText === ''
    ) {
      this.isDeleting = false;
      this.loopNum++;
      delay = 500;
    }

    this.typingTimeout = setTimeout(
      () => this.tick(),
      delay
    );
  }
}