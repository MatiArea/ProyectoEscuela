import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadomatevaComponent } from './listadomateva.component';

describe('ListadomatevaComponent', () => {
  let component: ListadomatevaComponent;
  let fixture: ComponentFixture<ListadomatevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadomatevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadomatevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
