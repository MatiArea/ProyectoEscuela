import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarevaluacionComponent } from './cargarevaluacion.component';

describe('CargarevaluacionComponent', () => {
  let component: CargarevaluacionComponent;
  let fixture: ComponentFixture<CargarevaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarevaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
