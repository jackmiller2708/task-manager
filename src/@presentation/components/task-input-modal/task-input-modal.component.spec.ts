import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInputModalComponent } from './task-input-modal.component';

describe('TaskInputModalComponent', () => {
  let component: TaskInputModalComponent;
  let fixture: ComponentFixture<TaskInputModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInputModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
