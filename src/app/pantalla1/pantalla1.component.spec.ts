import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla1Component } from './pantalla1.component';

describe('Pantalla1Component', () => {
  let component: Pantalla1Component;
  let fixture: ComponentFixture<Pantalla1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pantalla1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Pantalla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
