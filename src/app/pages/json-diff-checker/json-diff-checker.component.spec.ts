import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDiffCheckerComponent } from './json-diff-checker.component';

describe('JsonDiffCheckerComponent', () => {
  let component: JsonDiffCheckerComponent;
  let fixture: ComponentFixture<JsonDiffCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonDiffCheckerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonDiffCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
