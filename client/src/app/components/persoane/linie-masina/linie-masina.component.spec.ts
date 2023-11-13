import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinieMasinaComponent } from './linie-masina.component';

describe('LinieMasinaComponent', () => {
  let component: LinieMasinaComponent;
  let fixture: ComponentFixture<LinieMasinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinieMasinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinieMasinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
