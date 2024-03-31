import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTableComponent } from './read-table.component';

describe('ReadTableComponent', () => {
  let component: ReadTableComponent;
  let fixture: ComponentFixture<ReadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
