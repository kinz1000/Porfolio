import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicComponent } from './tecnic.component';

describe('TecnicComponent', () => {
  let component: TecnicComponent;
  let fixture: ComponentFixture<TecnicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
