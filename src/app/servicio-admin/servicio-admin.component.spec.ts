import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAdminComponent } from './servicio-admin.component';

describe('ServicioAdminComponent', () => {
  let component: ServicioAdminComponent;
  let fixture: ComponentFixture<ServicioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
