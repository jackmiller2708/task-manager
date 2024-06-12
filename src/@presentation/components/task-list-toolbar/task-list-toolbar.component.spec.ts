import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListToolbarComponent } from './task-list-toolbar.component';

describe('TaskListToolbarComponent', () => {
  let component: TaskListToolbarComponent;
  let fixture: ComponentFixture<TaskListToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
