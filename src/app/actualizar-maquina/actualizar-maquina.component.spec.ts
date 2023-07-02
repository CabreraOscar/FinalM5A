import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMaquinaComponent } from './actualizar-maquina.component';

describe('ActualizarMaquinaComponent', () => {
  let component: ActualizarMaquinaComponent;
  let fixture: ComponentFixture<ActualizarMaquinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMaquinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
