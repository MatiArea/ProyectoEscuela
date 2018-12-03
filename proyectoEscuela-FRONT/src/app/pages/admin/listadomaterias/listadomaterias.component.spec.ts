import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadomateriasComponent } from './listadomaterias.component';

describe('ListadomateriasComponent', () => {
  let component: ListadomateriasComponent;
  let fixture: ComponentFixture<ListadomateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadomateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadomateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
