import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHistoryComponent } from './history.component';

describe('ActivityHistoryComponent', () => {
  let component: ActivityHistoryComponent;
  let fixture: ComponentFixture<ActivityHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityHistoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
