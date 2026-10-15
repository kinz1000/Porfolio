import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { NavbarComponent }
  from '../../shared/navbar/navbar.component';

import { HeroComponent }
  from './sections/hero/hero.component';

import { CareerComponent }
  from './sections/career/career.component';

import { StackComponent }
  from './sections/stack/stack.component';

import { ProjectsComponent }
  from './sections/projects/projects.component';

import { ContactComponent }
  from './sections/contact/contact.component';


@Component({
  selector: 'app-personal',
  standalone: true,

  imports: [
    NavbarComponent,
    HeroComponent,
    CareerComponent,
    StackComponent,
    ProjectsComponent,
    ContactComponent
  ],

  templateUrl:
    './personal.component.html',

  styleUrls: [
    './personal.component.css'
  ]
})
export class PersonalComponent {

  @ViewChild(
    'mainContent',
    { static: true }
  )
  mainContent!: ElementRef<HTMLElement>;


  highlightedElements: HTMLElement[] = [];

  currentResultIndex = 0;

  totalResults = 0;


  // =========================================================
  // BUSCAR
  // =========================================================

  onSearch(query: string): void {

    this.clearHighlights();

    this.totalResults = 0;
    this.currentResultIndex = 0;

    const normalizedQuery =
      query.trim();

    if (!normalizedQuery) {
      return;
    }

    const content =
      this.mainContent.nativeElement;

    const escapedQuery =
      this.escapeRegExp(
        normalizedQuery
      );

    const regex =
      new RegExp(
        `(${escapedQuery})`,
        'gi'
      );

    const walker =
      document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT
      );

    const nodesToHighlight:
      Text[] = [];


    while (
      walker.nextNode()
    ) {

      const node =
        walker.currentNode as Text;

      const text =
        node.textContent || '';

      const testRegex =
        new RegExp(
          escapedQuery,
          'i'
        );

      if (
        testRegex.test(text)
      ) {

        nodesToHighlight.push(
          node
        );

      }

    }


    nodesToHighlight.forEach(
      node => {

        const parent =
          node.parentNode;

        if (!parent) {
          return;
        }

        const fragment =
          document.createDocumentFragment();

        const text =
          node.textContent || '';

        let lastIndex = 0;


        text.replace(
          regex,
          (
            match: string,
            _group: string,
            offset: number
          ) => {

            if (
              offset > lastIndex
            ) {

              fragment.appendChild(
                document.createTextNode(
                  text.slice(
                    lastIndex,
                    offset
                  )
                )
              );

            }


            const mark =
              document.createElement(
                'mark'
              );

            mark.className =
              'highlight';

            mark.textContent =
              match;

            fragment.appendChild(
              mark
            );

            lastIndex =
              offset +
              match.length;

            return match;

          }
        );


        if (
          lastIndex <
          text.length
        ) {

          fragment.appendChild(
            document.createTextNode(
              text.slice(
                lastIndex
              )
            )
          );

        }


        parent.replaceChild(
          fragment,
          node
        );

      }
    );


    this.highlightedElements =
      Array.from(
        content.querySelectorAll(
          'mark.highlight'
        )
      );


    this.totalResults =
      this.highlightedElements.length;


    this.currentResultIndex =
      this.totalResults > 0
        ? 1
        : 0;


    if (
      this.totalResults > 0
    ) {

      this.scrollToHighlight(
        0
      );

    }

  }


  // =========================================================
  // ESCAPAR REGEX
  // =========================================================

  private escapeRegExp(
    value: string
  ): string {

    return value.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );

  }


  // =========================================================
  // IR A RESULTADO
  // =========================================================

  scrollToHighlight(
    index: number
  ): void {

    if (
      !this.highlightedElements.length
    ) {
      return;
    }


    this.highlightedElements
      .forEach(element => {

        element.classList.remove(
          'active'
        );

      });


    const element =
      this.highlightedElements[
        index
      ];


    if (!element) {
      return;
    }


    element.classList.add(
      'active'
    );


    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });


    this.currentResultIndex =
      index + 1;

  }


  // =========================================================
  // SIGUIENTE / ANTERIOR
  // =========================================================

  onNavigateResult(
    direction: number
  ): void {

    if (
      this.totalResults === 0
    ) {
      return;
    }


    let index =
      this.currentResultIndex > 0
        ? this.currentResultIndex - 1
        : 0;


    index =
      (
        index +
        direction +
        this.totalResults
      )
      %
      this.totalResults;


    this.scrollToHighlight(
      index
    );

  }


  // =========================================================
  // LIMPIAR BÚSQUEDA
  // =========================================================

  clearHighlights(): void {

    const content =
      this.mainContent.nativeElement;

    const marks =
      content.querySelectorAll(
        'mark.highlight'
      );


    marks.forEach(
      mark => {

        const parent =
          mark.parentNode;

        if (!parent) {
          return;
        }


        parent.replaceChild(
          document.createTextNode(
            mark.textContent || ''
          ),
          mark
        );


        parent.normalize();

      }
    );


    this.highlightedElements = [];

    this.totalResults = 0;

    this.currentResultIndex = 0;

  }

}