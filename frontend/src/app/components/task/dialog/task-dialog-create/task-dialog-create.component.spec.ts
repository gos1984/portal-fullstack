import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogCreateComponent } from './task-dialog-create.component';

describe('TaskDialogCreateComponent', () => {
  let component: TaskDialogCreateComponent;
  let fixture: ComponentFixture<TaskDialogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDialogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
