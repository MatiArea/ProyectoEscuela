import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrainferiorComponent } from './barrainferior.component';

describe('BarrainferiorComponent', () => {
  let component: BarrainferiorComponent;
  let fixture: ComponentFixture<BarrainferiorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrainferiorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrainferiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
