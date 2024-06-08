import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateModalComponent } from './task-create-modal.component';

describe('TaskCreateModalComponent', () => {
  let component: TaskCreateModalComponent;
  let fixture: ComponentFixture<TaskCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
