import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatsComponent } from './group-chats.component';

describe('GroupChatsComponent', () => {
  let component: GroupChatsComponent;
  let fixture: ComponentFixture<GroupChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
