import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdiomaServiceService {

 private langSubject = new BehaviorSubject<'ES' | 'EN'>('ES');
  lang$ = this.langSubject.asObservable(); // Observable para suscribirse

  setLanguage(lang: 'ES' | 'EN') {
    this.langSubject.next(lang);
  }

  get currentLanguage(): 'ES' | 'EN' {
    return this.langSubject.value;
  }
}