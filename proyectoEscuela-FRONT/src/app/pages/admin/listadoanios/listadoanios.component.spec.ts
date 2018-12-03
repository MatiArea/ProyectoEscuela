import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoaniosComponent } from './listadoanios.component';

describe('ListadoaniosComponent', () => {
  let component: ListadoaniosComponent;
  let fixture: ComponentFixture<ListadoaniosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoaniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
