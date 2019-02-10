import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadodivComponent } from './listadodiv.component';

describe('ListadodivComponent', () => {
  let component: ListadodivComponent;
  let fixture: ComponentFixture<ListadodivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadodivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadodivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
