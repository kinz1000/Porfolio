import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaServiceService {

 private langSubject = new BehaviorSubject<'ES' | 'EN'>(this.getInitialLang());
  lang$ = this.langSubject.asObservable();

  private getInitialLang(): 'ES' | 'EN' {
    const saved = localStorage.getItem('language');
    return saved === 'EN' || saved === 'ES' ? saved : 'ES';
  }

  setLanguage(lang: 'ES' | 'EN') {
    localStorage.setItem('language', lang);
    this.langSubject.next(lang);
  }

  get currentLanguage(): 'ES' | 'EN' {
    return this.langSubject.value;
  }
}