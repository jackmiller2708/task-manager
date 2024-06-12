import { TaskListActionCellComponent } from './task-list-action-cell.component';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

describe('TaskListActionCellComponent', () => {
  let component: TaskListActionCellComponent;
  let fixture: ComponentFixture<TaskListActionCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListActionCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
