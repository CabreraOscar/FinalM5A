import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarVentasComponent } from './generar-ventas.component';

describe('GenerarVentasComponent', () => {
  let component: GenerarVentasComponent;
  let fixture: ComponentFixture<GenerarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
