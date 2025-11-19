import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCambioComponent } from './boton-cambio.component';

describe('BotonCambioComponent', () => {
  let component: BotonCambioComponent;
  let fixture: ComponentFixture<BotonCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonCambioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
