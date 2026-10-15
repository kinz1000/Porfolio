import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { IdiomaServiceService }
  from '../../../../services/idioma-service.service';


@Component({
  selector: 'app-about-tech',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './about-tech.component.html',

  styleUrl:
    './about-tech.component.css'
})
export class AboutTechComponent
  implements OnInit, OnDestroy {


  selectedLang: 'ES' | 'EN' = 'ES';

  private languageSubscription?: Subscription;


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


 getCodeText(): string {

  if (this.selectedLang === 'ES') {
    return `
      La verdadera madurez llega cuando entiendes que no todo se puede
      <span class="green">optimizar</span>;
      hay procesos que deben correr
      <span class="orange">lento</span>
      para tener
      <span class="red">sentido</span>.
    `;
  }

  return `
    True maturity comes when you understand that not everything can be
    <span class="green">optimized</span>;
    some processes need to run
    <span class="orange">slowly</span>
    in order to have
    <span class="red">meaning</span>.
  `;

}

}