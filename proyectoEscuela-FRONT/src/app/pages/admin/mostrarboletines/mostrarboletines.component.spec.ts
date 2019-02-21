import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarboletinesComponent } from './mostrarboletines.component';

describe('MostrarboletinesComponent', () => {
  let component: MostrarboletinesComponent;
  let fixture: ComponentFixture<MostrarboletinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarboletinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarboletinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
