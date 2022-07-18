import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePresetComponent } from './time-preset.component';

describe('TimePresetComponent', () => {
  let component: TimePresetComponent;
  let fixture: ComponentFixture<TimePresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
