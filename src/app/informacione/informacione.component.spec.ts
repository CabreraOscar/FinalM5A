import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacioneComponent } from './informacione.component';

describe('InformacioneComponent', () => {
  let component: InformacioneComponent;
  let fixture: ComponentFixture<InformacioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
