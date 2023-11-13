import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasiniTableComponent } from './masini-table.component';

describe('MasiniTableComponent', () => {
  let component: MasiniTableComponent;
  let fixture: ComponentFixture<MasiniTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasiniTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasiniTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
