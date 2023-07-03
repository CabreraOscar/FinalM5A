import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleordenComponent } from './detalleorden.component';

describe('DetalleordenComponent', () => {
  let component: DetalleordenComponent;
  let fixture: ComponentFixture<DetalleordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleordenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
