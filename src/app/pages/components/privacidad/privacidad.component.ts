import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IdiomaServiceService } from '../../services/idioma-service.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-privacidad',
  imports: [NavbarComponent],
  templateUrl: './privacidad.component.html',
  styleUrl: './privacidad.component.css'
})
export class PrivacidadComponent {




constructor(private idiomaService: IdiomaServiceService) {
  this.idiomaService.lang$.subscribe(lang => {
    this.selectedLang = lang;
  });
}

selectedLang: 'ES' | 'EN' = 'ES';


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
