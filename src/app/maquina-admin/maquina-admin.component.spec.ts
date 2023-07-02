import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinaAdminComponent } from './maquina-admin.component';

describe('MaquinaAdminComponent', () => {
  let component: MaquinaAdminComponent;
  let fixture: ComponentFixture<MaquinaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaquinaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
