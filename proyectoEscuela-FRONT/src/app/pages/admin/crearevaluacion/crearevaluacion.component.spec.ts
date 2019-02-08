import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearevaluacionComponent } from './crearevaluacion.component';

describe('CrearevaluacionComponent', () => {
  let component: CrearevaluacionComponent;
  let fixture: ComponentFixture<CrearevaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearevaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
