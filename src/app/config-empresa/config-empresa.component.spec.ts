import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEmpresaComponent } from './config-empresa.component';

describe('ConfigEmpresaComponent', () => {
  let component: ConfigEmpresaComponent;
  let fixture: ComponentFixture<ConfigEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
