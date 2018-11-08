import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarnotificacionComponent } from './enviarnotificacion.component';

describe('EnviarnotificacionComponent', () => {
  let component: EnviarnotificacionComponent;
  let fixture: ComponentFixture<EnviarnotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarnotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarnotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
