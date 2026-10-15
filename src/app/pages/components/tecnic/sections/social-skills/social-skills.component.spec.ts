import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSkillsComponent } from './social-skills.component';

describe('SocialSkillsComponent', () => {
  let component: SocialSkillsComponent;
  let fixture: ComponentFixture<SocialSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
