import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaEmpleadoComponent } from './pantalla-empleado.component';

describe('PantallaEmpleadoComponent', () => {
  let component: PantallaEmpleadoComponent;
  let fixture: ComponentFixture<PantallaEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
