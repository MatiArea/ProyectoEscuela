import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargadenotasComponent } from './cargadenotas.component';

describe('CargadenotasComponent', () => {
  let component: CargadenotasComponent;
  let fixture: ComponentFixture<CargadenotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargadenotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargadenotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
