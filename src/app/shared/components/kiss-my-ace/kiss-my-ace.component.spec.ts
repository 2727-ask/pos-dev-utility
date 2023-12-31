import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KissMyAceComponent } from './kiss-my-ace.component';

describe('KissMyAceComponent', () => {
  let component: KissMyAceComponent;
  let fixture: ComponentFixture<KissMyAceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KissMyAceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KissMyAceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
