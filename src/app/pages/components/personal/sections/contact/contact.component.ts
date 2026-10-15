import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Subscription } from 'rxjs';

import emailjs from 'emailjs-com';

import { IdiomaServiceService }
  from '../../../../services/idioma-service.service';


@Component({
  selector: 'app-contact',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './contact.component.html',

  styleUrl:
    './contact.component.css'
})
export class ContactComponent
  implements OnInit, OnDestroy {


  selectedLang: 'ES' | 'EN' = 'ES';

  private languageSubscription?: Subscription;


  contactForm!: FormGroup;

  errorMessage = '';

  statusLightClass = '';


  translations = {

    ES: {

      contactMe:
        'Contáctame',

      contactHeader:
        'Creemos algo histórico <br> - Contáctame',

      contactDescription:
        'Rellena el formulario y tu mensaje llegará directamente a mi correo electrónico. También puedes contactarme por teléfono o Gmail si lo prefieres. La luz verde significa que el correo ha sido enviado correctamente, la roja que ha habido un error.',

      phoneNumber:
        '+34 *** *** ***',

      emailAddress:
        'Davidquintana3004@gmail.com',

      contactFormTitle:
        'Contacto',

      labelName:
        'Nombre',

      placeholderName:
        'Tu nombre',

      errorNameRequired:
        'El nombre es obligatorio.',

      labelEmail:
        'Correo electrónico',

      placeholderEmail:
        'tucorreo@gmail.com',

      errorEmailInvalid:
        'Introduce un correo válido.',

      labelTitle:
        'Título',

      placeholderTitle:
        'Asunto del mensaje',

      errorTitleRequired:
        'El título es obligatorio.',

      labelMessage:
        'Mensaje',

      placeholderMessage:
        'Escribe tu mensaje...',

      errorMessageRequired:
        'El mensaje no puede estar vacío.',

      sendButton:
        'Enviar',

      signaturePhrase:
        'Hecho por una mente humana curiosa… con buenos aliados digitales.'

    },


    EN: {

      contactMe:
        'Contact Me',

      contactHeader:
        'Let’s create something historic <br> - Contact Me',

      contactDescription:
        'Fill out the form and your message will be sent directly to my email. You can also contact me by phone or Gmail if you prefer. Green light means the email was sent successfully, red means there was an error.',

      phoneNumber:
        '+34 123 456 789',

      emailAddress:
        'myemail@gmail.com',

      contactFormTitle:
        'Contact',

      labelName:
        'Name',

      placeholderName:
        'Your name',

      errorNameRequired:
        'Name is required.',

      labelEmail:
        'Email',

      placeholderEmail:
        'youremail@gmail.com',

      errorEmailInvalid:
        'Enter a valid email.',

      labelTitle:
        'Title',

      placeholderTitle:
        'Message subject',

      errorTitleRequired:
        'Title is required.',

      labelMessage:
        'Message',

      placeholderMessage:
        'Write your message...',

      errorMessageRequired:
        'Message cannot be empty.',

      sendButton:
        'Send',

      signaturePhrase:
        'Made by a curious human mind… with great digital allies.'

    }

  };


  constructor(
    private fb: FormBuilder,
    private languageService: IdiomaServiceService
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


    this.contactForm =
      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        title: [
          '',
          Validators.required
        ],

        message: [
          '',
          Validators.required
        ]

      });


    this.contactForm
      .valueChanges
      .subscribe(() => {

        if (this.contactForm.dirty) {

          this.statusLightClass =
            'orange';

        } else {

          this.statusLightClass =
            '';

        }

      });

  }


  ngOnDestroy(): void {

    this.languageSubscription
      ?.unsubscribe();

  }


  getTranslation(
    key: keyof typeof this.translations['ES']
  ): string {

    return this.translations[
      this.selectedLang
    ][key];

  }


  onSubmit(): void {

    if (
      this.contactForm.invalid
    ) {

      this.contactForm
        .markAllAsTouched();

      return;

    }


    this.statusLightClass =
      'orange-blink';

    this.errorMessage = '';


    const templateParams = {

      name:
        this.contactForm.value.name,

      email:
        this.contactForm.value.email,

      title:
        this.contactForm.value.title,

      message:
        this.contactForm.value.message,

      time:
        new Date().toLocaleString()

    };


    emailjs.send(
      'service_bisnl91',
      'template_jr3osdw',
      templateParams,
      '2S-UBMR-Cc75s_a3Y'
    )
    .then(() => {

      this.contactForm.reset();

      this.statusLightClass =
        'green';


      setTimeout(() => {

        this.statusLightClass = '';

      }, 2000);

    })
    .catch(() => {

      this.statusLightClass =
        'red-blink';


      setTimeout(() => {

        this.statusLightClass = '';

      }, 3000);


      this.errorMessage =
        'Ocurrió un error al enviar el mensaje.';

    });

  }

}