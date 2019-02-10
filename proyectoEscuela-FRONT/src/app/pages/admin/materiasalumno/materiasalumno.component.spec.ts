import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasalumnoComponent } from './materiasalumno.component';

describe('MateriasalumnoComponent', () => {
  let component: MateriasalumnoComponent;
  let fixture: ComponentFixture<MateriasalumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasalumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasalumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
