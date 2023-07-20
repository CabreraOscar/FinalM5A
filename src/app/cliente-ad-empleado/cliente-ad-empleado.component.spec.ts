import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAdEmpleadoComponent } from './cliente-ad-empleado.component';

describe('ClienteAdEmpleadoComponent', () => {
  let component: ClienteAdEmpleadoComponent;
  let fixture: ComponentFixture<ClienteAdEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteAdEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteAdEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
